import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CircleButton from "./CircleButton";
import foto from "../assets/foto.jpg";
import { sections, sectionLabel } from "../content/sections";

const orbitBalls = [
  { color: "bg-sun", pos: "left-1/2 top-0", size: "w-9 h-9 sm:w-12 sm:h-12", delay: 500 },
  { color: "bg-coral", pos: "left-[93.3%] top-3/4", size: "w-7 h-7 sm:w-9 sm:h-9", delay: 650 },
  { color: "bg-sky", pos: "left-[6.7%] top-3/4", size: "w-11 h-11 sm:w-14 sm:h-14", delay: 800 },
];

const Home = () => {
  const navigate = useNavigate();
  const allData = useSelector((state) => state.get_data);
  const language = useSelector((state) => state.language);
  const content = allData[language];
  const tr = language === "turkish";
  const latest = content.projects.find((p) => p.isNew);

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 pt-10 pb-8 md:pt-16 lg:pt-20 grid gap-14 lg:gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
      <div className="order-2 lg:order-1 text-center lg:text-left">
        {latest && (
          <Link
            to="/projects"
            className="animate-rise inline-flex items-center gap-2 mb-6 pl-2 pr-4 py-1.5 rounded-full border border-line bg-surface text-sm text-muted hover:text-ink hover:border-coral transition-colors"
          >
            <span className="relative flex w-2.5 h-2.5">
              <span className="absolute inset-0 rounded-full bg-coral animate-ping opacity-60" />
              <span className="relative w-2.5 h-2.5 rounded-full bg-coral" />
            </span>
            {tr ? "Yeni proje:" : "New project:"}{" "}
            <span className="font-semibold text-ink">{latest.title}</span>
          </Link>
        )}

        <p
          className="animate-rise font-display text-2xl sm:text-3xl text-muted"
          style={{ animationDelay: "80ms" }}
        >
          {content.hero.hello},
        </p>
        <h1
          className="animate-rise font-display font-extrabold tracking-tight text-ink text-5xl sm:text-7xl xl:text-8xl leading-[0.95] mt-1"
          style={{ animationDelay: "160ms" }}
        >
          {content.hero.aboutTitle}.
        </h1>

        <p
          className="animate-rise mt-6 text-muted text-base sm:text-lg leading-relaxed max-w-[60ch] mx-auto lg:mx-0"
          style={{ animationDelay: "260ms" }}
        >
          {content.hero.aboutText}
        </p>

        <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-5 sm:gap-7">
          {sections.map((s, i) => (
            <CircleButton
              key={s.key}
              text={sectionLabel(s, language)}
              color={s.color}
              delay={450 + i * 140}
              onClick={() => navigate(s.path)}
            />
          ))}
        </div>
      </div>

      <div className="order-1 lg:order-2 flex justify-center">
        <div className="relative w-[250px] h-[250px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px]">
          <div className="absolute -inset-[9%] animate-orbit" aria-hidden="true">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-line" />
            {orbitBalls.map((b) => (
              <span
                key={b.color}
                className={`absolute ${b.pos} -translate-x-1/2 -translate-y-1/2`}
              >
                <span
                  className={`block rounded-full ${b.color} ${b.size} animate-ball-drop`}
                  style={{ animationDelay: `${b.delay}ms` }}
                />
              </span>
            ))}
          </div>

          <div className="animate-pop absolute inset-0 rounded-full overflow-hidden ring-8 ring-surface shadow-[0_30px_60px_-20px_rgba(21,24,38,0.35)]">
            <img
              src={foto}
              alt="Batuhan Fidan"
              className="w-full h-full object-cover"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
