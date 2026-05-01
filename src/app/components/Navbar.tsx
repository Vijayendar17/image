"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          ⚡ DocTools India
        </Link>
        <ul className="nav-links">
          <li>
            <Link href="/compress-image-to-50kb">Compress Image</Link>
          </li>
          <li>
            <Link href="/passport-photo-resize">Passport Photo</Link>
          </li>
          <li>
            <Link href="/resize-signature-to-20kb">Signature</Link>
          </li>
          <li>
            <Link href="/pdf-compressor">PDF Compressor</Link>
          </li>
          <li>
            <Link href="/image-to-pdf">Image to PDF</Link>
          </li>
        </ul>
        <Link href="/compress-image-to-50kb" className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
          Try Free →
        </Link>
      </div>
    </nav>
  );
}
