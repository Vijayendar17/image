import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ToolHero from "../components/ToolHero";
import Reveal from "../components/Reveal";
import { BreadcrumbSchema } from "../components/SchemaMarkup";
import { siteConfig } from "../config";
import { posts, formatDate } from "../blog-data";

export const metadata: Metadata = {
  title: "Blog - Guides, Tips & How-To Articles | LiteFiles",
  description:
    "Read practical guides and how-to articles about image compression, PDF tools, passport photo sizing, and more.",
  alternates: { canonical: `${siteConfig.baseUrl}/blog` },
};

export default function BlogIndex() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: siteConfig.baseUrl },
        { name: "Blog", url: `${siteConfig.baseUrl}/blog` },
      ]} />
      <Navbar />
      <main className="tool-page light-page">
        <ToolHero
          crumb="Blog"
          badge={<span className="badge badge-orange">📝 Blog</span>}
          title="Articles, Guides & How-Tos"
          desc="Practical tips for compressing images, sizing documents for government portals, and managing files — all free, all in your browser."
        />

        <div className="container" style={{ paddingTop: "4rem" }}>
          <div className="blog-grid">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 100}>
                <Link href={`/blog/${post.slug}`} className="blog-card">
                  <span className="blog-card-cat">{post.category}</span>
                  <h2 className="blog-card-title">{post.title}</h2>
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
      </main>
      <Footer />
    </>
  );
}