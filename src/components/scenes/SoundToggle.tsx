import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { isMuted, setMuted, subscribeMuted, sfx } from "@/lib/sfx";

export function SoundToggle() {
  const [muted, setM] = useState(isMuted());
  useEffect(() => subscribeMuted(setM) as unknown as () => void, []);
  return (
    <motion.button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        const next = !muted;
        setMuted(next);
        if (!next) sfx.click();
      }}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.06 }}
      aria-label={muted ? "Bật âm thanh" : "Tắt âm thanh"}
      className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white shadow-xl ring-1 ring-white/30 backdrop-blur-xl transition hover:bg-white/25"
    >
      <span aria-hidden className="text-lg">
        {muted ? "🔇" : "🔊"}
      </span>
    </motion.button>
  );
}