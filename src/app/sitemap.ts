import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://doctools.india"; // replace with your actual domain
  const routes = [
    { url: "/", priority: 1.0 },
    { url: "/compress-image-to-50kb", priority: 0.9 },
    { url: "/passport-photo-resize", priority: 0.9 },
    { url: "/resize-signature-to-20kb", priority: 0.9 },
    { url: "/pdf-compressor", priority: 0.9 },
    { url: "/image-to-pdf", priority: 0.8 },
    { url: "/ssc-document-resize", priority: 0.85 },
  ];

  return routes.map((r) => ({
    url: `${base}${r.url}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));
}
