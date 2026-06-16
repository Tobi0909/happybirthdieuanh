import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./Section";
import { burst } from "@/lib/confetti";

// EDIT HERE
const QUESTIONS = [
  {
    q: "Buổi sáng anh khó sống nếu thiếu thứ gì?",
    options: ["Cà phê đen", "Trà sữa", "Nước lọc", "Một cái ôm"],
    answer: 0,
  },
  {
    q: "Cuối tuần anh hay làm gì nhất?",
    options: ["Ngủ tới trưa", "Cày phim", "Lang thang quán mới", "Đi gym"],
    answer: 2,
  },
  {
    q: "Món anh có thể ăn cả tuần không chán?",
    options: ["Phở", "Bún bò", "Cơm tấm", "Mì cay"],
    answer: 1,
  },
];

function joke(score: number) {
  if (score === 0) return "Ơ kìa, em cần học lại về anh 😆";
  if (score === 1) return "Cũng được, mai mốt cà phê thêm vài lần là quen 😎";
  if (score === 2) return "Khá lắm — em đã có hồ sơ sơ bộ về anh rồi đấy 👀";
  return "Trời, em đọc vị anh hơi giỏi đấy 👀✨";
}

export function Quiz() {
  const [answers, setAnswers] = useState<(number | null)[]>(
    QUESTIONS.map(() => null),
  );
  const [submitted, setSubmitted] = useState(false);

  const score = answers.reduce<number>(
    (acc, a, i) => acc + (a === QUESTIONS[i].answer ? 1 : 0),
    0,
  );
  const allAnswered = answers.every((a) => a !== null);

  const handleSubmit = () => {
    setSubmitted(true);
    burst();
  };

  const reset = () => {
    setAnswers(QUESTIONS.map(() => null));
    setSubmitted(false);
  };

  return (
    <Section eyebrow="Quiz vui" title="Em hiểu anh tới đâu? 😆">
      <div className="mx-auto max-w-2xl space-y-6">
        {QUESTIONS.map((item, qi) => (
          <motion.div
            key={qi}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: qi * 0.08 }}
            className="rounded-3xl bg-card p-6 shadow-md shadow-foreground/5 ring-1 ring-border"
          >
            <div className="mb-4 flex items-start gap-3">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold text-primary-foreground"
                style={{ background: "var(--gold)" }}
              >
                {qi + 1}
              </span>
              <h3 className="font-display text-lg font-semibold text-foreground">
                {item.q}
              </h3>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {item.options.map((opt, oi) => {
                const selected = answers[qi] === oi;
                const correct = submitted && oi === item.answer;
                const wrong = submitted && selected && oi !== item.answer;
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={submitted}
                    onClick={() =>
                      setAnswers((prev) => {
                        const next = [...prev];
                        next[qi] = oi;
                        return next;
                      })
                    }
                    className={`rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all
                      ${
                        correct
                          ? "bg-[color:var(--mint)] text-foreground ring-2 ring-[color:var(--mint)]"
                          : wrong
                            ? "bg-[color:var(--peach)] text-foreground ring-2 ring-[color:var(--peach)]"
                            : selected
                              ? "bg-[color:var(--peach-soft)] text-foreground ring-2 ring-primary"
                              : "bg-muted text-foreground/80 hover:bg-[color:var(--mint-soft)] ring-1 ring-border"
                      }
                    `}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}

        <div className="flex flex-col items-center gap-4 pt-2">
          {!submitted ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="rounded-full bg-primary px-8 py-3 font-display font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition disabled:cursor-not-allowed disabled:opacity-40"
            >
              Chấm điểm em nào 🎯
            </button>
          ) : (
            <AnimatePresence>
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full rounded-3xl bg-gradient-to-br from-[color:var(--peach-soft)] to-[color:var(--mint-soft)] p-6 text-center ring-1 ring-border"
              >
                <div className="font-display text-2xl font-semibold text-foreground">
                  {score}/{QUESTIONS.length} 🎈
                </div>
                <p className="mt-2 text-foreground/75">{joke(score)}</p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-4 rounded-full bg-card px-5 py-2 text-sm font-semibold text-foreground ring-1 ring-border transition hover:bg-muted"
                >
                  Làm lại 🔄
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </Section>
  );
}