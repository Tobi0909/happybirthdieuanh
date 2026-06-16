import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/** Floating bokeh blobs — soft, slow. */
export function Bokeh() {
  const blobs = [
    { x: "10%", y: "20%", size: 320, color: "rgba(255,182,193,0.45)", d: 14 },
    { x: "75%", y: "15%", size: 260, color: "rgba(184,230,210,0.45)", d: 16 },
    { x: "20%", y: "75%", size: 380, color: "rgba(255,224,168,0.4)", d: 18 },
    { x: "80%", y: "70%", size: 300, color: "rgba(214,196,255,0.4)", d: 20 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size,
            background: b.color,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{ x: [0, 30, -20, 0], y: [0, -25, 15, 0] }}
          transition={{ duration: b.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/** Tiny twinkling stars across the screen. */
export function Stars({ count = 30 }: { count?: number }) {
  const [stars, setStars] = useState<
    { x: number; y: number; size: number; delay: number }[]
  >([]);
  useEffect(() => {
    setStars(
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 3,
      })),
    );
  }, [count]);
  return (
    <div className="pointer-events-none absolute inset-0">
      {stars.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            boxShadow: "0 0 6px rgba(255,255,255,0.8)",
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/** Balloons rising from the bottom. */
export function Balloons({ count = 14 }: { count?: number }) {
  const colors = ["#FF8FA3", "#FFB4A2", "#B8E6D2", "#FFE0A8", "#C7B8FF", "#9DDCFF"];
  const balloons = Array.from({ length: count }, (_, i) => ({
    left: (i / count) * 100 + Math.random() * 6 - 3,
    delay: Math.random() * 2.2,
    duration: 6 + Math.random() * 3,
    color: colors[i % colors.length],
    size: 50 + Math.random() * 30,
    sway: 15 + Math.random() * 25,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {balloons.map((b, i) => (
        <motion.div
          key={i}
          className="absolute bottom-[-120px]"
          style={{ left: `${b.left}%` }}
          initial={{ y: 0 }}
          animate={{ y: -1200, x: [0, b.sway, -b.sway, 0] }}
          transition={{
            y: { duration: b.duration, delay: b.delay, ease: "easeOut", repeat: Infinity, repeatDelay: 2 },
            x: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: b.size,
              height: b.size * 1.18,
              background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), ${b.color} 60%)`,
              boxShadow: `0 8px 20px ${b.color}55`,
            }}
          />
          <div
            className="mx-auto"
            style={{ width: 1, height: 60, background: "rgba(0,0,0,0.15)" }}
          />
        </motion.div>
      ))}
    </div>
  );
}