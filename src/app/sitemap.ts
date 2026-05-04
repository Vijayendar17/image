import { MetadataRoute } from "next";
import { siteConfig } from "./config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.baseUrl;
  const routes = [
    { url: "/", priority: 1.0, changeFreq: "weekly" as const },
    { url: "/compress-image-to-50kb", priority: 0.9, changeFreq: "monthly" as const },
    { url: "/passport-photo-resize", priority: 0.9, changeFreq: "monthly" as const },
    { url: "/resize-signature-to-20kb", priority: 0.9, changeFreq: "monthly" as const },
    { url: "/pdf-compressor", priority: 0.9, changeFreq: "monthly" as const },
    { url: "/image-to-pdf", priority: 0.8, changeFreq: "monthly" as const },
    { url: "/ssc-document-resize", priority: 0.85, changeFreq: "monthly" as const },
  ];

  return routes.map((r) => ({
    url: `${base}${r.url}`,
    lastModified: new Date(),
    changeFrequency: r.changeFreq,
    priority: r.priority,
    
  }));
}
