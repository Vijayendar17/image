import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import CountUp from "./components/CountUp";
import { WebsiteSchema } from "./components/SchemaMarkup";
import { tools } from "./tools-data";
import { posts, formatDate } from "./blog-data";

export const metadata: Metadata = {
  title: "LiteFiles | Free Image & PDF Tools Online",
  description:
    "LiteFiles offers free online tools for image compression, PDF conversion, resizing, and document utilities.",
};

const stats = [
  { end: 10000, suffix: "+", label: "Files Compressed" },
  { end: 100, suffix: "%", label: "Free Forever" },
  { end: 6, suffix: "+", label: "Tools Available" },
  { end: 0, suffix: "", label: "Signup Required" },
];

const steps = [
  {
    title: "Upload",
    desc: "Drop your image or PDF into the tool. No registration, nothing to install.",
  },
  {
    title: "Set Size",
    desc: "Choose your target file size in KB or pick a ready preset for your portal.",
  },
  {
    title: "Download",
    desc: "Get your compressed file instantly. All processing stays in your browser.",
  },
];

export default function HomePage() {
  return (
    <>
      <WebsiteSchema />
      <Navbar />
      <main>
        {/* ===== Hero ===== */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <span className="hero-badge">Free Tools for Indian Students &amp; Professionals</span>
              <h1 className="hero-title">
                Compress, Resize &amp; <span className="hero-accent">Convert</span> Files Instantly
              </h1>
              <p className="hero-subtitle">
                Free online tools for UPSC, SSC, IBPS and government portal uploads. No signup required.
              </p>
              <div className="hero-ctas">
                <Link href="/compress-image-to-50kb" className="btn btn-primary btn-xl">
                  Compress Image Now
                </Link>
                <Link href="#tools" className="btn btn-outline btn-xl">
                  View All Tools
                </Link>
              </div>
              <div className="hero-trust">
                <span><i>✓</i>100% Free</span>
                <span><i>✓</i>No Signup</span>
                <span><i>✓</i>Works on Mobile</span>
                <span><i>✓</i>Instant Download</span>
              </div>
            </div>

            {/* Hero visual — mockup of the compress tool */}
            <div className="hero-visual">
              <div className="hero-visual-glow" />
              <div className="mock-window">
                <div className="mock-chrome">
                  <span className="mock-dot" />
                  <span className="mock-dot" />
                  <span className="mock-dot" />
                  <span className="mock-chrome-url">litefiles.com/compress-image-to-50kb</span>
                </div>
                <div className="mock-body">
                  <div className="mock-upload">
                    <span className="mock-upload-icon">🖼️</span>
                    <p className="mock-upload-text">Drop your image here</p>
                    <span className="mock-upload-sub">JPG, PNG · up to 20MB · stays in your browser</span>
                  </div>
                  <div className="mock-settings">
                    <div className="mock-preset-row">
                      <span className="mock-preset">20 KB</span>
                      <span className="mock-preset mock-preset-active">50 KB</span>
                      <span className="mock-preset">100 KB</span>
                    </div>
                    <div>
                      <div className="mock-progress">
                        <div className="mock-progress-fill" />
                      </div>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.35rem" }}>
                        Compressing… 72%
                      </p>
                    </div>
                    <div className="mock-result-row">
                      <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>2.4 MB → 49 KB</span>
                      <span className="mock-result-size">✓ Done</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Tools ===== */}
        <section id="tools" className="tools-section section">
          <div className="container">
            <Reveal>
              <div className="tools-header">
                <span className="section-label">Our Tools</span>
                <h2 className="section-title">Everything You Need</h2>
                <p className="section-sub">Professional tools for documents, images and PDFs</p>
              </div>
            </Reveal>

            <div className="tools-grid">
              {tools.map((tool, i) => (
                <Reveal key={tool.href} delay={i * 80}>
                  <Link href={tool.href} className="tool-card">
                    <span className="tool-card-icon">{tool.icon}</span>
                    <h3 className="tool-card-title">{tool.title}</h3>
                    <p className="tool-card-desc">{tool.desc}</p>
                    <span className="tool-card-link">
                      Use Tool
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Stats / Trust ===== */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 100}>
                  <div className="stat-cell">
                    <div className="stat-number">
                      <CountUp end={s.end} suffix={s.suffix} />
                    </div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== How it works ===== */}
        <section className="how-section section">
          <div className="container">
            <Reveal>
              <div className="tools-header">
                <span className="section-label">How It Works</span>
                <h2 className="section-title">Ready in 3 Simple Steps</h2>
                <p className="section-sub">No downloads, no account, no waiting. Just results.</p>
              </div>
            </Reveal>

            <div className="steps-grid">
              {steps.map((step, i) => (
                <Reveal key={step.title} delay={i * 120}>
                  <div className="step-item">
                    <div className="step-number">{i + 1}</div>
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-desc">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Blog ===== */}
        <section className="blog-section section">
          <div className="container">
            <Reveal>
              <div className="tools-header">
                <span className="section-label">From the Blog</span>
                <h2 className="section-title">Guides &amp; How-Tos</h2>
                <p className="section-sub">Practical tips for compressing files and acing your online submissions.</p>
              </div>
            </Reveal>

            <div className="blog-grid">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={i * 100}>
                  <Link href={`/blog/${post.slug}`} className="blog-card">
                    <span className="blog-card-cat">{post.category}</span>
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-excerpt">{post.description}</p>
                    <span className="blog-card-meta">{formatDate(post.date)} · {post.readTime}</span>
                    <span className="blog-card-more">
                      Read More
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="cta-section section">
          <div className="container">
            <Reveal>
              <div className="cta-box">
                <span className="section-label">Get Started</span>
                <h2 className="section-title">Ready to Compress Your Document?</h2>
                <p className="section-sub">
                  Pick a tool and get your file ready in under 30 seconds. No account needed.
                </p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href="/compress-image-to-50kb" className="btn btn-primary btn-xl">
                    Start Compressing
                  </Link>
                  <Link href="/passport-photo-resize" className="btn btn-outline btn-xl">
                    Resize Passport Photo
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}