import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getDatas, setTurkish, setEnglish } from "../store/actions/action";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const language = useSelector((state) => state.language);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLanguageChange = (lang) => {
    if (lang === "turkish") {
      dispatch(setTurkish());
    } else {
      dispatch(setEnglish());
    }
    dispatch(getDatas());
  };

  // === TRANSLATIONS ===
  const t = {
    home: language === "turkish" ? "Ana Sayfa" : "Home",
    skills: language === "turkish" ? "Yetenekler" : "Skills",
    projects: language === "turkish" ? "Projeler" : "Projects",
    about: language === "turkish" ? "Hakkımda" : "About Me",
  };

  const menuLinkClass = ({ isActive }) =>
    `text-sm hover:underline ${
      isActive ? "font-semibold" : "text-gray-700 dark:text-gray-200"
    }`;

  return (
    <header className="py-4 bg-white dark:bg-[#1e1e1e] border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between px-0">
        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer pl-6"
          onClick={() => navigate("/")}
        >
          <div className="w-4 h-4 rounded-full bg-yellow-400" />
          <div className="flex flex-col">
            <span className="font-semibold text-lg text-black dark:text-white">
              Batuhan Fidan
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Full Stack Developer
            </span>
          </div>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6 pr-6">
          <NavLink to="/" className={menuLinkClass}>
            {t.home}
          </NavLink>

          <NavLink to="/skills" className={menuLinkClass}>
            {t.skills}
          </NavLink>

          <NavLink to="/projects" className={menuLinkClass}>
            {t.projects}
          </NavLink>

          <NavLink to="/about" className={menuLinkClass}>
            {t.about}
          </NavLink>

          {/* LANG */}
          <div className="flex gap-1 items-center border rounded-full px-2 py-1 text-xs">
            <button
              onClick={() => handleLanguageChange("turkish")}
              className={language === "turkish" ? "font-bold" : ""}
            >
              TR
            </button>
            <span>|</span>
            <button
              onClick={() => handleLanguageChange("english")}
              className={language === "english" ? "font-bold" : ""}
            >
              EN
            </button>
          </div>
        </div>

        {/* MOBILE */}
        <div className="md:hidden flex items-center gap-4">
          {/* LANG */}
          <div className="flex gap-1 items-center border rounded-full px-2 py-1 text-xs">
            <button
              onClick={() => handleLanguageChange("turkish")}
              className={language === "turkish" ? "font-bold" : ""}
            >
              TR
            </button>
            <span>|</span>
            <button
              onClick={() => handleLanguageChange("english")}
              className={language === "english" ? "font-bold" : ""}
            >
              EN
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="text-2xl pr-6"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 pb-4 border-t pt-4 pr-6 items-end">
          <NavLink
            to="/"
            className={menuLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            {t.home}
          </NavLink>

          <NavLink
            to="/skills"
            className={menuLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            {t.skills}
          </NavLink>

          <NavLink
            to="/projects"
            className={menuLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            {t.projects}
          </NavLink>

          <NavLink
            to="/about"
            className={menuLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            {t.about}
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
