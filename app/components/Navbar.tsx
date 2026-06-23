"use client";

import { useEffect, useState } from "react";

const links = ["home", "about", "skills", "projects", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      links.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const offset = el.offsetTop - 150;

        if (scrollY >= offset) {
          setActive(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2 w-full px-4 md:px-0">
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-6 rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-xl">
        {links.map((item) => (
          <a
            key={item}
            href={`#${item}`}
            className={`text-sm capitalize transition ${
              active === item ? "text-white" : "text-zinc-500"
            }`}
          >
            {item}
          </a>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full mt-2 left-4 right-4 rounded-lg border border-white/10 bg-white/5 backdrop-blur-xl p-4">
            <div className="flex flex-col gap-4">
              {links.map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className={`text-sm capitalize transition ${
                    active === item ? "text-white" : "text-zinc-500"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}