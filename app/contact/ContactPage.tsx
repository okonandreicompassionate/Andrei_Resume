"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const email = "okoncompassionate@gmail.com";
  const mailto = `mailto:${email}?subject=${encodeURIComponent("Let’s work together")}&body=${encodeURIComponent("Hi Andrei,%0D%0A%0D%0AI'd love to discuss a frontend or product collaboration. Please let me know your availability.%0D%0A%0D%0AThanks,")}`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "100px 20px",
        background: "#0d1117",
        color: "#f0f4f8",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "100%",
          maxWidth: 760,
          borderRadius: 28,
          padding: "44px 36px",
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(32px) saturate(180%)",
          WebkitBackdropFilter: "blur(32px) saturate(180%)",
          border: "0.5px solid rgba(255,255,255,0.14)",
          boxShadow: "0 30px 70px rgba(0, 0, 0, 0.35)",
        }}
      >
        <div style={{ marginBottom: 18 }}>
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginBottom: 12,
            }}
          >
            Contact
          </p>
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 56px)",
              fontWeight: 300,
              lineHeight: 1.05,
              color: "rgba(255,255,255,0.94)",
              marginBottom: 18,
            }}
          >
            Let’s start something exceptional.
          </h1>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.85,
              color: "rgba(255,255,255,0.46)",
              maxWidth: 640,
            }}
          >
            I’m available for frontend engineering contracts, long-term roles,
            and product partnerships. Reach out and let’s talk about building
            polished, fast, and thoughtful web experiences together.
          </p>
        </div>

        <div style={{ display: "grid", gap: 18, marginTop: 24 }}>
          <div style={{ display: "grid", gap: 12 }}>
            <a
              href={mailto}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 28px",
                borderRadius: 100,
                textDecoration: "none",
                fontWeight: 500,
                fontSize: 14,
                color: "#0d1117",
                background: "#f0f4f8",
                width: "fit-content",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16v16H4z" />
                  <polyline points="4,4 12,13 20,4" />
                </svg>
              </span>
              Email me
            </a>
            <button
              onClick={copyEmail}
              type="button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 28px",
                borderRadius: 100,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.08)",
                color: "#f0f4f8",
                cursor: "pointer",
                width: "fit-content",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 6h11v11" />
                  <path d="M8 17H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
                </svg>
              </span>
              {copied ? "Copied!" : "Copy email"}
            </button>
            <a
              href="https://wa.me/2347058077794"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 28px",
                borderRadius: 100,
                textDecoration: "none",
                fontWeight: 500,
                fontSize: 14,
                color: "#0d1117",
                background: "#f0f4f8",
                width: "fit-content",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16.5 3.5c-1.5-.5-3.2-.5-4.7 0-3.9 1.4-6.7 5.1-6.7 9.5 0 1.5.4 2.9 1.1 4.1L3 21l4-1.1c1.1.6 2.5.9 3.8.9 4.4 0 8.1-2.8 9.5-6.7.5-1.5.5-3.2 0-4.7.1 0 .1 0 0 0z" />
                  <path d="M16.5 3.5c1.4 1.7 1.3 4.1-.1 5.8L14 10.7" />
                </svg>
              </span>
              +234 705 807 7794
            </a>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "14px 24px",
                borderRadius: 100,
                border: "0.5px solid rgba(255,255,255,0.18)",
                textDecoration: "none",
                color: "rgba(255,255,255,0.88)",
                background: "rgba(255,255,255,0.05)",
              }}
            >
              Back to home
            </Link>
            <a
              href="https://github.com/okonandreicompassionate"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "14px 24px",
                borderRadius: 100,
                textDecoration: "none",
                color: "rgba(255,255,255,0.88)",
                background: "rgba(255,255,255,0.05)",
                border: "0.5px solid rgba(255,255,255,0.18)",
              }}
            >
              View GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
