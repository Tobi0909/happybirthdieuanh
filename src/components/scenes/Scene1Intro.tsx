import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Stars } from "./Decorations";
import type { SceneProps } from "./types";

// EDIT HERE
const LINE = "Hôm nay là một ngày đặc biệt...";

export function Scene1Intro({ active }: SceneProps) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!active) return;
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(LINE.slice(0, i));
      if (i >= LINE.length) clearInterval(id);
    }, 75);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <Stars count={40} />

      {/* Candle / glow */}
      <motion.div
        className="pointer-events-none absolute"
        style={{ left: "50%", top: "44%", translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="h-48 w-48 rounded-full sm:h-64 sm:w-64"
          style={{
            background:
              "radial-gradient(circle, rgba(255,200,120,0.85) 0%, rgba(255,150,80,0.35) 30%, rgba(0,0,0,0) 70%)",
            filter: "blur(4px)",
          }}
        />
      </motion.div>

      {/* Flame */}
      <motion.div
        className="absolute"
        style={{ left: "50%", top: "44%", translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="h-10 w-6 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 50% 70%, #fff7c2 0%, #ffd57a 35%, #ff8a3d 70%, rgba(255,80,0,0) 100%)",
            filter: "blur(0.5px)",
          }}
          animate={{ scaleY: [1, 1.15, 0.95, 1.1, 1], rotate: [-3, 3, -2, 2, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="relative z-10 px-6 pt-[40vh] text-center">
        <p className="font-display text-2xl font-medium text-white/90 sm:text-4xl">
          {typed}
          <motion.span
            className="ml-1 inline-block"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            |
          </motion.span>
        </p>
      </div>
    </div>
  );
}