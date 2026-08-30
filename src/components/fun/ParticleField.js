import React, { useEffect, useRef } from "react";

// Deeper, more saturated tones than the cursor trail uses. The welcome panel
// is a bright yellow-green, so the pale end of the palette disappears into it
// — these are the ones that still read against it. Deep violet and electric
// blue carry the most contrast against yellow-green and do the heavy lifting.
const COLORS = [
  "#00d4ff",
  "#b026ff",
  "#ff2d95",
  "#7b00ff",
  "#00a3ff",
  "#ff5cc8",
  "#32efa6",
];

// One particle per this many square pixels, so a phone is not asked to run a
// desktop's particle count. Clamped at both ends: too few reads as dust on the
// screen, too many turns into texture and competes with the text.
const AREA_PER_PARTICLE = 8200;
const MIN_PARTICLES = 22;
const MAX_PARTICLES = 130;

// How far the pointer reaches, and how hard it pushes.
const POINTER_RADIUS = 170;
const POINTER_PUSH = 1.5;

// Each particle is drawn from a pre-rendered glow sprite rather than with
// `shadowBlur`, which is redrawn from scratch every frame and is the classic
// way to make a canvas field stutter. One sprite per colour, painted once.
const SPRITE_SIZE = 64;
const SPRITE_CORE = 8;

// Particles nearer than this get joined by a line. The constellation is what
// turns loose dots into a field with structure — the effect reads as one
// system reacting to the cursor rather than confetti that happens to drift.
const LINK_DISTANCE = 118;

const random = (min, max) => min + Math.random() * (max - min);

/**
 * Paints a soft glowing dot of one colour onto its own small canvas, once, so
 * the render loop only ever has to blit it.
 */
const makeSprite = (color) => {
  const sprite = document.createElement("canvas");
  sprite.width = SPRITE_SIZE;
  sprite.height = SPRITE_SIZE;
  const sctx = sprite.getContext("2d");
  if (!sctx) return sprite;

  const mid = SPRITE_SIZE / 2;
  const gradient = sctx.createRadialGradient(mid, mid, 0, mid, mid, mid);
  // Solid to the core radius, then a bloom that fades to nothing at the edge.
  gradient.addColorStop(0, color);
  gradient.addColorStop(SPRITE_CORE / SPRITE_SIZE, color);
  gradient.addColorStop(0.45, `${color}55`);
  gradient.addColorStop(1, `${color}00`);
  sctx.fillStyle = gradient;
  sctx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
  return sprite;
};

/**
 * An ambient field of drifting particles, drawn on a canvas sized to whatever
 * element contains it.
 *
 * On a device with a real pointer the field answers the mouse two ways: the
 * whole field parallaxes by depth, so nearer particles shift further and it
 * reads as having some thickness, and particles close to the cursor are nudged
 * aside. Both settle back once the pointer leaves. On touch there is no hover
 * to respond to, so the field just drifts.
 *
 * Deliberately cheap when nobody is looking: the loop does not run while the
 * panel is off screen or the tab is in the background, and under reduced
 * motion it paints one still frame and never starts a loop at all.
 *
 * The canvas is decorative, so it is aria-hidden and never takes a pointer
 * event — the text and links in front of it must stay clickable.
 */
