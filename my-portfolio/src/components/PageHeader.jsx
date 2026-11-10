const PageHeader = ({ color, title, subtitle }) => (
  <header className="mb-12 md:mb-16">
    <div className="flex items-center gap-4 animate-rise">
      <span
        aria-hidden="true"
        className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${color} animate-ball-drop shrink-0`}
      />
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
