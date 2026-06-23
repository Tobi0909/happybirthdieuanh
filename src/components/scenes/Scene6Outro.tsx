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
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [showReplay, setShowReplay] = useState(false);

  useEffect(() => {
    if (!active) return;
    setShowEnvelope(false);
    setShowReplay(false);
    gentleRain(2500);
    const id = setInterval(() => gentleRain(1500), 3200);
    return () => clearInterval(id);
  }, [active]);

  useEffect(() => {
    if (!showEnvelope) return;
    const id = setTimeout(() => setShowReplay(true), 5000);
    return () => clearTimeout(id);
  }, [showEnvelope]);

  const openEnvelope = (e: MouseEvent) => {
    e.stopPropagation();
    setShowEnvelope(true);
    sfx.paper();
    setTimeout(() => burst(), 600);
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden px-6">
      <Bokeh />

      {/* Background blur overlay when envelope opens */}
      <AnimatePresence>
        {showEnvelope && (
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

      <div className="relative z-10 max-w-xl text-center">
        <AnimatePresence mode="wait">
          {!showEnvelope ? (
            <motion.div
              key="story"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: softEase }}
            >
              {/* Line 1 */}
              <motion.p
                initial={{ opacity: 0, y: 28 }}
                animate={active ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.9, ease: softEase }}
                className="font-display font-medium leading-snug text-white drop-shadow-md"
                style={{ fontSize: "clamp(1.25rem, 4vw, 1.85rem)" }}
              >
                Món quà sinh nhật đến đây là hết rồi...
              </motion.p>

              {/* Line 2 */}
              <motion.p
                initial={{ opacity: 0, y: 28 }}
                animate={active ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 2.1, duration: 0.9, ease: softEase }}
                className="font-display font-medium leading-snug text-white drop-shadow-md"
                style={{ fontSize: "clamp(1.25rem, 4vw, 1.85rem)" }}
              >
                Nhưng biết đâu,
              </motion.p>

              {/* Line 3 */}
              <motion.p
                initial={{ opacity: 0, y: 28 }}
                animate={active ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 3.7, duration: 0.9, ease: softEase }}
                className="font-display font-semibold leading-snug text-white drop-shadow-md"
                style={{ fontSize: "clamp(1.3rem, 4.2vw, 2rem)" }}
              >
                một câu chuyện mới lại bắt đầu từ một buổi hẹn ✨
              </motion.p>

              {/* Button */}
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 5.0, duration: 0.7, ease: softEase }}
                className="mt-10"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={openEnvelope}
                  className="rounded-full bg-white px-8 py-3.5 font-display text-base font-semibold text-stone-800 shadow-2xl shadow-black/20"
                >
                  💌 Viết tiếp câu chuyện
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <Envelope key="envelope" showReplay={showReplay} onRestart={onRestart} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Envelope({
  showReplay,
  onRestart,
}: {
  showReplay: boolean;
  onRestart?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: softEase }}
      className="relative mx-auto flex w-full max-w-md flex-col items-center"
    >
      {/* Soft glow behind envelope */}
      <motion.div
        className="pointer-events-none absolute -inset-12 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,240,210,0.6) 0%, rgba(255,200,160,0.2) 40%, transparent 70%)",
          filter: "blur(24px)",
        }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.06, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative w-full">
        {/* Envelope body */}
        <div
          className="relative mx-auto h-56 w-full rounded-xl shadow-2xl sm:h-60"
          style={{
            background: "linear-gradient(160deg, #FFE8C8 0%, #F5B8A0 100%)",
            boxShadow: "0 30px 60px -20px rgba(0,0,0,0.45)",
          }}
        >
          {/* Flap (opens upward) */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={{ rotateX: 180 }}
            transition={{ duration: 1, ease: softEase, delay: 0.3 }}
            style={{
              transformOrigin: "top",
              transformStyle: "preserve-3d",
              clipPath: "polygon(0 0, 100% 0, 50% 60%)",
              background: "linear-gradient(160deg, #FFD4A0 0%, #E89878 100%)",
            }}
            className="absolute inset-x-0 top-0 h-32"
          />

          {/* Letter sliding out */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: -140, opacity: 1 }}
            transition={{ delay: 0.9, duration: 1.1, ease: softEase }}
            className="absolute inset-x-4 top-4 z-20 rounded-lg bg-[#FFF9F0] px-6 py-7 text-left shadow-xl sm:inset-x-6"
            style={{ boxShadow: "0 18px 40px -10px rgba(0,0,0,0.35)" }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="font-display text-[15px] leading-relaxed text-stone-700 sm:text-base"
            >
              Cảm ơn em vì đã dành vài phút xem hết món quà này.
              <br />
              <br />
              Mong rằng tuổi mới của em sẽ luôn có thật nhiều tiếng cười ✨
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="mt-5 text-right font-display text-sm italic text-stone-500"
            >
              — from anh 🫶
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Replay button */}
      <AnimatePresence>
        {showReplay && (
          <motion.button
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: softEase }}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRestart?.();
            }}
            className="relative z-30 mt-10 rounded-full bg-white/20 px-6 py-2.5 text-sm font-medium text-white ring-1 ring-white/40 backdrop-blur transition hover:bg-white/30"
          >
            🔁 Xem lại từ đầu
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
