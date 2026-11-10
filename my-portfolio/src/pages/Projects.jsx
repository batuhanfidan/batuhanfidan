import { useSelector } from "react-redux";
import { FaGithub, FaGooglePlay } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";

const TechList = ({ items }) => (
  <ul className="flex flex-wrap gap-2">
    {items.map((tech) => (
      <li
        key={tech}
        className="px-3 py-1 rounded-full border border-line text-xs font-medium text-muted"
      >
        {tech}
      </li>
    ))}
  </ul>
);

const ProjectLinks = ({ project, tr }) => (
  <div className="flex flex-wrap gap-3">
    {project.store && (
      <a
        href={project.store}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-bg text-sm font-semibold hover:-translate-y-0.5 transition-transform"
      >
        <FaGooglePlay />
        {tr ? "Google Play'de aç" : "Get it on Google Play"}
      </a>
    )}
    {project.website && (
      <a
        href={project.website}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-bg text-sm font-semibold hover:-translate-y-0.5 transition-transform"
      >
        <HiOutlineExternalLink />
        {tr ? "Siteyi aç" : "Open site"}
      </a>
    )}
    {project.github && (
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line text-ink text-sm font-semibold hover:border-ink transition-colors"
      >
        <FaGithub />
        {tr ? "Kodu gör" : "View code"}
      </a>
    )}
  </div>
);

const Screenshot = ({ project, eager = false }) =>
  project.platform ? (
    <div className="rounded-xl overflow-hidden border border-line">
      <img
        src={project.image}
        alt={project.title}
        width="1024"
        height="500"
        loading={eager ? "eager" : "lazy"}
        className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    </div>
  ) : (
  <div className="rounded-xl border border-line bg-surface overflow-hidden">
    <div className="flex items-center gap-1.5 px-3 h-7 border-b border-line" aria-hidden="true">
      <span className="w-2.5 h-2.5 rounded-full bg-coral" />
      <span className="w-2.5 h-2.5 rounded-full bg-sun" />
      <span className="w-2.5 h-2.5 rounded-full bg-sky" />
    </div>
    <div className="aspect-[16/10] overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        loading={eager ? "eager" : "lazy"}
        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
    </div>
  </div>
);

const Projects = () => {
  const language = useSelector((state) => state.language);
  const allData = useSelector((state) => state.get_data);
  const tr = language === "turkish";
  const projects = allData[language].projects;

  const featured = projects.find((p) => p.isNew) ?? projects[0];
  const rest = projects.filter((p) => p !== featured);

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 pt-12 md:pt-16">
      <PageHeader
        color="bg-coral"
        title={tr ? "Projeler" : "Projects"}
        subtitle={
          tr
            ? "Telefonda ve tarayıcıda oynanan oyunlar ve araçlar. Hepsi yayında."
            : "Games and tools for your phone and browser. All of them are live."
        }
      />

      <article
        className="group animate-rise grid gap-8 lg:grid-cols-[1.35fr_1fr] items-center p-4 sm:p-6 rounded-3xl bg-surface border border-line"
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

      <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2">
        {rest.map((project, i) => (
          <Reveal
            as="article"
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
