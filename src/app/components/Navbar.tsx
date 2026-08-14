"use client";
import Link from "next/link";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import { siteConfig } from "../config";

const NAV_LINKS = [
  { href: "/compress-image-to-50kb", label: "Compress Image" },
  { href: "/passport-photo-resize", label: "Passport Photo" },
  { href: "/resize-signature-to-20kb", label: "Signature" },
  { href: "/pdf-compressor", label: "PDF" },
  { href: "/image-to-pdf", label: "Image to PDF" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-inner">
        <Logo onClick={close} />

        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={close}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-desktop-cta">
          <Link href="/compress-image-to-50kb" className="btn btn-primary btn-pill" style={{ padding: "0.6rem 1.5rem", fontSize: "0.9rem" }}>
            Try Free
          </Link>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      <div className={`mobile-overlay ${isOpen ? "mobile-overlay-open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="mobile-overlay-link" onClick={close}>
            {link.label}
          </Link>
        ))}
        <Link href="/compress-image-to-50kb" className="btn btn-primary btn-xl mobile-overlay-cta" onClick={close}>
          Try Free
        </Link>
      </div>
    </nav>
  );
}