const CircleButton = ({ text, color, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-32 h-32 rounded-full ${color} flex items-center justify-center text-lg font-semibold shadow-md hover:scale-105 transition`}
    >
      {text}
    </button>
  );
};

export default CircleButton;
