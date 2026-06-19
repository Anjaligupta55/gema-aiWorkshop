import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import Container from "../ui/Container";

const links = [
  {
    title: "Overview",
    href: "#overview",
  },
  {
    title: "Why Join",
    href: "#why-join",
  },
  {
    title: "Curriculum",
    href: "#roadmap",
  },
  {
    title: "FAQ",
    href: "#faq",
  },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 border-b ${
        scrolled
          ? "bg-white/75 backdrop-blur-md shadow-sm border-slate-200/50 py-3"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo & Tagline */}
          <a
            href="#hero"
            onClick={(e) => handleScrollTo(e, "#hero")}
            className="group flex flex-col items-start focus:outline-none"
          >
            <h1 className="text-2xl font-black tracking-tight text-slate-900 leading-none">
              Robo<span className="text-indigo-600">Spark</span>
            </h1>
            <span className="mt-1 text-[9px] font-bold tracking-widest uppercase text-slate-400 group-hover:text-indigo-600 transition-colors duration-300">
              Future Starts Here
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            <div className="flex gap-8">
              {links.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="relative text-sm font-semibold text-slate-600 transition duration-300 hover:text-indigo-600 focus:outline-none"
                >
                  {link.title}
                </a>
              ))}
            </div>

            <Button
              variant="primary"
              showArrow={false}
              className="px-5 py-2.5 text-sm"
              onClick={(e) => handleScrollTo(e, "#registration")}
            >
              Reserve Your Seat
            </Button>
          </div>

          {/* Mobile Menu Button (Animated Hamburger) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative flex h-10 w-10 flex-col items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 focus:outline-none lg:hidden"
            aria-label="Toggle menu"
          >
            <div className="relative flex h-4 w-5 flex-col justify-between">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="h-0.5 w-5 rounded-full bg-slate-800"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="h-0.5 w-5 rounded-full bg-slate-800"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="h-0.5 w-5 rounded-full bg-slate-800"
              />
            </div>
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-slate-100 bg-white/95 backdrop-blur-lg lg:hidden"
          >
            <Container className="py-6">
              <div className="flex flex-col gap-5">
                {links.map((link) => (
                  <a
                    key={link.title}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-base font-semibold text-slate-600 transition hover:text-indigo-600 py-1"
                  >
                    {link.title}
                  </a>
                ))}
                <div className="border-t border-slate-100 pt-4 mt-2">
                  <Button
                    variant="primary"
                    showArrow={false}
                    className="w-full py-3"
                    onClick={(e) => handleScrollTo(e, "#registration")}
                  >
                    Reserve Your Seat
                  </Button>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;