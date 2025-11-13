import { useSelector } from "react-redux";

const Skills = () => {
  const language = useSelector((state) => state.language);
  const data = useSelector((state) => state.get_data);

  if (!data || !data.skills) return null;

  return (
    <section className="max-w-6xl mx-auto mt-12 px-6 bg-white dark:bg-[#111] text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-6">
        {language === "turkish" ? "Yeteneklerim" : "My Skills"}
      </h1>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-8">
        {language === "turkish"
          ? "Kullandığım teknolojiler ve araçlar aşağıdadır."
          : "Here are the technologies and tools I use."}
      </p>

      {/* GRID */}
      <div
        className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-5 
          xl:grid-cols-6 
          gap-10 
          place-items-center

          opacity-0 
          animate-[skillsFade_0.7s_ease-out_forwards]
        "
      >
        {data.skills.map((skill, index) => (
          <div
            key={index}
            className="
              flex 
              flex-col 
              items-center 
              gap-3 
              transition-all 
              duration-200 
              hover:scale-110
              cursor-pointer

              opacity-0
              animate-[popItem_0.6s_ease-out_forwards]
            "
            style={{
              animationDelay: `${index * 0.08}s`, // sırayla gelsin
            }}
          >
            <img
              src={skill.image}
              alt={skill.name}
              className="w-28 h-28 object-contain drop-shadow-lg"
            />
            <span className="text-sm sm:text-base text-gray-700 dark:text-gray-200 text-center">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