function ParticleField({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reducedMotion = window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;
    const finePointer = window.matchMedia
      ? window.matchMedia("(hover: hover) and (pointer: fine)")
      : null;

    let width = 0;
    let height = 0;
    let particles = [];
    let frame = null;
    let onScreen = true;

    // Where the pointer is, and where the field has actually eased to. Chasing
    // the target rather than snapping to it is what keeps this from twitching.
    const pointer = { x: null, y: null };
    const parallax = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const sprites = new Map(COLORS.map((c) => [c, makeSprite(c)]));

    const build = () => {
      const count = Math.max(
        MIN_PARTICLES,
        Math.min(MAX_PARTICLES, Math.round((width * height) / AREA_PER_PARTICLE))
      );

      particles = Array.from({ length: count }, () => {
        // Depth drives size, speed and parallax together, so a particle that
        // looks nearer also behaves nearer.
        const depth = random(0.35, 1);
        return {
          x: random(0, width),
          y: random(0, height),
          vx: random(-0.16, 0.16) * depth,
          vy: random(-0.16, 0.16) * depth,
          // Offsets from the pointer push, decayed back toward zero each frame.
          ox: 0,
          oy: 0,
          depth,
          radius: random(1.8, 4.6) * depth,
          alpha: random(0.42, 0.85),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
      });
    };

    const resize = () => {
      // `clientWidth/Height`, not `getBoundingClientRect`: the canvas is
      // `inset: 0`, so it fills the host's padding box, while the bounding
      // rect is the border box. The welcome panel has 20px borders, so
      // measuring the wrong one makes the canvas 40px too tall and pushes
      // every particle — and every pointer reading — out of register.
      const boxWidth = host.clientWidth;
      const boxHeight = host.clientHeight;
      if (!boxWidth || !boxHeight) return;

      const dpr = window.devicePixelRatio || 1;
      width = boxWidth;
      height = boxHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Resolve each particle's on-screen position once; both passes need it.
      const points = particles.map((p) => ({
        p,
        x: p.x + p.ox + parallax.x * p.depth,
        y: p.y + p.oy + parallax.y * p.depth,
      }));

      // Pass one: the links, underneath, so dots always sit on top of threads.
      ctx.lineWidth = 1;
      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist >= LINK_DISTANCE) continue;
          // Fades out as the pair separates, so links dissolve rather than
          // blinking off when a particle drifts past the threshold.
          ctx.globalAlpha = (1 - dist / LINK_DISTANCE) * 0.3;
          ctx.strokeStyle = points[i].p.color;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }

      // Pass two: the particles, blitted from their glow sprite so the colour
      // carries on a bright background instead of reading as a flat speck.
      // The sprite is sized so its solid core matches the particle's radius.
      points.forEach(({ p, x, y }) => {
        const sprite = sprites.get(p.color);
        if (!sprite) return;
        const size = (p.radius * SPRITE_SIZE) / SPRITE_CORE;
        ctx.globalAlpha = p.alpha;
        ctx.drawImage(sprite, x - size / 2, y - size / 2, size, size);
      });

      ctx.globalAlpha = 1;
    };

    const step = () => {
      parallax.x += (parallax.targetX - parallax.x) * 0.06;
      parallax.y += (parallax.targetY - parallax.y) * 0.06;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap rather than bounce: a particle leaving one edge and returning
        // from the other keeps the field evenly filled without the tell-tale
        // pile-up bouncing produces in the corners.
        const margin = p.radius + 2;
        if (p.x < -margin) p.x = width + margin;
        if (p.x > width + margin) p.x = -margin;
        if (p.y < -margin) p.y = height + margin;
        if (p.y > height + margin) p.y = -margin;

        if (pointer.x !== null) {
          const dx = p.x + p.ox - pointer.x;
          const dy = p.y + p.oy - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 0 && dist < POINTER_RADIUS) {
            const force = (1 - dist / POINTER_RADIUS) * POINTER_PUSH;
            p.ox += (dx / dist) * force;
            p.oy += (dy / dist) * force;
          }
        }

        // Ease the push back out so the field recovers instead of staying
        // permanently dented where the pointer has been.
        p.ox *= 0.94;
        p.oy *= 0.94;
      });

      draw();
      frame = window.requestAnimationFrame(step);
    };

    const stop = () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
    };

    const start = () => {
      if (frame === null && onScreen && !document.hidden) {
        frame = window.requestAnimationFrame(step);
      }
    };

    resize();

    // Reduced motion: one still frame, no loop, no listeners beyond resize.
    if (reducedMotion && reducedMotion.matches) {
      draw();
      const onResizeStatic = () => {
        resize();
        draw();
      };
      const ro = new ResizeObserver(onResizeStatic);
      ro.observe(host);
      return () => ro.disconnect();
    }

    const onPointerMove = (event) => {
      // Measured off the canvas rather than the host for the same reason: the
      // particles live in the canvas's coordinate space, so the pointer has to
      // be expressed in it too.
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      // Signed distance from the middle, so the field leans toward the corner
      // the pointer is in rather than always drifting one way.
      parallax.targetX = (pointer.x / rect.width - 0.5) * -18;
      parallax.targetY = (pointer.y / rect.height - 0.5) * -12;
    };

    const onPointerLeave = () => {
      pointer.x = null;
      pointer.y = null;
      parallax.targetX = 0;
      parallax.targetY = 0;
    };

    const trackPointer = !finePointer || finePointer.matches;
    if (trackPointer) {
      host.addEventListener("pointermove", onPointerMove);
      host.addEventListener("pointerleave", onPointerLeave);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // Nothing to animate for a panel nobody can see.
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(host);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (trackPointer) {
        host.removeEventListener("pointermove", onPointerMove);
        host.removeEventListener("pointerleave", onPointerLeave);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

export default ParticleField;
