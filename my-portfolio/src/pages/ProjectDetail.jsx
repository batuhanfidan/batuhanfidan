import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { HiArrowLeft, HiChevronLeft, HiChevronRight, HiX } from "react-icons/hi";
import { TechList, ProjectLinks } from "../components/ProjectParts";
import NotFound from "./NotFound";

const ProjectDetail = () => {
  const { slug } = useParams();
  const language = useSelector((state) => state.language);
  const allData = useSelector((state) => state.get_data);
  const tr = language === "turkish";
  const project = allData[language].projects.find((p) => p.slug === slug);

  const [openIndex, setOpenIndex] = useState(null);
  const dialogRef = useRef(null);
  const gallery = project?.gallery ?? [];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openIndex !== null && !dialog.open) dialog.showModal();
    if (openIndex === null && dialog.open) dialog.close();
  }, [openIndex]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") setOpenIndex((i) => (i + 1) % gallery.length);
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, gallery.length]);

  if (!project) return <NotFound />;

  const step = (delta) =>
    setOpenIndex((i) => (i + delta + gallery.length) % gallery.length);

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 pt-10 md:pt-14">
      <Link
        to="/projects"
        className="animate-rise inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink transition-colors"
      >
        <HiArrowLeft />
        {tr ? "Tüm projeler" : "All projects"}
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.1fr] items-center">
        <div className="flex flex-col gap-5">
          <h1
            className="animate-rise font-display font-extrabold text-5xl md:text-6xl tracking-tight text-ink"
            style={{ animationDelay: "80ms" }}
          >
            {project.title}
          </h1>
          <p
            className="animate-rise text-lg text-muted leading-relaxed max-w-[60ch]"
            style={{ animationDelay: "160ms" }}
          >
            {project.description}
          </p>
          <div className="animate-rise flex flex-col gap-5" style={{ animationDelay: "240ms" }}>
            <TechList items={project.technologies} />
            <ProjectLinks project={project} tr={tr} showDetails={false} />
          </div>
        </div>
        <img
          src={project.image}
          alt=""
          width="1024"
          height="500"
          className="animate-pop w-full h-auto rounded-2xl border border-line"
          style={{ animationDelay: "200ms" }}
        />
      </div>

      {gallery.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display font-bold text-2xl text-ink mb-6">
            {tr ? "Ekran görüntüleri" : "Screenshots"}
          </h2>
          <ul className="-mx-5 px-5 md:mx-0 md:px-0 flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4">
            {gallery.map((shot, i) => (
              <li
                key={shot.src}
                className="animate-rise snap-start shrink-0 w-[46%] sm:w-[30%] lg:w-[calc((100%-4*1.25rem)/5)]"
                style={{ animationDelay: `${300 + i * 80}ms` }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  className="group block w-full rounded-2xl overflow-hidden border border-line bg-surface"
                  aria-label={`${shot.alt} — ${tr ? "büyüt" : "enlarge"}`}
                >
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    width="540"
                    height="1080"
                    loading="lazy"
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </button>
                <p className="mt-2 text-sm text-muted text-center">{shot.alt}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <dialog
        ref={dialogRef}
        onClose={() => setOpenIndex(null)}
        onClick={(e) => e.target === e.currentTarget && setOpenIndex(null)}
        className="m-auto bg-transparent p-0 backdrop:bg-black/80 max-w-none max-h-none"
      >
        {openIndex !== null && (
          <div className="relative flex items-center gap-3 sm:gap-6 p-4">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={tr ? "Önceki" : "Previous"}
              className="w-11 h-11 grid place-items-center rounded-full bg-white/10 text-white text-2xl hover:bg-white/20"
            >
              <HiChevronLeft />
            </button>
            <figure className="flex flex-col items-center gap-3">
              <img
                key={gallery[openIndex].src}
                src={gallery[openIndex].src}
                alt={gallery[openIndex].alt}
                className="animate-pop max-h-[82vh] w-auto rounded-2xl"
              />
              <figcaption className="text-white/80 text-sm">
                {gallery[openIndex].alt} · {openIndex + 1}/{gallery.length}
              </figcaption>
            </figure>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={tr ? "Sonraki" : "Next"}
              className="w-11 h-11 grid place-items-center rounded-full bg-white/10 text-white text-2xl hover:bg-white/20"
            >
              <HiChevronRight />
            </button>
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label={tr ? "Kapat" : "Close"}
              className="absolute top-0 right-0 w-10 h-10 grid place-items-center rounded-full bg-white/10 text-white text-xl hover:bg-white/20"
            >
              <HiX />
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
};

export default ProjectDetail;
