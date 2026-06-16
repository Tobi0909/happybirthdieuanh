import { useEffect, useRef } from "react";
import { gentleRain } from "@/lib/confetti";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            gentleRain(2000);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <footer
      ref={ref}
      className="relative px-6 py-16 text-center"
      style={{
        background:
          "linear-gradient(180deg, transparent, var(--peach-soft) 70%)",
      }}
    >
      <p className="font-display text-base font-medium text-foreground/75">
        Made with 🎂 — chúc em một ngày tuyệt vời!
      </p>
    </footer>
  );
}