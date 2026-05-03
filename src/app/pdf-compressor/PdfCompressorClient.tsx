"use client";
import { useState, useRef, useCallback } from "react";

// For real PDF compression we use PDF.js to render pages as images, then rebuild as PDF
// This is a pure browser approach — no server needed

function formatBytes(b: number) {
  if (!b) return "—";
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 / 1024).toFixed(2)} MB`;
}

const PRESETS = [
  { label: "200 KB", kb: 200 },
  { label: "500 KB", kb: 500 },
  { label: "1 MB", kb: 1000 },
  { label: "2 MB", kb: 2000 },
];

// Minimal type for the dynamically loaded PDF.js library
interface PdfJsLib {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (src: { data: ArrayBuffer }) => { promise: Promise<PdfDocument> };
}
interface PdfDocument {
  numPages: number;
  getPage: (n: number) => Promise<PdfPage>;
}
interface PdfPage {
  getViewport: (opts: { scale: number }) => { width: number; height: number };
  render: (opts: { canvasContext: CanvasRenderingContext2D; viewport: { width: number; height: number } }) => { promise: Promise<void> };
}

declare global {
  interface Window { pdfjsLib?: PdfJsLib }
}

// Load PDF.js from CDN dynamically
async function getPdfJs(): Promise<PdfJsLib> {
  if (window.pdfjsLib) return window.pdfjsLib;
  return new Promise<PdfJsLib>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = () => {
      const lib = window.pdfjsLib!;
      lib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      resolve(lib);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function compressPdf(
  file: File,
  targetKB: number,
  onProgress: (p: number) => void
): Promise<Blob> {
  const pdfjsLib = await getPdfJs();
  const ab = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: ab }).promise;
  const numPages = pdf.numPages;

  // Determine scale based on target size
  const perPageKB = targetKB / numPages;
  const scale = perPageKB > 200 ? 1.5 
              : perPageKB > 100 ? 1.2 
              : perPageKB > 50 ? 1.0 
              : perPageKB > 20 ? 0.8 
              : 0.6;

  const targetPageBytes = (targetKB * 1024 * 0.9) / numPages; // 10% reserved for PDF overhead
  const jpegs: Uint8Array[] = [];
  const dims: { w: number; h: number }[] = [];

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d")!;
    await page.render({ canvasContext: ctx, viewport }).promise;

    // Binary search for the right JPEG quality to hit the target size
    let low = 0.05;
    let high = 0.95;
    let bestBlob: Blob | null = null;
    let bestQuality = 0.7; // default start

    for (let attempt = 0; attempt < 6; attempt++) {
      const mid = (low + high) / 2;
      const blob: Blob = await new Promise((r) => canvas.toBlob((b) => r(b!), "image/jpeg", mid));
      
      if (blob.size <= targetPageBytes) {
        bestBlob = blob;
        low = mid; // We can afford higher quality
        bestQuality = mid;
      } else {
        high = mid; // Size too big, need lower quality
      }
    }

    // Fallback if even the lowest quality in our loop was too big
    if (!bestBlob) {
      bestBlob = await new Promise((r) => canvas.toBlob((b) => r(b!), "image/jpeg", 0.05));
    }

    const buf = await bestBlob!.arrayBuffer();
    jpegs.push(new Uint8Array(buf));
    dims.push({ w: Math.round(viewport.width), h: Math.round(viewport.height) });
    onProgress(Math.round((i / numPages) * 80));
  }

  // Build PDF
  const enc = new TextEncoder();
  const parts: Uint8Array[] = [];
  let pos = 0;
  const write = (s: string) => { const b = enc.encode(s); parts.push(b); pos += b.length; };
  const writeBin = (b: Uint8Array) => { parts.push(b); pos += b.length; };

  write("%PDF-1.4\n");
  const objOffsets: number[] = [];

  objOffsets[1] = pos;
  write("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");

  objOffsets[2] = pos;
  const kids = jpegs.map((_, i) => `${3 + i * 2} 0 R`).join(" ");
  write(`2 0 obj\n<< /Type /Pages /Count ${jpegs.length} /Kids [${kids}] >>\nendobj\n`);

  for (let i = 0; i < jpegs.length; i++) {
    const pageIdx = 3 + i * 2;
    const imgIdx = 4 + i * 2;
    const w = dims[i].w, h = dims[i].h;

    objOffsets[pageIdx] = pos;
    const stream = `q ${w} 0 0 ${h} 0 0 cm /Im${i} Do Q\n`;
    write(`${pageIdx} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${w} ${h}] `);
    write(`/Resources << /XObject << /Im${i} ${imgIdx} 0 R >> >> `);
    write(`/Contents << /Length ${stream.length} >> >>\n`);
    write(`stream\n${stream}endstream\nendobj\n`);

    objOffsets[imgIdx] = pos;
    write(`${imgIdx} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${w} /Height ${h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegs[i].length} >>\nstream\n`);
    writeBin(jpegs[i]);
    write("\nendstream\nendobj\n");
  }

  const xrefOffset = pos;
  const total = 3 + jpegs.length * 2;
  write(`xref\n0 ${total}\n0000000000 65535 f \n`);
  for (let i = 1; i < total; i++) {
    write(`${String(objOffsets[i] || 0).padStart(10, "0")} 00000 n \n`);
  }
  write(`trailer\n<< /Size ${total} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);

  onProgress(100);

  const merged = new Uint8Array(parts.reduce((a, b) => a + b.length, 0));
  let off = 0;
  for (const p of parts) { merged.set(p, off); off += p.length; }
  return new Blob([merged], { type: "application/pdf" });
}

