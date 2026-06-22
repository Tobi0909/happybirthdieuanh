import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

/** Slow floating glow particles — sits as a fixed overlay above the bg. */
export function Particles({ count = 26 }: { count?: number }) {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const particles = useMemo(() => {
    const n = reduced ? Math.floor(count / 3) : count;
    return Array.from({ length: n }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 5,
      dur: 14 + Math.random() * 18,
      delay: Math.random() * 8,
      hue: Math.random() < 0.5 ? "rgba(255,255,255,0.85)" : "rgba(255,220,170,0.75)",
    }));
  }, [count, reduced]);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.hue,
            boxShadow: `0 0 ${p.size * 3}px ${p.hue}`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.9, 0],
            y: [0, -120, -240],
            x: [0, 20, -10],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}