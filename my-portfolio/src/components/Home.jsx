import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CircleButton from "./CircleButton";
import MiniGame from "./MiniGame";
import ElementMark from "./ElementMark";
import WindCurrents from "./WindCurrents";
import ArrowMark from "./ArrowMark";
import foto from "../assets/foto.webp";
import { sections, sectionLabel, elements } from "../content/sections";

const orbitBalls = [
  { element: "air", pos: "left-1/2 top-0", size: "w-11 h-11 sm:w-14 sm:h-14", mark: "w-6 h-6 sm:w-8 sm:h-8", delay: 500 },
  { element: "fire", pos: "left-full top-1/2", size: "w-10 h-10 sm:w-12 sm:h-12", mark: "w-6 h-6 sm:w-7 sm:h-7", delay: 640 },
  { element: "earth", pos: "left-1/2 top-full", size: "w-12 h-12 sm:w-14 sm:h-14", mark: "w-7 h-7 sm:w-8 sm:h-8", delay: 780 },
  { element: "water", pos: "left-0 top-1/2", size: "w-10 h-10 sm:w-12 sm:h-12", mark: "w-6 h-6 sm:w-7 sm:h-7", delay: 920 },
];

const Home = () => {
  const navigate = useNavigate();
  const allData = useSelector((state) => state.get_data);
  const language = useSelector((state) => state.language);
  const content = allData[language];
  const tr = language === "turkish";
  const latest = content.projects.find((p) => p.isNew);

  return (
    <>
    <div className="relative overflow-hidden">
    <WindCurrents className="animate-page-in" />
    <section className="relative max-w-6xl mx-auto px-5 md:px-8 pt-10 pb-8 md:pt-16 lg:pt-20 grid gap-14 lg:gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
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
              element={s.element}
              delay={450 + i * 140}
              onClick={() => navigate(s.path)}
            />
          ))}
        </div>

        <a
          href="#mini-game"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("mini-game")?.scrollIntoView({ behavior: "smooth" });
          }}
          aria-label={tr ? "Aşağıdaki oyuna in" : "Scroll down to the game"}
          className="group animate-rise mt-12 inline-flex flex-col items-center gap-2 text-sky"
          style={{ animationDelay: "1000ms" }}
        >
          <ArrowMark className="w-8 h-16 animate-arrow-bob transition-transform group-hover:scale-110" />
        </a>
      </div>

      <div className="order-1 lg:order-2 flex justify-center">
        <div className="relative w-[250px] h-[250px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px]">
          <div className="absolute -inset-[9%] animate-orbit" aria-hidden="true">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-line" />
            {orbitBalls.map((b) => (
              <span
                key={b.element}
                className={`absolute ${b.pos} -translate-x-1/2 -translate-y-1/2`}
              >
                <span className="block animate-counter-orbit">
                  <span
                    className={`grid place-items-center rounded-full ${elements[b.element].color} ${b.size} text-[#151826] animate-ball-drop`}
                    style={{ animationDelay: `${b.delay}ms` }}
                  >
                    <ElementMark element={b.element} className={b.mark} />
                  </span>
                </span>
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
    </div>
    <MiniGame
      language={language}
      storeUrl={content.projects.find((p) => p.slug === "salise")?.store}
    />
    </>
  );
};

export default Home;
