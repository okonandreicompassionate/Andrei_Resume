"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const EMAIL = "okoncompassionate@gmail.com";
const GITHUB = "https://github.com/okonandreicompassionate";
const WHATSAPP = "https://wa.me/2347058077794";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent("Let’s work together")}&body=${encodeURIComponent("Hi Andrei,%0D%0A%0D%0AI'd love to discuss a frontend or product collaboration. Please let me know your availability.%0D%0A%0D%0AThanks,")}`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07080b] text-[#f0f4f8]">
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

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1100px] flex-col px-5 py-8 sm:px-8">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[13px] font-medium text-white/75 transition hover:border-white/20 hover:text-white"
          >
            Andrei Okon
          </Link>

          <nav className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0d1117]/70 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <Link
              href="/"
              className="rounded-full px-3 py-1.5 text-[13px] text-white/60 transition hover:bg-white/5 hover:text-white/90"
            >
              Home
            </Link>
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className="rounded-full px-3 py-1.5 text-[13px] text-white/60 transition hover:bg-white/5 hover:text-white/90"
            >
              GitHub
            </a>
          </nav>
        </header>

        <main className="flex flex-1 items-center justify-center py-12 sm:py-20">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[760px] rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-10"
          >
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#4ecca3]/25 bg-[#4ecca3]/10 px-4 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4ecca3]" />
              <span className="text-xs text-[#4ecca3]">Available for new projects</span>
            </div>

            <p className="text-[11px] font-medium tracking-[0.24em] text-white/35 uppercase">
              Contact
            </p>

            <h1 className="mt-4 max-w-xl text-[clamp(40px,6vw,68px)] font-light leading-[0.96] tracking-[-0.045em] text-white/95">
              Let’s build something exceptional.
            </h1>

            <p className="mt-5 max-w-[620px] text-base leading-[1.8] text-white/45">
              I’m available for frontend engineering contracts, long-term roles,
              and product partnerships. Reach out and let’s talk about building
              polished, fast, and thoughtful web experiences together.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={mailto}
                className="rounded-full bg-white/90 px-6 py-3 text-sm font-medium text-[#0d1117] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Email me
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="rounded-full border border-white/15 bg-white/[0.07] px-6 py-3 text-sm font-medium text-white/80 transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                {copied ? "Copied!" : "Copy email"}
              </button>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 bg-white/[0.07] px-6 py-3 text-sm font-medium text-white/80 transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                WhatsApp
              </a>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <a
                href={mailto}
                className="rounded-2xl border border-white/10 bg-[#0d1117]/60 p-4 text-left transition hover:border-white/20 hover:bg-[#0d1117]"
              >
                <div className="text-[11px] uppercase tracking-[0.18em] text-white/30">
                  Email
                </div>
                <div className="mt-2 text-sm text-white/80">{EMAIL}</div>
              </a>

              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-[#0d1117]/60 p-4 text-left transition hover:border-white/20 hover:bg-[#0d1117]"
              >
                <div className="text-[11px] uppercase tracking-[0.18em] text-white/30">
                  Phone
                </div>
                <div className="mt-2 text-sm text-white/80">+234 705 807 7794</div>
              </a>

              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-[#0d1117]/60 p-4 text-left transition hover:border-white/20 hover:bg-[#0d1117]"
              >
                <div className="text-[11px] uppercase tracking-[0.18em] text-white/30">
                  GitHub
                </div>
                <div className="mt-2 text-sm text-white/80">@okonandreicompassionate</div>
              </a>
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  );
}
