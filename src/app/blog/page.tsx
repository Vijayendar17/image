import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BreadcrumbSchema } from "../components/SchemaMarkup";
import { siteConfig } from "../config";

export const metadata: Metadata = {
  title: "Blog - Guides, Tips & How-To Articles | LiteFiles",
  description:
    "Read practical guides and how-to articles about image compression, PDF tools, passport photo sizing, and more.",
  alternates: { canonical: `${siteConfig.baseUrl}/blog` },
};

const posts = [
  {
    slug: "how-much-can-you-save-by-using-your-own-cloud-infrastructure",
    title: "Your Browser Is the Server: How LiteFiles Stays Free and Private",
    description:
      "LiteFiles compresses images and PDFs entirely in your browser — nothing is uploaded. Here's what that saves, and how it keeps your documents private.",
    date: "2026-08-02",
    category: "Technology",
    readTime: "6 min read",
  },
  {
    slug: "how-to-compress-image-to-50kb-for-upsc-ssc-and-government-portal-uploads",
    title: "How to Compress Image to 50KB for UPSC, SSC and Government Portal Uploads (2026 Guide)",
    description:
      "Learn the exact steps to compress your passport size photo to 50KB and signature to 20KB for Indian government exams.",
    date: "2026-06-09",
    category: "Guides",
    readTime: "5 min read",
  },
];

export default function BlogIndex() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: siteConfig.baseUrl },
        { name: "Blog", url: `${siteConfig.baseUrl}/blog` },
      ]} />
      <Navbar />
      <main className="tool-page">
        <div className="tool-hero" style={{ padding: '4rem 0 2rem' }}>
          <div className="tool-hero-inner">
            <span className="badge badge-orange">Blog</span>
            <h1 className="tool-title" style={{ textAlign: 'center', marginBottom: '1rem', fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
              Articles, Guides & How-Tos
            </h1>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
              Practical tips for compressing images, sizing documents for government portals, and managing files — all free, all in your browser.
            </p>
          </div>
        </div>

        <div className="seo-section blog-article" style={{ marginTop: '2rem' }}>
          <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border)', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem', transition: 'border-color 0.2s' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span className="badge badge-orange">{post.category}</span>
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 style={{ fontSize: '1.25rem', margin: 0, lineHeight: 1.4 }}>{post.title}</h2>
                  <p style={{ margin: 0, color: 'var(--text-muted)', flex: 1 }}>{post.description}</p>
                  <span style={{ color: 'var(--accent-blue)', fontSize: '0.9rem' }}>Read more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
