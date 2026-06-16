import { motion } from "framer-motion";
import { useEffect } from "react";
import { Balloons } from "./Decorations";
import { sideBurst, burst } from "@/lib/confetti";
import type { SceneProps } from "./types";

// EDIT HERE
const NAME = "Diệu Anh";
const DATE = "25.06";

export function Scene2Burst({ active }: SceneProps) {
  useEffect(() => {
    if (!active) return;
    sideBurst();
    const t = setTimeout(() => burst(), 600);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden px-6">
      <Balloons count={16} />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/30 px-4 py-1.5 font-display text-sm font-medium text-white backdrop-blur"
        >
          🎂 Happy Birthday
        </motion.div>

        <motion.h1
          initial={{ scale: 0.4, opacity: 0, rotate: -6 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 12, delay: 0.15 }}
          className="font-display font-bold leading-[0.95] tracking-tight text-white drop-shadow-lg"
          style={{ fontSize: "clamp(2.8rem, 10vw, 7rem)" }}
        >
          Chúc mừng <br />
          sinh nhật <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #FFE48A 0%, #FFFFFF 50%, #FFD6E5 100%)",
            }}
          >
            {NAME}! 🎉
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
          className="mt-6 font-display text-lg font-medium text-white/95 sm:text-2xl"
        >
          {DATE} — ngày của riêng em ✨
        </motion.p>
      </div>
    </div>
  );
}