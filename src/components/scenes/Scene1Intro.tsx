import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Stars } from "./Decorations";
import { sfx } from "@/lib/sfx";
import type { SceneProps } from "./types";

// EDIT HERE
const LINE1 = "Một bí mật nhỏ đang được mở ra...";
const LINE2 = "Dành riêng cho em ✨";
const LOADING_LABEL = "Loading memories";

export function Scene1Intro({ active }: SceneProps) {
  const [typed, setTyped] = useState("");
  const [showLine2, setShowLine2] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) return;
    setTyped("");
    setShowLine2(false);
    setProgress(0);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(LINE1.slice(0, i));
      if (i % 2 === 0) sfx.typing();
      if (i >= LINE1.length) {
        clearInterval(id);
        setTimeout(() => setShowLine2(true), 500);
      }
    }, 70);
    return () => clearInterval(id);
  }, [active]);

  useEffect(() => {
    if (!showLine2) return;
    const start = Date.now();
    const dur = 2200;
    let raf = 0;
    const tick = () => {
      const p = Math.min(1, (Date.now() - start) / dur);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [showLine2]);

  const pct = Math.round(progress * 100);
  const filled = Math.round(progress * 10);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <Stars count={50} />

      <motion.div
        className="pointer-events-none absolute"
        style={{ left: "50%", top: "38%", translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="h-[28rem] w-[28rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,200,120,0.45) 0%, rgba(255,150,80,0.18) 35%, rgba(0,0,0,0) 70%)",
            filter: "blur(20px)",
          }}
        />
      </motion.div>

      <div className="relative z-10 flex max-w-xl flex-col items-center px-6 text-center">
        <p className="font-display text-2xl font-medium text-white/95 drop-shadow sm:text-4xl">
          {typed}
          {!showLine2 && (
            <motion.span
              className="ml-1 inline-block"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              |
            </motion.span>
          )}
        </p>

        <AnimatePresence>
          {showLine2 && (
            <motion.p
              key="l2"
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 font-display text-lg italic text-white/80 sm:text-2xl"
            >
              {LINE2}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showLine2 && (
            <motion.div
              key="loader"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-10 w-full max-w-xs rounded-2xl border border-white/15 bg-white/10 px-5 py-4 font-mono text-sm text-white/85 shadow-xl backdrop-blur-md"
            >
              <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-widest text-white/70">
                <span>{LOADING_LABEL}</span>
                <span>{pct}%</span>
              </div>
              <div className="font-mono text-base leading-none tracking-[0.2em] text-white">
                {"█".repeat(filled)}
                <span className="text-white/25">{"░".repeat(10 - filled)}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}