import { useSelector } from "react-redux";
import { IoPersonSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";

const About = () => {
  const language = useSelector((state) => state.language);
  const allData = useSelector((state) => state.get_data);
  const tr = language === "turkish";
  const { info, desc } = allData[language].aboutMe;

  const facts = [
    { icon: <IoPersonSharp />, label: tr ? "İsim" : "Name", value: info.name },
    { icon: <FaCalendarAlt />, label: tr ? "Doğum tarihi" : "Date of birth", value: info.birth },
    { icon: <FaLocationDot />, label: tr ? "Konum" : "Location", value: info.location },
    { icon: <HiAcademicCap />, label: tr ? "Eğitim" : "Education", value: info.education },
  ];

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 pt-12 md:pt-16">
      <PageHeader element="water" title={tr ? "Hakkımda" : "About me"} />

      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] items-start">
        <dl
          className="animate-rise rounded-3xl bg-surface border border-line divide-y divide-line lg:sticky lg:top-24"
          style={{ animationDelay: "150ms" }}
        >
          {facts.map((fact) => (
            <div key={fact.label} className="flex items-center gap-4 px-6 py-5">
              <span className="w-10 h-10 shrink-0 grid place-items-center rounded-full bg-sky/15 text-sky text-lg">
                {fact.icon}
              </span>
              <div>
                <dt className="text-sm text-muted">{fact.label}</dt>
                <dd className="font-semibold text-ink">{fact.value}</dd>
              </div>
            </div>
          ))}
        </dl>

        <div className="flex flex-col gap-6 max-w-[65ch]">
          {desc.map((text, i) =>
            i === 0 ? (
              <p
                key={i}
                className="animate-rise font-display text-xl sm:text-2xl leading-snug text-ink"
                style={{ animationDelay: "250ms" }}
              >
                {text}
              </p>
            ) : (
              <Reveal as="p" variant="water" key={i} className="text-lg leading-relaxed text-muted">
                {text}
              </Reveal>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
