import { useSelector } from "react-redux";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const EMAIL = "batuhanfidan07@hotmail.com";

const Footer = () => {
  const language = useSelector((state) => state.language);
  const tr = language === "turkish";

  const links = [
    {
      href: "https://www.linkedin.com/in/batuhanfidan07/",
      label: "LinkedIn",
      icon: <FaLinkedinIn />,
    },
    {
      href: "https://github.com/batuhanfidan",
      label: "GitHub",
      icon: <FaGithub />,
    },
    {
      href: `mailto:${EMAIL}`,
      label: tr ? "E-posta" : "Email",
      icon: <HiOutlineMail />,
    },
  ];

  return (
    <footer className="mt-24 border-t border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 grid gap-8 md:grid-cols-[1.4fr_1fr] items-center">
        <div>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-block text-lg text-muted underline decoration-sun decoration-2 underline-offset-4 hover:text-ink transition-colors break-all"
          >
            {EMAIL}
          </a>
          <p className="mt-2 text-sm text-muted">Bursa, Türkiye</p>
        </div>

        <div className="flex flex-col gap-6 md:items-end">
          <ul className="flex gap-3">
            {links.map((link) => {
              const external = link.href.startsWith("http");
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={link.label}
                    title={link.label}
                    className="w-11 h-11 grid place-items-center rounded-full border border-line text-ink text-lg hover:bg-ink hover:text-bg hover:-translate-y-1 transition-all"
                  >
                    {link.icon}
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Batuhan Fidan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
