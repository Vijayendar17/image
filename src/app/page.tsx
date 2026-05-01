import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { WebsiteSchema } from "./components/SchemaMarkup";

export const metadata: Metadata = {
  title: "DocTools India – Free Image & PDF Tools for Govt Forms | No Signup",
  description:
    "Free tools for Indians: compress images to 50KB, resize passport photos, reduce PDF size for SSC/UPSC uploads. Works instantly in browser. No signup needed.",
};

const tools = [
  {
    href: "/compress-image-to-50kb",
    icon: "🗜️",
    title: "Compress Image to 50KB",
    desc: "Reduce JPG/PNG size instantly. Perfect for government form uploads, admit cards, and online applications.",
    tag: "Most Popular",
    iconBg: "rgba(255,107,53,0.12)",
    accent: "linear-gradient(90deg, #ff6b35, #ff9a5c)",
  },
  {
    href: "/passport-photo-resize",
    icon: "📷",
    title: "Passport Photo Resize",
    desc: "Resize passport photo to 35×45mm or any standard size. Compress under 50KB for VISA, PAN, Aadhaar applications.",
    tag: "Govt Forms",
    iconBg: "rgba(79,142,247,0.12)",
    accent: "linear-gradient(90deg, #4f8ef7, #7eb0ff)",
  },
  {
    href: "/resize-signature-to-20kb",
    icon: "✍️",
    title: "Signature to 20KB",
    desc: "Resize and compress your signature image to under 20KB. Required for SSC, UPSC, bank exams and most job portals.",
    tag: "Exam Portals",
    iconBg: "rgba(168,85,247,0.12)",
    accent: "linear-gradient(90deg, #a855f7, #c084fc)",
  },
  {
    href: "/pdf-compressor",
    icon: "📄",
    title: "Aadhaar PDF Compressor",
    desc: "Compress Aadhaar, marksheets, and certificates below 200KB or 1MB for online portal uploads.",
    tag: "PDF",
    iconBg: "rgba(34,197,94,0.12)",
    accent: "linear-gradient(90deg, #22c55e, #4ade80)",
  },
  {
    href: "/image-to-pdf",
    icon: "🖼️",
    title: "Image to Scanned PDF",
    desc: "Convert JPG/PNG photos to a professional-looking scanned PDF. Great for document submissions.",
    tag: "Convert",
    iconBg: "rgba(234,179,8,0.12)",
    accent: "linear-gradient(90deg, #eab308, #facc15)",
  },
  {
    href: "/ssc-document-resize",
    icon: "🏛️",
    title: "SSC / UPSC Document Resize",
    desc: "Resize photos and signatures to exact SSC, UPSC, IBPS, SBI specifications in one click.",
    tag: "Competitive Exams",
    iconBg: "rgba(239,68,68,0.12)",
    accent: "linear-gradient(90deg, #ef4444, #f87171)",
  },
];

const stats = [
  { value: "100%", label: "Free Forever" },
  { value: "0", label: "Signups Required" },
  { value: "In Browser", label: "Privacy-First" },
  { value: "🇮🇳", label: "Made for India" },
];

export default function HomePage() {
  return (
    <>
      <WebsiteSchema />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="hero">
          <div className="container">
            <p className="hero-eyebrow">🇮🇳 Designed for Indian Government Portals</p>
            <h1 className="hero-title">
              Free Tools to Prepare
              <br />
              <span>Docs for Govt Uploads</span>
            </h1>
            <p className="hero-subtitle">
              Compress images to 50KB, resize passport photos, reduce PDF size — everything you need for SSC, UPSC, bank exam, and job application portals. Works instantly. No signup.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/compress-image-to-50kb" className="btn btn-primary btn-lg">
                🗜️ Compress Image to 50KB
              </Link>
              <Link href="/passport-photo-resize" className="btn btn-secondary btn-lg">
                📷 Resize Passport Photo
              </Link>
            </div>

            {/* Trust bar */}
            <div className="trust-bar">
              {stats.map((s) => (
                <div key={s.label} className="trust-item">
                  <span className="icon">✓</span>
                  <strong style={{ color: "var(--text-primary)" }}>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section style={{ padding: "3rem 0" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "0.75rem" }}>
              <span className="badge badge-orange">All Tools</span>
            </div>
            <h2 className="section-title" style={{ textAlign: "center" }}>
              Pick Your Tool
            </h2>
            <p style={{ textAlign: "center", color: "var(--text-secondary)", marginTop: "0.75rem", marginBottom: "2rem" }}>
              All tools run entirely in your browser. Your files never leave your device.
            </p>
            <div className="tools-grid">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="tool-card"
                  style={{ "--card-accent": tool.accent } as React.CSSProperties}
                >
                  <div className="tool-card-icon" style={{ background: tool.iconBg }}>
                    {tool.icon}
                  </div>
                  <h3 className="tool-card-title">{tool.title}</h3>
                  <p className="tool-card-desc">{tool.desc}</p>
                  <span className="tool-card-tag">{tool.tag}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="how-it-works">
          <div className="container">
            <div style={{ textAlign: "center" }}>
              <span className="badge badge-blue">Simple Process</span>
              <h2 className="section-title" style={{ textAlign: "center", marginTop: "0.75rem" }}>
                Ready in 3 Steps
              </h2>
            </div>
            <div className="steps-grid">
              {[
                { n: "1", title: "Upload Your File", desc: "Drag & drop or click to select your image or PDF. Supports JPG, PNG, PDF." },
                { n: "2", title: "Set Your Target", desc: "Choose your target size (50KB, 20KB) or select a preset for your exam portal." },
                { n: "3", title: "Download Instantly", desc: "Click compress and download your optimized file. No watermarks, no email required." },
              ].map((step) => (
                <div key={step.n} className="step-item">
                  <div className="step-number">{step.n}</div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why choose us */}
        <section style={{ padding: "4rem 0", borderTop: "1px solid var(--border)" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <span className="badge badge-green">Why DocTools?</span>
              <h2 className="section-title" style={{ textAlign: "center", marginTop: "0.75rem" }}>
                Built for Indian Job Seekers
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.25rem" }}>
              {[
                { icon: "🔒", title: "100% Private", desc: "Your files never leave your browser. We run everything client-side — zero server uploads." },
                { icon: "⚡", title: "Blazing Fast", desc: "No queues, no wait time. Compression happens instantly using browser-native APIs." },
                { icon: "📐", title: "Exam-Ready Presets", desc: "Pre-configured for SSC, UPSC, IBPS, SBI PO, and other major competitive exam portals." },
                { icon: "💸", title: "Completely Free", desc: "No hidden charges, no premium tier. Every tool is free, forever." },
              ].map((f) => (
                <div key={f.title} className="card">
                  <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{f.icon}</div>
                  <h3 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>{f.title}</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: "1.7" }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "4rem 0", textAlign: "center" }}>
          <div className="container">
            <div style={{
              background: "linear-gradient(135deg, rgba(79,142,247,0.08), rgba(255,107,53,0.06))",
              border: "1px solid var(--border-light)",
              borderRadius: "24px",
              padding: "3rem 2rem",
            }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "2rem", fontWeight: 800, marginBottom: "1rem" }}>
                Ready to compress your document?
              </h2>
              <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
                Pick a tool and get your file ready in under 30 seconds. No account needed.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/compress-image-to-50kb" className="btn btn-primary btn-lg">Start Compressing →</Link>
                <Link href="/passport-photo-resize" className="btn btn-secondary btn-lg">Resize Passport Photo</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
