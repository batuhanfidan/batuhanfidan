import { useSelector } from "react-redux";
import { IoPersonSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";

const About = () => {
  const language = useSelector((state) => state.language);
  const allData = useSelector((state) => state.get_data);

  if (!allData) return null;

  const currentData = allData[language];

  if (!currentData || !currentData.aboutMe) return null;

  const content = currentData.aboutMe;
  if (!content.info) return null;

  return (
    <div
      className="
        w-full h-full flex items-center justify-center px-6 py-39 
        opacity-0 translate-y-4 animate-fade-up
      "
    >
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* PERSONAL INFO */}
        <div
          className="
            bg-white dark:bg-neutral-900 rounded-xl p-8 shadow-xl 
            border border-gray-200 dark:border-neutral-800 
            hover:shadow-2xl transition-all duration-300 
            opacity-0 translate-y-5 animate-fade-up
          "
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-100 dark:bg-neutral-800 rounded-lg">
              <IoPersonSharp className="text-2xl text-gray-800 dark:text-gray-200" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {language === "turkish"
                ? "Kişisel Bilgiler"
                : "Personal Information"}
            </h2>
          </div>

          <div className="flex flex-col gap-5">
            {/* NAME */}
            <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-neutral-800/50 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors">
              <div className="p-2 bg-gray-200 dark:bg-neutral-700 rounded-lg">
                <IoPersonSharp className="text-xl text-gray-700 dark:text-gray-300" />
              </div>
              <div className="flex flex-col">
                <p className="text-gray-500 dark:text-gray-400 font-medium text-xs uppercase tracking-wide">
                  {language === "turkish" ? "İsim" : "Name"}
                </p>
                <p className="text-gray-900 dark:text-white font-semibold">
                  {content.info.name}
                </p>
              </div>
            </div>

            {/* BIRTH */}
            <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-neutral-800/50 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors">
              <div className="p-2 bg-gray-200 dark:bg-neutral-700 rounded-lg">
                <FaCalendarAlt className="text-xl text-gray-700 dark:text-gray-300" />
              </div>
              <div className="flex flex-col">
                <p className="text-gray-500 dark:text-gray-400 font-medium text-xs uppercase tracking-wide">
                  {language === "turkish" ? "Doğum Tarihi" : "Date of Birth"}
                </p>
                <p className="text-gray-900 dark:text-white font-semibold">
                  {content.info.birth}
                </p>
              </div>
            </div>

            {/* LOCATION */}
            <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-neutral-800/50 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors">
              <div className="p-2 bg-gray-200 dark:bg-neutral-700 rounded-lg">
                <FaLocationDot className="text-xl text-gray-700 dark:text-gray-300" />
              </div>
              <div className="flex flex-col">
                <p className="text-gray-500 dark:text-gray-400 font-medium text-xs uppercase tracking-wide">
                  {language === "turkish" ? "Konum" : "Location"}
                </p>
                <p className="text-gray-900 dark:text-white font-semibold">
                  {content.info.location}
                </p>
              </div>
            </div>

            {/* EDUCATION */}
            <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-neutral-800/50 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors">
              <div className="p-2 bg-gray-200 dark:bg-neutral-700 rounded-lg">
                <HiAcademicCap className="text-xl text-gray-700 dark:text-gray-300" />
              </div>
              <div className="flex flex-col">
                <p className="text-gray-500 dark:text-gray-400 font-medium text-xs uppercase tracking-wide">
                  {language === "turkish"
                    ? "Eğitim Durumu"
                    : "Educational Status"}
                </p>
                <p className="text-gray-900 dark:text-white font-semibold">
                  {content.info.education}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ABOUT DESCRIPTION */}
        <div
          className="
            bg-white dark:bg-neutral-900 rounded-xl p-8 shadow-xl 
            border border-gray-200 dark:border-neutral-800 
            hover:shadow-2xl transition-all duration-300
            opacity-0 translate-y-5 animate-fade-up
          "
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gray-900 dark:bg-white rounded-full"></div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {language === "turkish" ? "Hakkımda" : "About Me"}
            </h1>
          </div>

          <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
            {content.desc.map((text, index) => (
              <p
                key={index}
                className="text-justify hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
