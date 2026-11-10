import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NotFound = () => {
  const language = useSelector((state) => state.language);
  const tr = language === "turkish";

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center">
      <div className="flex items-end gap-3" aria-hidden="true">
        <span className="w-10 h-10 rounded-full bg-sun animate-ball-drop" />
        <span
          className="w-14 h-14 rounded-full bg-coral animate-ball-drop"
          style={{ animationDelay: "120ms" }}
        />
        <span
          className="w-8 h-8 rounded-full bg-sky animate-ball-drop"
          style={{ animationDelay: "240ms" }}
        />
        <span
          className="w-11 h-11 rounded-full bg-leaf animate-ball-drop"
          style={{ animationDelay: "360ms" }}
        />
      </div>
      <h1 className="font-display font-extrabold text-7xl tracking-tight text-ink">
        404
      </h1>
      <p className="text-muted text-lg">
        {tr
          ? "Bu adreste bir sayfa yok."
          : "There's no page at this address."}
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-full bg-ink text-bg font-semibold hover:-translate-y-0.5 transition-transform"
      >
        {tr ? "Ana sayfaya dön" : "Back to home"}
      </Link>
    </section>
  );
};

export default NotFound;
