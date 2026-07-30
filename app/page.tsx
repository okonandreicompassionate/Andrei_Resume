"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "/contact" },
];

const SKILLS = [
  {
    icon: "⬡",
    name: "React & Next.js",
    desc: "App Router, SSR, streaming, optimized rendering pipelines.",
  },
  {
    icon: "◈",
    name: "TypeScript",
    desc: "Type-safe architecture that scales across teams and products.",
  },
  {
    icon: "◻",
    name: "UI Engineering",
    desc: "Design systems, accessibility, and component-driven development.",
  },
  {
    icon: "◎",
    name: "Motion",
    desc: "Framer Motion, spring physics, orchestrated sequences.",
  },
  {
    icon: "⊞",
    name: "Supabase",
    desc: "Auth, realtime, and Postgres — full-stack from the frontend.",
  },
  {
    icon: "⊹",
    name: "Tailwind CSS",
    desc: "Rapid, precise styling with a utility-first approach.",
  },
  {
    icon: "◀",
    name: "Redux & State",
    desc: "Complex state management, middleware, and data flow optimization.",
  },
  {
    icon: "⬢",
    name: "Performance",
    desc: "Core Web Vitals, bundle optimization, and rendering performance.",
  },
  {
    icon: "◉",
    name: "REST APIs",
    desc: "API integration, error handling, and data serialization.",
  },
  {
    icon: "▲",
    name: "Figma & Design",
    desc: "Component design, prototyping, and collaborative design systems.",
  },
];

const EXPERIENCE = [
  {
    period: "2025 — Now",
    role: "Frontend Engineer",
    company: "Geeks Challenge",
    desc: "Building scalable interfaces, dashboards, and modern web applications using React, Next.js, and TypeScript. Shipped multiple production products including multi-purpose forms and SaaS platforms.",
  },
  {
    period: "2026 — Now",
    role: "Web Developer",
    company: "Zora Communications Limited",
    desc: "Landing pages, admin panels, and API integrations — focused on performance and user experience.",
  },
];

const PROJECTS = [
  {
    image: "https://i.imgur.com/rqzP3yK.png",
    name: "EXILES",
    desc: "Dark luxury streetwear e-commerce — cart, Paystack payments, admin dashboard, and live inventory.",
    tag: "Next.js + Supabase",
    live: true,
    link: "",
  },
  {
    image: "https://i.imgur.com/M3gdyHq.png",
    name: "LoisTech",
    desc: "Smart home e-commerce platform with a full product system, shop, cart, and NDPR-compliant privacy.",
    tag: "Next.js + Paystack",
    live: true,
    link: "https://shop.loistech.com.ng/shop",
  },
  {
    image: "https://i.imgur.com/toVygWr.png",
    name: "Vendorfy",
    desc: "Nigerian vendor trust micro-service — AI-powered trust scores, community reviews, and a REST API.",
    tag: "Next.js + Groq",
    live: true,
    link: "https://check-vendor.vercel.app/",
  },
  {
    image: "https://i.imgur.com/Re649MR.png",
    name: "Analytics Dashboard",
    desc: "Real-time data visualisation platform with RTK Query, responsive layouts, and adaptive charts.",
    tag: "React + Redux",
    live: false,
    link: "https://assesment-sage-iota.vercel.app/",
  },
];

const STATS = [
  { value: "20+", label: "Projects shipped" },
  { value: "2+", label: "Years building" },
  { value: "∞", label: "Attention to detail" },
];

// ─── Magnetic cursor blob ─────────────────────────────────────────────────────

