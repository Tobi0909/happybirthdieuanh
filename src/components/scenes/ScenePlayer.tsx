import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Scene1Intro } from "./Scene1Intro";
import { Scene2Burst } from "./Scene2Burst";
import { Scene3Message } from "./Scene3Message";
import { Scene4Cards } from "./Scene4Cards";
import { Scene5Cake } from "./Scene5Cake";
import { Scene6Outro } from "./Scene6Outro";
import { MusicToggle } from "@/components/birthday/MusicToggle";

// EDIT HERE — chỉnh thời lượng và nền gradient từng scene
const SCENES = [
  {
    id: "intro",
    durationMs: 4000,
    background:
      "radial-gradient(ellipse at 50% 55%, #1a0f2e 0%, #0a0613 60%, #050309 100%)",
  },
  {
    id: "burst",
    durationMs: 5500,
    background:
      "linear-gradient(135deg, #FF6B9A 0%, #FFA46B 45%, #FFD86B 100%)",
  },
  {
    id: "message",
    durationMs: 6500,
    background:
      "linear-gradient(135deg, #6BB7FF 0%, #B58CFF 50%, #FF8FB1 100%)",
  },
  {
    id: "cards",
    durationMs: 6000,
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

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next >= total) return;
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index, total],
  );

  const next = useCallback(() => {
    if (index < total - 1) goTo(index + 1);
  }, [goTo, index, total]);
  const prev = useCallback(() => {
    if (index > 0) goTo(index - 1);
  }, [goTo, index]);
  const restart = useCallback(() => goTo(0), [goTo]);
  const skip = useCallback(() => goTo(total - 1), [goTo, total]);

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
      case "outro":
        return <Scene6Outro active={active} onRestart={restart} />;
    }
  };

  return (
    <div
      className="relative h-[100svh] w-full select-none overflow-hidden text-white"
      onClick={next}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Animated gradient background — crossfades on scene change */}
      <AnimatePresence>
        <motion.div
          key={scene.id + "-bg"}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          style={{ background: scene.background, backgroundSize: "200% 200%" }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ background: scene.background, backgroundSize: "200% 200%" }}
            animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Scene content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={scene.id}
          custom={direction}
          initial={{ opacity: 0, x: 60 * direction, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -60 * direction, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full w-full"
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
            skip();
          }}
          className="pointer-events-auto rounded-full bg-white/15 px-4 py-2 text-xs font-medium text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/25 sm:text-sm"
          aria-label="Bỏ qua"
        >
          Bỏ qua ⏭
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

      <MusicToggle />
    </div>
  );
}