export default function PdfCompressorClient() {
  const [file, setFile] = useState<File | null>(null);
  const [targetKB, setTargetKB] = useState(500);
  const [customKB, setCustomKB] = useState("");
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ blob: Blob; url: string } | null>(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    if (f.type !== "application/pdf") { setError("Please upload a PDF file."); return; }
    setFile(f); setError(""); setResult(null); setProgress(0);
  }, []);

  const handleCompress = async () => {
    if (!file) return;
    const target = customKB ? parseInt(customKB) : targetKB;
    setProcessing(true); setError(""); setResult(null); setProgress(0);
    try {
      const blob = await compressPdf(file, target, setProgress);
      const url = URL.createObjectURL(blob);
      setResult({ blob, url });
    } catch (e) {
      setError("PDF compression failed. The PDF may be password-protected or corrupted.");
      console.error(e);
    } finally {
      setProcessing(false);
    }
  };

  const savings = result && file ? Math.round((1 - result.blob.size / file.size) * 100) : 0;

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
          <input ref={inputRef} id="pdf-input" type="file" accept="application/pdf" style={{ display: "none" }} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
          <span className="drop-icon">📄</span>
          {file ? (
            <div>
              <p style={{ fontWeight: 600 }}>{file.name}</p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>{formatBytes(file.size)} · Click to change</p>
            </div>
          ) : (
            <div>
              <p style={{ fontWeight: 600, fontSize: "1.05rem" }}>Upload your PDF file</p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.4rem" }}>Aadhaar, marksheet, certificate, any PDF</p>
            </div>
          )}
        </div>

        {file && (
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label className="input-label">Target Size — Quick Presets</label>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {PRESETS.map((p) => (
                  <button
                    key={p.kb}
                    id={`pdf-preset-${p.kb}`}
                    className={`btn ${targetKB === p.kb && !customKB ? "btn-green" : "btn-secondary"}`}
                    style={{ padding: "0.4rem 0.9rem", fontSize: "0.85rem", ...(targetKB === p.kb && !customKB ? { background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "white" } : {}) }}
                    onClick={() => { setTargetKB(p.kb); setCustomKB(""); }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="input-label" htmlFor="pdf-custom-kb">Custom Target (KB)</label>
              <input id="pdf-custom-kb" type="number" className="input-field" style={{ maxWidth: 200 }} placeholder="e.g. 300" value={customKB} onChange={(e) => setCustomKB(e.target.value)} />
            </div>

            {processing && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.85rem" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Compressing PDF...</span>
                  <span style={{ color: "var(--accent-blue)" }}>{progress}%</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>Rendering pages — this may take a moment for large PDFs</p>
              </div>
            )}

            <button id="compress-pdf-btn" className="btn btn-primary btn-lg" onClick={handleCompress} disabled={processing}>
              {processing ? "Processing..." : "📄 Compress PDF"}
            </button>
          </div>
        )}

        {error && <div className="result-box error"><p style={{ color: "#ef4444" }}>⚠️ {error}</p></div>}

        {result && file && (
          <div className="result-box animate-fade-up">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <h3 style={{ fontWeight: 700, color: "var(--accent-green)" }}>✅ PDF Compressed! Saved {savings}%</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Ready to upload to any portal</p>
              </div>
              <button id="download-pdf-comp-btn" className="btn btn-primary" onClick={() => {
                const a = document.createElement("a"); a.href = result.url; a.download = `compressed_${file.name}`; a.click();
              }}>⬇️ Download PDF</button>
            </div>
            <div className="stats-row">
              <div className="stat-item"><div className="stat-value" style={{ color: "var(--text-muted)", textDecoration: "line-through", fontSize: "1rem" }}>{formatBytes(file.size)}</div><div className="stat-label">Original</div></div>
              <div className="stat-item"><div className="stat-value" style={{ color: "var(--accent-green)" }}>{formatBytes(result.blob.size)}</div><div className="stat-label">Compressed</div></div>
              <div className="stat-item"><div className="stat-value" style={{ color: "var(--accent-orange)" }}>{savings}%</div><div className="stat-label">Saved</div></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
