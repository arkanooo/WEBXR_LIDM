import { useEffect, useRef } from "react";

// Cursor kustom bertema mesin: gir kecil yang mengikuti pointer dan berputar
// terus-menerus, membesar + berputar lebih cepat di atas elemen interaktif,
// dan meninggalkan efek "cap/stempel" melingkar saat diklik — menggemakan
// motif Embossing Machine di seluruh situs. Hanya aktif pada perangkat dengan
// mouse presisi (pointer: fine) — disentuh (touch) tetap memakai cursor asli.

const INTERACTIVE_SELECTOR =
  'a, button, input, select, textarea, [role="button"], .cursor-pointer, [class*="cursor-pointer"]';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const gearRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const stampLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;

    document.documentElement.classList.add("custom-cursor-active");

    const root = rootRef.current!;
    const dot = dotRef.current!;
    const gear = gearRef.current!;
    const stampLayer = stampLayerRef.current!;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let visible = false;
    let hovering = false;
    let angle = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        root.style.opacity = "1";
      }
      const target = e.target as Element | null;
      const nowHovering = !!target?.closest(INTERACTIVE_SELECTOR);
      if (nowHovering !== hovering) {
        hovering = nowHovering;
        gear.style.transform = hovering ? "scale(1.7)" : "scale(1)";
        gear.style.borderColor = hovering ? "#BFFD44" : "rgba(191,253,68,0.7)";
        dot.style.transform = hovering ? "scale(0)" : "scale(1)";
      }
    };

    const onLeave = () => {
      visible = false;
      root.style.opacity = "0";
    };

    const onDown = () => {
      gear.style.transform = `${hovering ? "scale(1.7)" : "scale(1)"} scale(0.8)`;
      // efek "stempel": ring memuai lalu memudar, pas di posisi klik
      const stamp = document.createElement("span");
      stamp.className = "cc-stamp";
      stamp.style.left = `${x}px`;
      stamp.style.top = `${y}px`;
      stampLayer.appendChild(stamp);
      window.setTimeout(() => stamp.remove(), 500);
    };
    const onUp = () => {
      gear.style.transform = hovering ? "scale(1.7)" : "scale(1)";
    };

    const loop = () => {
      root.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      angle += hovering ? 3.2 : 1.1;
      gear.style.setProperty("--cc-rot", `${angle}deg`);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={stampLayerRef} className="cc-stamp-layer" aria-hidden="true" />
      <div ref={rootRef} className="cc-root" aria-hidden="true">
        <div ref={dotRef} className="cc-dot" />
        <div ref={gearRef} className="cc-gear">
          <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none">
            <path
              d="M12 2v2.2M12 19.8V22M22 12h-2.2M4.2 12H2M18.8 5.2l-1.55 1.55M6.75 17.25 5.2 18.8M18.8 18.8l-1.55-1.55M6.75 6.75 5.2 5.2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="12" r="6.2" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="2.4" fill="currentColor" />
          </svg>
        </div>
      </div>
    </>
  );
}
