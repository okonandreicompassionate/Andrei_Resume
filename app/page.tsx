"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import {
  LazyMotion,
  MotionConfig,
  animate,
  domAnimation,
  m,
  useInView,
  useScroll,
  useSpring,
} from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
];

const SECTION_IDS = ["home", "work", "about", "skills", "experience"];

const GITHUB = "https://github.com/okonandreicompassionate";

const MARQUEE = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Supabase",
  "Redux Toolkit",
  "Paystack",
  "REST APIs",
  "Figma",
];

const SKILL_GROUPS = [
  {
    title: "Interface",
    note: "Where most of my time goes.",
    items: [
      "React",
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "Ant Design",
      "Framer Motion",
    ],
  },
  {
    title: "Data and state",
    note: "Keeping the UI honest about what the server says.",
    items: ["Redux Toolkit", "RTK Query", "Axios", "REST APIs", "WebSockets"],
  },
  {
    title: "Backend and shipping",
    note: "Enough full-stack to own a feature end to end.",
    items: ["Supabase", "Express", "Paystack", "Vercel", "Git and GitHub"],
  },
  {
    title: "Design",
    note: "I design before I build.",
    items: ["Figma", "Design systems", "Accessibility", "Responsive layouts"],
  },
];

const EXPERIENCE = [
  {
    period: "2025 to now",
    role: "Frontend Engineer",
    company: "Geeks Challenge",
    desc: "Building scalable interfaces, dashboards, and web apps with React, Next.js, and TypeScript. Shipped multiple production products, including multi-purpose forms and SaaS platforms.",
  },
  {
    period: "2026 to now",
    role: "Web Developer",
    company: "Zora Communications Limited",
    desc: "Landing pages, admin panels, and API integrations, with a focus on performance and user experience.",
  },
];

type Project = {
  image: string;
  name: string;
  desc: string;
  tag: string;
  live: boolean;
  link: string;
};

const PROJECTS: Project[] = [
  {
    image: "https://i.imgur.com/rqzP3yK.png",
    name: "EXILES",
    desc: "Dark luxury streetwear store with cart, Paystack payments, an admin dashboard, and live inventory.",
    tag: "Next.js + Supabase",
    live: true,
    link: "https://exiles-final.vercel.app", // swap if your live URL changed
  },
  {
    image: "https://i.imgur.com/M3gdyHq.png",
    name: "LoisTech",
    desc: "Smart home e-commerce with a full product system, shop, cart, and NDPR-compliant privacy.",
    tag: "Next.js + Paystack",
    live: true,
    link: "https://shop.loistech.com.ng/shop",
  },
  {
    image: "https://i.imgur.com/toVygWr.png",
    name: "Vendorfy",
    desc: "Vendor trust lookup for Nigeria: AI trust scores, community reviews, and a REST API.",
    tag: "Next.js + Groq",
    live: true,
    link: "https://check-vendor.vercel.app/",
  },
  {
    image: "https://i.imgur.com/Re649MR.png",
    name: "Analytics Dashboard",
    desc: "Real-time data visualisation with RTK Query, responsive layouts, and adaptive charts.",
    tag: "React + Redux",
    live: false,
    link: "https://assesment-sage-iota.vercel.app/",
  },
];

