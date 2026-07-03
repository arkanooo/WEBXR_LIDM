// Compact line icons for the ARPeGa mechanical components.
// All use currentColor so they inherit the neon accent on the card.

type IconProps = { className?: string };

const S = "1.6";

export function NutIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 6 40 15 40 33 24 42 8 33 8 15Z" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <circle cx="24" cy="24" r="9" stroke="currentColor" strokeWidth={S} />
      <circle cx="24" cy="24" r="5.5" stroke="currentColor" strokeWidth={S} opacity="0.6" />
    </svg>
  );
}

export function BoltIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M6 18 6 30 12 33 12 15Z" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <rect x="12" y="19" width="30" height="10" stroke="currentColor" strokeWidth={S} />
      <path d="M16 19v10M20 19v10M24 19v10M28 19v10M32 19v10M36 19v10" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

export function NutBoltIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M4 18 4 30 10 33 10 15Z" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <rect x="10" y="19" width="34" height="10" stroke="currentColor" strokeWidth={S} />
      <rect x="26" y="14" width="12" height="20" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
    </svg>
  );
}

export function ScrewIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="8" y="14" width="10" height="20" rx="2" stroke="currentColor" strokeWidth={S} />
      <path d="M13 18h0M13 24h0M13 30h0" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <rect x="18" y="19" width="24" height="10" stroke="currentColor" strokeWidth={S} />
      <path d="M22 19v10M26 19v10M30 19v10M34 19v10M38 19v10" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

export function GearIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M24 6v5M24 37v5M42 24h-5M11 24H6M36.7 11.3l-3.5 3.5M14.8 33.2l-3.5 3.5M36.7 36.7l-3.5-3.5M14.8 14.8l-3.5-3.5"
        stroke="currentColor"
        strokeWidth={S}
        strokeLinecap="round"
      />
      <circle cx="24" cy="24" r="11" stroke="currentColor" strokeWidth={S} />
      <circle cx="24" cy="24" r="4.5" stroke="currentColor" strokeWidth={S} />
    </svg>
  );
}

export function BevelGearIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <ellipse cx="24" cy="30" rx="18" ry="7" stroke="currentColor" strokeWidth={S} />
      <path d="M8 26 24 12 40 26" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <ellipse cx="24" cy="24" rx="10" ry="4" stroke="currentColor" strokeWidth={S} opacity="0.6" />
      <ellipse cx="24" cy="30" rx="4" ry="1.6" stroke="currentColor" strokeWidth={S} />
    </svg>
  );
}

export function StudIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="4" y="19" width="40" height="10" rx="5" stroke="currentColor" strokeWidth={S} />
      <path d="M8 19v10M12 19v10M16 19v10M32 19v10M36 19v10M40 19v10" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M23 19v10M25 19v10" stroke="currentColor" strokeWidth="1" opacity="0.35" />
    </svg>
  );
}

export function BoxedStudIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="4" y="19" width="40" height="10" rx="5" stroke="currentColor" strokeWidth={S} />
      <path d="M8 19v10M12 19v10M16 19v10M34 19v10M38 19v10" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <rect x="20" y="16" width="10" height="16" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
    </svg>
  );
}

export function BearingIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth={S} />
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth={S} />
      <circle cx="24" cy="9" r="2.4" stroke="currentColor" strokeWidth={S} />
      <circle cx="24" cy="39" r="2.4" stroke="currentColor" strokeWidth={S} />
      <circle cx="9" cy="24" r="2.4" stroke="currentColor" strokeWidth={S} />
      <circle cx="39" cy="24" r="2.4" stroke="currentColor" strokeWidth={S} />
      <circle cx="34.6" cy="13.4" r="2.4" stroke="currentColor" strokeWidth={S} />
      <circle cx="13.4" cy="34.6" r="2.4" stroke="currentColor" strokeWidth={S} />
      <circle cx="34.6" cy="34.6" r="2.4" stroke="currentColor" strokeWidth={S} />
      <circle cx="13.4" cy="13.4" r="2.4" stroke="currentColor" strokeWidth={S} />
    </svg>
  );
}

export function RodIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M5 32 H30 A8 8 0 0 0 38 24 L43 14" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M5 27 H31 A5 5 0 0 0 35 22 L40 12" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    </svg>
  );
}

export function SpringIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M8 10 H40 L8 18 H40 L8 26 H40 L8 34 H40"
        stroke="currentColor"
        strokeWidth={S}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ConeSpringIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M18 10 H30 L15 18 H33 L12 26 H36 L9 34 H39"
        stroke="currentColor"
        strokeWidth={S}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
