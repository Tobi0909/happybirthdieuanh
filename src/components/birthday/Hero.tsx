import { motion } from "framer-motion";
import { burst, gentleRain } from "@/lib/confetti";
import { useEffect } from "react";

// EDIT HERE
const NAME = "Diệu Anh";
const DATE = "25/06";
const SUBTITLE = "chúc một người vừa xinh vừa lầy có một ngày thật bình an 🥳";

export function Hero() {
  useEffect(() => {
    const t = setTimeout(() => gentleRain(1800), 400);
    return () => clearTimeout(t);
  }, []);

  const handleStart = () => {
    burst();
    document.getElementById("wish")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-20">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, var(--peach-soft) 0%, var(--cream) 45%, var(--mint-soft) 100%)",
        }}
      />
      {/* floating blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-20 -left-20 h-72 w-72 rounded-full blur-3xl -z-10"
        style={{ background: "var(--peach)" }}
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full blur-3xl -z-10"
        style={{ background: "var(--mint)" }}
        animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur px-4 py-1.5 text-sm font-medium text-foreground/70 ring-1 ring-border"
        >
          🎂 {DATE} • Happy Birthday
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-display font-semibold leading-tight tracking-tight text-foreground"
          style={{ fontSize: "clamp(2.4rem, 7vw, 4.75rem)" }}
        >
          Chúc mừng sinh nhật <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #E07A5F 0%, #E6B450 50%, #6FBF9F 100%)",
            }}
          >
            {NAME}!
          </span>{" "}
          🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-5 text-base sm:text-lg text-foreground/70"
        >
          {DATE} — {SUBTITLE}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleStart}
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-display text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-shadow hover:shadow-primary/40"
        >
          Bắt đầu nào 🎈
        </motion.button>
      </div>
    </section>
  );
}