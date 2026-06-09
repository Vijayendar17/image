import { siteConfig } from "../config";
const SITE_URL = siteConfig.baseUrl;
const SITE_NAME = siteConfig.name;

interface WebAppSchemaProps {
  name: string;
  description: string;
  url: string;
  keywords?: string[];
}

export function WebAppSchema({ name, description, url, keywords }: WebAppSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": name,
    "description": description,
    "url": url,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "inLanguage": "en-IN",
    "isAccessibleForFree": true,
    "keywords": keywords?.join(", "),
    "provider": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQItem { q: string; a: string }
interface FAQSchemaProps { faqs: FAQItem[] }

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": a
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem { name: string; url: string }
interface BreadcrumbSchemaProps { items: BreadcrumbItem[] }

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleSchemaProps {
  headline: string;
  authorName: string;
  authorType?: "Person" | "Organization";
  publisherName: string;
  publisherUrl: string;
  datePublished: string;
  dateModified: string;
  description?: string;
}

export function ArticleSchema({ headline, authorName, authorType = "Organization", publisherName, publisherUrl, datePublished, dateModified, description }: ArticleSchemaProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "author": {
      "@type": authorType,
      "name": authorName,
    },
    "publisher": {
      "@type": "Organization",
      "name": publisherName,
      "url": publisherUrl,
    },
    "datePublished": datePublished,
    "dateModified": dateModified,
  };

  if (description) schema.description = description;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": SITE_URL,
    "description": "LiteFiles offers free online tools for image compression, PDF conversion, resizing, and document utilities.",
    "inLanguage": "en-IN",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
