import { motion } from "framer-motion";
import { Bokeh } from "./Decorations";
import type { SceneProps } from "./types";

// EDIT HERE
const POLAROIDS = [
  { emoji: "☕", label: "Cà phê đầu tiên", tint: "#FFE7D1" },
  { emoji: "🎬", label: "Một buổi xem phim", tint: "#E2D8FF" },
  { emoji: "🍰", label: "Một lần ăn bánh ngọt", tint: "#FFD9E6" },
  { emoji: "🌆", label: "Một buổi đi dạo", tint: "#D6EEFF" },
];

export function SceneFutureMemories({ active }: SceneProps) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-5 py-10">
      <Bokeh />
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70"
      >
        Future Memories
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="relative z-10 mb-8 text-center font-display font-semibold text-white drop-shadow"
        style={{ fontSize: "clamp(1.4rem, 3.6vw, 2rem)" }}
      >
        Biết đâu vài tấm ảnh này... <br />
        sẽ được lấp đầy trong tương lai 😄
      </motion.h2>

      <div className="relative z-10 grid w-full max-w-4xl grid-cols-2 gap-5 sm:gap-8 md:grid-cols-4">
        {POLAROIDS.map((p, i) => {
          const tilt = [-7, 5, -3, 6][i] ?? 0;
          return (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 120, rotate: tilt * 2, scale: 0.8 }}
              animate={active ? { opacity: 1, y: 0, rotate: tilt, scale: 1 } : {}}
              transition={{
                delay: 0.25 + i * 0.18,
                duration: 0.9,
                type: "spring",
                stiffness: 90,
                damping: 13,
              }}
              whileHover={{ scale: 1.08, rotate: 0, y: -6 }}
              className="relative mx-auto"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                animate={{ rotate: [tilt, tilt + 1.2, tilt - 1.2, tilt] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-md bg-white p-3 pb-12 shadow-2xl"
                style={{
                  boxShadow:
                    "0 25px 50px -15px rgba(0,0,0,0.45), 0 8px 18px -6px rgba(0,0,0,0.25)",
                }}
              >
                <div
                  className="flex aspect-square w-32 items-center justify-center rounded-sm text-5xl sm:w-36 sm:text-6xl"
                  style={{
                    background: `linear-gradient(135deg, ${p.tint} 0%, #ffffff 100%)`,
                  }}
                >
                  {p.emoji}
                </div>
                <div className="mt-3 text-center font-display text-[13px] font-medium text-foreground/80">
                  {p.label}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}