import Link from "next/link";

interface ToolHeroProps {
  badge?: React.ReactNode;
  title: string;
  desc: string;
  crumb: string;
}

export default function ToolHero({ badge, title, desc, crumb }: ToolHeroProps) {
  return (
    <div className="tool-hero">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-current="page">{crumb}</li>
          </ol>
        </nav>
        <div className="tool-hero-inner">
          {badge}
          <h1 className="tool-title">{title}</h1>
          <p className="tool-desc">{desc}</p>
        </div>
      </div>
    </div>
  );
}