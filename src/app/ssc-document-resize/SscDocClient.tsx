"use client";
import { useState, useRef } from "react";

const EXAM_PRESETS = [
  {
    id: "ssc",
    name: "SSC CGL / CHSL",
    photo: { w: 100, h: 120, maxKB: 50 },
    sig: { w: 140, h: 60, maxKB: 12 },
  },
  {
    id: "upsc",
    name: "UPSC Civil Services",
    photo: { w: 200, h: 230, maxKB: 300 },
    sig: { w: 140, h: 60, maxKB: 40 },
  },
  {
    id: "ibps",
    name: "IBPS PO / Clerk",
    photo: { w: 200, h: 230, maxKB: 50 },
    sig: { w: 140, h: 60, maxKB: 20 },
  },
  {
    id: "sbi",
    name: "SBI PO / Clerk",
    photo: { w: 200, h: 200, maxKB: 50 },
    sig: { w: 140, h: 60, maxKB: 20 },
  },
  {
    id: "rrb",
    name: "RRB NTPC / Group D",
    photo: { w: 200, h: 230, maxKB: 50 },
    sig: { w: 140, h: 60, maxKB: 20 },
  },
];

function formatBytes(b: number) {
  if (!b) return "—";
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 / 1024).toFixed(2)} MB`;
}

async function processImg(
  file: File,
  w: number, h: number, maxKB: number, fit: "cover" | "contain"
): Promise<{ blob: Blob; url: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const srcUrl = URL.createObjectURL(file);
    img.onload = async () => {
      URL.revokeObjectURL(srcUrl);
      const canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);

      const srcAR = img.width / img.height, dstAR = w / h;
      if (fit === "cover") {
        let sx = 0, sy = 0, sw = img.width, sh = img.height;
        if (srcAR > dstAR) { sw = img.height * dstAR; sx = (img.width - sw) / 2; }
        else { sh = img.width / dstAR; sy = (img.height - sh) / 2; }
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
      } else {
        let dw = w, dh = h, dx = 0, dy = 0;
        if (srcAR > dstAR) { dh = Math.round(w / srcAR); dy = Math.round((h - dh) / 2); }
        else { dw = Math.round(h * srcAR); dx = Math.round((w - dw) / 2); }
        ctx.drawImage(img, dx, dy, dw, dh);
      }

      const target = maxKB * 1024;
      let lo = 0.01, hi = 0.99, best: Blob | null = null;
      for (let i = 0; i < 12; i++) {
        const mid = (lo + hi) / 2;
        const blob: Blob | null = await new Promise((r) => canvas.toBlob((b) => r(b), "image/jpeg", mid));
        if (!blob) break;
        if (blob.size <= target) { best = blob; lo = mid; } else hi = mid;
      }
      if (!best) best = await new Promise<Blob>((r) => canvas.toBlob((b) => r(b!), "image/jpeg", 0.5));
      if (best) resolve({ blob: best, url: URL.createObjectURL(best) });
      else reject(new Error("Failed"));
    };
    img.onerror = reject;
    img.src = srcUrl;
  });
}

export default function SscDocClient() {
  const [exam, setExam] = useState(EXAM_PRESETS[0]);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [sigFile, setSigFile] = useState<File | null>(null);
  const [photoResult, setPhotoResult] = useState<{ blob: Blob; url: string } | null>(null);
  const [sigResult, setSigResult] = useState<{ blob: Blob; url: string } | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const photoRef = useRef<HTMLInputElement>(null);
  const sigRef = useRef<HTMLInputElement>(null);

  const handleProcess = async () => {
    if (!photoFile && !sigFile) { setError("Upload at least one file."); return; }
    setProcessing(true); setError(""); setPhotoResult(null); setSigResult(null);
    try {
      if (photoFile) {
        const r = await processImg(photoFile, exam.photo.w, exam.photo.h, exam.photo.maxKB, "cover");
        setPhotoResult(r);
      }
      if (sigFile) {
        const r = await processImg(sigFile, exam.sig.w, exam.sig.h, exam.sig.maxKB, "contain");
        setSigResult(r);
      }
    } catch {
      setError("Processing failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const download = (url: string, name: string) => {
    const a = document.createElement("a"); a.href = url; a.download = name; a.click();
  };

  return (
    <div className="tool-content">
      <div className="tool-workspace">
        {/* Exam selector */}
        <div className="card">
          <label className="input-label">Select Your Exam</label>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {EXAM_PRESETS.map((e) => (
              <button
                key={e.id}
                id={`exam-${e.id}`}
                className={`btn ${exam.id === e.id ? "btn-primary" : "btn-secondary"}`}
                style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}
                onClick={() => { setExam(e); setPhotoResult(null); setSigResult(null); }}
              >
                {e.name}
              </button>
            ))}
          </div>

          <div style={{ marginTop: "1.25rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="stat-item" style={{ textAlign: "left" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.5rem", textTransform: "uppercase", fontWeight: 600 }}>Photo Requirements</div>
              <div><span style={{ color: "var(--text-secondary)" }}>Size:</span> <strong>{exam.photo.w}×{exam.photo.h}px</strong></div>
              <div><span style={{ color: "var(--text-secondary)" }}>Max:</span> <strong>&lt;{exam.photo.maxKB}KB</strong></div>
              <div><span style={{ color: "var(--text-secondary)" }}>Format:</span> <strong>JPG</strong></div>
            </div>
            <div className="stat-item" style={{ textAlign: "left" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.5rem", textTransform: "uppercase", fontWeight: 600 }}>Signature Requirements</div>
              <div><span style={{ color: "var(--text-secondary)" }}>Size:</span> <strong>{exam.sig.w}×{exam.sig.h}px</strong></div>
              <div><span style={{ color: "var(--text-secondary)" }}>Max:</span> <strong>&lt;{exam.sig.maxKB}KB</strong></div>
              <div><span style={{ color: "var(--text-secondary)" }}>Format:</span> <strong>JPG</strong></div>
            </div>
          </div>
        </div>

        {/* Upload row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          {/* Photo */}
          <div
            className={`drop-zone`}
            style={{ padding: "1.5rem 1rem" }}
            onClick={() => photoRef.current?.click()}
          >
            <input ref={photoRef} id="ssc-photo-input" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { if (e.target.files?.[0]) { setPhotoFile(e.target.files[0]); setPhotoResult(null); } }} />
            <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem" }}>📷</span>
            <p style={{ fontWeight: 600, fontSize: "0.95rem" }}>Upload Photo</p>
            {photoFile && <p style={{ color: "var(--accent-green)", fontSize: "0.8rem", marginTop: "0.35rem" }}>✓ {photoFile.name}</p>}
            {!photoFile && <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>JPG / PNG</p>}
          </div>

          {/* Signature */}
          <div
            className={`drop-zone`}
            style={{ padding: "1.5rem 1rem" }}
            onClick={() => sigRef.current?.click()}
          >
            <input ref={sigRef} id="ssc-sig-input" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { if (e.target.files?.[0]) { setSigFile(e.target.files[0]); setSigResult(null); } }} />
            <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem" }}>✍️</span>
            <p style={{ fontWeight: 600, fontSize: "0.95rem" }}>Upload Signature</p>
            {sigFile && <p style={{ color: "var(--accent-green)", fontSize: "0.8rem", marginTop: "0.35rem" }}>✓ {sigFile.name}</p>}
            {!sigFile && <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>JPG / PNG</p>}
          </div>
        </div>

        <button id="ssc-process-btn" className="btn btn-primary btn-lg btn-full" onClick={handleProcess} disabled={processing || (!photoFile && !sigFile)}>
          {processing ? <><span className="spinner" style={{ width: 18, height: 18 }} /> Processing...</> : `🏛️ Prepare for ${exam.name}`}
        </button>

        {error && <div className="result-box error"><p style={{ color: "#ef4444" }}>⚠️ {error}</p></div>}

        {(photoResult || sigResult) && (
          <div className="result-box animate-fade-up">
            <h3 style={{ fontWeight: 700, color: "var(--accent-green)", marginBottom: "1.25rem" }}>✅ Documents Ready for {exam.name}!</h3>
            <div style={{ display: "grid", gridTemplateColumns: photoResult && sigResult ? "1fr 1fr" : "1fr", gap: "1.25rem" }}>
              {photoResult && (
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontWeight: 600, marginBottom: "0.75rem" }}>📷 Photo</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photoResult.url} alt="Processed photo" style={{ maxWidth: "100%", height: 120, objectFit: "cover", borderRadius: 8, border: "1px solid var(--border)", background: "white" }} />
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.4rem" }}>{formatBytes(photoResult.blob.size)}</p>
                  <button id="dl-photo-btn" className="btn btn-primary" style={{ marginTop: "0.75rem", width: "100%" }} onClick={() => download(photoResult.url, `photo_${exam.id}.jpg`)}>⬇️ Download Photo</button>
                </div>
              )}
              {sigResult && (
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontWeight: 600, marginBottom: "0.75rem" }}>✍️ Signature</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={sigResult.url} alt="Processed signature" style={{ maxWidth: "100%", height: 60, objectFit: "contain", borderRadius: 8, border: "1px solid var(--border)", background: "white" }} />
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.4rem" }}>{formatBytes(sigResult.blob.size)}</p>
                  <button id="dl-sig-btn" className="btn btn-primary" style={{ marginTop: "0.75rem", width: "100%" }} onClick={() => download(sigResult.url, `signature_${exam.id}.jpg`)}>⬇️ Download Signature</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
