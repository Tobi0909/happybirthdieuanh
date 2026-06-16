import { motion } from "framer-motion";
import { Section } from "./Section";

// EDIT HERE
const WISH = `Tụi mình mới quen thôi, nhưng anh thấy em là kiểu người làm không khí xung quanh vui hẳn lên. Chúc em tuổi mới gặp toàn điều hay, ăn ngon ngủ kỹ, và làm được mọi thứ em muốn nha!`;

export function Wish() {
  return (
    <Section id="wish" eyebrow="Lời chúc nhỏ" title="Gửi em một điều dễ thương 💌">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-2xl rounded-3xl bg-card p-8 sm:p-10 shadow-xl shadow-primary/5 ring-1 ring-border"
      >
        <div
          aria-hidden
          className="absolute -top-4 left-8 rounded-full px-3 py-1 text-xs font-semibold text-primary-foreground"
          style={{ background: "var(--gold)" }}
        >
          ✨ from anh
        </div>
        <p className="text-lg sm:text-xl leading-relaxed text-foreground/85">
          {WISH}
        </p>
      </motion.div>
    </Section>
  );
}