import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// TODO: paste link nhạc tại đây (mp3 URL)
const MUSIC_SRC = "";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.4;
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a || !MUSIC_SRC) {
      // Không có link nhạc — chỉ toggle trạng thái nút cho có
      setPlaying((p) => !p);
      return;
    }
    try {
      if (playing) {
        a.pause();
        setPlaying(false);
      } else {
        await a.play();
        setPlaying(true);
      }
    } catch {
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="none" />
      <motion.button
        type="button"
        onClick={toggle}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.05 }}
        aria-label={playing ? "Tắt nhạc nền" : "Bật nhạc nền"}
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-card text-foreground shadow-xl shadow-foreground/10 ring-1 ring-border backdrop-blur"
      >
        {playing ? (
          <span aria-hidden className="text-xl">🔊</span>
        ) : (
          <span aria-hidden className="text-xl">🔇</span>
        )}
      </motion.button>
    </>
  );
}