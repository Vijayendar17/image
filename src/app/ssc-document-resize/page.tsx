import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SscDocClient from "./SscDocClient";

export const metadata: Metadata = {
  title: "SSC UPSC IBPS Document Resize Free – Photo & Signature for Exam Portals",
  description:
    "Resize photo and signature images to exact SSC CGL, UPSC, IBPS, SBI, RRB specifications in one click. Free online tool for competitive exam document preparation in India.",
  keywords: [
    "ssc document resize",
    "upsc photo size requirements",
    "ibps photo signature resize",
    "ssc cgl photo size pixels",
    "competitive exam photo resize india",
    "sbi po photo signature size",
  ],
};

export default function SscDocPage() {
  return (
    <>
      <Navbar />
      <main className="tool-page">
        <div className="tool-hero">
          <div className="tool-hero-inner">
            <span className="badge badge-blue" style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" }}>
              🏛️ Exam Portals
            </span>
            <h1 className="tool-title">SSC / UPSC Document Resize</h1>
            <p className="tool-desc">
              Resize your photo and signature to exact specifications for SSC CGL, UPSC, IBPS PO, SBI Clerk, RRB NTPC, and all major competitive exam portals. One-click, no guesswork.
            </p>
          </div>
        </div>
        <SscDocClient />

        <div className="faq-section">
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.5rem", marginBottom: "1.5rem" }}>
            Exam-wise Photo Specifications
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border-light)" }}>
                  {["Exam", "Photo Size (px)", "Photo File", "Signature Size", "Signature File"].map(h => (
                    <th key={h} style={{ padding: "0.75rem", textAlign: "left", color: "var(--text-secondary)", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["SSC CGL/CHSL", "100×120", "≤50KB JPG", "140×60", "≤12KB JPG"],
                  ["UPSC CSE", "200×230", "≤300KB JPG", "140×60", "≤40KB JPG"],
                  ["IBPS PO/Clerk", "200×230", "≤50KB JPG", "140×60", "≤20KB JPG"],
                  ["SBI PO/Clerk", "200×200", "≤50KB JPG", "140×60", "≤20KB JPG"],
                  ["RRB NTPC", "200×230", "≤50KB JPG", "140×60", "≤20KB JPG"],
                ].map(([exam, ...rest]) => (
                  <tr key={exam} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "0.75rem", fontWeight: 600 }}>{exam}</td>
                    {rest.map((v, i) => (
                      <td key={i} style={{ padding: "0.75rem", color: "var(--text-secondary)" }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
