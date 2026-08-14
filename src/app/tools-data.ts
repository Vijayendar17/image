export interface Tool {
  href: string;
  icon: string;
  title: string;
  shortTitle: string;
  desc: string;
  tag: string;
}

export const tools: Tool[] = [
  {
    href: "/compress-image-to-50kb",
    icon: "🗜️",
    title: "Compress Image to 50KB",
    shortTitle: "Compress Image to 50KB",
    desc: "Reduce JPG/PNG size instantly for government form uploads, admit cards and online applications.",
    tag: "Most Popular",
  },
  {
    href: "/passport-photo-resize",
    icon: "📷",
    title: "Passport Photo Resize",
    shortTitle: "Passport Photo Resize",
    desc: "Resize passport photo to 35×45mm or any standard size for VISA, PAN and Aadhaar applications.",
    tag: "Govt Forms",
  },
  {
    href: "/resize-signature-to-20kb",
    icon: "✍️",
    title: "Signature Resize to 20KB",
    shortTitle: "Signature to 20KB",
    desc: "Compress your signature image to under 20KB for SSC, UPSC, IBPS and most job portals.",
    tag: "Exam Portals",
  },
  {
    href: "/pdf-compressor",
    icon: "📄",
    title: "PDF Compressor",
    shortTitle: "Aadhaar PDF Compressor",
    desc: "Compress Aadhaar, marksheets and certificates below 200KB or 1MB for portal uploads.",
    tag: "PDF",
  },
  {
    href: "/image-to-pdf",
    icon: "🔄",
    title: "Image to PDF",
    shortTitle: "Image to Scanned PDF",
    desc: "Convert JPG/PNG photos to a professional-looking scanned PDF for document submissions.",
    tag: "Convert",
  },
  {
    href: "/ssc-document-resize",
    icon: "📋",
    title: "SSC Document Resize",
    shortTitle: "SSC / UPSC Document Resize",
    desc: "Resize photos and signatures to exact SSC, UPSC, IBPS, SBI specifications in one click.",
    tag: "Competitive Exams",
  },
];

export function getRelatedTools(currentHref: string): Tool[] {
  return tools.filter((t) => t.href !== currentHref);
}