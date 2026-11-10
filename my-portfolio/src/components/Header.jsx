import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { IoSunny, IoMoon } from "react-icons/io5";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import {
  setTurkish,
  setEnglish,
  toggleDarkMode,
} from "../store/actions/action";
import { sections, sectionLabel } from "../content/sections";

const Header = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language);
  const darkMode = useSelector((state) => state.darkMode);
  const [menuOpen, setMenuOpen] = useState(false);
  const tr = language === "turkish";

  const themeLabel = tr
    ? darkMode
      ? "Açık temaya geç"
      : "Koyu temaya geç"
    : darkMode
      ? "Switch to light mode"
      : "Switch to dark mode";

  const themeButton = (
    <button
      type="button"
      onClick={() => dispatch(toggleDarkMode())}
      aria-label={themeLabel}
      title={themeLabel}
      className="w-9 h-9 grid place-items-center rounded-full border border-line text-ink hover:bg-surface transition-colors"
    >
      <span key={darkMode ? "sun" : "moon"} className="animate-pop">
        {darkMode ? <IoSunny /> : <IoMoon />}
      </span>
    </button>
  );

  const langButton = (lang, label) => {
    const active = language === lang;
    return (
      <button
        type="button"
        onClick={() =>
          dispatch(lang === "turkish" ? setTurkish() : setEnglish())
        }
        aria-pressed={active}
        className={`px-2.5 py-1 rounded-full transition-colors ${
          active ? "bg-ink text-bg font-semibold" : "text-muted hover:text-ink"
        }`}
      >
        {label}
      </button>
    );
  };

  const languageSwitch = (
    <div className="inline-flex items-center gap-0.5 border border-line rounded-full p-0.5 text-xs">
      {langButton("turkish", "TR")}
      {langButton("english", "EN")}
    </div>
  );

  const navLinks = sections.map((s) => (
    <NavLink
      key={s.key}
      to={s.path}
      onClick={() => setMenuOpen(false)}
      className={({ isActive }) =>
        `group flex items-center gap-2 py-1 font-medium transition-colors ${
          isActive ? "text-ink" : "text-muted hover:text-ink"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span
            aria-hidden="true"
            className={`w-2.5 h-2.5 rounded-full ${s.color} transition-transform duration-300 ${
              isActive ? "scale-100" : "scale-0 group-hover:scale-75"
            }`}
          />
          {sectionLabel(s, language)}
        </>
      )}
    </NavLink>
  ));

  return (
    <header className="sticky top-0 z-40 bg-bg/80 backdrop-blur-md border-b border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => setMenuOpen(false)}
        >
          <span aria-hidden="true" className="flex -space-x-1.5">
            <span className="w-4 h-4 rounded-full bg-sun ring-2 ring-bg transition-transform group-hover:-translate-y-1" />
            <span className="w-4 h-4 rounded-full bg-coral ring-2 ring-bg transition-transform delay-75 group-hover:-translate-y-1" />
            <span className="w-4 h-4 rounded-full bg-sky ring-2 ring-bg transition-transform delay-150 group-hover:-translate-y-1" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display font-bold text-lg text-ink">
              Batuhan Fidan
            </span>
            <span className="text-xs text-muted">Full Stack Developer</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm">
          {navLinks}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">{languageSwitch}</div>
          {themeButton}
          <button
            type="button"
            className="md:hidden w-9 h-9 grid place-items-center rounded-full border border-line text-xl"
            aria-label={tr ? "Menüyü aç/kapat" : "Toggle menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden grid transition-[grid-template-rows] duration-300 ease-out ${
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav
            className="flex flex-col gap-3 px-5 pb-5 pt-2 text-lg"
            inert={!menuOpen}
          >
            {navLinks}
            <div className="sm:hidden pt-2">{languageSwitch}</div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
