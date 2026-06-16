## Mục tiêu

Một trang web single-page chúc mừng sinh nhật Diệu Anh, tông giọng dễ thương — vui — tinh nghịch (không sến, không tỏ tình), xưng "anh" / gọi "em". Toàn bộ là frontend, không cần backend.

## Phong cách thiết kế

- **Bảng màu**: pastel đào (#FFD6BA), kem (#FFF8EC), xanh mint (#B8E6D2), điểm vàng ánh kim (#E6B450) làm accent. Nền chính kem ngà; gradient đào → mint cho hero.
- **Font** (load qua `<link>` trong `__root.tsx`, khai báo trong `@theme` ở `src/styles.css`):
  - Tiêu đề: **Fredoka** (vui, tròn trịa)
  - Nội dung: **Quicksand**
- **Bo góc**: lớn (rounded-2xl/3xl), shadow mềm, không viền cứng.
- **Mobile-first**: mọi section test ở 375px trước, scale lên desktop.
- **Animation**: dùng `framer-motion` cho fade/scale khi scroll vào view; `canvas-confetti` cho confetti khi bấm nút.

## Cấu trúc trang (một file route `src/routes/index.tsx`, chia component con trong `src/components/birthday/`)

```text
<Hero />              ← màn mở đầu, gradient + confetti nhẹ chạy nền
<Wish />              ← lời chúc nhẹ nhàng
<FlipCards />         ← 4 thẻ lật "Vài điều anh nhận ra ở em"
<Quiz />              ← 3 câu hỏi vui "Em hiểu anh tới đâu?"
<Invite />            ← thẻ rủ đi chơi + nút "Hẹn em nha"
<Footer />            ← confetti nhẹ + dòng kết
<MusicToggle />       ← nút floating bottom-right, bật/tắt nhạc nền
```

### 1. Hero
- Background gradient pastel (đào → mint), confetti rơi nhẹ liên tục ở mức rất thấp (không che chữ).
- H1: "Chúc mừng sinh nhật Diệu Anh! 🎉" (Fredoka, cỡ lớn, responsive clamp).
- Phụ đề: "25/06 — chúc một người vừa xinh vừa lầy có một ngày thật bình an 🥳"
- Nút "Bắt đầu nào 🎈" → bắn burst confetti + smooth scroll xuống section `#wish`.

### 2. Lời chúc
- Card kem, bo tròn, shadow mềm. Một đoạn văn ngắn, ấm áp nhưng thoải mái (placeholder để Diệu Anh tự sửa hoặc anh tự viết — sẽ điền text mẫu theo đúng tông).

### 3. Flip cards (4 thẻ)
- Grid 2×2 trên mobile, 4 cột trên desktop.
- Mỗi thẻ: mặt trước có icon + tiêu đề ngắn (vd "Cười rất duyên"), bấm/hover lật ra mô tả vui.
- Lưu nội dung trong một mảng `const cards = [...]` ở đầu component để dễ chỉnh.

### 4. Quiz "Em hiểu anh tới đâu?"
- 3 câu trắc nghiệm, mỗi câu 3-4 đáp án (placeholder).
- State local: chọn đáp án → highlight đúng/sai nhẹ nhàng (không gắt).
- Submit → hiện điểm số + 1 câu đùa dí dỏm tuỳ điểm (vd 0/3 → "Ơ kìa, em cần học lại về anh 😆"; 3/3 → "Trời, em đọc vị anh hơi giỏi đấy 👀"). Bắn confetti khi submit.
- Nút "Làm lại" để reset.

### 5. Invite "Đi đâu đó chứ?"
- Card list 3-4 gợi ý hoạt động (cà phê / xem phim / món em thích / đi dạo) — chip pastel.
- Nút "Hẹn em nha 😄" → bắn confetti + toggle hiện message "Yay! Nhắn tin cho anh chốt lịch nhé 💌" (animate scale-in).

### 6. Footer
- Confetti rơi rất nhẹ.
- Dòng: "Made with 🎂 — chúc em một ngày tuyệt vời!"

### Nút nhạc nền
- Floating button góc dưới phải, icon loa bật/tắt.
- `<audio>` element với `src=""` để trống — comment rõ "// TODO: paste link nhạc tại đây".
- Auto-mute mặc định (browser block autoplay), user bấm để bật.

## Chi tiết kỹ thuật

- **Stack**: TanStack Start đã sẵn. Thêm dependencies: `framer-motion`, `canvas-confetti` (+ `@types/canvas-confetti`).
- **Font loading**: chèn `<link>` Google Fonts vào `head` của `src/routes/__root.tsx` (Fredoka 400/600, Quicksand 400/500/600). KHÔNG `@import` URL trong CSS (theo rule Tailwind v4).
- **Design tokens**: thêm vào `src/styles.css` trong `@theme`:
  - `--color-peach`, `--color-cream`, `--color-mint`, `--color-gold`
  - `--font-display: "Fredoka", sans-serif;`
  - `--font-sans: "Quicksand", sans-serif;`
  - Cập nhật `--background`, `--foreground`, `--primary`, `--accent` để map sang palette pastel.
- **Helper** `src/lib/confetti.ts`: wrapper quanh `canvas-confetti` với 2 preset (`burst()` cho click, `gentleRain()` cho background loop trong Hero/Footer).
- **SEO** (`Route.head` trong `index.tsx`): title "Chúc mừng sinh nhật Diệu Anh 🎂", description ngắn, og:title/og:description tương ứng.
- **Accessibility**: nút có `aria-label`, audio có label, contrast text trên pastel đủ AA.
- **Code sạch dễ sửa**: tất cả text/dữ liệu (lời chúc, cards, quiz, invite) tách thành consts ở đầu mỗi component với comment `// EDIT HERE`.

## Files sẽ tạo / chỉnh

- Sửa: `src/routes/__root.tsx` (font links + meta), `src/routes/index.tsx` (compose sections), `src/styles.css` (palette + fonts).
- Tạo: `src/components/birthday/Hero.tsx`, `Wish.tsx`, `FlipCards.tsx`, `Quiz.tsx`, `Invite.tsx`, `Footer.tsx`, `MusicToggle.tsx`; `src/lib/confetti.ts`.
- Install: `framer-motion`, `canvas-confetti`, `@types/canvas-confetti`.

## Không làm (giữ scope gọn)

- Không Lovable Cloud / backend (không cần lưu gì).
- Không multi-route — đúng 1 trang.
- Không tỏ tình / không "yêu" / không sến — tone anh-em thân thiện, tinh nghịch.