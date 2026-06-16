import { createFileRoute } from "@tanstack/react-router";
import { ScenePlayer } from "@/components/scenes/ScenePlayer";

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
    <main className="h-[100svh] w-full overflow-hidden bg-black">
      <ScenePlayer />
    </main>
  );
}
