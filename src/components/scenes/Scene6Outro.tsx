import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, type MouseEvent } from "react";
import { gentleRain, burst } from "@/lib/confetti";
import { Bokeh } from "./Decorations";
import type { SceneProps } from "./types";

export function Scene6Outro({
  active,
  onRestart,
}: SceneProps & { onRestart: () => void }) {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (!active) return;
    setAccepted(false);
    gentleRain(2500);
    const id = setInterval(() => gentleRain(1500), 3200);
    return () => clearInterval(id);
  }, [active]);

  const accept = (e: MouseEvent) => {
    e.stopPropagation();
    setAccepted(true);
    burst();
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden px-6">
      <Bokeh />
      <div className="relative z-10 max-w-2xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display font-semibold leading-tight text-white drop-shadow"
          style={{ fontSize: "clamp(1.7rem, 4.6vw, 3rem)" }}
        >
          Bao giờ rảnh đi cà phê <br /> hay xem phim với anh nha 😄
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            type="button"
            onClick={accept}
            className="rounded-full bg-white px-7 py-3 font-display text-base font-semibold text-foreground shadow-xl shadow-black/20 transition hover:scale-105 active:scale-95"
          >
            Hẹn anh nhé 💌
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRestart();
            }}
            className="rounded-full bg-white/15 px-6 py-3 font-display text-base font-medium text-white ring-1 ring-white/40 backdrop-blur transition hover:bg-white/25"
          >
            Xem lại từ đầu 🔁
          </button>
        </motion.div>

        <AnimatePresence>
          {accepted && (
            <motion.div
              key="yay"
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="mt-6 inline-block rounded-2xl bg-white/90 px-5 py-3 font-display text-sm font-medium text-foreground shadow-lg sm:text-base"
            >
              Yay! Nhắn tin chốt lịch với anh nha 🥰
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}