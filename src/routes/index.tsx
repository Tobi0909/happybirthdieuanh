import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/birthday/Hero";
import { Wish } from "@/components/birthday/Wish";
import { FlipCards } from "@/components/birthday/FlipCards";
import { Quiz } from "@/components/birthday/Quiz";
import { Invite } from "@/components/birthday/Invite";
import { Footer } from "@/components/birthday/Footer";
import { MusicToggle } from "@/components/birthday/MusicToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chúc mừng sinh nhật Diệu Anh 🎂" },
      {
        name: "description",
        content:
          "Một trang nhỏ xinh anh làm để chúc em sinh nhật vui vẻ — có confetti, quiz và vài lời chúc dễ thương.",
      },
      { property: "og:title", content: "Chúc mừng sinh nhật Diệu Anh 🎂" },
      {
        property: "og:description",
        content: "Chúc em tuổi mới gặp toàn điều hay, ăn ngon ngủ kỹ 🥳",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <Wish />
      <FlipCards />
      <Quiz />
      <Invite />
      <Footer />
      <MusicToggle />
    </main>
  );
}
