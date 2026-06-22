import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, type MouseEvent } from "react";
import { gentleRain, burst } from "@/lib/confetti";
import { sfx } from "@/lib/sfx";
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
    sfx.paper();
    setTimeout(() => burst(), 600);
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden px-6">
      <Bokeh />
      <div className="relative z-10 max-w-2xl text-center">
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="invite"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
              transition={{ duration: 0.5 }}
            >
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
                    onRestart?.();
                  }}
                  className="rounded-full bg-white/15 px-6 py-3 font-display text-base font-medium text-white ring-1 ring-white/40 backdrop-blur transition hover:bg-white/25"
                >
                  Xem lại từ đầu 🔁
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <Envelope key="envelope" onRestart={onRestart} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Envelope({ onRestart }: { onRestart?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto flex w-full max-w-md flex-col items-center"
    >
      {/* Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-10 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,240,200,0.55) 0%, rgba(255,200,150,0.15) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />

      <div className="relative w-full">
        {/* Envelope body */}
        <div
          className="relative mx-auto h-56 w-full rounded-lg shadow-2xl"
          style={{
            background: "linear-gradient(160deg, #FFDDB5 0%, #F5A87A 100%)",
            boxShadow: "0 30px 60px -20px rgba(0,0,0,0.5)",
          }}
        >
          {/* Flap (opened) */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={{ rotateX: 180 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transformOrigin: "top",
              transformStyle: "preserve-3d",
              clipPath: "polygon(0 0, 100% 0, 50% 60%)",
              background: "linear-gradient(160deg, #FFC894 0%, #E89160 100%)",
            }}
            className="absolute inset-x-0 top-0 h-32"
          />

          {/* Letter sliding out */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: -130, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-3 top-3 z-20 rounded-md bg-[#FFFBF2] px-5 py-6 text-left shadow-xl"
            style={{ boxShadow: "0 18px 40px -10px rgba(0,0,0,0.35)" }}
          >
            <p className="font-display text-[15px] leading-relaxed text-foreground sm:text-base">
              Cảm ơn em vì đã dành vài phút <br />
              xem hết món quà nhỏ này.
              <br />
              <br />
              Mong rằng tuổi mới của em sẽ luôn có thật nhiều tiếng cười ✨
            </p>
            <p className="mt-4 text-right font-display text-sm italic text-foreground/70">
              — from anh 🫶
            </p>
          </motion.div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRestart?.();
        }}
        className="relative z-30 mt-8 rounded-full bg-white/15 px-5 py-2 text-sm font-medium text-white ring-1 ring-white/40 backdrop-blur transition hover:bg-white/25"
      >
        Xem lại từ đầu 🔁
      </motion.button>
    </motion.div>
  );
}