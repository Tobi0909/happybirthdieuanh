import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { burst, sideBurst } from "@/lib/confetti";
import { sfx, startMicBlowDetector } from "@/lib/sfx";
import type { SceneProps } from "./types";

export function Scene5Cake({ active }: SceneProps) {
  const [blown, setBlown] = useState(false);
  const [micState, setMicState] = useState<"idle" | "listening" | "denied">("idle");
  const [shake, setShake] = useState(false);

  const blow = () => {
    if (blown) return;
    setBlown(true);
    sfx.blow();
    setShake(true);
    setTimeout(() => setShake(false), 500);
    burst();
    setTimeout(() => sideBurst(), 250);
    setTimeout(() => sfx.sparkle(), 350);
  };

  useEffect(() => {
    if (!active || blown) return;
    let cleanup: (() => void) | null = null;
    let cancelled = false;
    setMicState("idle");
    (async () => {
      try {
        cleanup = await startMicBlowDetector(() => {
          if (!cancelled) blow();
        });
        if (!cancelled) setMicState("listening");
      } catch {
        if (!cancelled) setMicState("denied");
      }
    })();
    return () => {
      cancelled = true;
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, blown]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-6">
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="absolute top-[12%] z-10 px-4 text-center font-display font-medium text-white drop-shadow"
        style={{ fontSize: "clamp(1.1rem, 2.6vw, 1.6rem)" }}
      >
        {blown
          ? "Điều ước đã được gửi đi rồi đó! 🌟"
          : micState === "listening"
            ? "Ước một điều rồi thổi vào mic nha 🌬️"
            : "Ước một điều rồi bấm để thổi nến 🌬️"}
      </motion.h3>

      <motion.div
        animate={shake ? { x: [0, -10, 10, -6, 6, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10"
      >
      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          blow();
        }}
        aria-label="Thổi nến"
        initial={{ y: 60, opacity: 0, scale: 0.9 }}
        animate={active ? { y: 0, opacity: 1, scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.2 }}
        whileTap={{ scale: 0.97 }}
        className="cursor-pointer outline-none"
      >
        <Cake blown={blown} />
      </motion.button>
      </motion.div>

      {micState === "listening" && !blown && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-[15%] z-10 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs text-white ring-1 ring-white/30 backdrop-blur"
        >
          <motion.span
            className="h-2 w-2 rounded-full bg-red-400"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          đang nghe... thổi đi nha 🎙️
        </motion.div>
      )}

      <AnimatePresence>
        {blown && (
          <motion.div
            key="smoke"
            initial={{ opacity: 0.8, y: 0, scale: 0.6 }}
            animate={{ opacity: 0, y: -180, scale: 1.6 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
            className="pointer-events-none absolute"
            style={{ left: "50%", top: "38%", translateX: "-50%" }}
          >
            <div
              className="h-16 w-16 rounded-full blur-xl"
              style={{ background: "rgba(220,220,220,0.6)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Cake({ blown }: { blown: boolean }) {
  return (
    <div className="relative" style={{ width: 260, height: 280 }}>
      {/* Candle */}
      <div
        className="absolute z-20"
        style={{ left: "50%", top: 26, translate: "-50% 0", width: 10, height: 70, background: "linear-gradient(180deg, #FFE0E9, #E89BB0)", borderRadius: 4 }}
      />
      {/* Wick */}
      <div
        className="absolute z-20"
        style={{ left: "50%", top: 18, translate: "-50% 0", width: 2, height: 10, background: "#3a2a1a" }}
      />
      {/* Flame */}
      <AnimatePresence>
        {!blown && (
          <motion.div
            key="flame"
            initial={{ opacity: 0, scaleY: 0.3 }}
            animate={{ opacity: 1, scaleY: [1, 1.15, 0.95, 1.1, 1], rotate: [-4, 4, -3, 3, 0] }}
            exit={{ opacity: 0, scaleY: 0.1 }}
            transition={{ scaleY: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 0.8, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute z-30"
            style={{ left: "50%", top: -10, translate: "-50% 0", width: 18, height: 32, transformOrigin: "bottom center" }}
          >
            <div
              className="h-full w-full rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 75%, #fffbe0 0%, #ffd866 40%, #ff8a3d 75%, rgba(255,80,0,0) 100%)",
                boxShadow: "0 0 40px 10px rgba(255,180,80,0.6)",
                filter: "blur(0.5px)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top tier */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: 96,
          translate: "-50% 0",
          width: 180,
          height: 70,
          borderRadius: 14,
          background: "linear-gradient(180deg, #FFF1F5 0%, #FFD1DC 100%)",
          boxShadow: "inset 0 -6px 0 rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.15)",
        }}
      >
        {/* Drips */}
        <div className="absolute inset-x-0 -bottom-2 flex justify-around">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-4 w-5 rounded-b-full"
              style={{ background: "#E89BB0" }}
            />
          ))}
        </div>
      </div>

      {/* Bottom tier */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: 178,
          translate: "-50% 0",
          width: 240,
          height: 90,
          borderRadius: 18,
          background: "linear-gradient(180deg, #FFE9A8 0%, #FFB870 100%)",
          boxShadow: "inset 0 -8px 0 rgba(0,0,0,0.08), 0 14px 30px rgba(0,0,0,0.2)",
        }}
      />

      {/* Sprinkles */}
      {[
        { x: 70, y: 130, c: "#FF6B9A" },
        { x: 110, y: 150, c: "#6BD4B5" },
        { x: 150, y: 132, c: "#FFC857" },
        { x: 95, y: 218, c: "#FF6B9A" },
        { x: 140, y: 230, c: "#6BD4B5" },
        { x: 180, y: 215, c: "#C7B8FF" },
      ].map((s, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: s.x,
            top: s.y,
            width: 8,
            height: 3,
            background: s.c,
            borderRadius: 2,
            transform: `rotate(${i * 40}deg)`,
          }}
        />
      ))}
    </div>
  );
}