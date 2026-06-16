import { motion } from "framer-motion";
import { Bokeh } from "./Decorations";
import type { SceneProps } from "./types";

// EDIT HERE
const CARDS = [
  { icon: "😊", title: "Cười rất duyên", note: "Kiểu cười dễ chịu, ai gặp cũng thấy nhẹ." },
  { icon: "🎧", title: "Gu xịn", note: "Nhạc, đồ ăn, chỗ chơi — em chọn cái nào cũng đáng." },
  { icon: "💬", title: "Nói chuyện hợp cạ", note: "Chém gió với em xong tự dưng ngày nhẹ đi." },
  { icon: "✨", title: "Năng lượng tích cực", note: "Có em là không khí xung quanh được sạc pin." },
];

const CARD_COLORS = [
  "linear-gradient(135deg, #FFD6BA 0%, #FFB4A2 100%)",
  "linear-gradient(135deg, #B8E6D2 0%, #88D4B5 100%)",
  "linear-gradient(135deg, #FFE9A8 0%, #FFCB6B 100%)",
  "linear-gradient(135deg, #D6C4FF 0%, #B69BFF 100%)",
];

export function Scene4Cards({ active }: SceneProps) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-5 py-10">
      <Bokeh />
      <motion.h2
        initial={{ opacity: 0, y: -16 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-8 text-center font-display font-semibold text-white drop-shadow"
        style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}
      >
        Vài điều anh để ý ở em 👀
      </motion.h2>

      <div className="relative z-10 grid w-full max-w-5xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 80, rotateX: -25, rotateY: 10 }}
            animate={active ? { opacity: 1, y: 0, rotateX: 0, rotateY: 0 } : {}}
            transition={{
              delay: 0.2 + i * 0.18,
              duration: 0.7,
              type: "spring",
              stiffness: 100,
              damping: 14,
            }}
            whileHover={{ y: -8, rotateZ: i % 2 === 0 ? -2 : 2, scale: 1.03 }}
            className="rounded-3xl p-5 text-foreground shadow-2xl sm:p-6"
            style={{
              background: CARD_COLORS[i % CARD_COLORS.length],
              transformStyle: "preserve-3d",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.35)",
            }}
          >
            <div className="text-4xl sm:text-5xl">{c.icon}</div>
            <div className="mt-3 font-display text-base font-semibold sm:text-lg">
              {c.title}
            </div>
            <div className="mt-1 text-xs text-foreground/70 sm:text-sm">
              {c.note}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}