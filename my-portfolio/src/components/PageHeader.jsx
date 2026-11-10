import ElementMark from "./ElementMark";
import { elements } from "../content/sections";

const PageHeader = ({ element, title, subtitle }) => (
  <header className="mb-12 md:mb-16">
    <div className="flex items-center gap-4 animate-rise">
      <span
        aria-hidden="true"
        className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${elements[element].color} text-[#151826] grid place-items-center animate-ball-drop shrink-0`}
      >
        <ElementMark element={element} className="w-6 h-6 md:w-7 md:h-7" />
      </span>
      <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight text-ink">
        {title}
      </h1>
    </div>
    {subtitle && (
      <p
        className="mt-4 max-w-xl text-muted text-base md:text-lg animate-rise"
        style={{ animationDelay: "120ms" }}
      >
        {subtitle}
      </p>
    )}
  </header>
);

export default PageHeader;
