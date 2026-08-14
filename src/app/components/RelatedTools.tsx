import Link from "next/link";
import { getRelatedTools } from "../tools-data";

interface RelatedToolsProps {
  currentHref: string;
}

export default function RelatedTools({ currentHref }: RelatedToolsProps) {
  const relatedTools = getRelatedTools(currentHref);

  return (
    <div className="related-tools-grid">
      {relatedTools.map((tool) => (
        <Link key={tool.href} href={tool.href} className="related-tool-card">
          <span className="related-tool-icon">{tool.icon}</span>
          <div>
            <div className="related-tool-title">{tool.title}</div>
            <div className="related-tool-desc">{tool.desc}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}