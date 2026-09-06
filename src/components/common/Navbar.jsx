import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

const NAV_LINKS = [
  { label: "About",      href: "#about"      },
  { label: "Skills",     href: "#skills"     },
  { label: "Projects",   href: "#projects"   },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact"    },
];

function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", "about", "skills", "projects", "experience", "contact"];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between
                  px-6 md:px-10 transition-all duration-300
                  ${ scrolled
                    ? "glass shadow-lg shadow-black/30"
                    : "bg-transparent" }`}
      style={{ height: "var(--nav-height)" }}
      aria-label="Main navigation"
    >
      {/* Brand */}
      <a
        href="#home"
        className="text-lg font-black tracking-tight gradient-text select-none"
        aria-label="Suresh Nagvanshi — home"
      >
        Suresh.dev
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0">
        {NAV_LINKS.map(({ label, href }) => {
          const id    = href.replace("#", "");
          const active = activeSection === id;
          return (
            <li key={label}>
              <a
                href={href}
                className={`text-sm font-medium transition-colors duration-200
                  ${ active ? "text-amber-400" : "text-[#9CA3AF] hover:text-white" }`}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>

      {/* Hire Me CTA */}
      <a
        href="#contact"
        className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
                   text-amber-950 cursor-pointer transition-all duration-200
                   hover:opacity-90 hover:scale-[1.03]"
        style={{ background: "var(--grad-primary)" }}
      >
        Hire Me
      </a>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-white p-1.5 rounded-lg hover:bg-white/10 transition"
        onClick={() => setMobileOpen((p) => !p)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={  { opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="absolute top-full left-0 right-0 glass shadow-xl p-6 flex flex-col gap-4 md:hidden"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-[#9CA3AF] hover:text-amber-400 transition-colors"
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="btn-primary text-center justify-center mt-2"
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
