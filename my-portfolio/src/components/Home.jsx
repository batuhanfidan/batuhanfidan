import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDatas } from "../store/actions/action";
import CircleButton from "./CircleButton";
import foto from "../assets/foto.jpg";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.get_data);
  const language = useSelector((state) => state.language);

  useEffect(() => {
    dispatch(getDatas());
  }, [dispatch]);

  if (!data) return null;

  // === TRANSLATIONS ===
  const t = {
    skills: language === "turkish" ? "Yetenekler" : "Skills",
    projects: language === "turkish" ? "Projeler" : "Projects",
    about: language === "turkish" ? "Hakkımda" : "About Me",
  };

  return (
    <main
      className="
    w-full 
    min-h-[70vh] 
    flex flex-col 
    items-center 
    justify-center 
    gap-5
    px-4 
    pt-20
    lg:flex-row 
    lg:gap-10
    lg:px-10
    bg-white dark:bg-[#111] 
    text-black dark:text-white
  "
    >
      {/* FOTOĞRAF */}
      <div
        className="
      w-[260px] h-[260px]
      sm:w-[340px] sm:h-[340px]
      md:w-[420px] md:h-[420px]
      lg:w-[480px] lg:h-[480px]
      rounded-full overflow-hidden shadow-2xl
      flex-shrink-0
      opacity-0 
      animate-[fadeIn_1.2s_ease-out_forwards]
    "
      >
        <img src={foto} alt="profile" className="w-full h-full object-cover" />
      </div>

      {/* METİN + BUTONLAR */}
      <div
        className="
      max-w-xl 
      flex flex-col 
      items-center 
      text-center      
      lg:items-start 
      lg:text-left

      opacity-0 
      animate-[slideIn_1s_0.3s_ease-out_forwards]
    "
      >
        <h1 className="text-5xl sm:text-6xl font-bold mb-6">
          {data.hero.hello}
        </h1>

        <h2 className="text-lg sm:text-xl font-semibold mb-3">
          {data.hero.aboutTitle}
        </h2>

        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-10 px-2 lg:px-0">
          {data.hero.aboutText}
        </p>

        {/* BUTONLAR */}
        <div
          className="
          flex flex-wrap 
          justify-center 
          gap-6 sm:gap-8
        "
        >
          <CircleButton
            text={t.skills}
            color="bg-yellow-400"
            onClick={() => navigate("/skills")}
          />
          <CircleButton
            text={t.projects}
            color="bg-red-400"
            onClick={() => navigate("/projects")}
          />
          <CircleButton
            text={t.about}
            color="bg-cyan-400"
            onClick={() => navigate("/about")}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
