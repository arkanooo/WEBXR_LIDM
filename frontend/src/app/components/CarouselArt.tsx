



type ArtProps = { className?: string };


export function ModulArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <path
        d="M50 30 C41 24 25 23 15 27 L15 73 C25 69 41 70 50 76"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M50 30 C59 24 75 23 85 27 L85 73 C75 69 59 70 50 76"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M50 30 L50 76" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path
        d="M24 39 H42 M24 47 H42 M24 55 H39"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M58 39 H76 M58 47 H76 M61 55 H76"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path d="M67 22 L67 41 L72.5 35.5 L78 41 L78 24" fill="currentColor" opacity="0.9" />
    </svg>
  );
}


export function KomponenArt({ className }: ArtProps) {
  const teeth = Array.from({ length: 10 }, (_, i) => i * 36);
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      {teeth.map((a) => (
        <rect
          key={a}
          x="45.5"
          y="11"
          width="9"
          height="17"
          rx="2"
          fill="currentColor"
          transform={`rotate(${a} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="27" fill="currentColor" opacity="0.16" />
      <circle cx="50" cy="50" r="27" stroke="currentColor" strokeWidth="5" />
      <circle cx="50" cy="50" r="11" stroke="currentColor" strokeWidth="5" />
    </svg>
  );
}


export function PraktikumArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <path
        d="M20 52 C20 35 34 27 50 27 C66 27 80 35 80 52"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <rect x="14" y="45" width="72" height="30" rx="12" fill="currentColor" opacity="0.16" />
      <rect x="14" y="45" width="72" height="30" rx="12" stroke="currentColor" strokeWidth="5" />
      <path d="M44 75 C46 69 54 69 56 75" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="34" cy="60" r="7" stroke="currentColor" strokeWidth="3.5" />
      <circle cx="66" cy="60" r="7" stroke="currentColor" strokeWidth="3.5" />
    </svg>
  );
}
