import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { TechList, ProjectLinks, Screenshot } from "../components/ProjectParts";

const filters = [
  { key: "all", tr: "Tümü", en: "All" },
  { key: "game", tr: "Oyunlar", en: "Games" },
  { key: "web", tr: "Web", en: "Web" },
  { key: "mobile", tr: "Mobil", en: "Mobile" },
];

const Projects = () => {
  const language = useSelector((state) => state.language);
  const allData = useSelector((state) => state.get_data);
  const [searchParams, setSearchParams] = useSearchParams();
  const tr = language === "turkish";
  const projects = allData[language].projects;

  const requested = searchParams.get("filter");
  const active = filters.some((f) => f.key === requested) ? requested : "all";
  const matches = (p) => active === "all" || p.tags.includes(active);

  const featured = projects.find((p) => p.isNew) ?? projects[0];
  const showFeatured = matches(featured);
  const rest = projects.filter((p) => p !== featured && matches(p));

  const selectFilter = (key) => {
    setSearchParams(key === "all" ? {} : { filter: key }, { replace: true });
  };

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 pt-12 md:pt-16">
      <PageHeader
        element="fire"
        title={tr ? "Projeler" : "Projects"}
        subtitle={
          tr
            ? "Telefonda ve tarayıcıda oynanan oyunlar ve araçlar. Hepsi yayında."
            : "Games and tools for your phone and browser. All of them are live."
        }
      />

      <div
        role="group"
        aria-label={tr ? "Projeleri filtrele" : "Filter projects"}
        className="animate-rise flex flex-wrap gap-2 mb-10"
        style={{ animationDelay: "150ms" }}
      >
        {filters.map((f) => {
          const count =
            f.key === "all"
              ? projects.length
              : projects.filter((p) => p.tags.includes(f.key)).length;
          const isActive = active === f.key;
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => selectFilter(f.key)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-coral border-coral text-[#151826]"
                  : "border-line text-muted hover:text-ink hover:border-ink"
              }`}
            >
              {tr ? f.tr : f.en}
              <span
                className={`text-xs ${isActive ? "text-[#151826]/70" : "text-muted"}`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {showFeatured && (
        <article
          key={`featured-${active}`}
          className="group animate-rise grid gap-8 lg:grid-cols-[1.35fr_1fr] items-center p-4 sm:p-6 rounded-3xl bg-surface border border-line mb-16"
          style={{ animationDelay: "200ms" }}
        >
          <Screenshot project={featured} eager />
          <div className="flex flex-col gap-5 lg:pr-4">
            {featured.isNew && (
              <span className="self-start px-3 py-1 rounded-full bg-coral text-[#151826] text-xs font-bold">
                {tr ? "En yeni" : "Latest"}
              </span>
            )}
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-ink">
              {featured.title}
            </h2>
            <p className="text-muted leading-relaxed">{featured.description}</p>
            <TechList items={featured.technologies} />
            <ProjectLinks project={featured} tr={tr} />
          </div>
        </article>
      )}

      <div key={active} className="grid gap-x-8 gap-y-14 md:grid-cols-2">
        {rest.map((project, i) => (
          <Reveal
            as="article"
            variant="fire"
            key={project.title}
            delay={(i % 2) * 120}
            className="group flex flex-col gap-5"
          >
            <Screenshot project={project} />
            <div className="flex flex-col gap-3">
              <h2 className="font-display font-bold text-2xl tracking-tight text-ink">
                {project.title}
              </h2>
              <p className="text-muted leading-relaxed">{project.description}</p>
            </div>
            <TechList items={project.technologies} />
            <ProjectLinks project={project} tr={tr} />
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Projects;
