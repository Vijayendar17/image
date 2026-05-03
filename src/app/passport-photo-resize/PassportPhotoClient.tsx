"use client";
import { useState, useRef, useCallback } from "react";
import ImageCropper from "../components/ImageCropper";

type PhotoPreset = {
  id: string;
  label: string;
  widthMM: number;
  heightMM: number;
  dpi: number;
  maxKB: number;
  desc: string;
};

const PRESETS: PhotoPreset[] = [
  { id: "passport-india", label: "Indian Passport", widthMM: 35, heightMM: 45, dpi: 300, maxKB: 50, desc: "35×45mm · <50KB" },
  { id: "visa-india", label: "Indian VISA", widthMM: 51, heightMM: 51, dpi: 300, maxKB: 50, desc: "51×51mm · <50KB" },
  { id: "pan-card", label: "PAN Card", widthMM: 25, heightMM: 35, dpi: 200, maxKB: 50, desc: "25×35mm · <50KB" },
  { id: "aadhaar", label: "Aadhaar Update", widthMM: 35, heightMM: 45, dpi: 200, maxKB: 50, desc: "35×45mm · <50KB" },
  { id: "upsc", label: "UPSC / SSC", widthMM: 35, heightMM: 45, dpi: 200, maxKB: 300, desc: "35×45mm · <300KB" },
  { id: "custom", label: "Custom", widthMM: 0, heightMM: 0, dpi: 300, maxKB: 50, desc: "Set your own" },
];

