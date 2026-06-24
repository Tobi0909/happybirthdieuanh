import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Scene1Intro } from "./Scene1Intro";
import { Scene2Burst } from "./Scene2Burst";
import { Scene3Message } from "./Scene3Message";
import { Scene4Cards } from "./Scene4Cards";
import { Scene5Cake } from "./Scene5Cake";
import { SceneFutureMemories } from "./SceneFutureMemories";
import { Scene6Outro } from "./Scene6Outro";
import { Particles } from "./Particles";
import { SoundToggle } from "./SoundToggle";
import { sfx } from "@/lib/sfx";
import { burst } from "@/lib/confetti";

// EDIT HERE — chỉnh thời lượng và nền gradient từng scene
const SCENES = [
  {
    id: "intro",
    durationMs: 9000,
    background:
      "radial-gradient(ellipse at 50% 55%, #1a0f2e 0%, #0a0613 60%, #050309 100%)",
  },
  {
    id: "burst",
    durationMs: 8500,
    background:
      "linear-gradient(135deg, #FF6B9A 0%, #FFA46B 45%, #FFD86B 100%)",
  },
  {
    id: "message",
    durationMs: 11000,
    background:
      "linear-gradient(135deg, #6BB7FF 0%, #B58CFF 50%, #FF8FB1 100%)",
  },
  {
    id: "cards",
    durationMs: 10000,
    background:
      "linear-gradient(135deg, #88D4B5 0%, #6BB7FF 50%, #B58CFF 100%)",
  },
  {
    id: "cake",
    durationMs: null, // chờ user thổi nến
    background:
      "linear-gradient(135deg, #2d1b3d 0%, #4a2a5a 50%, #6b3a7a 100%)",
  },
  {
    id: "future",
    durationMs: 10000,
    background:
      "linear-gradient(135deg, #FFB870 0%, #FF7AB6 50%, #8C6BFF 100%)",
  },
  {
    id: "outro",
    durationMs: null, // ở lại cho user chọn
    background:
      "linear-gradient(135deg, #FFB4A2 0%, #FFD6BA 50%, #B8E6D2 100%)",
  },
] as const;

