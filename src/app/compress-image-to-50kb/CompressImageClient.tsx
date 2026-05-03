"use client";
import { useState, useRef, useCallback } from "react";
import ImageCropper from "../components/ImageCropper";
import AdSlot from "../components/AdSlot";

const PRESETS = [
  { label: "20 KB", kb: 20 },
  { label: "50 KB", kb: 50 },
  { label: "100 KB", kb: 100 },
  { label: "200 KB", kb: 200 },
  { label: "500 KB", kb: 500 },
];

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

interface Crop {
  x: number;
  y: number;
  width: number;
  height: number;
}

async function compressImage(
  file: File,
  targetKB: number,
  maxWidth: number,
  maxHeight: number,
  manualCrop?: Crop & { zoom?: number; panX?: number; panY?: number; naturalW?: number; naturalH?: number }
): Promise<{ blob: Blob; quality: number; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      
      let dw, dh;
      
      if (manualCrop) {
        // Use image natural dimensions as virtual container for pixel-accurate mapping
        const containerW = manualCrop.naturalW || img.width;
        const containerH = manualCrop.naturalH || img.height;
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = containerW;
        tempCanvas.height = containerH;
        const tctx = tempCanvas.getContext("2d")!;

        const zoom = manualCrop.zoom || 1;
        const px = manualCrop.panX || 0;
        const py = manualCrop.panY || 0;

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

        dw = bw;
        dh = bh;
        if (dw > maxWidth || dh > maxHeight) {
          const ratio = Math.min(maxWidth / dw, maxHeight / dh);
          dw = Math.round(dw * ratio);
          dh = Math.round(dh * ratio);
        }

        canvas.width = dw;
        canvas.height = dh;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, dw, dh);
        ctx.drawImage(tempCanvas, bx, by, bw, bh, 0, 0, dw, dh);
      } else {
        const sw = img.width;
        const sh = img.height;
        dw = sw;
        dh = sh;

        if (dw > maxWidth || dh > maxHeight) {
          const ratio = Math.min(maxWidth / dw, maxHeight / dh);
          dw = Math.round(dw * ratio);
          dh = Math.round(dh * ratio);
        }

        canvas.width = dw;
        canvas.height = dh;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, dw, dh);
        ctx.drawImage(img, 0, 0, sw, sh, 0, 0, dw, dh);
      }

      const targetBytes = targetKB * 1024;
      let lo = 0.01, hi = 0.99, bestBlob: Blob | null = null, bestQ = 0.7;

      const tryQuality = (q: number): Promise<Blob | null> =>
        new Promise((res) =>
          canvas.toBlob((b) => res(b), "image/jpeg", q)
        );

      (async () => {
        for (let i = 0; i < 12; i++) {
          const mid = (lo + hi) / 2;
          const blob = await tryQuality(mid);
          if (!blob) break;
          if (blob.size <= targetBytes) {
            bestBlob = blob;
            bestQ = mid;
            lo = mid;
          } else {
            hi = mid;
          }
        }
        if (!bestBlob || bestBlob.size > targetBytes) {
          let scale = 0.9;
          while (scale > 0.1) {
            const c2 = document.createElement("canvas");
            c2.width = Math.round(dw * scale);
            c2.height = Math.round(dh * scale);
            const ctx2 = c2.getContext("2d")!;
            ctx2.fillStyle = "#ffffff";
            ctx2.fillRect(0, 0, c2.width, c2.height);
            ctx2.drawImage(canvas, 0, 0, c2.width, c2.height);
            const blob = await new Promise<Blob | null>((r) =>
              c2.toBlob((b) => r(b), "image/jpeg", 0.7)
            );
            if (blob && blob.size <= targetBytes) {
              resolve({ blob, quality: 0.7, width: c2.width, height: c2.height });
              return;
            }
            scale -= 0.1;
          }
        }
        if (bestBlob) {
          resolve({ blob: bestBlob, quality: bestQ, width: dw, height: dh });
        } else {
          reject(new Error("Could not compress to target size"));
        }
      })();
    };
    img.onerror = reject;
    img.src = url;
  });
}

