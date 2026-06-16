import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-6 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-5xl">
        {(eyebrow || title) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="mb-10 text-center"
          >
            {eyebrow && (
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2
                className="font-display font-semibold text-foreground"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}
              >
                {title}
              </h2>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}