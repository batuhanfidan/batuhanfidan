import { useEffect, useState } from "react";
import ElementMark from "./ElementMark";
import { elements } from "../content/sections";

const SEEN_KEY = "introSeen";

const orbs = [
  { element: "air", from: ["-38vw", "-30vh"], delay: 0 },
  { element: "water", from: ["38vw", "-30vh"], delay: 70 },
  { element: "earth", from: ["-38vw", "30vh"], delay: 140 },
  { element: "fire", from: ["38vw", "30vh"], delay: 210 },
];

const shouldPlay = () => {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return sessionStorage.getItem(SEEN_KEY) !== "1";
  } catch {
    return false;
  }
};

const markSeen = () => {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
    return true;
  } catch {
    return false;
  }
};

const IntroOrbs = () => {
  const [show, setShow] = useState(shouldPlay);

  useEffect(() => {
    if (!show) return;
    markSeen();
    const skip = () => setShow(false);
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, [show]);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      onClick={() => setShow(false)}
      onAnimationEnd={(e) => {
        if (e.animationName === "intro-out") setShow(false);
      }}
      className="fixed inset-0 z-[70] bg-bg grid place-items-center animate-intro-out cursor-pointer"
    >
      <div className="relative w-0 h-0">
        <span className="intro-burst absolute -left-16 -top-16 w-32 h-32 rounded-full border-[6px] border-accent" />
        {orbs.map((o) => (
          <span
            key={o.element}
            className={`intro-orb absolute -left-8 -top-8 w-16 h-16 rounded-full grid place-items-center text-[#151826] ${elements[o.element].color}`}
            style={{
              "--from-x": o.from[0],
              "--from-y": o.from[1],
              animationDelay: `${o.delay}ms`,
            }}
          >
            <ElementMark element={o.element} className="w-8 h-8" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default IntroOrbs;
