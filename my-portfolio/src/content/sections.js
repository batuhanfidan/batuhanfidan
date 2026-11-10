export const elements = {
  air: { color: "bg-sun", text: "text-sun", tr: "Hava", en: "Air" },
  water: { color: "bg-sky", text: "text-sky", tr: "Su", en: "Water" },
  earth: { color: "bg-leaf", text: "text-leaf", tr: "Toprak", en: "Earth" },
  fire: { color: "bg-coral", text: "text-coral", tr: "Ateş", en: "Fire" },
};

export const sections = [
  { path: "/skills", key: "skills", element: "earth", tr: "Yetenekler", en: "Skills" },
  { path: "/projects", key: "projects", element: "fire", tr: "Projeler", en: "Projects" },
  { path: "/about", key: "about", element: "water", tr: "Hakkımda", en: "About me" },
].map((s) => ({ ...s, color: elements[s.element].color }));

export const sectionLabel = (section, language) =>
  language === "turkish" ? section.tr : section.en;

export const elementForPath = (pathname) => {
  const match = sections.find((s) => pathname.startsWith(s.path));
  return match ? match.element : "air";
};
