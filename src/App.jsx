import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/common/Navbar";
import Hero from "./components/Hero/Hero";
import AuroraBackground from "./components/common/AuroraBackground";
import Projects from "./components/Projects/Projects";
import Experience from "./components/Experience/Experience";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Contact from "./components/Contact/Contact";
import Footer from "./components/common/Footer";
import LoadingScreen from "./components/common/LoadingScreen";

// Story-mode chapter metadata — consumed by each section via data-chapter
const CHAPTERS = [
  { id: "home",       num: "00", label: "Prologue"        },
  { id: "about",      num: "01", label: "Chapter 1"       },
  { id: "skills",     num: "02", label: "Chapter 2"       },
  { id: "projects",   num: "03", label: "Chapter 3"       },
  { id: "experience", num: "04", label: "Chapter 4"       },
  { id: "contact",    num: "05", label: "Epilogue"        },
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [chapter,   setChapter]   = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // Track active chapter for the story-mode progress bar
  useEffect(() => {
    if (isLoading) return;
    const observers = CHAPTERS.map((ch, idx) => {
      const el = document.getElementById(ch.id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setChapter(idx); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [isLoading]);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loader" />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <AuroraBackground />
          <Navbar />

          {/* ── Story progress bar (fixed right edge) ───────── */}
          <div
            className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3"
            aria-hidden="true"
          >
            {CHAPTERS.map((ch, idx) => (
              <a
                key={ch.id}
                href={`#${ch.id}`}
                title={`${ch.label} — ${ch.num}`}
                className="flex flex-col items-center gap-1 group"
              >
                <span
                  className="block w-1.5 rounded-full transition-all duration-400"
                  style={{
                    height: idx === chapter ? "28px" : "10px",
                    background: idx === chapter
                      ? "var(--grad-primary)"
                      : "rgba(255,255,255,0.18)",
                    boxShadow: idx === chapter
                      ? "0 0 10px rgba(245,158,11,0.6)" : "none",
                  }}
                />
                <span
                  className="text-[0.55rem] font-bold tracking-widest uppercase transition-opacity duration-300"
                  style={{
                    color: idx === chapter ? "#FCD34D" : "#4B5563",
                    opacity: idx === chapter ? 1 : 0.6,
                  }}
                >
                  {ch.num}
                </span>
              </a>
            ))}
          </div>

          <main className="relative z-10">
            <Hero />
            <div className="divider" />
            <About />
            <div className="divider" />
            <Skills />
            <div className="divider" />
            <Projects />
            <div className="divider" />
            <Experience />
            <div className="divider" />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
