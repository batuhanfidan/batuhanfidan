import { useState } from "react";
import { elements, elementForPath } from "../content/sections";

const RouteBar = ({ pathname }) => {
  const [previous, setPrevious] = useState(pathname);
  const [bar, setBar] = useState(null);

  if (pathname !== previous) {
    setPrevious(pathname);
    setBar({ id: pathname, element: elementForPath(pathname) });
  }

  if (!bar) return null;

  return (
    <div
      key={bar.id}
      aria-hidden="true"
      onAnimationEnd={() => setBar(null)}
      className={`fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none origin-left ${elements[bar.element].color} animate-route-bar`}
    />
  );
};

export default RouteBar;
