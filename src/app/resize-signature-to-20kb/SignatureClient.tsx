"use client";
import { useState, useRef, useCallback } from "react";

const PRESETS = [
  { id: "ssc", label: "SSC CGL/CHSL", widthPx: 140, heightPx: 60, maxKB: 12, desc: "140×60px · <12KB" },
  { id: "upsc", label: "UPSC", widthPx: 140, heightPx: 60, maxKB: 40, desc: "140×60px · <40KB" },
  { id: "ibps", label: "IBPS PO/Clerk", widthPx: 140, heightPx: 60, maxKB: 20, desc: "140×60px · <20KB" },
  { id: "sbi", label: "SBI PO/Clerk", widthPx: 140, heightPx: 60, maxKB: 20, desc: "140×60px · <20KB" },
  { id: "rrb", label: "RRB NTPC", widthPx: 140, heightPx: 60, maxKB: 20, desc: "140×60px · <20KB" },
  { id: "custom20", label: "20KB", widthPx: 140, heightPx: 60, maxKB: 20, desc: "Generic 20KB" },
  { id: "custom50", label: "50KB", widthPx: 200, heightPx: 100, maxKB: 50, desc: "Generic 50KB" },
];

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 / 1024).toFixed(2)} MB`;
}

async function processSignature(
  file: File,
  widthPx: number,
  heightPx: number,
  maxKB: number
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

      // Fit inside (letterbox) to preserve signature shape
      const srcAR = img.width / img.height;
      const dstAR = widthPx / heightPx;
      let dw = widthPx, dh = heightPx, dx = 0, dy = 0;
      if (srcAR > dstAR) {
        dh = Math.round(widthPx / srcAR);
        dy = Math.round((heightPx - dh) / 2);
      } else {
        dw = Math.round(heightPx * srcAR);
        dx = Math.round((widthPx - dw) / 2);
      }
      ctx.drawImage(img, dx, dy, dw, dh);

      const target = maxKB * 1024;
      let lo = 0.01, hi = 0.99, best: Blob | null = null;
      for (let i = 0; i < 12; i++) {
        const mid = (lo + hi) / 2;
        const blob: Blob | null = await new Promise((r) => canvas.toBlob((b) => r(b), "image/jpeg", mid));
        if (!blob) break;
        if (blob.size <= target) { best = blob; lo = mid; }
        else hi = mid;
      }
      if (!best) {
        const blob: Blob | null = await new Promise((r) => canvas.toBlob((b) => r(b), "image/jpeg", 0.5));
        best = blob;
      }
      if (best) resolve({ blob: best, url: URL.createObjectURL(best) });
      else reject(new Error("Failed"));
    };
    img.onerror = reject;
    img.src = srcUrl;
  });
}

export default function SignatureClient() {
  const [file, setFile] = useState<File | null>(null);
  const [preset, setPreset] = useState(PRESETS[0]);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; url: string } | null>(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) { setError("Please upload an image."); return; }
    setFile(f); setError(""); setResult(null);
  }, []);

  const handleProcess = async () => {
    if (!file) return;
    setProcessing(true); setError(""); setResult(null);
    try {
      const res = await processSignature(file, preset.widthPx, preset.heightPx, preset.maxKB);
      setResult(res);
    } catch {
      setError("Processing failed. Try a different image.");
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
          <input ref={inputRef} id="sig-input" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
          <span className="drop-icon">✍️</span>
          {file ? (
            <div>
              <p style={{ fontWeight: 600 }}>{file.name}</p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>{formatBytes(file.size)} · Click to change</p>
            </div>
          ) : (
            <div>
              <p style={{ fontWeight: 600, fontSize: "1.05rem" }}>Upload your signature image</p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.4rem" }}>JPG or PNG · Photograph or scan of signature</p>
            </div>
          )}
        </div>

        {/* Presets */}
        {file && (
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label className="input-label">Select Exam Portal</label>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    id={`sig-preset-${p.id}`}
                    className={`btn ${preset.id === p.id ? "btn-blue" : "btn-secondary"}`}
                    style={{ padding: "0.5rem 0.9rem", fontSize: "0.82rem" }}
                    onClick={() => setPreset(p)}
                  >
                    <span style={{ fontWeight: 700 }}>{p.label}</span>
                    <span style={{ opacity: 0.65, fontSize: "0.72rem", marginLeft: "0.3rem" }}>{p.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="stats-row">
              <div className="stat-item"><div className="stat-value">{preset.widthPx}×{preset.heightPx}</div><div className="stat-label">Pixels</div></div>
              <div className="stat-item"><div className="stat-value">&lt;{preset.maxKB}KB</div><div className="stat-label">Max Size</div></div>
              <div className="stat-item"><div className="stat-value">JPG</div><div className="stat-label">Format</div></div>
            </div>

            <button id="process-sig-btn" className="btn btn-primary" onClick={handleProcess} disabled={processing}>
              {processing ? <><span className="spinner" style={{ width: 16, height: 16 }} /> Processing...</> : "✍️ Resize & Compress Signature"}
            </button>
          </div>
        )}

        {error && <div className="result-box error"><p style={{ color: "#ef4444" }}>⚠️ {error}</p></div>}

        {result && file && (
          <div className="result-box animate-fade-up">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem" }}>
              <div>
                <h3 style={{ fontWeight: 700, color: "var(--accent-green)" }}>✅ Signature Ready for {preset.label}!</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Final size: {formatBytes(result.blob.size)}</p>
              </div>
              <button id="download-sig-btn" className="btn btn-primary" onClick={() => {
                const a = document.createElement("a"); a.href = result.url;
                a.download = `signature_${preset.id}.jpg`; a.click();
              }}>⬇️ Download JPG</button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={result.url} alt="Processed signature" style={{ maxWidth: 300, background: "white", padding: 8, borderRadius: 8, border: "1px solid var(--border)" }} />
          </div>
        )}
      </div>
    </div>
  );
}
