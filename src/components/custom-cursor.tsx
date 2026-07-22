import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 35, stiffness: 500, mass: 0.2 });
  const sy = useSpring(y, { damping: 35, stiffness: 500, mass: 0.2 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setVisible(true);
    let raf = 0;
    let lastTarget: HTMLElement | null = null;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      if (el !== lastTarget) {
        lastTarget = el;
        if (!raf) {
          raf = requestAnimationFrame(() => {
            raf = 0;
            setHover(!!el.closest("a, button, [data-cursor='hover']"));
          });
        }
      }
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [x, y]);

  if (!visible) return null;
  return (
    <motion.div
      style={{ x: sx, y: sy, willChange: "transform" }}
      className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5f1e8] transition-transform duration-200"
        style={{
          width: 10,
          height: 10,
          transform: `translate(-50%, -50%) scale(${hover ? 2.2 : 1})`,
        }}
      />
    </motion.div>
  );
}