function CursorBlob() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!blobRef.current) return;
      blobRef.current.style.transform = `translate3d(${e.clientX - 200}px, ${e.clientY - 200}px, 0)`;
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={blobRef}
      style={{
        position: "fixed",
        width: 400,
        height: 400,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(78,204,163,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
        transform: "translate3d(0px, 0px, 0)",
        willChange: "transform",
      }}
    />
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        frame = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Desktop nav */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="nav-desktop"
        style={{
          position: "fixed",
          top: 16,
          left: "33%",
          transform: "translateX(-50%)",
          zIndex: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          padding: "10px 22px",
          borderRadius: 100,
          background: scrolled
            ? "rgba(255,255,255,0.10)"
            : "rgba(255,255,255,0.05)",
          backdropFilter: "blur(40px) saturate(200%)",
          WebkitBackdropFilter: "blur(40px) saturate(200%)",
          border: "0.5px solid rgba(255,255,255,0.15)",
          transition: "background 0.3s, box-shadow 0.3s",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.3)" : "none",
        }}
      >
        {NAV_LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.45)",
              padding: "6px 14px",
              borderRadius: 100,
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.9)";
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.45)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            {l.label}
          </a>
        ))}
      </motion.nav>

      {/* Mobile hamburger */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setMenuOpen(!menuOpen)}
        className="nav-hamburger"
        aria-label="Toggle menu"
        style={{
          position: "fixed",
          top: 20,
          left: "5%",
          transform: "translateX(-50%)",
          zIndex: 300,
          display: "none",
          flexDirection: "column",
          gap: 5,
          background: scrolled
            ? "rgba(255,255,255,0.10)"
            : "rgba(255,255,255,0.05)",
          border: "0.5px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(40px) saturate(200%)",
          WebkitBackdropFilter: "blur(40px) saturate(200%)",
          cursor: "pointer",
          padding: "12px 34px",
          borderRadius: 100,
          transition: "background 0.3s, box-shadow 0.3s",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.3)" : "none",
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={
              menuOpen
                ? i === 0
                  ? { rotate: 45, y: 8 }
                  : i === 1
                    ? { opacity: 0, scaleX: 0 }
                    : { rotate: -45, y: -8 }
                : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
            }
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{
              display: "block",
              width: 20,
              height: 1.5,
              background: "rgba(255,255,255,0.7)",
              borderRadius: 2,
              transformOrigin: "center",
            }}
          />
        ))}
      </motion.button>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(40px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              background: "rgba(13,17,23,0.88)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 16 }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: 36,
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  color: "rgba(255,255,255,0.85)",
                  textDecoration: "none",
                  padding: "10px 32px",
                  borderRadius: 16,
                  transition: "color 0.2s",
                }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 80px",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "7px 18px",
            borderRadius: 100,
            background: "rgba(29,158,117,0.12)",
            border: "0.5px solid rgba(29,158,117,0.28)",
            marginBottom: 36,
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#4ecca3",
              display: "block",
            }}
          />
          <span
            style={{ fontSize: 12, color: "#4ecca3", letterSpacing: "0.04em" }}
          >
            Available for new projects
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 28 }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(72px, 13vw, 140px)",
              fontWeight: 300,
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              color: "rgba(255,255,255,0.92)",
            }}
          >
            Andrei
          </h1>
          <h2
            style={{
              margin: "8px 0 0",
              fontSize: "clamp(72px, 13vw, 140px)",
              fontWeight: 300,
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              color: "rgba(255,255,255,0.22)",
            }}
          >
            Okon
          </h2>
        </motion.div>

        {/* Role tag */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.22em" }}
          transition={{ delay: 0.9, duration: 0.9 }}
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Frontend Engineer
        </motion.p>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.7, duration: 0.7 }}
          style={{
            maxWidth: 440,
            margin: "0 auto 44px",
            fontSize: 15,
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.4)",
            fontWeight: 300,
          }}
        >
          I build fast, precise web experiences with React, Next.js, and
          TypeScript. I care about what the interface feels like — not just what
          it does.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.85, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <GlassButton href="#work">View projects</GlassButton>
          <SolidButton href="/contact">Get in touch</SolidButton>
          <motion.a
            href="https://github.com/okonandreicompassionate"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 22px",
              borderRadius: 100,
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "0.5px solid rgba(255,255,255,0.16)",
              textDecoration: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            GitHub
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ scaleY: [1, 0.3, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 1,
          height: 32,
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
          transformOrigin: "top",
        }}
      />
    </section>
  );
}

// ─── Buttons ──────────────────────────────────────────────────────────────────

function GlassButton({
  children,
  href = "#",
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      style={{
        display: "inline-block",
        padding: "13px 26px",
        borderRadius: 100,
        fontSize: 14,
        fontWeight: 500,
        textDecoration: "none",
        color: "rgba(255,255,255,0.8)",
        background: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "0.5px solid rgba(255,255,255,0.16)",
        cursor: "pointer",
      }}
    >
      {children}
    </motion.a>
  );
}

