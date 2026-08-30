import React, { useEffect, useRef } from "react";

// Deeper, more saturated tones than the cursor trail uses. The welcome panel
// is a bright yellow-green, so the pale end of the palette disappears into it
// — cyan, violet and magenta are the ones that still read against it.
const COLORS = ["#00d4ff", "#b026ff", "#ff2d95", "#32efa6", "#fcb045"];

// One particle per this many square pixels, so a phone is not asked to run a
// desktop's particle count. Clamped at both ends: too few reads as dust on the
// screen, too many turns into texture and competes with the text.
const AREA_PER_PARTICLE = 15000;
const MIN_PARTICLES = 14;
const MAX_PARTICLES = 70;

// How far the pointer reaches, and how hard it pushes.
const POINTER_RADIUS = 120;
const POINTER_PUSH = 0.9;

const random = (min, max) => min + Math.random() * (max - min);

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
          radius: random(1.1, 2.9) * depth,
          alpha: random(0.16, 0.4),
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
      particles.forEach((p) => {
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(
          p.x + p.ox + parallax.x * p.depth,
          p.y + p.oy + parallax.y * p.depth,
          p.radius,
          0,
          Math.PI * 2
        );
        ctx.fill();
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
