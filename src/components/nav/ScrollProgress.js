"use client";

import React, { useEffect, useRef } from "react";

// Thin reading-progress bar pinned to the top edge: it fills left-to-right
// with the site's accent run as you scroll, so a visitor always knows how far
// down the page they are. Purely decorative chrome — hidden from screen
// readers (scrollbars and landmarks already tell that story) and transparent
// to the pointer.
//
// Two implementation choices worth keeping:
// - The fill is revealed by translating a full-width strip inside an
//   overflow-hidden track, not by scaling or resizing it. A translate keeps
//   the gradient at its true size (a scaleX would squash the colors into the
//   left edge) and stays on the compositor, so tracking is cheap.
// - Updates are rAF-coalesced. Scroll events fire faster than frames paint,
//   and touch scrolling on a phone must track the finger 1:1 — no easing, no
//   transition, just the latest position once per frame.
function ScrollProgress() {
  const fillRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const update = () => {
      frameRef.current = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? Math.min(doc.scrollTop / max, 1) : 0;
      if (fillRef.current) {
        fillRef.current.style.transform = `translateX(${(progress - 1) * 100}%)`;
      }
    };

    const schedule = () => {
      if (frameRef.current === 0) {
        frameRef.current = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={fillRef} className="scroll-progress-fill" />
    </div>
  );
}

export default ScrollProgress;
