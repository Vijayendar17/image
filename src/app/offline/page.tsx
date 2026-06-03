import Link from "next/link";

export default function OfflinePage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "1rem",
      textAlign: "center",
      padding: "2rem",
      fontFamily: "Inter, sans-serif",
      color: "#0f172a",
    }}>
      <div style={{ fontSize: "4rem" }}>📶</div>
      <h1 style={{ fontSize: "1.8rem", fontWeight: 800, margin: 0 }}>You&apos;re Offline</h1>
      <p style={{ color: "#475569", maxWidth: 400, lineHeight: 1.7 }}>
        It looks like you&apos;re not connected to the internet. But don&apos;t worry — if you&apos;ve visited this page before, you can still use the tools!
      </p>
      <p style={{ color: "#ff6b35", fontWeight: 600, fontSize: "0.9rem" }}>
        👆 Go back and use any tool — they all work 100% offline.
      </p>
      <Link href="/" style={{
        marginTop: "1rem",
        padding: "0.75rem 1.5rem",
        background: "linear-gradient(135deg, #ff6b35, #e85d25)",
        color: "white",
        borderRadius: "10px",
        textDecoration: "none",
        fontWeight: 600,
      }}>
        ← Go to Tools
      </Link>
    </div>
  );
}