const STATS = [
  { to: 20, suffix: "+", label: "Projects shipped" },
  { to: 2, suffix: "+", label: "Years building" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Cursor spotlight: writes CSS variables straight to the DOM.
// No React state, so moving the mouse never re-renders anything.
function onSpot(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

const EASE = [0.16, 1, 0.3, 1] as const;

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

function SectionTitle({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mb-10">
      <h2 className="text-3xl font-light tracking-tight text-white/90 sm:text-4xl">
        {title}
      </h2>
      {note && <p className="mt-3 max-w-md text-sm text-white/40">{note}</p>}
    </div>
  );
}

// ─── Scroll progress ─────────────────────────────────────────────────────────

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <m.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[400] h-[2px] origin-left bg-[#4ecca3]"
    />
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el,
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const base =
    "rounded-full px-3 py-1.5 text-[13px] whitespace-nowrap transition-colors sm:px-4";

  return (
    <m.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      aria-label="Primary"
      className="fixed left-1/2 top-4 z-[300] flex max-w-[calc(100vw-24px)] -translate-x-1/2 items-center gap-0.5 overflow-x-auto rounded-full border border-white/10 bg-[#0d1117]/70 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl [scrollbar-width:none]"
    >
      {NAV_LINKS.map((l) => {
        const id = l.href.slice(1);
        const on = active === id;
        return (
          <a
            key={l.label}
            href={l.href}
            aria-current={on ? "true" : undefined}
            className={`${base} ${
              on
                ? "bg-white/10 text-white"
                : "text-white/45 hover:bg-white/5 hover:text-white/90"
            }`}
          >
            {l.label}
          </a>
        );
      })}
      <Link
        href="/contact"
        className="ml-1 rounded-full bg-white/90 px-3 py-1.5 text-[13px] font-medium whitespace-nowrap text-[#0d1117] transition-transform hover:scale-[1.04] sm:px-4"
      >
        Contact
      </Link>
    </m.nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function RevealWord({
  children,
  delay,
  dim,
}: {
  children: string;
  delay: number;
  dim?: boolean;
}) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <m.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: EASE, delay }}
        className={`block ${dim ? "text-white/20" : "text-white/95"}`}
      >
        {children}
      </m.span>
    </span>
  );
}

function Hero() {
  const loop = [...MARQUEE, ...MARQUEE];

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-10 pt-32"
    >
      <div className="mx-auto w-full max-w-[1100px]">
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#4ecca3]/25 bg-[#4ecca3]/10 px-4 py-1.5"
        >
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#4ecca3]" />
          <span className="text-xs text-[#4ecca3]">
            Available for new projects
          </span>
        </m.div>

        <h1 className="text-[clamp(64px,15vw,168px)] font-light leading-[0.9] tracking-[-0.045em]">
          <RevealWord delay={0.15}>Andrei</RevealWord>
          <RevealWord delay={0.3} dim>
            Okon
          </RevealWord>
        </h1>

        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: EASE }}
          className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-md text-[15px] font-light leading-[1.8] text-white/45">
            Frontend engineer in Lagos. I build fast web products with React,
            Next.js, and TypeScript, and I care about how the interface feels,
            not just what it does.
          </p>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="#work"
              className="rounded-full border border-white/15 bg-white/[0.07] px-6 py-3 text-sm font-medium text-white/80 transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              View projects
            </a>
            <Link
              href="/contact"
              className="rounded-full bg-white/90 px-6 py-3 text-sm font-medium text-[#0d1117] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Get in touch
            </Link>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-5 py-3 text-sm font-medium text-white/80 transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              GitHub
            </a>
          </div>
        </m.div>
      </div>

      {/* Tech marquee: pure CSS, runs on the compositor */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        aria-hidden
        className="marquee-mask mt-20 overflow-hidden"
      >
        <div className="marquee">
          {loop.map((t, i) => (
            <span
              key={i}
              className="mx-6 text-sm font-light text-white/25 sm:mx-9"
            >
              {t}
            </span>
          ))}
        </div>
      </m.div>
    </section>
  );
}

// ─── Work ────────────────────────────────────────────────────────────────────

