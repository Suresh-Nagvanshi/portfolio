import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import about from "../../data/about";
import emailjs from "@emailjs/browser";

/* ─── Animation Variants ────────────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ─── Component ─────────────────────────────────────────────────── */

function Contact() {
  // Form states
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // Check for active cooldown on mount
  useEffect(() => {
    const savedTimestamp = localStorage.getItem("contact_cooldown_expiry");
    if (savedTimestamp) {
      const remaining = Math.ceil((parseInt(savedTimestamp, 10) - Date.now()) / 1000);
      if (remaining > 0) {
        setCooldown(remaining);
      }
    }
  }, []);

  // Cooldown interval timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          localStorage.removeItem("contact_cooldown_expiry");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsError(false);
    setIsSuccess(false);
    setErrorMessage("");

    // Check cooldown
    if (cooldown > 0) {
      setIsError(true);
      setErrorMessage(`Please wait ${cooldown} seconds before sending another message.`);
      return;
    }

    // Silently handle spam bot submission (Honeypot)
    if (honeypot) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setHoneypot("");
      }, 1000);
      return;
    }

    // Field validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setIsError(true);
      setErrorMessage("All fields are required.");
      return;
    }

    if (!validateEmail(formData.email.trim())) {
      setIsError(true);
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: "", email: "", message: "" });

        // Set 60-second cooldown in localStorage and state
        const expiry = Date.now() + 60000;
        localStorage.setItem("contact_cooldown_expiry", expiry.toString());
        setCooldown(60);

        // Auto dismiss success toast after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      })
      .catch((err) => {
        console.error("EmailJS send failed:", err);
        setIsSubmitting(false);
        setIsError(true);
        setErrorMessage("Failed to send message");
      });
  };

  return (
    <>
      <div className="divider" />

      <section id="contact" className="section relative overflow-hidden">
        {/* Subtle background ambient glow behind section */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-5 blur-[120px]"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, rgba(59,130,246,0.1) 50%, transparent 70%)",
          }}
        />

        <div className="w-full relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-20 items-start">
            
            {/* ══════════════════════════════════════════════════════
                LEFT SIDE (60%): Recruiter Info & Details
            ══════════════════════════════════════════════════════ */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="w-full lg:w-[55%] flex flex-col gap-6"
            >
              <div>
                <p className="section-label">Contact</p>
                <h2 className="section-title text-4xl md:text-5xl font-black mb-6 leading-tight">
                  Let's Build <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Something Great</span>
                </h2>
                <p className="text-base md:text-lg text-[#94A3B8] leading-relaxed max-w-xl">
                  I'm currently open to backend engineering, AI systems, and full-stack opportunities. 
                  Whether you have a specific role or just want to connect, feel free to drop a message!
                </p>
              </div>

              {/* Pulsing Availability Badge */}
              <motion.div
                variants={fadeUp}
                className="inline-flex self-start items-center gap-2.5 px-4.5 py-2 rounded-full
                           bg-green-500/10 border border-green-500/20"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                </span>
                <span className="text-green-400 text-xs font-semibold tracking-wide uppercase">
                  Available for opportunities
                </span>
              </motion.div>

              {/* Info Grid (Email, Location, etc.) */}
              <motion.div
                variants={containerVariants}
                className="grid sm:grid-cols-2 gap-4 mt-4"
              >
                {/* Email item */}
                <motion.a
                  variants={fadeUp}
                  href={`mailto:${about.email}`}
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-3.5 p-4 rounded-2xl glass border border-white/5
                             hover:border-blue-500/20 hover:bg-white/[0.03] transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20 transition-all">
                    <HiOutlineMail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold">Email</p>
                    <p className="text-sm text-white font-medium group-hover:text-blue-300 transition-colors">{about.email}</p>
                  </div>
                </motion.a>

                {/* Location item */}
                <motion.div
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-3.5 p-4 rounded-2xl glass border border-white/5
                             hover:border-indigo-500/20 hover:bg-white/[0.03] transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/20 transition-all">
                    <HiOutlineLocationMarker size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold">Location</p>
                    <p className="text-sm text-white font-medium">India</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Social Channels */}
              <motion.div variants={fadeUp} className="mt-2">
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-widest mb-3">Professional Networks</p>
                <div className="flex gap-3">
                  {/* LinkedIn */}
                  <motion.a
                    href={about.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center glass border border-white/5 text-[#94A3B8]
                               hover:text-white hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10 transition-all duration-300"
                    aria-label="LinkedIn Profile"
                  >
                    <FaLinkedin size={18} />
                  </motion.a>
                  {/* GitHub */}
                  <motion.a
                    href={about.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center glass border border-white/5 text-[#94A3B8]
                               hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300"
                    aria-label="GitHub Profile"
                  >
                    <FaGithub size={18} />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            {/* ══════════════════════════════════════════════════════
                RIGHT SIDE (40%): Premium Glassmorphism Contact Form
            ══════════════════════════════════════════════════════ */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -4 }}
              className="w-full lg:w-[45%] relative rounded-3xl p-[1px] group transition-all duration-500"
              style={{
                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(124, 58, 237, 0.2))",
              }}
            >
              {/* Soft ambient outer glow behind form on hover */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(124, 58, 237, 0.12))",
                }}
              />

              {/* Form Container */}
              <div className="relative bg-[#0A0A0A]/90 backdrop-blur-xl rounded-[23px] p-6 sm:p-8 border border-white/5 overflow-hidden">
                
                {/* Form Ambient Interior Glowing Orb */}
                <div
                  aria-hidden="true"
                  className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full pointer-events-none opacity-40 blur-3xl"
                  style={{
                    background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
                  }}
                />

                <h3 className="text-xl font-bold text-white mb-6 relative z-10">Send a Message</h3>

                {/* Form Element */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4.5 relative z-10">
                  {/* Honeypot field for anti-spam bot prevention */}
                  <div className="absolute opacity-0 pointer-events-none -z-10 w-0 h-0 overflow-hidden" aria-hidden="true">
                    <label htmlFor="form-bot-field">Do not fill this out if you are a human</label>
                    <input
                      type="text"
                      id="form-bot-field"
                      name="botField"
                      tabIndex="-1"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      autoComplete="off"
                    />
                  </div>

                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-name" className="text-xs text-[#64748B] font-semibold tracking-wide uppercase">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="form-name"
                      name="name"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting || cooldown > 0}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white text-sm 
                                 placeholder-[#475569] focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.04]
                                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30
                                 disabled:opacity-50 transition-all duration-300"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-email" className="text-xs text-[#64748B] font-semibold tracking-wide uppercase">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="form-email"
                      name="email"
                      required
                      placeholder="johndoe@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting || cooldown > 0}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white text-sm 
                                 placeholder-[#475569] focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.04]
                                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30
                                 disabled:opacity-50 transition-all duration-300"
                    />
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-message" className="text-xs text-[#64748B] font-semibold tracking-wide uppercase">
                      Your Message
                    </label>
                    <textarea
                      id="form-message"
                      name="message"
                      required
                      rows="4"
                      placeholder="How can I help you?"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting || cooldown > 0}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white text-sm 
                                 placeholder-[#475569] focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.04]
                                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30
                                 disabled:opacity-50 transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Action Button & Confirmation */}
                  <div className="mt-2 flex flex-col gap-3">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: (isSubmitting || cooldown > 0) ? 1 : 1.02 }}
                      whileTap={{ scale: (isSubmitting || cooldown > 0) ? 1 : 0.98 }}
                      disabled={isSubmitting || cooldown > 0 || !formData.name || !formData.email || !formData.message}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white
                                 cursor-pointer select-none transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed
                                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
                      style={{
                        background: "linear-gradient(135deg, #3B82F6, #7C3AED)",
                        boxShadow: "0 4px 20px rgba(59, 130, 246, 0.25)",
                      }}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </div>
                      ) : cooldown > 0 ? (
                        <span>Please wait {cooldown}s</span>
                      ) : (
                        <span>Send Message →</span>
                      )}
                    </motion.button>

                    {/* Success Toast */}
                    <AnimatePresence>
                      {isSuccess && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center gap-2.5 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs mt-1"
                        >
                          <HiOutlineCheckCircle size={16} className="flex-shrink-0" />
                          <p className="leading-normal font-medium">
                            Message sent successfully 🚀
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Error Toast */}
                    <AnimatePresence>
                      {isError && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs mt-1"
                        >
                          <span className="flex-shrink-0 text-red-400 font-bold">⚠️</span>
                          <p className="leading-normal font-medium">
                            {errorMessage || "Failed to send message"}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
