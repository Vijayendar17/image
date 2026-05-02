"use client";
import { useState, useRef, useCallback } from "react";

interface PageItem { file: File; url: string; id: number }

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 / 1024).toFixed(2)} MB`;
}

// Minimal pure-JS PDF writer (no external library needed for basic image PDFs)
async function imagesToPdf(
  pages: PageItem[],
  pageSize: "A4" | "Letter" | "Original",
  addScanEffect: boolean
): Promise<Blob> {
  // A4: 595×842 pt, Letter: 612×792 pt
  const [pageW, pageH] = pageSize === "A4" ? [595, 842] : pageSize === "Letter" ? [612, 792] : [0, 0];

  const loadImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((res, rej) => {
      const img = new Image();
      img.onload = () => res(img);
      img.onerror = rej;
      img.src = url;
    });

  // Build JPEG bytes for each image
  const jpegs: Uint8Array[] = [];
  const dims: { w: number; h: number }[] = [];

  for (const page of pages) {
    const img = await loadImage(page.url);
    const canvas = document.createElement("canvas");
    let w = img.width, h = img.height;

    if (pageSize !== "Original") {
      // Scale to fit page (in pixels at 72dpi → 1pt = 1px)
      const scale = Math.min(pageW / w, pageH / h);
      w = Math.round(w * scale);
      h = Math.round(h * scale);
    }

    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#f5f2ee";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);

    if (addScanEffect) {
      // Subtle grain overlay
      const imageData = ctx.getImageData(0, 0, w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 8;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
      }
      ctx.putImageData(imageData, 0, 0);
    }

    const blob: Blob = await new Promise((r) => canvas.toBlob((b) => r(b!), "image/jpeg", 0.92));
    const ab = await blob.arrayBuffer();
    jpegs.push(new Uint8Array(ab));
    dims.push({ w, h });
  }

  // Write PDF manually
  const enc = new TextEncoder();
  const parts: Uint8Array[] = [];
  let pos = 0;

  const write = (s: string) => {
    const b = enc.encode(s);
    parts.push(b);
    pos += b.length;
  };
  const writeBin = (b: Uint8Array) => {
    parts.push(b);
    pos += b.length;
  };

  write("%PDF-1.4\n");

  const objOffsets: number[] = [];

  // Object 1: Catalog
  objOffsets[1] = pos;
  write("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");

  // Object 2: Pages (placeholder, will set count)
  objOffsets[2] = pos;
  const kids = pages.map((_, i) => `${3 + i * 2} 0 R`).join(" ");
  write(`2 0 obj\n<< /Type /Pages /Count ${pages.length} /Kids [${kids}] >>\nendobj\n`);

  // For each page: Page obj + Image XObject
  for (let i = 0; i < pages.length; i++) {
    const pageObjIdx = 3 + i * 2;
    const imgObjIdx = 4 + i * 2;
    const w = dims[i].w;
    const h = dims[i].h;
    const pw = pageSize === "Original" ? w : pageW;
    const ph = pageSize === "Original" ? h : pageH;
    const ix = Math.round((pw - w) / 2);
    const iy = Math.round((ph - h) / 2);

    objOffsets[pageObjIdx] = pos;
    write(`${pageObjIdx} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pw} ${ph}] `);
    write(`/Resources << /XObject << /Im${i} ${imgObjIdx} 0 R >> >> `);
    const streamContent = `q ${w} 0 0 ${h} ${ix} ${iy} cm /Im${i} Do Q\n`;
    write(`/Contents << /Length ${streamContent.length} >> >> `);
    write(`\nstream\n${streamContent}endstream\nendobj\n`);

    objOffsets[imgObjIdx] = pos;
    write(`${imgObjIdx} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${w} /Height ${h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegs[i].length} >>\nstream\n`);
    writeBin(jpegs[i]);
    write("\nendstream\nendobj\n");
  }

  // xref
  const xrefOffset = pos;
  const totalObjs = 3 + pages.length * 2;
  write(`xref\n0 ${totalObjs}\n`);
  write("0000000000 65535 f \n");
  for (let i = 1; i < totalObjs; i++) {
    write(`${String(objOffsets[i] || 0).padStart(10, "0")} 00000 n \n`);
  }
  write(`trailer\n<< /Size ${totalObjs} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);

  const merged = new Uint8Array(parts.reduce((a, b) => a + b.length, 0));
  let offset = 0;
  for (const p of parts) { merged.set(p, offset); offset += p.length; }
  return new Blob([merged], { type: "application/pdf" });
}

let idCounter = 0;

