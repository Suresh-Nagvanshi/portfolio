import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import TechCard from "./TechCard";
import { HiArrowRight, HiDownload } from "react-icons/hi";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

function Hero() {
  return (
    <section
      id="home"
      className="section-hero flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16"
      aria-labelledby="hero-heading"
    >
      {/* ── Ambient glow orbs ─────────────────────────────── */}
      <div
        aria-hidden="true"
        className="glow"
        style={{ top: "15%", left: "-5%", animationDelay: "0s" }}
      />
      <div
        aria-hidden="true"
        className="glow glow-purple"
        style={{ top: "40%", right: "-5%", width: "300px", height: "300px" }}
      />

      {/* ── Left column — text ────────────────────────────── */}
      <motion.div
        className="w-full lg:w-[58%] relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.p
          variants={itemVariants}
          className="text-blue-400 text-sm font-medium tracking-[0.2em] uppercase mb-4"
        >
          👋 Hello, I am
        </motion.p>

        {/* Name — sole h1 on page */}
        <motion.h1
          id="hero-heading"
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight break-words"
        >
          Suresh{" "}
          <span className="gradient-text">Nagvanshi</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          variants={itemVariants}
          className="text-2xl lg:text-3xl mt-4 h-12 flex items-center"
        >
          <TypeAnimation
            sequence={[
              "Backend Developer",      2000,
              "AI Systems Builder",     2000,
              "Java · Spring Boot",     2000,
              "Problem Solver",         2000,
            ]}
            speed={55}
            repeat={Infinity}
            className="gradient-text font-bold"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-lg text-[#94A3B8] text-base lg:text-lg leading-relaxed"
        >
          Building scalable backend systems and intelligent applications
          powered by AI — from concept to production.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            id="cta-view-projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
                       bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm
                       hover:scale-105 transition-all duration-300 cursor-pointer
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          >
            View Projects
            <HiArrowRight className="w-4 h-4" />
          </a>

          <a
            href="/resume.pdf"
            id="cta-download-resume"
            download="Suresh_Nagvanshi_Resume.pdf"
            className="inline-flex items-center gap-2 glass px-7 py-3.5 rounded-xl
                       text-white font-semibold text-sm
                       hover:bg-white/10 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]
                       transition-all duration-300 cursor-pointer
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <HiDownload className="w-4 h-4" />
            Resume
          </a>
        </motion.div>

        {/* Social proof / quick stats */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex gap-8"
        >
          {[
            { value: "1+",  label: "Years Experience" },
            { value: "10+", label: "Projects Built"   },
            { value: "5+",  label: "Tech Domains"     },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-[#94A3B8] mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Right column — TechCard ──────────────────────── */}
      <div className="w-full lg:w-[42%] relative z-10">
        <TechCard />
      </div>
    </section>
  );
}

export default Hero;
