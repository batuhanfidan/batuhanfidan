import { useSelector } from "react-redux";
import PageHeader from "../components/PageHeader";

const tilts = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1"];

const categories = [
  { key: "frontend", tr: "Frontend", en: "Frontend" },
  { key: "mobile", tr: "Mobil", en: "Mobile" },
  { key: "backend", tr: "Backend ve veritabanı", en: "Backend & databases" },
  { key: "tools", tr: "Araçlar", en: "Tools" },
];

const Skills = () => {
  const language = useSelector((state) => state.language);
  const allData = useSelector((state) => state.get_data);
  const tr = language === "turkish";
  const skills = allData[language].skills;

  let order = 0;

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 pt-12 md:pt-16">
      <PageHeader
        element="earth"
        title={tr ? "Yetenekler" : "Skills"}
        subtitle={
          tr
            ? "Projelerimde kullandığım diller, kütüphaneler ve araçlar."
            : "The languages, libraries and tools I use in my projects."
        }
      />

      <div className="flex flex-col gap-14">
        {categories.map((category) => {
          const items = skills.filter((s) => s.category === category.key);
          if (items.length === 0) return null;

          return (
            <section key={category.key} aria-labelledby={`skills-${category.key}`}>
              <h2
                id={`skills-${category.key}`}
                className="font-display font-bold text-xl md:text-2xl text-ink mb-6 flex items-baseline gap-3"
              >
                {tr ? category.tr : category.en}
                <span className="text-sm font-sans font-medium text-muted">
                  {items.length}
                </span>
              </h2>

              <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-x-4 gap-y-8 sm:gap-x-6">
                {items.map((skill) => {
                  const index = order++;
                  return (
                    <li
                      key={skill.name}
                      className="animate-earth-rise flex flex-col items-center gap-3"
                      style={{ animationDelay: `${200 + index * 40}ms` }}
                    >
                      <div
                        className={`group w-full aspect-square max-w-[110px] rounded-3xl bg-white border border-line p-4 sm:p-5 grid place-items-center shadow-[0_8px_0_-3px_var(--line)] ${tilts[index % tilts.length]} hover:rotate-0 hover:-translate-y-2 hover:shadow-[0_14px_0_-3px_var(--leaf)] transition-all duration-300`}
                      >
                        <img
                          src={skill.image}
                          alt=""
                          loading="lazy"
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <span className="text-sm font-medium text-ink text-center">
                        {skill.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
