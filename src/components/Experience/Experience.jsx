import { motion } from "framer-motion";
import experience from "../../data/experience";
import { HiBriefcase, HiAcademicCap } from "react-icons/hi2";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="exp-heading">
      {/* Glow */}
      <div aria-hidden="true" className="glow glow-purple" style={{ top: "20%", right: "-10%", width: "350px", height: "350px" }} />

      {/* Header */}
      <p className="section-label">Timeline</p>
      <h2 id="exp-heading" className="section-title">
        Experience &amp; <span className="gradient-text">Education</span>
      </h2>
      <p className="section-subtitle">
        From the classroom to production — building real systems and advancing research.
      </p>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="timeline-line" />

        <motion.div
          className="space-y-8 pl-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {experience.map((item) => (
            <motion.article
              key={item.id}
              variants={cardVariants}
              className="glass-card p-6 relative"
            >
              {/* Dot on the timeline */}
              <span
                className="timeline-dot absolute"
                style={{ left: "-2.85rem", top: "1.6rem" }}
              />

              {/* Header row */}
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-xl" style={{
                    background: item.type === "work"
                      ? "rgba(79, 142, 247, 0.12)"
                      : "rgba(139, 92, 246, 0.12)",
                    border: item.type === "work"
                      ? "1px solid rgba(79, 142, 247, 0.25)"
                      : "1px solid rgba(139, 92, 246, 0.25)",
                  }}>
                    {item.type === "work"
                      ? <HiBriefcase className="w-4 h-4 text-blue-400" />
                      : <HiAcademicCap className="w-4 h-4 text-purple-400" />
                    }
                  </span>
                  <div>
                    <h3 className="font-bold text-white text-base leading-tight">{item.role}</h3>
                    <p className="text-sm text-blue-400 font-medium mt-0.5">{item.company}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full glass text-[#94A3B8]"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                    {item.duration}
                  </span>
                  {item.badge && (
                    <span className="text-[0.65rem] font-bold px-2.5 py-0.5 rounded-full"
                      style={{
                        background: item.type === "work"
                          ? "rgba(79,142,247,0.15)" : "rgba(139,92,246,0.15)",
                        color: item.type === "work" ? "#93C5FD" : "#C4B5FD",
                        border: item.type === "work"
                          ? "1px solid rgba(79,142,247,0.3)" : "1px solid rgba(139,92,246,0.3)",
                      }}>
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Description bullets */}
              <ul className="space-y-2 mb-4">
                {item.description.map((d, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[#94A3B8] text-sm leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>

              {/* Tech pills */}
              {item.tech && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.tech.map((t) => (
                    <span key={t} className="tech-pill">{t}</span>
                  ))}
                </div>
              )}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Experience;