export default function ImageToPdfClient() {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [pageSize, setPageSize] = useState<"A4" | "Letter" | "Original">("A4");
  const [scanEffect, setScanEffect] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((files: FileList | File[]) => {
    const newPages: PageItem[] = [];
    Array.from(files).forEach((f) => {
      if (!f.type.startsWith("image/")) return;
      newPages.push({ file: f, url: URL.createObjectURL(f), id: ++idCounter });
    });
    setPages((prev) => [...prev, ...newPages]);
    setPdfUrl(null);
  }, []);

  const removePage = (id: number) => {
    setPages((prev) => prev.filter((p) => p.id !== id));
    setPdfUrl(null);
  };

  const handleGenerate = async () => {
    if (pages.length === 0) return;
    setGenerating(true);
    setError("");
    try {
      const blob = await imagesToPdf(pages, pageSize, scanEffect);
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setPdfBlob(blob);
    } catch (e) {
      setError("PDF generation failed. Please try again.");
      console.error(e);
    } finally {
      setGenerating(false);
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
          onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
          onClick={() => inputRef.current?.click()}
        >
          <input ref={inputRef} id="pdf-img-input" type="file" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => e.target.files && addFiles(e.target.files)} />
          <span className="drop-icon">🖼️</span>
          <p style={{ fontWeight: 600, fontSize: "1.05rem" }}>Add images for PDF</p>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.4rem" }}>
            JPG, PNG · Multiple images supported · Click or drag & drop
          </p>
        </div>

        {/* Page list */}
        {pages.length > 0 && (
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontWeight: 700 }}>Pages ({pages.length})</h3>
              <button className="btn btn-secondary" style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }} onClick={() => { setPages([]); setPdfUrl(null); }}>Clear All</button>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {pages.map((p, i) => (
                <div key={p.id} style={{ position: "relative", border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden", width: 80 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.url} alt={`Page ${i + 1}`} style={{ width: 80, height: 80, objectFit: "cover", display: "block" }} />
                  <div style={{ background: "rgba(0,0,0,0.7)", color: "white", textAlign: "center", fontSize: "0.7rem", padding: "2px 0" }}>Page {i + 1}</div>
                  <button onClick={() => removePage(p.id)} style={{ position: "absolute", top: 2, right: 2, background: "rgba(239,68,68,0.9)", border: "none", borderRadius: "50%", width: 18, height: 18, color: "white", cursor: "pointer", fontSize: "0.65rem", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                </div>
              ))}
              <div
                style={{ width: 80, height: 80, border: "2px dashed var(--border-light)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-muted)", fontSize: "1.5rem" }}
                onClick={() => inputRef.current?.click()}
              >+</div>
            </div>
          </div>
        )}

        {/* Settings */}
        {pages.length > 0 && (
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label className="input-label" htmlFor="page-size">Page Size</label>
              <select id="page-size" className="input-field" style={{ maxWidth: 200 }} value={pageSize} onChange={(e) => setPageSize(e.target.value as typeof pageSize)}>
                <option value="A4">A4 (International)</option>
                <option value="Letter">Letter (US)</option>
                <option value="Original">Original Image Size</option>
              </select>
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer", userSelect: "none" }}>
              <input type="checkbox" checked={scanEffect} onChange={(e) => setScanEffect(e.target.checked)} id="scan-effect" style={{ width: 18, height: 18, accentColor: "var(--accent-blue)" }} />
              <span>
                <span style={{ fontWeight: 600 }}>Add Scan Effect</span>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginLeft: "0.5rem" }}>Makes the PDF look like a real scan</span>
              </span>
            </label>

            <button id="generate-pdf-btn" className="btn btn-primary btn-lg" onClick={handleGenerate} disabled={generating}>
              {generating ? <><span className="spinner" style={{ width: 18, height: 18 }} /> Generating PDF...</> : "📄 Convert to PDF"}
            </button>
          </div>
        )}

        {error && <div className="result-box error"><p style={{ color: "#ef4444" }}>⚠️ {error}</p></div>}

        {pdfBlob && pdfUrl && (
          <div className="result-box animate-fade-up">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h3 style={{ fontWeight: 700, color: "var(--accent-green)" }}>✅ PDF Created! ({pages.length} page{pages.length !== 1 ? "s" : ""})</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Size: {formatBytes(pdfBlob.size)}</p>
              </div>
              <button id="download-pdf-btn" className="btn btn-primary" onClick={() => {
                const a = document.createElement("a"); a.href = pdfUrl; a.download = "converted_document.pdf"; a.click();
              }}>⬇️ Download PDF</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
