/* Glyphs for software cards — abstract marks, no logos. */
const Glyph = ({ kind, color = "var(--ink)" }) => {
  const s = { width: 32, height: 32, stroke: color, strokeWidth: 1.4, fill: "none", strokeLinecap: "round" };
  switch (kind) {
    case "fathom":
      return (
        <svg viewBox="0 0 32 32" {...s}>
          <path d="M2 22 Q 8 10, 14 22 T 26 22 T 38 22" />
          <path d="M2 16 Q 8 6, 14 16 T 26 16" opacity="0.5" />
          <circle cx="16" cy="16" r="1.5" fill={color} stroke="none" />
        </svg>
      );
    case "timeseries":
      return (
        <svg viewBox="0 0 32 32" {...s}>
          <path d="M3 20 L 7 16 L 11 22 L 15 12 L 19 18 L 23 14 L 29 19" />
          <line x1="3" y1="27" x2="29" y2="27" opacity="0.4" />
          <line x1="3" y1="6" x2="3" y2="27" opacity="0.4" />
        </svg>
      );
    case "catch22":
      return (
        <svg viewBox="0 0 32 32" {...s}>
          <circle cx="16" cy="16" r="10" />
          <circle cx="16" cy="16" r="4" />
          <line x1="16" y1="6" x2="16" y2="2" />
          <line x1="16" y1="30" x2="16" y2="26" />
          <line x1="6" y1="16" x2="2" y2="16" />
          <line x1="30" y1="16" x2="26" y2="16" />
        </svg>
      );
    case "allen":
      return (
        <svg viewBox="0 0 32 32" {...s}>
          <rect x="6" y="6" width="20" height="20" />
          <line x1="11" y1="6" x2="11" y2="26" opacity="0.5" />
          <line x1="16" y1="6" x2="16" y2="26" opacity="0.5" />
          <line x1="21" y1="6" x2="21" y2="26" opacity="0.5" />
          <circle cx="11" cy="11" r="0.8" fill={color} stroke="none" />
          <circle cx="16" cy="18" r="0.8" fill={color} stroke="none" />
          <circle cx="21" cy="14" r="0.8" fill={color} stroke="none" />
          <circle cx="16" cy="22" r="0.8" fill={color} stroke="none" />
        </svg>
      );
    case "dim":
      return (
        <svg viewBox="0 0 32 32" {...s}>
          <path d="M6 22 L 16 6 L 26 22 Z" />
          <line x1="11" y1="14" x2="21" y2="14" opacity="0.5" />
          <line x1="13.5" y1="18" x2="18.5" y2="18" opacity="0.5" />
        </svg>
      );
    case "critical":
      return (
        <svg viewBox="0 0 32 32" {...s}>
          <path d="M3 22 Q 16 22, 16 16 T 29 10" />
          <line x1="16" y1="3" x2="16" y2="29" opacity="0.3" strokeDasharray="2 2" />
          <circle cx="16" cy="16" r="2" fill={color} stroke="none" />
        </svg>
      );
    default:
      return <svg viewBox="0 0 32 32" {...s}><rect x="6" y="6" width="20" height="20" /></svg>;
  }
};

window.Glyph = Glyph;