function ProjectCard({
  p,
  featured,
}: {
  p: Project;
  featured: boolean;
}) {
  const inner = (
    <>
      <div
        className={`overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.03] ${
          featured ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[16/10]"
        }`}
      >
        <img
          src={p.image}
          alt={`${p.name} screenshot`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-white/40">
          {p.tag}
        </span>
        {p.live && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4ecca3]/25 bg-[#4ecca3]/10 px-2.5 py-0.5 text-[11px] text-[#4ecca3]">
            <span className="h-[5px] w-[5px] rounded-full bg-[#4ecca3]" />
            Live
          </span>
        )}
      </div>

      <h3 className="mt-3 text-lg font-normal text-white/90">{p.name}</h3>
      <p className="mt-1.5 max-w-lg text-[13px] leading-[1.7] text-white/40">
        {p.desc}
      </p>

      {p.link && (
        <span
          aria-hidden
          className="absolute right-5 top-5 text-lg text-white/0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-white/70 [transform:translate(-6px,6px)] group-hover:[transform:translate(0,0)]"
        >
          ↗
        </span>
      )}
    </>
  );

  const cls = `spot group relative block rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-white/20 ${
    featured ? "md:col-span-2" : ""
  }`;

  return p.link ? (
    <a
      href={p.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onSpot}
      className={cls}
      aria-label={`${p.name} (opens in a new tab)`}
    >
      {inner}
    </a>
  ) : (
    <div onMouseMove={onSpot} className={cls}>
      {inner}
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="mx-auto max-w-[1100px] px-5 py-24">
      <SectionTitle
        title="Selected work"
        note="Real products, most of them live. Click any card to open the site."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.name} p={p} featured={i === 0} />
        ))}
      </div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="mx-auto max-w-[1100px] px-5 py-24">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <div>
          <SectionTitle title="About" />
          <p className="max-w-xl text-[clamp(17px,2.4vw,22px)] font-light leading-[1.7] text-white/45">
            I'm a frontend engineer who cares about{" "}
            <span className="text-white/90">
              performance, accessibility, and craft.
            </span>{" "}
            I like building things that are technically sound and a pleasure to
            use, where every interaction feels considered and nothing is
            accidental.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["Lagos, Nigeria", "Open to remote", "Full-time and freelance"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs text-white/40"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="flex flex-row gap-8 md:flex-col md:justify-end md:gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="border-l border-white/10 pl-5">
              <div className="text-5xl font-light tracking-tight text-white/90 tabular-nums">
                <Counter to={s.to} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs text-white/35">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Skills ──────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-[1100px] px-5 py-24">
      <SectionTitle title="Skills" note="What I reach for, grouped by what it's for." />
      <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
        {SKILL_GROUPS.map((g) => (
          <div
            key={g.title}
            className="grid gap-4 py-7 md:grid-cols-[1fr_2fr] md:gap-10"
          >
            <div>
              <h3 className="text-base text-white/85">{g.title}</h3>
              <p className="mt-1 text-[13px] text-white/35">{g.note}</p>
            </div>
            <ul className="flex flex-wrap content-start gap-2">
              {g.items.map((it) => (
                <li
                  key={it}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[13px] text-white/60 transition-colors hover:border-[#4ecca3]/40 hover:text-white/90"
                >
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Experience ──────────────────────────────────────────────────────────────

function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-[1100px] px-5 py-24">
      <SectionTitle title="Experience" />
      <ol className="relative ml-1.5 border-l border-white/10">
        {EXPERIENCE.map((e) => (
          <li key={e.role} className="relative pb-12 pl-8 last:pb-0">
            <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border border-[#4ecca3]/60 bg-[#07080b]" />
            <div className="text-xs text-white/30">{e.period}</div>
            <h3 className="mt-1 text-lg text-white/90">
              {e.role}{" "}
              <span className="text-white/35">at {e.company}</span>
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-[1.75] text-white/40">
              {e.desc}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

// ─── Contact CTA ─────────────────────────────────────────────────────────────

function ContactCTA() {
  return (
    <section className="mx-auto max-w-[1100px] px-5 pb-28 pt-12">
      <div
        onMouseMove={onSpot}
        className="spot rounded-[28px] border border-white/10 bg-white/[0.04] px-7 py-16 text-center sm:px-12"
      >
        <h2 className="mx-auto max-w-xl text-[clamp(30px,5vw,52px)] font-light leading-[1.1] tracking-tight text-white/90">
          Got something worth building? Let's talk.
        </h2>
        <p className="mx-auto mt-4 max-w-sm text-sm text-white/40">
          I take on freelance projects and full-time roles. Tell me what you're
          making and I'll reply fast.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          <Link
            href="/contact"
            className="rounded-full bg-white/90 px-7 py-3 text-sm font-medium text-[#0d1117] transition hover:-translate-y-0.5 hover:bg-white"
          >
            Start a project
          </Link>
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/15 bg-white/[0.07] px-7 py-3 text-sm font-medium text-white/80 transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            See my code
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Background (static, zero animation cost) ───────────────────────────────

function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: [
          "radial-gradient(900px 600px at -5% -8%, rgba(26,58,92,0.55), transparent 70%)",
          "radial-gradient(700px 600px at 108% 42%, rgba(15,45,31,0.55), transparent 70%)",
          "radial-gradient(700px 600px at 20% 108%, rgba(28,16,48,0.55), transparent 70%)",
          "#07080b",
        ].join(","),
      }}
    />
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
          html { scroll-behavior: smooth; scroll-padding-top: 88px; }
          body { background: #07080b; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
          ::selection { background: rgba(78,204,163,0.3); }

          .spot > * { position: relative; }
          .spot::before {
            content: ""; position: absolute; inset: 0; opacity: 0; pointer-events: none;
            transition: opacity .3s;
            background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(78,204,163,0.10), transparent 60%);
          }
          @media (hover: hover) { .spot:hover::before { opacity: 1; } }

          .marquee { display: flex; width: max-content; animation: marq 45s linear infinite; }
          .marquee-mask { mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent); }
          @keyframes marq { to { transform: translateX(-50%); } }

          .pulse-dot { animation: pulse 2s ease-in-out infinite; }
          @keyframes pulse { 50% { opacity: .35; transform: scale(1.5); } }

          a:focus-visible { outline: 2px solid #4ecca3; outline-offset: 3px; }

          @media (prefers-reduced-motion: reduce) {
            .marquee, .pulse-dot { animation: none; }
            html { scroll-behavior: auto; }
          }
        `}</style>

        <div className="relative min-h-screen overflow-x-hidden bg-[#07080b] font-['Inter',sans-serif] text-[#f0f4f8]">
          <Background />
          <ScrollProgress />

          <div className="relative z-[1]">
            <Nav />
            <main>
              <Hero />
              <Work />
              <About />
              <Skills />
              <Experience />
              <ContactCTA />
            </main>
            <footer className="px-5 py-8 text-center text-xs text-white/20">
              © {new Date().getFullYear()} Andrei Okon
            </footer>
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}