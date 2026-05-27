/**
 * Premium Tech Dot Grid + Ambient Depth Glow Background.
 * - Layer 1: Three premium stationary, highly blurred HSL ambient glows (blue, purple, and deep indigo)
 *            that create rich visual depth behind the grid pattern.
 * - Layer 2: Structured, high-tech SVG-style micro-dot grid pattern overlay.
 * - 100% static & pure CSS-based: No mouse event listeners, no JavaScript render loops, 
 *   no CPU overhead, and completely lag-free on all mobile and desktop devices.
 */
function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background: "#0A0A0A",
        overflow: "hidden",
      }}
    >
      {/* ── Layer 1: Ambient Deep Glows (Provides stable, premium visual depth) ── */}
      {/* Top Left soft blue ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          left: "-10%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.07) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      
      {/* Middle Right soft deep indigo ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          right: "-10%",
          width: "45vw",
          height: "45vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Bottom Left soft purple ambient glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* ── Layer 2: High-Tech Micro-Dot Grid Pattern Overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.065) 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
          opacity: 1,
        }}
      />

      {/* Subtle bottom fade to transition cleanly into the pure black footer */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "15vh",
          background: "linear-gradient(to top, #0A0A0A 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

export default AuroraBackground;
