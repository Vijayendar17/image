"use client";

interface AdSlotProps {
  className?: string;
  style?: React.CSSProperties;
  label?: string; // Optional label for the placeholder
}

export default function AdSlot({ className = "", style = {}, label = "Advertisement" }: AdSlotProps) {
  // Hidden for now as per user request
  return null;

  return (
    <div 
      className={`ad-slot-placeholder ${className}`}
      style={{
        width: "100%",
        minHeight: "90px",
        background: "var(--bg-secondary)",
        border: "1px dashed var(--border-light)",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-muted)",
        fontSize: "0.85rem",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        margin: "1.5rem 0",
        ...style
      }}
    >
      {label}
    </div>
  );
}
