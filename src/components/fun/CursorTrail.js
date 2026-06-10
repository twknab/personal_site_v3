import React, { useEffect, useRef } from "react";

// Palette echoes the site's psychedelic + golden accents.
const COLORS = [
  "#f4fd5b",
  "#ffd86b",
  "#fcb045",
  "#ff2d95",
  "#b026ff",
  "#00d4ff",
  "#32efa6",
];

/**
 * Desktop-only confetti/sparkle trail that follows the mouse. Little colorful
 * pieces spawn at the cursor, drift with a touch of gravity, and fade out.
 *
 * Rendered on a single full-screen canvas (pointer-events: none) for
 * performance. Disabled on touch / coarse-pointer devices and when the user
 * prefers reduced motion. Never spawns or animates in those cases.
 */
function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const fineHover = window.matchMedia
      ? window.matchMedia("(hover: hover) and (pointer: fine)")
      : null;
    const reducedMotion = window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;

    if (!fineHover || !fineHover.matches || (reducedMotion && reducedMotion.matches)) {
      return undefined;
    }

    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let dpr = 1;
    let width = 0;
    let height = 0;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = [];
    const MAX = 240;

    const spawn = (x, y) => {
      for (let i = 0; i < 2; i += 1) {
        if (particles.length >= MAX) break;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.3;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.3,
          size: 2.5 + Math.random() * 3.5,
          life: 1,
          decay: 0.012 + Math.random() * 0.02,
          color: COLORS[(Math.random() * COLORS.length) | 0],
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.25,
        });
      }
    };

    const onMove = (e) => spawn(e.clientX, e.clientY);
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf;
    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity for a gentle confetti rain
        p.rot += p.vr;
        p.life -= p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.6);
        ctx.restore();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-trail" aria-hidden="true" />;
}

export default CursorTrail;
