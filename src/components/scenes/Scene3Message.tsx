import { motion } from "framer-motion";
import { Bokeh } from "./Decorations";
import type { SceneProps } from "./types";

// EDIT HERE — mỗi dòng là một mảnh hiện stagger
const LINES = [
  "Tụi mình mới quen thôi,",
  "nhưng anh thấy em là kiểu người",
  "làm mọi thứ xung quanh vui hẳn lên.",
  "Chúc em tuổi mới gặp toàn điều hay,",
  "sống thật rực rỡ nha! ✨",
];

export function Scene3Message({ active }: SceneProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden px-6">
      <Bokeh />
      <div className="relative z-10 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-white/70"
        >
          Anh muốn nói với em
        </motion.div>
        <div className="font-display font-medium leading-[1.35] text-white drop-shadow"
             style={{ fontSize: "clamp(1.5rem, 4.4vw, 2.8rem)" }}>
          {LINES.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={active ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.25 + i * 0.45, duration: 0.7, ease: "easeOut" }}
            >
              {line}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}