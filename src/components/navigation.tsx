import { motion } from "framer-motion";
import { useState, useEffect, memo } from "react";
import { MagneticButton } from "./magnetic-button";

export function Navigation() {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState("about");

  const links = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#projects", label: "Projects" },
    { href: "#process", label: "Process" },
    { href: "#contact", label: "Contact" },
  ];

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const s = window.scrollY > window.innerHeight * 3.5;
        setSolid((prev) => (prev === s ? prev : s));
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "bg-cream/95 backdrop-blur-md border-b border-beige/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12 md:py-6">
        <a
          href="#top"
          className={`text-display text-2xl tracking-tight transition-colors duration-700 ${
            solid ? "text-ink" : "text-cream"
          }`}
        >
          Atelier<span className="text-clay">.</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`group relative px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] transition-colors duration-500 ${
                solid ? "text-ink/80 hover:text-ink" : "text-cream/80 hover:text-cream"
              }`}
            >
              {l.label}
              <span
                className={`absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${
                  solid ? "bg-ink" : "bg-cream"
                } ${active === l.href.slice(1) ? "scale-x-100" : ""}`}
              />
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a href="#contact">
            <MagneticButton
              variant={solid ? "solid" : "ghost"}
              className="!px-6 !py-3 !text-[10px]"
            >
              Book Consultation
            </MagneticButton>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
