import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "./Section";

// EDIT HERE
const CARDS = [
  {
    icon: "😊",
    title: "Cười rất duyên",
    back: "Kiểu nụ cười mà ai gặp cũng phải dễ chịu theo.",
    color: "var(--peach-soft)",
  },
  {
    icon: "🎧",
    title: "Gu xịn",
    back: "Nhạc, đồ ăn, chỗ chơi — em chọn cái nào cũng đáng thử.",
    color: "var(--mint-soft)",
  },
  {
    icon: "💬",
    title: "Nói chuyện hợp cạ",
    back: "Chém gió với em xong tự nhiên ngày nhẹ hẳn đi.",
    color: "#FFE9A8",
  },
  {
    icon: "✨",
    title: "Năng lượng tích cực",
    back: "Có em là không khí xung quanh được sạc đầy pin.",
    color: "#FFD6E5",
  },
];

export function FlipCards() {
  return (
    <Section
      eyebrow="Quan sát nhỏ"
      title="Vài điều anh nhận ra ở em"
      className="bg-gradient-to-b from-transparent via-[color:var(--mint-soft)]/40 to-transparent"
    >
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {CARDS.map((c, i) => (
          <FlipCard key={c.title} card={c} delay={i * 0.08} />
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-foreground/55">
        (chạm vào thẻ để lật 💫)
      </p>
    </Section>
  );
}

function FlipCard({
  card,
  delay,
}: {
  card: (typeof CARDS)[number];
  delay: number;
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className="group relative aspect-[3/4] w-full text-left"
      style={{ perspective: 1000 }}
      aria-label={`Lật thẻ: ${card.title}`}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* front */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl p-5 text-center shadow-lg shadow-foreground/5 ring-1 ring-border"
          style={{ background: card.color, backfaceVisibility: "hidden" }}
        >
          <div className="text-5xl">{card.icon}</div>
          <div className="mt-4 font-display text-lg font-semibold text-foreground">
            {card.title}
          </div>
        </div>
        {/* back */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-3xl bg-card p-5 text-center shadow-lg shadow-foreground/5 ring-1 ring-border"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <p className="text-sm sm:text-base leading-relaxed text-foreground/80">
            {card.back}
          </p>
        </div>
      </motion.div>
    </motion.button>
  );
}