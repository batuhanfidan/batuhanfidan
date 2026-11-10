const marks = {
  air: (
    <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M12 12a1.6 1.6 0 0 1 1.6 1.6 3.2 3.2 0 0 1-3.2 3.2A4.8 4.8 0 0 1 5.6 12 6.4 6.4 0 0 1 12 5.6a8 8 0 0 1 8 8" />
      <path d="M3 19h7" opacity="0.6" />
    </g>
  ),
  water: (
    <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M2.5 9.5c1.6-1.8 3.2-1.8 4.8 0s3.2 1.8 4.8 0 3.2-1.8 4.8 0 3.2 1.8 4.6 0" />
      <path d="M2.5 15.5c1.6-1.8 3.2-1.8 4.8 0s3.2 1.8 4.8 0 3.2-1.8 4.8 0 3.2 1.8 4.6 0" opacity="0.6" />
    </g>
  ),
  earth: (
    <g fill="currentColor">
      <path d="M2.5 19.5 9 8.5l3.4 5.6 2.1-3.1 7 8.5z" />
      <rect x="2.5" y="20.5" width="19" height="1.6" rx="0.8" opacity="0.6" />
    </g>
  ),
  fire: (
    <path
      fill="currentColor"
      d="M12.4 2.5c.9 3.3 5.3 5.3 5.3 10.7a5.7 5.7 0 0 1-11.4 0c0-2.8 1.5-4.5 2.7-5.6.3 1.8 1.1 2.9 2.2 3.4-.1-3.4-.6-6 1.2-8.5z"
    />
  ),
};

const ElementMark = ({ element, className = "", animated = true }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    className={`overflow-visible ${className}`}
  >
    <g className={animated ? `el-${element}` : ""}>{marks[element]}</g>
  </svg>
);

export default ElementMark;
