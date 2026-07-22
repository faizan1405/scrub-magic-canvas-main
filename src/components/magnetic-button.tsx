import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  variant?: "solid" | "outline" | "ghost";
  onClick?: () => void;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  variant = "solid",
  onClick,
  strength = 0.35,
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 15, stiffness: 200, mass: 0.3 });
  const sy = useSpring(y, { damping: 15, stiffness: 200, mass: 0.3 });

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const styles = {
    solid:
      "bg-ink text-cream hover:bg-cocoa border border-ink",
    outline:
      "bg-transparent text-ink hover:bg-ink hover:text-cream border border-ink/60",
    ghost:
      "bg-cream/60 backdrop-blur border border-beige text-ink hover:bg-cream",
  }[variant];

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 text-[11px] font-medium uppercase tracking-[0.28em] transition-colors duration-500",
        styles,
        className,
      )}
    >
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </motion.button>
  );
}