function SolidButton({
  children,
  href = "#",
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      style={{
        display: "inline-block",
        padding: "13px 26px",
        borderRadius: 100,
        fontSize: 14,
        fontWeight: 500,
        textDecoration: "none",
        color: "#0d1117",
        background: "rgba(255,255,255,0.92)",
        cursor: "pointer",
      }}
    >
      {children}
    </motion.a>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({
  id,
  children,
  style = {},
}: {
  id?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <section
      id={id}
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "80px 20px",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 11,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.2)",
        marginBottom: 28,
      }}
    >
      {children}
    </p>
  );
}

// ─── Fade-in on scroll — more dramatic ───────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── Glass card ───────────────────────────────────────────────────────────────

function Glass({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.08)",
        border: "0.5px solid rgba(255,255,255,0.12)",
        borderRadius: 20,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────

function Stats() {
  return (
    <Section style={{ paddingTop: 0 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
        }}
      >
        {STATS.map(({ value, label }, i) => (
          <FadeIn key={label} delay={i * 0.1}>
            <motion.div
              whileHover={{ scale: 1.03, y: -3 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
            >
              <Glass style={{ padding: "28px 20px", textAlign: "center" }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    fontSize: 40,
                    fontWeight: 300,
                    letterSpacing: "-0.04em",
                    color: "rgba(255,255,255,0.88)",
                  }}
                >
                  {value}
                </motion.div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.3)",
                    marginTop: 5,
                  }}
                >
                  {label}
                </div>
              </Glass>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <Section id="about" style={{ paddingTop: 20 }}>
      <SectionLabel>About</SectionLabel>
      <FadeIn>
        <Glass
          style={{ padding: "clamp(28px, 5vw, 48px) clamp(24px, 5vw, 44px)" }}
        >
          <p
            style={{
              fontSize: "clamp(15px, 2.5vw, 18px)",
              fontWeight: 300,
              lineHeight: 1.85,
              color: "rgba(255,255,255,0.48)",
              maxWidth: 640,
            }}
          >
            I'm a frontend engineer who cares about{" "}
            <span style={{ color: "rgba(255,255,255,0.88)", fontWeight: 400 }}>
              performance, accessibility, and craft.
            </span>{" "}
            I enjoy building systems that are technically sound and genuinely
            pleasurable — where every interaction feels considered and nothing
            is accidental.
          </p>
          <div
            style={{
              marginTop: 28,
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {["Lagos, Nigeria", "Open to remote", "Full-time & Freelance"].map(
              (tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.35)",
                    background: "rgba(255,255,255,0.05)",
                    border: "0.5px solid rgba(255,255,255,0.10)",
                    borderRadius: 100,
                    padding: "5px 14px",
                  }}
                >
                  {tag}
                </span>
              ),
            )}
          </div>
        </Glass>
      </FadeIn>
    </Section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <Section id="skills">
      <SectionLabel>Skills</SectionLabel>
      <div
        style={{
          display: "grid",
          gap: 18,
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        {SKILLS.map(({ icon, name, desc }) => (
          <motion.div
            key={name}
            whileHover={{ y: -3, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            style={{ minHeight: 200 }}
          >
            <Glass
              style={{
                padding: "26px 24px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  marginBottom: 14,
                  color: "rgba(255,255,255,0.45)",
                  fontWeight: 300,
                }}
              >
                {icon}
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.85)",
                  marginBottom: 8,
                }}
              >
                {name}
              </div>
              <div
                style={{
                  fontSize: 13,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.34)",
                  flex: 1,
                }}
              >
                {desc}
              </div>
            </Glass>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────

function Experience() {
  return (
    <Section id="experience">
      <SectionLabel>Experience</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {EXPERIENCE.map(({ period, role, company, desc }, i) => (
          <FadeIn key={role} delay={i * 0.1}>
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <Glass
                style={{
                  padding: "clamp(22px, 4vw, 32px) clamp(20px, 4vw, 36px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 16,
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 6,
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 16,
                          fontWeight: 500,
                          color: "rgba(255,255,255,0.85)",
                        }}
                      >
                        {role}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.35)",
                          background: "rgba(255,255,255,0.05)",
                          border: "0.5px solid rgba(255,255,255,0.09)",
                          borderRadius: 100,
                          padding: "2px 10px",
                        }}
                      >
                        {company}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        lineHeight: 1.7,
                        color: "rgba(255,255,255,0.38)",
                      }}
                    >
                      {desc}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.22)",
                      letterSpacing: "0.06em",
                      whiteSpace: "nowrap",
                      paddingTop: 3,
                    }}
                  >
                    {period}
                  </div>
                </div>
              </Glass>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function Projects() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <Section id="work">
      <SectionLabel>Projects</SectionLabel>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 10,
        }}
      >
        {PROJECTS.map(({ image, name, desc, tag, live, link }, i) => (
          <FadeIn key={name} delay={i * 0.07}>
            <motion.a
              href={link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onHoverStart={() => setHovered(name)}
              onHoverEnd={() => setHovered(null)}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
              style={{
                display: "block",
                textDecoration: "none",
                background:
                  hovered === name
                    ? "rgba(255,255,255,0.10)"
                    : "rgba(255,255,255,0.055)",
                backdropFilter: "blur(28px) saturate(180%)",
                WebkitBackdropFilter: "blur(28px) saturate(180%)",
                border:
                  hovered === name
                    ? "0.5px solid rgba(255,255,255,0.22)"
                    : "0.5px solid rgba(255,255,255,0.12)",
                borderRadius: 20,
                padding: "26px 26px 28px",
                cursor: "pointer",
                position: "relative",
                transition: "background 0.25s, border 0.25s",
                height: "100%",
              }}
            >
              {/* Thumbnail */}
              <motion.div
                animate={{ scale: hovered === name ? 1.03 : 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  height: 110,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.04)",
                  border: "0.5px solid rgba(255,255,255,0.07)",
                  marginBottom: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 30,
                  color: "rgba(255,255,255,0.13)",
                  overflow: "hidden",
                }}
              >
                {image ? (
                  <motion.img
                    src={image}
                    alt={name}
                    animate={{
                      scale: hovered === name ? 1.3 : 1,
                      rotate: hovered === name ? 15 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 16 }}
                    style={{
                      width: "80%",
                      height: "80%",
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                ) : (
                  <div
                    style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}
                  >
                    No image
                  </div>
                )}
              </motion.div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.32)",
                    background: "rgba(255,255,255,0.05)",
                    border: "0.5px solid rgba(255,255,255,0.09)",
                    borderRadius: 100,
                    padding: "3px 10px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {tag}
                </span>
                {live && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: 11,
                      color: "#4ecca3",
                      background: "rgba(29,158,117,0.1)",
                      border: "0.5px solid rgba(29,158,117,0.22)",
                      borderRadius: 100,
                      padding: "3px 10px",
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "#4ecca3",
                        display: "block",
                      }}
                    />
                    Live
                  </span>
                )}
              </div>

              <div
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.85)",
                  marginBottom: 8,
                }}
              >
                {name}
              </div>
              <div
                style={{
                  fontSize: 13,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                {desc}
              </div>

              <motion.span
                animate={{
                  opacity: hovered === name ? 1 : 0,
                  x: hovered === name ? 0 : -6,
                  y: hovered === name ? 0 : 6,
                }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute",
                  top: 22,
                  right: 22,
                  fontSize: 18,
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                ↗
              </motion.span>
            </motion.a>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

// ─── Background ───────────────────────────────────────────────────────────────

function Background() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {[
        { bg: "#1a3a5c", w: 700, h: 600, top: "-120px", left: "-180px" },
        { bg: "#0f2d1f", w: 560, h: 560, top: "35%", right: "-120px" },
        { bg: "#1c1030", w: 500, h: 500, bottom: "8%", left: "18%" },
      ].map(({ bg, w, h, ...pos }, i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.26, 0.2] }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
          style={{
            position: "absolute",
            width: w,
            height: h,
            borderRadius: "50%",
            background: bg,
            filter: "blur(100px)",
            ...pos,
          }}
        />
      ))}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0d1117; overflow-x: hidden; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          background: "#0d1117",
          color: "#f0f4f8",
          minHeight: "100vh",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        <Background />
        <CursorBlob />

        <div style={{ position: "relative", zIndex: 1 }}>
          <Nav />
          <Hero />
          <Stats />
          <About />
          <Skills />
          <Experience />
          <Projects />

          <footer
            style={{
              textAlign: "center",
              padding: "28px 20px",
              fontSize: 12,
              color: "rgba(255,255,255,0.14)",
            }}
          >
            © {new Date().getFullYear()} Andrei Okon · Powered by Next.js
          </footer>
        </div>
      </div>
    </>
  );
}
