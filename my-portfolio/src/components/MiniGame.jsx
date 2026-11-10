import { useEffect, useRef, useState } from "react";
import { FaGooglePlay } from "react-icons/fa";

const TARGET = 1000;
const VISIBLE_FOR = 300;
const GIVE_UP_AFTER = 3000;
const BEST_KEY = "miniGameBest";

const readBest = () => {
  try {
    const raw = localStorage.getItem(BEST_KEY);
    if (raw === null) return null;
    const value = Number(raw);
    return Number.isFinite(value) && value >= 0 ? value : null;
  } catch {
    return null;
  }
};

const saveBest = (value) => {
  try {
    localStorage.setItem(BEST_KEY, String(value));
  } catch {
    return false;
  }
  return true;
};

const formatSeconds = (ms) => (ms / 1000).toFixed(3).replace(".", ",");

const verdict = (diff, tr) => {
  if (diff <= 10) return tr ? "Salise ustası!" : "Millisecond master!";
  if (diff <= 30) return tr ? "Çok iyi." : "Very good.";
  if (diff <= 80) return tr ? "Fena değil." : "Not bad.";
  return tr ? "Bir daha dene." : "Try again.";
};

const MiniGame = ({ language, storeUrl }) => {
  const tr = language === "turkish";
  const [phase, setPhase] = useState("idle");
  const [shown, setShown] = useState(0);
  const [result, setResult] = useState(null);
  const [best, setBest] = useState(readBest);
  const startRef = useRef(0);
  const frameRef = useRef(0);
  const timeoutRef = useRef(0);
  const hideRef = useRef(0);

  useEffect(
    () => () => {
      cancelAnimationFrame(frameRef.current);
      clearTimeout(timeoutRef.current);
      clearTimeout(hideRef.current);
    },
    []
  );

  const start = () => {
    const startedAt = performance.now();
    startRef.current = startedAt;
    const tick = (now) => {
      setShown(Math.min(VISIBLE_FOR, Math.max(0, now - startedAt)));
      frameRef.current = requestAnimationFrame(tick);
    };
    setResult(null);
    setShown(0);
    setPhase("running");
    frameRef.current = requestAnimationFrame(tick);
    hideRef.current = setTimeout(() => {
      cancelAnimationFrame(frameRef.current);
      setShown(null);
    }, VISIBLE_FOR);
    timeoutRef.current = setTimeout(() => {
      cancelAnimationFrame(frameRef.current);
      setResult({ elapsed: GIVE_UP_AFTER, diff: null });
      setPhase("done");
    }, GIVE_UP_AFTER);
  };

  const stop = () => {
    const elapsed = performance.now() - startRef.current;
    cancelAnimationFrame(frameRef.current);
    clearTimeout(timeoutRef.current);
    clearTimeout(hideRef.current);
    const diff = Math.round(Math.abs(elapsed - TARGET));
    setResult({ elapsed, diff });
    setPhase("done");
    if (best === null || diff < best) {
      setBest(diff);
      saveBest(diff);
    }
  };

  const press = () => (phase === "running" ? stop() : start());

  const onKeyDown = (e) => {
    if ((e.key === " " || e.key === "Enter") && !e.repeat) {
      e.preventDefault();
      press();
    }
  };

  let display;
  if (phase === "running") display = shown === null ? "?,???" : formatSeconds(shown);
  else if (result) display = formatSeconds(result.elapsed);
  else display = "0,000";

  let message;
  if (phase === "idle")
    message = tr
      ? "Sayaç 0,3 saniye sonra gizleniyor. Tam 1,000 saniyede durdurabilir misin?"
      : "The counter hides after 0.3 seconds. Can you stop it at exactly 1.000?";
  else if (phase === "running") message = tr ? "Şimdi say…" : "Count in your head…";
  else if (result.diff === null)
    message = tr ? "Çok geç kaldın. Tekrar dene." : "Too late. Try again.";
  else
    message = `${result.diff} ms ${tr ? "saptın" : "off"}. ${verdict(result.diff, tr)}`;

  const buttonLabel =
    phase === "running" ? (tr ? "DUR" : "STOP") : tr ? "BAS" : "TAP";

  return (
    <section
      id="mini-game"
      aria-labelledby="mini-game-title"
      className="scroll-mt-24 max-w-6xl mx-auto px-5 md:px-8 mt-20 md:mt-24"
    >
      <div className="rounded-3xl bg-surface border border-line p-6 sm:p-10 grid gap-10 md:grid-cols-[1fr_auto] items-center">
        <div className="flex flex-col gap-4">
          <h2
            id="mini-game-title"
            className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-ink"
          >
            {tr ? "Bir saniyeyi hissedebilir misin?" : "Can you feel one second?"}
          </h2>
          <p className="text-muted max-w-[52ch]" aria-live="polite">
            {message}
          </p>

          <p
            className="font-display font-extrabold tabular-nums text-6xl sm:text-7xl tracking-tight text-ink"
            aria-hidden="true"
          >
            {display}
            <span className="text-2xl sm:text-3xl text-muted ml-2">s</span>
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
            <span>
              {tr ? "En iyi skorun:" : "Your best:"}{" "}
              <span className="font-semibold text-ink">
                {best === null ? "—" : `${best} ms`}
              </span>
            </span>
            {storeUrl && (
              <a
                href={storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-ink underline decoration-coral decoration-2 underline-offset-4"
              >
                <FaGooglePlay />
                {tr ? "Gerçeğini Salise'de oyna" : "Play the real thing: Salise"}
              </a>
            )}
          </div>
        </div>

        <div className="relative justify-self-center grid place-items-center p-6">
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 w-full h-full text-accent ${
              phase === "running" ? "animate-wind-ring-fast" : "animate-wind-ring"
            }`}
          >
            <g fill="none" stroke="currentColor" strokeLinecap="round">
              <path d="M50 3a47 47 0 0 1 40 22" strokeWidth="2.5" />
              <path d="M97 50a47 47 0 0 1-22 40" strokeWidth="1.6" opacity="0.6" />
              <path d="M50 97a47 47 0 0 1-40-22" strokeWidth="2.5" />
              <path d="M3 50a47 47 0 0 1 22-40" strokeWidth="1.6" opacity="0.6" />
            </g>
          </svg>
        <button
          type="button"
          onPointerDown={(e) => {
            if (e.button === 0) press();
          }}
          onKeyDown={onKeyDown}
          aria-label={buttonLabel}
          className={`relative w-40 h-40 sm:w-48 sm:h-48 rounded-full font-display font-extrabold text-4xl select-none touch-manipulation shadow-[0_12px_0_-2px_rgba(21,24,38,0.25)] active:translate-y-1.5 active:shadow-[0_5px_0_-2px_rgba(21,24,38,0.25)] transition-[transform,box-shadow,background-color] duration-100 ${
            phase === "running" ? "bg-ink text-bg" : "bg-accent text-[#151826]"
          }`}
        >
          {buttonLabel}
        </button>
        </div>
      </div>
    </section>
  );
};

export default MiniGame;
