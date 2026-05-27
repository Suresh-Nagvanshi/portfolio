import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

// Static map — defined outside component, never recreated
const PROJECT_ICONS = {
  "🔬": { icon: "🔬", gradient: "from-blue-600/25 via-cyan-600/20 to-indigo-600/25"  },
  "🐾": { icon: "🐾", gradient: "from-green-600/25 via-emerald-600/20 to-teal-600/25" },
  "📊": { icon: "📊", gradient: "from-violet-600/25 via-purple-600/20 to-pink-600/25" },
  "⚡": { icon: "⚡", gradient: "from-amber-600/25 via-orange-600/20 to-yellow-600/25" },
  "⛅": { icon: "⛅", gradient: "from-cyan-600/25 via-sky-600/20 to-blue-600/25" },
  "🌦️": { icon: "🌦️", gradient: "from-cyan-600/25 via-sky-600/20 to-blue-600/25" },
  default:  { icon: "📊", gradient: "from-violet-600/25 via-purple-600/20 to-pink-600/25" },
};

function getProjectMeta(icon) {
  return PROJECT_ICONS[icon] || PROJECT_ICONS.default;
}

// Extracted so ProjectCard can receive it from parent stagger
const cardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

function ProjectCard({ project, onViewDetails }) {
  const meta = getProjectMeta(project.icon);

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
      className="glass rounded-2xl overflow-hidden flex flex-col h-full group
                 border border-white/5 hover:border-blue-500/25 transition-colors duration-400"
      aria-label={`Project: ${project.title}`}
    >
      {/* Card banner */}
      <div
        className={`h-28 bg-gradient-to-r ${meta.gradient} relative overflow-hidden
                    flex items-center justify-center flex-shrink-0`}
      >
        {/* Floating icon — animation only on this inner div, not the card */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-14 h-14 rounded-xl glass flex items-center justify-center text-2xl shadow-lg"
          aria-hidden="true"
        >
          {meta.icon}
        </motion.div>

        {/* Stats/Badge — top right */}
        <span
          className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1
                     rounded-full bg-black/40 text-blue-300 border border-blue-500/20"
        >
          {project.badge}
        </span>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-grow gap-4">

        {/* Title */}
        <h3 className="text-lg font-bold leading-snug group-hover:text-blue-300 transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#94A3B8] leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-full bg-white/5 border border-white/8
                         text-xs text-[#94A3B8] hover:border-blue-500/30 hover:text-blue-300
                         transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/8 mt-auto">
          <div className="flex gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${project.title}`}
              className="text-[#94A3B8] hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer"
            >
              <FaGithub size={20} />
            </a>

            {project.live && project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo for ${project.title}`}
                className="text-[#94A3B8] hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer"
              >
                <FiExternalLink size={20} />
              </a>
            )}
          </div>

          <button
            onClick={() => onViewDetails(project)}
            className="text-xs text-[#475569] group-hover:text-blue-400 transition-colors duration-300 font-semibold cursor-pointer focus:outline-none hover:underline"
          >
            View details →
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;