export function ScenePlayer() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef<number | null>(null);

  const total = SCENES.length;
  const scene = SCENES[index];

  // Parallax via mouse / device tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const bgX = useTransform(sx, [-1, 1], [-20, 20]);
  const bgY = useTransform(sy, [-1, 1], [-20, 20]);
  const partX = useTransform(sx, [-1, 1], [-40, 40]);
  const partY = useTransform(sy, [-1, 1], [-40, 40]);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma != null) mx.set(Math.max(-1, Math.min(1, e.gamma / 30)));
      if (e.beta != null) my.set(Math.max(-1, Math.min(1, (e.beta - 30) / 45)));
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("deviceorientation", onOrient);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("deviceorientation", onOrient);
    };
  }, [mx, my]);

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next >= total) return;
      setDirection(next > index ? 1 : -1);
      setIndex(next);
      sfx.whoosh();
    },
    [index, total],
  );
  // Easter egg — 5 rapid taps anywhere
  const tapTimes = useRef<number[]>([]);
  const [egg, setEgg] = useState(false);
  const onAnyTap = useCallback(() => {
    const now = Date.now();
    tapTimes.current = [...tapTimes.current, now].filter((t) => now - t < 1500);
    if (tapTimes.current.length >= 5) {
      tapTimes.current = [];
      setEgg(true);
      burst();
      sfx.sparkle();
      setTimeout(() => setEgg(false), 3500);
    }
  }, []);

  const next = useCallback(() => {
    if (index < total - 1) goTo(index + 1);
  }, [goTo, index, total]);
  const prev = useCallback(() => {
    if (index > 0) goTo(index - 1);
  }, [goTo, index]);
  const restart = useCallback(() => goTo(0), [goTo]);

  // Auto-advance
  useEffect(() => {
    if (!scene.durationMs) return;
    const id = setTimeout(next, scene.durationMs);
    return () => clearTimeout(id);
  }, [scene, next]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 50) {
      dx < 0 ? next() : prev();
    }
  };

  const renderScene = () => {
    const active = true;
    switch (scene.id) {
      case "intro":
        return <Scene1Intro active={active} />;
      case "burst":
        return <Scene2Burst active={active} />;
      case "message":
        return <Scene3Message active={active} />;
      case "cards":
        return <Scene4Cards active={active} />;
      case "cake":
        return <Scene5Cake active={active} onFinish={next} />;
      case "future":
        return <SceneFutureMemories active={active} />;
      case "outro":
        return <Scene6Outro active={active} onRestart={restart} />;
    }
  };

  return (
    <div
      className="relative h-[100svh] w-full select-none overflow-hidden text-white"
      onClick={() => {
        onAnyTap();
        next();
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Animated gradient background — crossfades on scene change, parallax + ken burns */}
      <AnimatePresence>
        <motion.div
          key={scene.id + "-bg"}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ x: bgX, y: bgY }}
        >
          <motion.div
            className="absolute inset-[-6%]"
            style={{ background: scene.background, backgroundSize: "220% 220%" }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              scale: [1, 1.06, 1],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Floating gradient orbs — global dynamic lighting */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ x: bgX, y: bgY }}
      >
        <motion.div
          className="absolute h-[40vmax] w-[40vmax] rounded-full"
          style={{
            left: "10%",
            top: "20%",
            background:
              "radial-gradient(circle, rgba(255,180,220,0.35) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
          animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute h-[35vmax] w-[35vmax] rounded-full"
          style={{
            right: "5%",
            bottom: "10%",
            background:
              "radial-gradient(circle, rgba(150,200,255,0.32) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
          animate={{ x: [0, -50, 30, 0], y: [0, 30, -40, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Floating particles overlay */}
      <motion.div className="absolute inset-0 z-[2]" style={{ x: partX, y: partY }}>
        <Particles count={28} />
      </motion.div>

      {/* Scene content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={scene.id}
          custom={direction}
          initial={{ opacity: 0, scale: 0.95, filter: "blur(12px)", y: 30 }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)", y: -30 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 h-full w-full"
        >
          {renderScene()}
        </motion.div>
      </AnimatePresence>

      {/* Top-right controls */}
      <div className="pointer-events-none absolute right-3 top-3 z-30 flex gap-2 sm:right-5 sm:top-5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="pointer-events-auto rounded-full bg-white/15 px-4 py-2 text-xs font-medium text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/25 sm:text-sm disabled:opacity-40"
          aria-label="Tiếp theo"
          disabled={index >= total - 1}
        >
          Tiếp theo →
        </button>
      </div>

      {/* Bottom: progress dots + replay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-30 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          {SCENES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Đến scene ${i + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                goTo(i);
              }}
              className={`pointer-events-auto rounded-full transition-all ${
                i === index
                  ? "h-2.5 w-8 bg-white"
                  : "h-2.5 w-2.5 bg-white/45 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
        {index === total - 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              restart();
            }}
            className="pointer-events-auto rounded-full bg-white/15 px-4 py-1.5 text-xs font-medium text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/25"
          >
            Xem lại 🔁
          </button>
        )}
      </div>

      {/* Hint */}
      {index === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="pointer-events-none absolute bottom-20 left-1/2 z-30 -translate-x-1/2 text-center text-xs text-white/60"
        >
          chạm / vuốt / dùng phím ← → để điều khiển
        </motion.div>
      )}

      <SoundToggle />

      {/* Easter egg overlay */}
      <AnimatePresence>
        {egg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 16 }}
            className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center px-6"
          >
            <div className="max-w-sm rounded-3xl border border-white/30 bg-white/15 px-6 py-5 text-center font-display text-white shadow-2xl backdrop-blur-2xl">
              <div className="text-lg font-semibold">🐣 Easter Egg unlocked!</div>
              <div className="mt-1 text-sm text-white/85">
                Thật ra anh đã sửa web này khá lâu đấy 😄
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}