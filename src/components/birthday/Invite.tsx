import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./Section";
import { burst } from "@/lib/confetti";

// EDIT HERE
const IDEAS = [
  { icon: "☕", label: "Cà phê quán xinh" },
  { icon: "🎬", label: "Xem phim em chọn" },
  { icon: "🍜", label: "Đi ăn món em thèm" },
  { icon: "🌆", label: "Đi dạo lúc trời mát" },
];

export function Invite() {
  const [open, setOpen] = useState(false);
  const handle = () => {
    setOpen(true);
    burst();
  };

  return (
    <Section eyebrow="Sắp tới nha" title="Đi đâu đó chứ? 🌷">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55 }}
        className="mx-auto max-w-2xl rounded-3xl bg-card p-7 sm:p-9 shadow-xl shadow-primary/5 ring-1 ring-border"
      >
        <p className="text-foreground/75">
          Không có gì gấp, chỉ là nếu rảnh thì mình đi đổi gió chút cho vui.
          Em thích cái nào trong đây?
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {IDEAS.map((i) => (
            <span
              key={i.label}
              className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--mint-soft)] px-4 py-2 text-sm font-medium text-foreground ring-1 ring-border"
            >
              <span>{i.icon}</span> {i.label}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handle}
            className="rounded-full bg-primary px-7 py-3 font-display font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-primary/40"
          >
            Hẹn em nha 😄
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl bg-[color:var(--peach-soft)] px-4 py-2.5 text-sm font-medium text-foreground ring-1 ring-border"
              >
                Yay! Nhắn tin cho anh chốt lịch nhé 💌
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Section>
  );
}