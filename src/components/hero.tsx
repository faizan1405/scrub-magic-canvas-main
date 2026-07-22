import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroVideoAsset from "@/assets/hero.mp4.asset.json";

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    heading: "Spaces That Tell Your Story",
    sub: "Luxury architecture and interiors designed with timeless elegance, thoughtful planning, and exceptional craftsmanship.",
  },
  {
    heading: "Where Vision Meets Precision",
    sub: "Every material, proportion, and detail is carefully curated to create spaces that inspire everyday living.",
  },
  {
    heading: "Designed Around Your Lifestyle",
    sub: "From intimate residences to large commercial environments, every project reflects individuality and purpose.",
  },
  {
    heading: "Experience Modern Luxury",
    sub: "Minimal aesthetics, premium finishes, intelligent layouts, and unforgettable experiences brought together beautifully.",
  },
  {
    heading: "Let's Build Something Extraordinary",
    sub: "Transform your vision into an architectural masterpiece with Atelier's design expertise.",
  },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Target and current currentTime — we lerp the current toward the target
    // on every rAF for buttery, Apple-style smoothness independent of the
    // scroll event cadence.
    const state = { target: 0, current: 0, duration: 0 };

    const setDur = () => {
      if (video.duration && !isNaN(video.duration)) {
        state.duration = video.duration;
      }
    };
    video.addEventListener("loadedmetadata", setDur);
    setDur();

    // Ensure decoded frames are ready before we scrub
    video.pause();

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        if (state.duration > 0) {
          state.target = Math.min(state.duration - 0.001, self.progress * state.duration);
        }
        const p = Math.min(4, Math.floor(self.progress * 5));
        setPhase((prev) => (prev === p ? prev : p));
      },
    });

    // rAF loop: interpolate current -> target and write to video.currentTime.
    // Using a lerp avoids frame-skipping when scroll deltas are large and
    // keeps playback visually smooth at 60fps.
    let rafId = 0;
    const tick = () => {
      const diff = state.target - state.current;
      if (Math.abs(diff) > 0.0005) {
        state.current += diff * 0.18; // smoothing factor
        if (video.readyState >= 2 && state.duration > 0) {
          try {
            video.currentTime = state.current;
          } catch {
            /* seeking guard */
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      st.kill();
      video.removeEventListener("loadedmetadata", setDur);
    };
  }, []);

  return (
    <section ref={containerRef} id="top" className="relative" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
        <video
          ref={videoRef}
          src={heroVideoAsset.url}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink/70" />

        {/* Frame chrome */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-6 top-24 md:left-12 md:top-28">
            <p className="text-eyebrow text-cream/70">Atelier — Est. 2008</p>
          </div>
          <div className="absolute right-6 top-24 md:right-12 md:top-28">
            <p className="text-eyebrow text-cream/70">Milano · New York · Tokyo</p>
          </div>
          <div className="absolute inset-x-0 bottom-8 flex items-center justify-between px-6 md:px-12">
            <p className="text-eyebrow text-cream/60">
              {String(phase + 1).padStart(2, "0")} / 05
            </p>
            <div className="flex gap-2">
              {phases.map((_, i) => (
                <div
                  key={i}
                  className={`h-px w-8 md:w-12 transition-all duration-500 ${
                    i <= phase ? "bg-cream" : "bg-cream/25"
                  }`}
                />
              ))}
            </div>
            <p className="text-eyebrow text-cream/60 hidden md:block">Scroll</p>
          </div>
        </div>

        {/* Phase text */}
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="mx-auto max-w-4xl text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: "transform, opacity" }}
              >
                <p className="text-eyebrow mb-8 text-cream/70">
                  Chapter {String(phase + 1).padStart(2, "0")}
                </p>
                <h1 className="text-display text-cream text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
                  {phases[phase].heading}
                </h1>
                <p className="mx-auto mt-8 max-w-2xl text-base text-cream/80 md:text-lg font-light leading-relaxed">
                  {phases[phase].sub}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
