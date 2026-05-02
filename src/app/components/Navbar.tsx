"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo" onClick={() => setIsOpen(false)}>
          ⚡ DocTools India
        </Link>
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          <li>
            <Link href="/compress-image-to-50kb" onClick={() => setIsOpen(false)}>Compress Image</Link>
          </li>
          <li>
            <Link href="/passport-photo-resize" onClick={() => setIsOpen(false)}>Passport Photo</Link>
          </li>
          <li>
            <Link href="/resize-signature-to-20kb" onClick={() => setIsOpen(false)}>Signature</Link>
          </li>
          <li>
            <Link href="/pdf-compressor" onClick={() => setIsOpen(false)}>PDF Compressor</Link>
          </li>
          <li>
            <Link href="/image-to-pdf" onClick={() => setIsOpen(false)}>Image to PDF</Link>
          </li>
          <li className="nav-cta">
            <Link href="/compress-image-to-50kb" className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }} onClick={() => setIsOpen(false)}>
              Try Free →
            </Link>
          </li>
        </ul>
        <div className="nav-cta-desktop">
          <Link href="/compress-image-to-50kb" className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
            Try Free →
          </Link>
        </div>
      </div>
    </nav>
  );
}
