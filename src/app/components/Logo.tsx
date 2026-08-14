import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Logo({ onClick, isFooter = false }: { onClick?: () => void, isFooter?: boolean }) {
  return (
    <Link href="/" className={isFooter ? "footer-logo" : "nav-logo"} onClick={onClick} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
      <Image
        src="/logo.png"
        alt="Lite Files Logo"
        width={1956}
        height={804}
        priority
        style={{ 
          height: isFooter ? '140px' : '72px', 
          width: isFooter ? 'auto' : '220px', 
          objectFit: 'cover' 
        }}
      />
    </Link>
  );
}
