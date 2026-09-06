import { motion } from "framer-motion";

const TECH_STACK = [
  { label: "Java",        color: "from-orange-500/20 to-orange-500/5 border-orange-500/25 text-orange-300" },
  { label: "Spring Boot", color: "from-green-500/20  to-green-500/5  border-green-500/25  text-green-300"  },
  { label: "AI / ML",     color: "from-amber-500/20  to-amber-500/5  border-amber-500/25  text-amber-300"  },
  { label: "MERN Stack",  color: "from-indigo-500/20 to-indigo-500/5 border-indigo-500/25 text-indigo-300" },
  { label: "PostgreSQL",  color: "from-sky-500/20    to-sky-500/5    border-sky-500/25    text-sky-300"    },
  { label: "TensorFlow",  color: "from-rose-500/20   to-rose-500/5   border-rose-500/25   text-rose-300"   },
  { label: "NestJS",      color: "from-red-500/20    to-red-500/5    border-red-500/25    text-red-300"    },
  { label: "Docker",      color: "from-cyan-500/20   to-cyan-500/5   border-cyan-500/25   text-cyan-300"   },
];

const cardVariants = {
  hidden:  { opacity: 0, x: 40 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
  },
};

const tagVariants = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: (i) => ({
    opacity: 1, scale: 1,
    transition: { delay: 0.5 + i * 0.07, duration: 0.35, ease: "easeOut" },
  }),
};

function TechCard() {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileInView={{ y: [0, -10, 0] }}
      transition={{ y: { repeat: Infinity, duration: 5.5, ease: "easeInOut" } }}
      className="glass p-8 rounded-3xl relative overflow-hidden"
      aria-label="Tech stack overview"
    >
      {/* Ambient glow inside card */}
      <div
        aria-hidden="true"
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)", pointerEvents: "none" }}
      />

      <p className="mb-5 text-[0.65rem] font-bold tracking-[0.28em] uppercase text-amber-400/70">
        Tech Stack
      </p>

      <div className="flex flex-wrap gap-2.5">
        {TECH_STACK.map((tech, i) => (
          <motion.span
            key={tech.label}
            custom={i}
            variants={tagVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.07, transition: { duration: 0.15 } }}
            className={`bg-gradient-to-br ${tech.color} border px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-default select-none`}
          >
            {tech.label}
          </motion.span>
        ))}
      </div>

      <p className="mt-6 text-[0.6rem] text-white/25 tracking-[0.25em] uppercase">
        Full-Stack · Backend · AI
      </p>
    </motion.div>
  );
}

export default TechCard;
