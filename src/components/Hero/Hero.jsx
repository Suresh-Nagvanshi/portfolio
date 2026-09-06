import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import TechCard from "./TechCard";
import { HiArrowRight, HiDownload } from "react-icons/hi";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

const stats = [
  { value: "1+",   label: "Years Exp"      },
  { value: "10+",  label: "Projects"        },
  { value: "3.86", label: "MCA CGPA / 4.0" },
];

function Hero() {
  return (
    <section
      id="home"
      className="section-hero flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16"
      aria-labelledby="hero-heading"
    >
      {/* Glow orbs */}
      <div aria-hidden="true" className="glow" style={{ top: "10%", left: "-8%" }} />
      <div aria-hidden="true" className="glow glow-indigo" style={{ bottom: "5%", right: "-8%", width: "360px", height: "360px" }} />
      <div aria-hidden="true" className="glow glow-rose" style={{ top: "55%", left: "38%", width: "280px", height: "280px" }} />

      {/* ── Left column ── */}
      <motion.div
        className="w-full lg:w-[58%] relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* ── CHAPTER LABEL (story mode) ── */}
        <motion.p variants={itemVariants} className="chapter-label">
          Prologue · The Journey Begins
        </motion.p>

        {/* ── Eyebrow ── */}
        <motion.p
          variants={itemVariants}
          className="text-amber-400 text-sm font-semibold tracking-[0.22em] uppercase mb-3"
        >
          👋 Hello, I am
        </motion.p>

        {/* ── Name ── */}
        <motion.h1
          id="hero-heading"
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight break-words"
        >
          Suresh{" "}
          <span className="gradient-text">Nagvanshi</span>
        </motion.h1>

        {/* ── Typewriter ── */}
        <motion.div
          variants={itemVariants}
          className="text-2xl lg:text-3xl mt-4 h-12 flex items-center"
        >
          <TypeAnimation
            sequence={[
              "Backend Developer",      2000,
              "Spring Boot Engineer",   2000,
              "AI Systems Builder",     2000,
              "Java · Spring Security", 2000,
              "IEEE Researcher",        2000,
            ]}
            speed={55}
            repeat={Infinity}
            className="gradient-text font-bold"
          />
        </motion.div>

        {/* ── Description ── */}
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-lg text-[#9CA3AF] text-base lg:text-lg leading-relaxed"
        >
          Final-year MCA student at Christ University. Building secure, scalable
          backend systems and AI-integrated applications — from internship-grade
          ERP platforms to IEEE-published research.
        </motion.p>

        {/* ── IEEE inline credential (no floating badge) ── */}
        <motion.div
          variants={itemVariants}
          className="mt-5 flex items-center gap-2.5"
        >
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold"
            style={{ color: "#FCD34D" }}
          >
            <span
              className="inline-block w-4 h-4 rounded-full flex-shrink-0"
              style={{ background: "var(--grad-primary)", lineHeight: 1 }}
              aria-hidden="true"
            />
            IEEE Published — ICONICA 2026
          </span>
          <span className="text-[#4B5563] text-xs">·</span>
          <span className="text-xs text-[#6B7280]">FloodSegNet · Multimodal GeoAI</span>
        </motion.div>

        {/* ── CTA Buttons ── */}
        <motion.div variants={itemVariants} className="mt-9 flex flex-wrap gap-4">
          <a href="#projects" className="btn-primary">
            View Projects
            <HiArrowRight className="w-4 h-4" />
          </a>
          <a href="/resume.pdf" download="Suresh_Nagvanshi_Resume.pdf" className="btn-ghost">
            <HiDownload className="w-4 h-4" />
            Resume
          </a>
        </motion.div>

        {/* ── Stats ── */}
        <motion.div variants={itemVariants} className="mt-12 flex flex-wrap gap-8">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-black gradient-text">{s.value}</p>
              <p className="text-[0.68rem] text-[#9CA3AF] mt-0.5 tracking-wide uppercase">{s.label}</p>
            </div>
          ))}
        </motion.div>

      </motion.div>

      {/* ── Right column ── */}
      <div className="w-full lg:w-[42%] relative z-10">
        <TechCard />
      </div>
    </section>
  );
}

export default Hero;
