import { useSelector } from "react-redux";
import PageHeader from "../components/PageHeader";

const tilts = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1"];

const Skills = () => {
  const language = useSelector((state) => state.language);
  const allData = useSelector((state) => state.get_data);
  const tr = language === "turkish";
  const skills = allData[language].skills;

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 pt-12 md:pt-16">
      <PageHeader
        color="bg-sun"
        title={tr ? "Yetenekler" : "Skills"}
        subtitle={
          tr
            ? "Projelerimde kullandığım diller, kütüphaneler ve araçlar."
            : "The languages, libraries and tools I use in my projects."
        }
      />

      <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
        {skills.map((skill, index) => (
          <li
            key={skill.name}
            className="animate-pop flex flex-col items-center gap-3"
            style={{ animationDelay: `${200 + index * 45}ms` }}
          >
            <div
              className={`group w-full aspect-square max-w-[120px] rounded-3xl bg-white border border-line p-4 sm:p-5 grid place-items-center shadow-[0_8px_0_-3px_var(--line)] ${tilts[index % tilts.length]} hover:rotate-0 hover:-translate-y-2 hover:shadow-[0_14px_0_-3px_var(--sun)] transition-all duration-300`}
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
        ))}
      </ul>
    </section>
  );
};

export default Skills;
