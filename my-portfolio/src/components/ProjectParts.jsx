import { Link } from "react-router-dom";
import { FaGithub, FaGooglePlay } from "react-icons/fa";
import { HiOutlineExternalLink, HiOutlinePhotograph } from "react-icons/hi";

export const TechList = ({ items }) => (
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

const primary =
  "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-bg text-sm font-semibold hover:-translate-y-0.5 transition-transform";
const secondary =
  "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line text-ink text-sm font-semibold hover:border-ink transition-colors";

export const ProjectLinks = ({ project, tr, showDetails = true }) => (
  <div className="flex flex-wrap gap-3">
    {project.store && (
      <a href={project.store} target="_blank" rel="noopener noreferrer" className={primary}>
        <FaGooglePlay />
        {tr ? "Google Play'de aç" : "Get it on Google Play"}
      </a>
    )}
    {project.website && (
      <a href={project.website} target="_blank" rel="noopener noreferrer" className={primary}>
        <HiOutlineExternalLink />
        {tr ? "Siteyi aç" : "Open site"}
      </a>
    )}
    {showDetails && project.slug && (
      <Link to={`/projects/${project.slug}`} className={secondary}>
        <HiOutlinePhotograph />
        {tr ? "Ekran görüntüleri" : "Screenshots"}
      </Link>
    )}
    {project.github && (
      <a href={project.github} target="_blank" rel="noopener noreferrer" className={secondary}>
        <FaGithub />
        {tr ? "Kodu gör" : "View code"}
      </a>
    )}
  </div>
);

export const Screenshot = ({ project, eager = false }) =>
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
    <div className="ember-target rounded-xl border border-line bg-surface overflow-hidden">
      <div
        className="flex items-center gap-1.5 px-3 h-7 border-b border-line"
        aria-hidden="true"
      >
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
