export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
}

export const posts: BlogPost[] = [
  {
    slug: "how-to-compress-image-to-50kb-for-upsc-ssc-and-government-portal-uploads",
    title: "How to Compress Image to 50KB for UPSC, SSC and Government Portal Uploads (2026 Guide)",
    description:
      "Learn the exact steps to compress your passport size photo to 50KB and signature to 20KB for Indian government exams.",
    date: "2026-06-09",
    category: "Guides",
    readTime: "5 min read",
  },
  {
    slug: "how-much-can-you-save-by-using-your-own-cloud-infrastructure",
    title: "How Much Can You Save by Using Your Own Cloud Infrastructure?",
    description:
      "Compare the cost of a private cloud vs public cloud and see how much businesses can save by running their own infrastructure.",
    date: "2026-08-02",
    category: "Technology",
    readTime: "7 min read",
  },
];

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}