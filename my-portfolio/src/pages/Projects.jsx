import { useSelector } from "react-redux";

const Projects = () => {
  const language = useSelector((state) => state.language);
  const data = useSelector((state) => state.get_data);

  if (!data || !data.projects) return null;

  return (
    <section className="max-w-6xl mx-auto mt-12 px-6 pb-20">
      {/* PAGE TITLE */}
      <h1
        className="
          text-4xl font-bold mb-16 
          opacity-0 
          translate-y-4 
          transition-all 
          duration-700 
          animate-fade-up
        "
      >
        {language === "turkish" ? "Projeler" : "Projects"}
      </h1>

      {/* PROJECT LIST */}
      <div className="flex flex-col gap-32">
        {data.projects.map((project, index) => (
          <div
            key={index}
            className="
              grid 
              grid-cols-1 
              md:grid-cols-2 
              gap-10
              items-start
              opacity-0 
              translate-y-8 
              transition-all 
              duration-700 
              animate-fade-up
            "
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {/* LEFT SIDE */}
            <div
              className="
                bg-gray-100 
                dark:bg-neutral-800 
                p-6 
                rounded-xl 
                shadow-sm 
                h-full  
                flex 
                flex-col 
                justify-between 
                gap-6
                opacity-0 
                translate-y-3 
                transition-all 
                duration-700 
                animate-fade-up
              "
            >
              <h2 className="text-xl font-bold text-black dark:text-white">
                {project.title}
              </h2>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-3 ">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="
                      px-3 py-1 
                      rounded-full 
                      bg-gray-200 
                      dark:bg-neutral-700 
                      text-sm 
                      text-gray-800 
                      dark:text-gray-100
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-6 mt-auto">
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 underline hover:opacity-80"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 0l3 9h-6l3-9z"
                      />
                    </svg>
                    {language === "turkish" ? "Web Sitesi" : "Visit Website"}
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 underline hover:opacity-80"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.43 7.86 10.96.57.1.77-.25.77-.55v-2.1c-3.2.7-3.87-1.38-3.87-1.38-.52-1.3-1.28-1.64-1.28-1.64-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.2-3.12-.12-.3-.52-1.5.12-3.12 0 0 .97-.32 3.18 1.19a11.1 11.1 0 0 1 5.8 0c2.2-1.51 3.17-1.19 3.17-1.19.64 1.62.24 2.82.12 3.12.75.82 1.2 1.86 1.2 3.12 0 4.43-2.68 5.4-5.24 5.68.4.35.76 1.04.76 2.1v3.12c0 .3.2.66.78.55A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                    </svg>
                    GitHub
                  </a>
                )}
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <img
              src={project.image}
              alt={project.title}
              className="
                w-full 
                rounded-lg 
                object-cover
                opacity-0 
                translate-y-3 
                transition-all 
                duration-700 
                animate-fade-up
              "
              style={{ animationDelay: `${index * 0.25}s` }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
