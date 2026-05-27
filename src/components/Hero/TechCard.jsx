import { motion } from "framer-motion";

// Defined outside component — never recreated on re-renders
const TECH_STACK = [
  { label: "Java",         color: "from-orange-500/20 to-orange-500/10 border-orange-500/20 text-orange-300" },
  { label: "Spring Boot",  color: "from-green-500/20  to-green-500/10  border-green-500/20  text-green-300"  },
  { label: "AI / ML",      color: "from-purple-500/20 to-purple-500/10 border-purple-500/20 text-purple-300" },
  { label: "MERN Stack",   color: "from-blue-500/20   to-blue-500/10   border-blue-500/20   text-blue-300"   },
  { label: "PostgreSQL",   color: "from-sky-500/20    to-sky-500/10    border-sky-500/20    text-sky-300"    },
  { label: "TensorFlow",   color: "from-yellow-500/20 to-yellow-500/10 border-yellow-500/20 text-yellow-300" },
];

const cardVariants = {
  hidden:  { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
  },
};

const tagVariants = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.5 + i * 0.07, duration: 0.35, ease: "easeOut" },
  }),
};

function TechCard() {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      // Smooth float — reduced amplitude (12px), easeInOut for organic feel
      whileInView={{ y: [0, -12, 0] }}
      transition={{
        y: { repeat: Infinity, duration: 5, ease: "easeInOut" },
      }}
      className="glass p-8 rounded-3xl relative overflow-hidden"
      aria-label="Tech stack overview"
    >
      {/* Subtle ambient gradient behind card */}
      <div
        aria-hidden="true"
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <h3 className="mb-6 text-lg font-semibold text-white/80 tracking-wide uppercase text-xs">
        Tech Stack
      </h3>

      <div className="flex flex-wrap gap-3">
        {TECH_STACK.map((tech, i) => (
          <motion.span
            key={tech.label}
            custom={i}
            variants={tagVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.06, transition: { duration: 0.15 } }}
            className={`bg-gradient-to-br ${tech.color} border px-4 py-2 rounded-full text-sm font-medium cursor-default select-none`}
          >
            {tech.label}
          </motion.span>
        ))}
      </div>

      {/* Bottom tagline */}
      <p className="mt-6 text-xs text-white/30 tracking-widest uppercase">
        Full-stack · Backend · AI
      </p>
    </motion.div>
  );
}

export default TechCard;