import { useEffect, useRef, useState } from "react";

const SECRETS = ["hava", "wind"];
const LONGEST = Math.max(...SECRETS.map((s) => s.length));

const streaks = [
  { y: 12, w: 3, delay: 0 },
  { y: 22, w: 1.5, delay: 120 },
  { y: 34, w: 4, delay: 40 },
  { y: 47, w: 2, delay: 200 },
  { y: 58, w: 3.5, delay: 80 },
  { y: 70, w: 1.5, delay: 260 },
  { y: 81, w: 3, delay: 160 },
  { y: 91, w: 2, delay: 60 },
];

const AirGust = () => {
  const [gust, setGust] = useState(0);
  const typed = useRef("");
  const clearRef = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
      typed.current = (typed.current + e.key.toLowerCase()).slice(-LONGEST);
      if (!SECRETS.some((s) => typed.current.endsWith(s))) return;
      typed.current = "";
      if (reduced) return;

      setGust((n) => n + 1);

      document.querySelector("main")?.animate(
        [
          { transform: "none" },
          { transform: "translateX(46px) skewX(-6deg) rotate(0.6deg)", offset: 0.25 },
          { transform: "translateX(-18px) skewX(3deg) rotate(-0.4deg)", offset: 0.5 },
          { transform: "translateX(6px) skewX(-1deg)", offset: 0.75 },
          { transform: "none" },
        ],
        { duration: 1000, easing: "cubic-bezier(0.3, 0.7, 0.4, 1)" }
      );

      clearTimeout(clearRef.current);
      clearRef.current = setTimeout(() => setGust(0), 1600);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(clearRef.current);
    };
  }, []);

  if (!gust) return null;

  return (
    <svg
      key={gust}
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="fixed inset-0 w-screen h-screen z-[58] pointer-events-none text-accent"
    >
      {streaks.map((s) => (
        <path
          key={s.y}
          d={`M0 ${s.y} C 25 ${s.y - 4}, 50 ${s.y + 4}, 75 ${s.y} S 95 ${s.y - 3}, 100 ${s.y}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={s.w}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="gust-streak"
          style={{ animationDelay: `${s.delay}ms` }}
        />
      ))}
    </svg>
  );
};

export default AirGust;
