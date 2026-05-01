import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <Link href="/" className="nav-logo" style={{ fontSize: "1.1rem" }}>
              ⚡ DocTools India
            </Link>
            <p className="footer-brand-desc">
              Free, fast, and private document tools built for Indians. No signup, no uploads to servers. All processing happens in your browser.
            </p>
          </div>
          <div>
            <p className="footer-heading">Image Tools</p>
            <ul className="footer-links">
              <li><Link href="/compress-image-to-50kb">Compress to 50KB</Link></li>
              <li><Link href="/passport-photo-resize">Passport Photo Resize</Link></li>
              <li><Link href="/resize-signature-to-20kb">Signature to 20KB</Link></li>
              <li><Link href="/image-to-pdf">Image to PDF</Link></li>
            </ul>
          </div>
          <div>
            <p className="footer-heading">PDF Tools</p>
            <ul className="footer-links">
              <li><Link href="/pdf-compressor">Aadhaar PDF Compressor</Link></li>
              <li><Link href="/pdf-compressor">Merge PDF under 2MB</Link></li>
            </ul>
            <p className="footer-heading" style={{ marginTop: "1.5rem" }}>Exam Tools</p>
            <ul className="footer-links">
              <li><Link href="/ssc-document-resize">SSC/UPSC Document Resize</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} DocTools India. All processing happens in your browser. We never store your files.
          </p>
          <p className="footer-copy" style={{ color: "var(--text-muted)" }}>
            🇮🇳 Made for India
          </p>
        </div>
      </div>
    </footer>
  );
}
