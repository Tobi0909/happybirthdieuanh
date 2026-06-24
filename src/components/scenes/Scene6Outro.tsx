import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, type MouseEvent } from "react";
import { gentleRain, burst } from "@/lib/confetti";
import { sfx } from "@/lib/sfx";
import { Bokeh } from "./Decorations";
import type { SceneProps } from "./types";

const softEase = [0.22, 1, 0.36, 1] as const;

export function Scene6Outro({
  active,
  onRestart,
}: SceneProps & { onRestart: () => void }) {
  const [opening, setOpening] = useState(false);
  const [showReplay, setShowReplay] = useState(false);

  useEffect(() => {
    if (!active) return;
    setOpening(false);
    setShowReplay(false);
    gentleRain(2500);
    const id = setInterval(() => gentleRain(1500), 3200);
    return () => clearInterval(id);
  }, [active]);

  useEffect(() => {
    if (!opening) return;
    // Open animation ~3s, plus 3s delay before showing replay = 6s total.
    const id = setTimeout(() => setShowReplay(true), 6000);
    return () => clearTimeout(id);
  }, [opening]);

  const openEnvelope = (e: MouseEvent) => {
    e.stopPropagation();
    setOpening(true);
    sfx.paper();
    setTimeout(() => burst(), 700);
    setTimeout(() => gentleRain(2000), 1200);
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden px-5 py-8">
      <Bokeh />

      <AnimatePresence>
        {opening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute inset-0 z-[5] backdrop-blur-[6px]"
            style={{ background: "rgba(0,0,0,0.15)" }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center justify-center gap-6 text-center">
        {/* Title — always present */}
        <div className="flex flex-col gap-1.5">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.9, ease: softEase }}
            className="font-display font-medium leading-snug text-white drop-shadow-md"
            style={{ fontSize: "clamp(1.15rem, 3.6vw, 1.6rem)" }}
          >
            Hết rồi đó em ơi 🥹
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.0, duration: 0.9, ease: softEase }}
            className="font-display font-medium leading-snug text-white drop-shadow-md"
            style={{ fontSize: "clamp(1.15rem, 3.6vw, 1.6rem)" }}
          >
            Anh không giỏi nói những câu hoa mỹ — nhưng anh biết rằng em xứng đáng được hạnh phúc mỗi ngày.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.6, duration: 0.9, ease: softEase }}
            className="font-display font-semibold leading-snug text-white drop-shadow-md"
            style={{ fontSize: "clamp(1.2rem, 3.8vw, 1.75rem)" }}
          >
            Sinh nhật vui nha cô gái! 💛
          </motion.p>
        </div>

        {/* Envelope stage */}
        <Envelope opening={opening} />

        {/* Button OR Replay (swap, never overlap) */}
        <div className="flex min-h-[60px] w-full items-center justify-center">
          <AnimatePresence mode="wait">
            {!opening ? (
              <motion.button
                key="open-btn"
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 3.0, duration: 0.7, ease: softEase }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={openEnvelope}
                className="rounded-full bg-white px-7 py-3 font-display text-base font-semibold text-stone-800 shadow-2xl shadow-black/20"
              >
                💌 Viết tiếp câu chuyện
              </motion.button>
            ) : showReplay ? (
              <motion.button
                key="replay-btn"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: softEase }}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRestart();
                }}
                className="rounded-full bg-white/15 px-6 py-2.5 font-display text-sm font-medium text-white ring-1 ring-white/40 backdrop-blur transition hover:bg-white/25"
              >
                🔁 Xem lại từ đầu
              </motion.button>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Envelope({ opening }: { opening: boolean }) {
  return (
    <motion.div
      className="relative mx-auto flex w-full flex-col items-center"
      animate={opening ? { x: [0, -4, 4, -3, 3, 0] } : { x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{ width: "min(80vw, 480px)", minWidth: 300 }}
    >
      {/* Soft glow */}
      <motion.div
        className="pointer-events-none absolute -inset-12 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,240,210,0.7) 0%, rgba(255,200,160,0.25) 40%, transparent 70%)",
          filter: "blur(24px)",
        }}
        animate={
          opening
            ? { opacity: [0.5, 1.1, 0.9], scale: [1, 1.15, 1.05] }
            : { opacity: [0.4, 0.7, 0.4], scale: [1, 1.04, 1] }
        }
        transition={{ duration: opening ? 2 : 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Envelope wrapper — collapsed when closed, expands to fit letter when open */}
      <div className="relative w-full" style={{ perspective: 1200 }}>
        {/* Envelope body */}
        <motion.div
          className="relative mx-auto w-full rounded-2xl"
          animate={{ height: opening ? "auto" : 192 }}
          transition={{ duration: 0.9, ease: softEase, delay: opening ? 1.0 : 0 }}
          style={{
            background: "linear-gradient(160deg, #FFE8C8 0%, #F5B8A0 100%)",
            boxShadow: "0 30px 60px -20px rgba(0,0,0,0.45)",
            minHeight: 192,
          }}
        >
          {/* Flap */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={opening ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 1, ease: softEase, delay: 0.3 }}
            style={{
              transformOrigin: "top",
              transformStyle: "preserve-3d",
              clipPath: "polygon(0 0, 100% 0, 50% 65%)",
              background: "linear-gradient(160deg, #FFD4A0 0%, #E89878 100%)",
            }}
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28"
          />

          {/* Inner glow (light escaping) */}
          <AnimatePresence>
            {opening && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0, 1, 0.8], scale: [0.6, 1.2, 1] }}
                transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
                className="pointer-events-none absolute left-1/2 top-0 z-[5] h-32 w-32 -translate-x-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,250,220,0.95) 0%, rgba(255,220,180,0.5) 50%, transparent 80%)",
                  filter: "blur(8px)",
                }}
              />
            )}
          </AnimatePresence>

          {/* Letter — slides up from envelope */}
          <AnimatePresence>
            {opening && (
              <motion.div
                initial={{ y: 40, opacity: 0, scale: 0.95 }}
                animate={{ y: -24, opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, duration: 1.0, ease: softEase }}
                className="relative z-20 mx-auto w-full rounded-3xl"
                style={{
                  background: "#FFFDF8",
                  padding: "32px 28px",
                  boxShadow:
                    "0 24px 48px -12px rgba(0,0,0,0.35), 0 8px 16px -4px rgba(0,0,0,0.15)",
                }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7, duration: 0.8 }}
                  className="font-display text-stone-700"
                  style={{
                    textAlign: "center",
                    lineHeight: 1.8,
                    fontSize: "clamp(15px, 2vw, 19px)",
                    wordBreak: "normal",
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  Cảm ơn em vì đã dành vài phút xem hết món quà này.
                  <br />
                  <br />
                  Mong rằng tuổi mới của em sẽ luôn có thật nhiều tiếng cười ✨
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.7, duration: 0.9 }}
                  className="mt-5 font-display text-sm italic text-stone-500"
                  style={{ textAlign: "center" }}
                >
                  — from anh, người hay im lặng nhưng không phải không quan tâm 🐢
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