export default function CompressImageClient() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [targetKB, setTargetKB] = useState(50);
  const [customKB, setCustomKB] = useState("");
  const maxDim = 1920;
  const [compressing, setCompressing] = useState(false);
  const [isManualCrop, setIsManualCrop] = useState(true);
  const [manualCrop, setManualCrop] = useState<Crop | null>(null);
  const [result, setResult] = useState<{
    blob: Blob;
    url: string;
    quality: number;
    width: number;
    height: number;
    origSize: number;
  } | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) {
      setError("Please upload a JPG or PNG image.");
      return;
    }
    setFile(f);
    setError("");
    setResult(null);
    setIsManualCrop(true);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleCompress = async () => {
    if (!file) return;
    const target = customKB ? parseInt(customKB) : targetKB;
    if (isNaN(target) || target <= 0) {
      setError("Enter a valid target size in KB.");
      return;
    }
    setCompressing(true);
    setError("");
    setResult(null);
    try {
      const { blob, quality, width, height } = await compressImage(
        file,
        target,
        maxDim,
        maxDim,
        isManualCrop ? manualCrop || undefined : undefined
      );
      const url = URL.createObjectURL(blob);
      setResult({ blob, url, quality, width, height, origSize: file.size });
    } catch {
      setError("Compression failed. Please try a different image or larger target size.");
    } finally {
      setCompressing(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    a.download = `compressed_${file?.name || "image"}.jpg`;
    a.click();
  };

  const savings = result
    ? Math.round((1 - result.blob.size / result.origSize) * 100)
    : 0;

  return (
    <div className="tool-content">
      <div className="tool-workspace">
        {/* Upload */}
        <div
          className={`drop-zone ${dragging ? "drag-over" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            id="compress-file-input"
            style={{ display: "none" }}
          />
          <span className="drop-icon">🖼️</span>
          {file ? (
            <div>
              <p style={{ fontWeight: 600, color: "var(--text-primary)" }}>{file.name}</p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.25rem" }}>
                Original size: <strong>{formatBytes(file.size)}</strong> · Click to change
              </p>
            </div>
          ) : (
            <div>
              <p style={{ fontWeight: 600, fontSize: "1.05rem" }}>Drop your image here</p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.4rem" }}>
                or click to browse · JPG, PNG, WebP supported
              </p>
            </div>
          )}
        </div>

        {/* Settings (Always visible) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                {isManualCrop ? "Adjust Crop Area" : "Original Image Preview"}
              </p>
              {file && (
                <button 
                  className={`btn ${isManualCrop ? "btn-blue" : "btn-secondary"}`}
                  style={{ padding: "0.25rem 0.6rem", fontSize: "0.75rem" }}
                  onClick={() => setIsManualCrop(!isManualCrop)}
                >
                  {isManualCrop ? "✓ Hide Cropper" : "✂️ Show Cropper"}
                </button>
              )}
            </div>
            
            {file && preview ? (
              isManualCrop ? (
                <ImageCropper 
                  imageSrc={preview} 
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
              )
            ) : (
              <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed var(--border)", borderRadius: 10, color: "var(--text-muted)" }}>
                Upload an image to see preview
              </div>
            )}
          </div>

          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label className="input-label" htmlFor="custom-kb">Target Size</label>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                {PRESETS.map((p) => (
                  <button
                    key={p.kb}
                    id={`preset-${p.kb}kb`}
                    className={`btn ${targetKB === p.kb && !customKB ? "btn-blue" : "btn-secondary"}`}
                    style={{ padding: "0.4rem 0.9rem", fontSize: "0.85rem" }}
                    onClick={() => { setTargetKB(p.kb); setCustomKB(""); }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <input
                id="custom-kb"
                type="number"
                className="input-field"
                placeholder="Or type custom size in KB..."
                value={customKB}
                onChange={(e) => { setCustomKB(e.target.value); setTargetKB(0); }}
                min={1}
                max={10000}
                style={{ maxWidth: "250px" }}
              />
            </div>

            <button
              id="compress-btn"
              className="btn btn-primary btn-lg"
              onClick={handleCompress}
              disabled={compressing || !file}
              style={{ opacity: !file ? 0.7 : 1 }}
            >
              {compressing ? (
                <>
                  <span className="spinner" style={{ width: 18, height: 18 }} />
                  Compressing...
                </>
              ) : (
                "🗜️ Compress Now"
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="result-box error">
            <p style={{ color: "#ef4444", fontWeight: 500 }}>⚠️ {error}</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="result-box animate-fade-up">
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <h3 style={{ fontWeight: 800, color: "var(--accent-green)", marginBottom: "0.5rem", fontSize: "1.4rem" }}>
                ✅ Compressed Successfully!
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "1rem", marginBottom: "1.5rem" }}>
                Saved {savings}% of original size
              </p>
              <button id="download-btn" className="btn btn-primary btn-lg" style={{ width: "100%", fontSize: "1.15rem", padding: "1.2rem", boxShadow: "0 8px 24px rgba(255, 107, 53, 0.4)" }} onClick={handleDownload}>
                ⬇️ Download Compressed Image
              </button>
            </div>

            <div className="stats-row">
              <div className="stat-item">
                <div className="stat-value" style={{ color: "var(--text-muted)", textDecoration: "line-through", fontSize: "1rem" }}>
                  {formatBytes(result.origSize)}
                </div>
                <div className="stat-label">Original</div>
              </div>
              <div className="stat-item">
                <div className="stat-value" style={{ color: "var(--accent-green)" }}>
                  {formatBytes(result.blob.size)}
                </div>
                <div className="stat-label">Compressed</div>
              </div>
              <div className="stat-item">
                <div className="stat-value" style={{ color: "var(--accent-orange)" }}>
                  {result.width}×{result.height}
                </div>
                <div className="stat-label">Dimensions</div>
              </div>
              <div className="stat-item">
                <div className="stat-value" style={{ color: "var(--accent-blue)" }}>
                  {savings}%
                </div>
                <div className="stat-label">Size Saved</div>
              </div>
            </div>

            <div style={{ marginTop: "1.25rem" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result.url}
                alt="Compressed preview"
                className="img-preview"
                style={{ maxHeight: "300px", objectFit: "contain" }}
              />
            </div>

            <AdSlot label="Advertisement (Post-Download High Intent)" style={{ marginTop: "2rem" }} />
          </div>
        )}
      </div>
    </div>
  );
}
