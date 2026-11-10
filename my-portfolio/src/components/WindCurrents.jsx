const currents = [
  { d: "M-50 140 C 200 60, 380 220, 620 130 S 1000 40, 1260 150", w: 2, o: 0.55, dur: "11s", delay: "0s" },
  { d: "M-50 260 C 260 190, 420 330, 700 250 S 1050 170, 1260 270", w: 1.5, o: 0.35, dur: "14s", delay: "-4s" },
  { d: "M-50 420 C 180 360, 400 500, 640 410 S 980 330, 1260 430", w: 2.5, o: 0.45, dur: "9s", delay: "-2s" },
  { d: "M-50 540 C 240 480, 460 600, 720 520 S 1080 460, 1260 560", w: 1.5, o: 0.3, dur: "16s", delay: "-7s" },
  { d: "M-50 330 C 150 300, 300 380, 500 330 S 820 280, 1260 340", w: 1, o: 0.4, dur: "12s", delay: "-9s" },
];

const WindCurrents = ({ className = "" }) => (
  <svg
    viewBox="0 0 1200 600"
    preserveAspectRatio="none"
    aria-hidden="true"
    className={`pointer-events-none absolute inset-0 w-full h-full text-accent transition-colors duration-500 ${className}`}
  >
    {currents.map((c) => (
      <path
        key={c.d}
        d={c.d}
        className="wind-path"
        stroke="currentColor"
        strokeWidth={c.w}
        opacity={c.o}
        vectorEffect="non-scaling-stroke"
        style={{ "--wind-duration": c.dur, "--wind-delay": c.delay }}
      />
    ))}
  </svg>
);

export default WindCurrents;
