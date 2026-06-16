import confetti from "canvas-confetti";

const PALETTE = ["#FFB4A2", "#FFD6BA", "#B8E6D2", "#FFE9A8", "#E6B450", "#FFC8DD"];

export function burst() {
  confetti({
    particleCount: 90,
    spread: 75,
    startVelocity: 45,
    origin: { y: 0.7 },
    colors: PALETTE,
    scalar: 1.1,
  });
}

export function sideBurst() {
  confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 }, colors: PALETTE });
  confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 }, colors: PALETTE });
}

export function gentleRain(durationMs = 2500) {
  const end = Date.now() + durationMs;
  const tick = () => {
    confetti({
      particleCount: 2,
      startVelocity: 15,
      spread: 360,
      ticks: 120,
      origin: { x: Math.random(), y: -0.05 },
      colors: PALETTE,
      gravity: 0.5,
      scalar: 0.8,
    });
    if (Date.now() < end) requestAnimationFrame(tick);
  };
  tick();
}