function mmToPx(mm: number, dpi: number) {
  return Math.round((mm / 25.4) * dpi);
}

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(2)} MB`;
}

interface Crop {
  x: number;
  y: number;
  width: number;
  height: number;
}

async function processPhoto(
  file: File,
  widthPx: number,
  heightPx: number,
  maxKB: number,
  manualCrop?: Crop & { zoom?: number; panX?: number; panY?: number; naturalW?: number; naturalH?: number }
): Promise<{ blob: Blob; url: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const srcUrl = URL.createObjectURL(file);
    img.onload = async () => {
      URL.revokeObjectURL(srcUrl);
      const canvas = document.createElement("canvas");
      canvas.width = widthPx;
      canvas.height = heightPx;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, widthPx, heightPx);

      if (manualCrop) {
        // Use image natural dimensions as virtual container for pixel-accurate mapping
        const nw = manualCrop.naturalW || img.width;
        const nh = manualCrop.naturalH || img.height;
        const containerW = nw;
        const containerH = nh;
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = containerW;
        tempCanvas.height = containerH;
        const tctx = tempCanvas.getContext("2d")!;

        const zoom = manualCrop.zoom || 1;
        const px = manualCrop.panX || 0;
        const py = manualCrop.panY || 0;

        // Simulate the CSS flex-center + translate + scale applied in the UI
        tctx.save();
        tctx.translate(containerW / 2 + px, containerH / 2 + py);
        tctx.scale(zoom, zoom);
        const fitScale = Math.min(containerW / img.width, containerH / img.height);
        const iw = img.width * fitScale;
        const ih = img.height * fitScale;
        tctx.drawImage(img, -iw / 2, -ih / 2, iw, ih);
        tctx.restore();

        const bx = (manualCrop.x / 100) * containerW;
        const by = (manualCrop.y / 100) * containerH;
        const bw = (manualCrop.width / 100) * containerW;
        const bh = (manualCrop.height / 100) * containerH;

        ctx.drawImage(tempCanvas, bx, by, bw, bh, 0, 0, widthPx, heightPx);
      } else {
        const srcAR = img.width / img.height;
        const dstAR = widthPx / heightPx;
        let sx = 0, sy = 0, sw = img.width, sh = img.height;
        if (srcAR > dstAR) {
          sw = img.height * dstAR;
          sx = (img.width - sw) / 2;
        } else {
          sh = img.width / dstAR;
          sy = (img.height - sh) / 2;
        }
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, widthPx, heightPx);
      }

      const targetBytes = maxKB * 1024;
      let lo = 0.01, hi = 0.99, bestBlob: Blob | null = null;

      for (let i = 0; i < 12; i++) {
        const mid = (lo + hi) / 2;
        const blob: Blob | null = await new Promise((r) =>
          canvas.toBlob((b) => r(b), "image/jpeg", mid)
        );
        if (!blob) break;
        if (blob.size <= targetBytes) { bestBlob = blob; lo = mid; }
        else hi = mid;
      }

      if (!bestBlob) {
        const blob: Blob | null = await new Promise((r) =>
          canvas.toBlob((b) => r(b), "image/jpeg", 0.4)
        );
        bestBlob = blob;
      }

      if (bestBlob) {
        resolve({ blob: bestBlob, url: URL.createObjectURL(bestBlob) });
      } else {
        reject(new Error("Processing failed"));
      }
    };
    img.onerror = reject;
    img.src = srcUrl;
  });
}

export default function PassportPhotoClient() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [preset, setPreset] = useState<PhotoPreset>(PRESETS[0]);
  const [customW, setCustomW] = useState("35");
  const [customH, setCustomH] = useState("45");
  const [customKB, setCustomKB] = useState("50");
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; url: string; width: number; height: number } | null>(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [isManualCrop, setIsManualCrop] = useState(true);
  const [manualCrop, setManualCrop] = useState<Crop | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) { setError("Please upload an image file."); return; }
    setFile(f);
    setError("");
    setResult(null);
    setIsManualCrop(true);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const handleProcess = async () => {
    if (!file) return;
    setProcessing(true);
    setError("");
    setResult(null);
    try {
      const isCustom = preset.id === "custom";
      const wMM = isCustom ? parseFloat(customW) : preset.widthMM;
      const hMM = isCustom ? parseFloat(customH) : preset.heightMM;
      const kb = isCustom ? parseFloat(customKB) : preset.maxKB;
      const wPx = mmToPx(wMM, preset.dpi);
      const hPx = mmToPx(hMM, preset.dpi);
      const { blob, url } = await processPhoto(file, wPx, hPx, kb, isManualCrop ? manualCrop || undefined : undefined);
      setResult({ blob, url, width: wPx, height: hPx });
    } catch {
      setError("Processing failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="tool-content">
      <div className="tool-workspace">
        {/* Upload */}
        <div
          className={`drop-zone ${dragging ? "drag-over" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            id="passport-file-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <span className="drop-icon">📷</span>
          {file ? (
            <div>
              <p style={{ fontWeight: 600 }}>{file.name}</p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>{formatBytes(file.size)} · Click to change</p>
            </div>
          ) : (
            <div>
              <p style={{ fontWeight: 600, fontSize: "1.05rem" }}>Upload your photo</p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.4rem" }}>JPG, PNG · any size</p>
            </div>
          )}
        </div>

        {/* Preview + Settings */}
        {file && preview && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                  {isManualCrop ? "Adjust Crop Area" : "Original Image Preview"}
                </p>
                <button 
                  className={`btn ${isManualCrop ? "btn-blue" : "btn-secondary"}`}
                  style={{ padding: "0.25rem 0.6rem", fontSize: "0.75rem" }}
                  onClick={() => setIsManualCrop(!isManualCrop)}
                >
                  {isManualCrop ? "✓ Hide Cropper" : "✂️ Show Cropper"}
                </button>
              </div>
              
              {isManualCrop ? (
                <ImageCropper 
                  imageSrc={preview} 
                  aspectRatio={preset.id === "custom" ? (parseFloat(customW) / parseFloat(customH)) : (preset.widthMM / preset.heightMM)}
                  onCropChange={setManualCrop}
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img 
                  src={preview} 
                  alt="Preview" 
                  style={{ 
                    width: "100%", 
                    height: "auto", 
                    maxHeight: 400, 
                    objectFit: "contain", 
                    borderRadius: 10, 
                    border: "1px solid var(--border)" 
                  }} 
                />
              )}
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" }}>
                {isManualCrop ? "Drag corners to resize · Drag center to move" : "Image is automatically centered. Use Manual Crop for precise control."}
              </p>
            </div>

            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label className="input-label">Select Preset</label>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {PRESETS.map((p) => (
                    <button
                      key={p.id}
                      id={`preset-${p.id}`}
                      className={`btn ${preset.id === p.id ? "btn-blue" : "btn-secondary"}`}
                      style={{ padding: "0.4rem 0.75rem", fontSize: "0.8rem" }}
                      onClick={() => setPreset(p)}
                    >
                      {p.label}
                      <span style={{ fontSize: "0.7rem", opacity: 0.7 }}> {p.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {preset.id === "custom" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label className="input-label" htmlFor="width-mm">Width (mm)</label>
                    <input id="width-mm" type="number" className="input-field" value={customW} onChange={(e) => setCustomW(e.target.value)} />
                  </div>
                  <div>
                    <label className="input-label" htmlFor="height-mm">Height (mm)</label>
                    <input id="height-mm" type="number" className="input-field" value={customH} onChange={(e) => setCustomH(e.target.value)} />
                  </div>
                  <div>
                    <label className="input-label" htmlFor="max-kb-passport">Max (KB)</label>
                    <input id="max-kb-passport" type="number" className="input-field" value={customKB} onChange={(e) => setCustomKB(e.target.value)} />
                  </div>
                </div>
              )}

              <button id="process-photo-btn" className="btn btn-primary" onClick={handleProcess} disabled={processing}>
                {processing ? <><span className="spinner" style={{ width: 16, height: 16 }} /> Processing...</> : "📷 Resize & Compress"}
              </button>
            </div>
          </div>
        )}

        {error && <div className="result-box error"><p style={{ color: "#ef4444" }}>⚠️ {error}</p></div>}

        {result && (
          <div className="result-box animate-fade-up">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem" }}>
              <h3 style={{ fontWeight: 700, color: "var(--accent-green)" }}>✅ Photo Ready!</h3>
              <button id="download-passport-btn" className="btn btn-primary" onClick={() => {
                const a = document.createElement("a"); a.href = result.url;
                a.download = `passport_photo_${preset.label.replace(/ /g, "_")}.jpg`; a.click();
              }}>⬇️ Download JPG</button>
            </div>
            <div className="stats-row">
              <div className="stat-item"><div className="stat-value">{result.width}×{result.height}</div><div className="stat-label">Pixels</div></div>
              <div className="stat-item"><div className="stat-value" style={{ color: "var(--accent-green)" }}>{formatBytes(result.blob.size)}</div><div className="stat-label">File Size</div></div>
              <div className="stat-item"><div className="stat-value">JPG</div><div className="stat-label">Format</div></div>
            </div>
            <div style={{ marginTop: "1rem" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={result.url} alt="Processed passport photo" style={{ maxHeight: 200, borderRadius: 8, border: "1px solid var(--border)" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
