import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/*
 * CSS @keyframes for the infinite pulsing animations.
 *
 * Framer Motion drives keyframe-array animations (e.g. scale: [0.98, 1.02, 0.98])
 * via JavaScript requestAnimationFrame loops. On mobile browsers, these JS-driven
 * loops often fail to start during initial page load — the browser's rAF scheduler
 * isn't active yet when the component mounts, so the animation never kicks off,
 * leaving the loading screen completely static.
 *
 * Native CSS @keyframes animations run on the browser's compositor thread, which
 * is active from the very first paint. They are immune to JS thread timing and
 * start reliably on every device.
 */
const cssAnimations = `
  @keyframes glow-pulse {
    0%, 100% { transform: scale(0.9); opacity: 0.15; }
    50%      { transform: scale(1.1); opacity: 0.3; }
  }
  @keyframes logo-pulse {
    0%, 100% { transform: scale(0.98); opacity: 0.85; }
    50%      { transform: scale(1.02); opacity: 1; }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to   { opacity: 0.4; }
  }
`;

function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  // Smoothly increment loading progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Snappy increments that slow down near the end (realistic load feeling)
        const increment = Math.max(1, Math.floor((100 - prev) * 0.15));
        return prev + increment;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 w-full h-full bg-[#0A0A0A] z-[9999] flex flex-col items-center justify-center select-none"
    >
      {/* Inject CSS keyframe animations */}
      <style>{cssAnimations}</style>

      {/* Dynamic pulsing circular ambient glow — CSS-driven */}
      <div
        aria-hidden="true"
        className="absolute w-[350px] h-[350px] rounded-full pointer-events-none blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(124,58,237,0.2) 50%, transparent 70%)",
          animation: "glow-pulse 3s ease-in-out infinite",
          willChange: "transform, opacity",
        }}
      />

      {/* Main Logo Content */}
      <div className="relative flex flex-col items-center gap-6 z-10">
        
        {/* Pulsing Suresh.dev Logo — CSS-driven */}
        <div
          style={{
            animation: "logo-pulse 2.2s ease-in-out infinite",
            willChange: "transform, opacity",
          }}
        >
          <div className="text-4xl md:text-5xl font-extrabold tracking-tighter gradient-text select-none cursor-default font-sans">
            Suresh.dev
          </div>
        </div>

        {/* Premium Slim Loading Bar — state-driven width, Framer for smooth transition */}
        <div className="w-48 h-[2px] rounded-full bg-white/[0.04] border border-white/5 overflow-hidden relative">
          <div
            className="absolute left-0 top-0 bottom-0 h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #3B82F6, #7C3AED)",
              boxShadow: "0 0 10px rgba(59,130,246,0.5)",
              transition: "width 0.1s ease-out",
            }}
          />
        </div>

        {/* Loading text feedback — CSS fade-in */}
        <p
          className="text-[10px] text-white tracking-[0.3em] uppercase mt-1 font-semibold"
          style={{
            animation: "fade-in 0.3s ease 0.2s forwards",
            opacity: 0,
          }}
        >
          Loading Systems
        </p>

      </div>
    </motion.div>
  );
}

export default LoadingScreen;
