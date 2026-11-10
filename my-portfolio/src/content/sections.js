export const sections = [
  { path: "/skills", key: "skills", color: "bg-sun", tr: "Yetenekler", en: "Skills" },
  { path: "/projects", key: "projects", color: "bg-coral", tr: "Projeler", en: "Projects" },
  { path: "/about", key: "about", color: "bg-sky", tr: "Hakkımda", en: "About me" },
];

export const sectionLabel = (section, language) =>
  language === "turkish" ? section.tr : section.en;
