import { useEffect, useRef } from "react";

const MAX_PARTICLES = 90;

const AirTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    const ctx = canvas.getContext("2d");
    const particles = [];
    let frame = 0;
    let last = null;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const step = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const px = p.x;
        const py = p.y;
        const cos = Math.cos(p.spin);
        const sin = Math.sin(p.spin);
        const vx = p.vx * cos - p.vy * sin;
        const vy = p.vx * sin + p.vy * cos;
        p.vx = vx * 0.95;
        p.vy = vy * 0.95 - 0.04;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.022;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = p.life * 0.85;
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.6 + p.life * 2.4;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      frame = particles.length > 0 ? requestAnimationFrame(step) : 0;
    };

    const onMove = (e) => {
      if (last) {
        const dx = e.clientX - last.x;
        const dy = e.clientY - last.y;
        const speed = Math.hypot(dx, dy);
        const count = Math.min(3, Math.floor(speed / 8));
        for (let i = 0; i < count && particles.length < MAX_PARTICLES; i++) {
          const t = Math.random();
          particles.push({
            x: last.x + dx * t,
            y: last.y + dy * t,
            vx: dx * 0.12 + (Math.random() - 0.5) * 1.5,
            vy: dy * 0.12 + (Math.random() - 0.5) * 1.5,
            spin: (Math.random() < 0.5 ? -1 : 1) * (0.05 + Math.random() * 0.07),
            life: 1,
          });
        }
      }
      last = { x: e.clientX, y: e.clientY };
      if (!frame && particles.length) frame = requestAnimationFrame(step);
    };

    const onLeave = () => {
      last = null;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-screen h-screen pointer-events-none z-[55]"
    />
  );
};

export default AirTrail;
