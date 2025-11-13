const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 dark:bg-[#1e1e1e] text-gray-700 dark:text-gray-300 py-6 px-6 text-sm mt-10 md:mt-16">
      <div className=" mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* LEFT SIDE — Mail + Konum */}
        <div className="flex flex-col items-start">
          <p className="flex items-center gap-2">
            📧 <span>batuhanfidan07@hotmail.com</span>
          </p>
          <p className="flex items-center gap-2">
            📍 <span>Bursa, Türkiye</span>
          </p>
        </div>

        {/* CENTER LINKS */}
        <div className="flex items-center gap-8 text-gray-200 text-sm">
          <a
            href="https://www.linkedin.com/in/batuhanfidan07/"
            className="hover:text-black dark:hover:text-white transition"
            target="_blank"
          >
            Linkedin
          </a>
          <a
            href="https://github.com/batuhanfidan"
            className="hover:text-black dark:hover:text-white transition"
            target="_blank"
          >
            Github
          </a>
          <a
            href="mailto:batuhanfidan07@hotmail.com"
            className="hover:text-black dark:hover:text-white transition"
          >
            Gmail
          </a>
        </div>

        {/* RIGHT COPYRIGHT */}
        <div className="text-gray-400 text-xs whitespace-nowrap text-right">
          © 2025 Created by Batuhan Fidan
        </div>
      </div>
    </footer>
  );
};

export default Footer;
