import { motion } from "framer-motion";

// Type badge config — maps role patterns to display types
function getEntryType(role) {
  const r = role.toLowerCase();
  if (r.includes("lead") || r.includes("developer") || r.includes("engineer")) return "work";
  return "education";
}

const TYPE_STYLES = {
  work:      { dot: "#3B82F6", badge: "bg-blue-500/15 text-blue-400 border-blue-500/25",      label: "Work"      },
  education: { dot: "#7C3AED", badge: "bg-purple-500/15 text-purple-400 border-purple-500/25", label: "Education" },
};

function TimelineCard({ item, index }) {
  const type  = item.type ?? "work";
  const style = TYPE_STYLES[type] ?? TYPE_STYLES.work;

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}       // Small x offset — no overflow risk
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="relative pb-10 last:pb-0"
    >
      {/* Timeline dot — absolutely positioned to sit on the vertical line */}
      <div
        aria-hidden="true"
        className="absolute top-7 w-3 h-3 rounded-full border-2 border-[#0A0A0A] z-10
                   -left-[2.375rem] lg:-left-[2.875rem]"
        style={{
          background: style.dot,
          boxShadow: `0 0 12px ${style.dot}80`,
        }}
      />

      {/* Card */}
      <motion.div
        whileHover={{ x: 4, transition: { duration: 0.2 } }}
        className="glass rounded-2xl p-7 border border-white/5 hover:border-white/10
                   transition-colors duration-300 max-w-2xl"
      >
        {/* Top row: duration + type badge */}
        <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
          <p className="text-blue-400 text-sm font-medium">{item.duration}</p>
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${style.badge}`}
          >
            {style.label}
          </span>
        </div>

        {/* Role */}
        <h3 className="text-xl font-bold leading-tight mb-1">{item.role}</h3>

        {/* Company */}
        <p className="text-[#94A3B8] text-sm font-medium mb-5">{item.company}</p>

        {/* Bullet points */}
        <ul className="space-y-2.5">
          {item.description.map((point, i) => (
            <li key={i} className="flex gap-3 items-start text-sm text-[#94A3B8] leading-relaxed">
              <span className="text-blue-400 mt-0.5 flex-shrink-0">▸</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

export default TimelineCard;