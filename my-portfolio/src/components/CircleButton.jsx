const CircleButton = ({ text, color, onClick, delay = 0 }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ animationDelay: `${delay}ms` }}
      className={`animate-ball-drop w-28 h-28 sm:w-32 sm:h-32 rounded-full ${color} text-[#151826] font-display font-bold text-base sm:text-lg flex items-center justify-center text-center leading-tight px-3 shadow-[0_10px_0_-2px_rgba(21,24,38,0.18)] transition-transform duration-200 hover:-translate-y-1.5 hover:rotate-[-4deg] active:translate-y-0.5 active:scale-95`}
    >
      {text}
    </button>
  );
};

export default CircleButton;
