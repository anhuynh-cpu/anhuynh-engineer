# Super Prompt — Profile Web cho Dev Design Engineer

> File này gồm 2 phần:
> 1. **Super Prompt** — copy nguyên đoạn để paste vào AI agent (Claude, ChatGPT, Cursor, v0, Bolt, Lovable…)
> 2. **Hướng dẫn đưa code vào các nền tảng visual** (VS Code, v0.dev, Bolt.new, Lovable, Cursor…)

---

## PHẦN 1 — SUPER PROMPT

Copy toàn bộ phần dưới đây và paste vào AI agent. Có thể chỉnh tên, vai trò, dịch vụ theo nhu cầu trước khi gửi.

---

```
# VAI TRÒ
Bạn là một Senior Frontend Engineer kiêm UI Designer chuyên nghiệp.
Nhiệm vụ: tạo một trang profile cá nhân single-page bằng HTML/CSS/JS thuần
(không framework), production-grade, mang phong cách dark / tech / 
phản-trọng-lực (anti-gravity).

# YÊU CẦU CHUNG
- 1 file `.html` duy nhất, có thể mở trực tiếp trong browser
- `<style>` chứa toàn bộ CSS, `<script>` chứa toàn bộ JS
- KHÔNG dùng framework (no React, no Vue, no Tailwind CDN)
- External resource duy nhất: Google Fonts
- Ngôn ngữ nội dung: tiếng Việt (lang="vi")
- Responsive: desktop / tablet / mobile
- Tôn trọng `prefers-reduced-motion`

# THÔNG TIN CÁ NHÂN (placeholder, có thể chỉnh)
- Tên: Thiên Ân (biệt danh: Adam)
- Vai trò: Dev Design Engineer
- Vị trí: TP. Hồ Chí Minh, VN
- Mô tả ngắn: "Một dev biết design và một designer biết code. 
  Thiết kế và xây dựng website, blog, webapp, mobile app — 
  từ ý tưởng đến deploy trên hosting, domain hay VPS riêng."

# DESIGN SYSTEM

## Màu sắc (dark theme, accent đỏ hồng + cam đào)
:root {
  --bg: #08090C;
  --bg-elev: #0D0F14;
  --surface: #12141A;
  --text: #F2F3F5;
  --text-dim: #9CA0AB;
  --text-mute: #5C606C;
  --border: rgba(255,255,255,0.08);
  --border-strong: rgba(255,255,255,0.16);
  --accent: #FF2D6B;            /* hồng đỏ vibrant */
  --accent-glow: rgba(255,45,107,0.4);
  --accent-soft: rgba(255,45,107,0.1);
  --cyan: #FF9F6E;              /* cam đào (tên giữ là cyan cho gradient) */
  --cyan-soft: rgba(255,159,110,0.14);
}
Gradient nhấn: linear-gradient(135deg, #FF2D6B 0%, #FF9F6E 100%)
Selection background: var(--accent), color var(--bg)
Noise overlay subtle toàn body (SVG fractalNoise mix-blend overlay)

## Typography (Google Fonts)
- Display: "Bricolage Grotesque" (300-800) — dùng cho headings
- Body: "Be Vietnam Pro" (300-700) — dùng cho paragraph
- Mono: "JetBrains Mono" (400-600) — dùng cho code/meta/labels
- Letter-spacing -0.02em đến -0.04em cho display headings

## Spacing
- Container: max-width 1320px, padding 0 32px
- Section padding: 120px top/bottom (mobile 80px)
- Border radius: 8px (sm), 14px (md), 22px (lg)
- Ease: cubic-bezier(0.16, 1, 0.3, 1) — out
- Ease spring: cubic-bezier(0.34, 1.56, 0.64, 1)

# CẤU TRÚC SECTION (theo thứ tự)

## 1. Fixed Navigation
- Logo: vuông 38x38, nền accent, chữ "A" display bold màu bg
- Tên: "Thiên Ân"
- Menu: Về tôi · Dịch vụ · Kỹ năng · Dự án · Hành trình
- CTA button: "Liên hệ" (nền accent, có arrow → translateX khi hover)
- Trạng thái scrolled (window.scrollY > 40): glassmorphism 
  (rgba(8,9,12,0.7) + backdrop-filter blur(20px) saturate(180%))
- Mobile: ẩn nav-links, hiện menu-toggle button

## 2. Hero (min-height 100vh)

### Background effects (z-index 1-2, behind content)
1. **Grid lines mờ** — 60×60px grid với radial mask, opacity 0.04
2. **5 đường beam laser dọc** — width 1px, gradient (transparent→accent→transparent),
   height 50-60%, animation beam-sweep 8s linear loop, lệch pha (delay 0/-2/-4/-6/-3s),
   1 beam dùng --cyan để đa dạng
3. **6 hình khối 3D wireframe lơ lửng** (SVG) trong .gravity-scene (perspective 1400px):
   - shape-hex-lg (200px, top 8% right 4%) — hexagon outline 2 lớp
   - shape-ring (240px, top 28% right 22%) — 3 vòng tròn đồng tâm + 2 dot
   - shape-bracket (120px, top 72% right 6%) — dấu `< >` với line giữa
   - shape-hex-sm (80px, top 62% right 28%) — hexagon nhỏ filled
   - shape-nodes (100px, top 18% right 38%) — 5 điểm nối network
   - shape-cube (60px, top 50% right 12%) — cube isometric wireframe
   - Mỗi shape có animation drift riêng (drift-1/2/3/4) — translate3d + rotateX/Y/Z,
     thời lượng 18-36s loop, fade-in delay 0.4-1.4s
   - drop-shadow filter glow màu accent
4. **22 particle bay lên** — width 2-5px random, color xen kẽ accent/cyan,
   bay từ bottom -10px lên translateY -110vh, drift ngang ±60px,
   thời lượng 14-32s random, delay random âm để không đồng bộ
5. **Mouse parallax** — scene-inner rotateY/X theo cursor (lerp 0.04, max 8°)
6. **Scroll fade** — gravity-scene translateY + giảm opacity khi cuộn xuống

### Content layout (z-index 3, grid 1.4fr / 1fr, gap 80px)

LEFT (hero-content):
- Badge mono: "Đang nhận dự án / v2026" với pulse dot accent
- Title 3 dòng, font display 600 clamp(48px, 7vw, 96px), line-height 0.95:
    "Xin chào,"
    "tôi là Adam —"
    "Dev Design Engineer."  ← gradient text italic
  Mỗi dòng: overflow hidden + inner span animation rise (translateY 100%→0 + opacity),
  staggered delay 0.3 / 0.45 / 0.6s
- Subtitle text-dim, max-width 540px
- 3 meta items với icon stroke accent: location, role, value
- 2 buttons: primary (nền accent) + ghost (viền)

RIGHT (hero-avatar):
- avatar-card aspect-ratio 4/5, nghiêng rotate(2deg), border-radius lg,
  bg surface, có gradient overlay accent/cyan
- avatar-placeholder gradient initials "A" (font 140px display)
  → comment hướng dẫn thay bằng <img>
- avatar-tag bottom: status dot xanh #4ade80 + "Đang nhận dự án" + role "DEV · DESIGN"
- Hover card: bỏ rotate, scale 1.02

## 3. About (border-top 1px border)
- Section header: tag mono "/ Về tôi" với line-prefix 24px → title display lớn
- Grid 1.2fr / 1fr, gap 80px:
  - LEFT: 3 đoạn text, đoạn 3 màu dim. Trong text có .highlight (italic accent)
    và em (italic cyan) để emphasize key terms
  - RIGHT: about-stats grid 2x2, mỗi cell có num display 56px + plus accent italic + 
    label mono uppercase. Hover top-line gradient sáng dần
    (30+, 20+, 3+, ∞)

## 4. Services (border-top)
- Header tương tự
- services-grid 2 cột, gap 24px, 6 service-card:
  1. Website & Landing Page (icon monitor)
  2. Blog & Content Site (icon file-text)
  3. Web Application (icon code </>)
  4. Mobile App (icon phone)
  5. Domain · Hosting · VPS (icon globe)
  6. Vibe Coding & AI Build (icon zap ⚡)
- Mỗi card padding 36×32: 
  - số "/ 01" top-right mono mute
  - icon 56×56 trong box border, hover rotate -6deg + bg accent-soft
  - h3 display 24px + p text-dim 15px
  - ul pill tags mono 11px
  - hover: viền strong, translateY -4px, gradient radial follow cursor (--mx/--my)
  - Scroll reveal: opacity 0→1 + translateY 30→0 staggered

## 5. Skills (border-top)
- Header
- 4 skill-cat, mỗi cat grid 280px / 1fr, gap 48px, border-bottom giữa các cat:
  - LEFT (sticky top 100px): số "/ 01 — Design" mono + title display 32px + desc dim
  - RIGHT: tech-grid 4 cột × N hàng, mỗi tech-item:
    aspect-ratio 1, icon SVG 28px stroke dim → accent on hover,
    label mono 11px center, hover: bg accent-soft, viền accent, translateY -4px,
    scroll reveal staggered
- 4 cat:
  - **/ 01 — Design**: Figma · Photoshop · Illustrator · UI Systems
  - **/ 02 — Frontend**: HTML/CSS · JavaScript · React · Next.js · Vue.js · Tailwind · TypeScript · Motion/GSAP
  - **/ 03 — CMS & Backend**: WordPress · Elementor · Node.js · PHP · MySQL · MongoDB · Supabase · Firebase
  - **/ 04 — Hosting & Infra**: VPS/Linux · cPanel · Vercel · Netlify · Docker · SSL/DNS · Cloudflare · Git

## 6. Projects (border-top)
- Header
- projects-list flex column gap 32, 3 project card lớn:
  - Layout grid 1.3fr / 1fr, padding 48, border-radius lg, bg subtle
  - Card chẵn (nth-child(even)): direction rtl để hoán đổi side (con sửa lại ltr)
  - LEFT info: 
    - số mono "/ DỰ ÁN 01" mute
    - title display clamp(28px, 3vw, 40px)
    - desc text-dim
    - stack pills mono 11px (5-6 items)
    - 2 links accent mono với svg icon (gap tăng khi hover)
  - RIGHT visual: aspect 4/3, mock browser bên trong:
    - browser bar h28 với 3 dot mac (#ff5f57, #febc2e, #28c840)
    - content lines width 35/50/70%, 1 line lg accent opacity 0.5
    - mock-grid 3 cell aspect 1, cell 1 và 3 màu accent-soft/cyan-soft
  - Hover card: gradient radial follow + border strong
  - Scroll reveal: opacity + translateY 40

3 project:
  1. **Website doanh nghiệp + Blog tin tức tích hợp**
     Stack: WordPress · Custom Theme · PHP · VPS · SSL
  2. **Webapp quản lý đơn hàng & kho cho shop online**
     Stack: Next.js · TypeScript · Supabase · Tailwind · Realtime
  3. **Blog cá nhân + Mobile App đồng bộ nội dung**
     Stack: React Native · Headless CMS · Vercel · AI-assisted · Cross-platform

## 7. Experience Timeline (border-top)
- Header
- timeline 4 exp-item, mỗi item grid 180px / 1fr / 1.2fr gap 48, padding 40 top/bottom,
  border-top mỗi item:
  - LEFT date: mono accent "2024 — Hiện tại" + duration mute "Đang làm"
  - MID: title display clamp(22px, 2.4vw, 30px) + company mono dim
  - RIGHT: desc dim + exp-tags pills nhỏ
- Hover item: 
  - line accent grow từ 0% → 100% top border (transition width 0.6s)
  - padding-left shift 24px
- 4 mốc:
  1. 2024 — Hiện tại · Dev Design Engineer (Freelance)
  2. 2023 — 2024 · Frontend / Web Developer (Agency)
  3. 2022 — 2023 · Junior Web Designer / Coder
  4. Trước 2022 · Self-taught Developer

## 8. CTA (border-top)
- cta-card padding 100×60, border-radius lg, bg-elev, overflow hidden
- Inside: 
  - cta-grid (lưới 40×40 mờ) + radial gradient accent + cyan ở 2 góc
  - cta-tag mono "Đang nhận dự án mới — Q2 / Q3 2026" với dot xanh
  - h2 display clamp(40px, 5vw, 72px) center
  - p dim center max-width 540
  - 2 buttons center: primary "Gửi email cho tôi" + ghost "Nhắn Zalo / Messenger"

## 9. Footer (border-top, padding 80 0 32)
- footer-grid 1.5fr / 1fr / 1fr gap 60:
  - BRAND: logo + tagline (max 320, text dim 14)
  - NAV col: heading mono uppercase + ul 5 link
  - CONTACT col: email · tel · location · "Tải CV (PDF)"
- footer-bottom: copyright mono mute + 4 social icons 36x36 circle 
  (GitHub, Facebook, LinkedIn, Email)
- footer-mark: chữ "THIÊN ÂN" display 700 clamp(60px, 14vw, 220px),
  gradient white → transparent, line-height 0.85, user-select none

# ANIMATIONS REQUIRED

@keyframes rise { to { opacity: 1; transform: translateY(0); } }
@keyframes pulse { 0%,100% {opacity:1;scale:1} 50% {opacity:0.6;scale:1.2} }
@keyframes float-tag (KHÔNG dùng — không có text floating)
@keyframes drift-1, drift-2, drift-3, drift-4 — translate3d + rotateX/Y/Z 3D
@keyframes particle-rise — translateY -110vh + translateX random
@keyframes beam-sweep — translateY -100% → 180vh + opacity fade in/out
@keyframes fade-in-shape — opacity 0 → 1

# JAVASCRIPT REQUIRED

1. Nav scrolled toggle (window.scroll > 40)
2. IntersectionObserver scroll reveal cho .services-grid, .tech-grid, .projects-list
   - threshold 0.15, rootMargin '0px 0px -80px 0px'
   - Stagger transitionDelay = idx * 0.08 + 's'
3. Card mousemove → CSS vars --mx/--my (gradient radial follow)
4. Scene 3D parallax: mousemove → sTargetX/Y, lerp 0.04 → 
   sceneInner.transform = `rotateY(${sCurX*8}deg) rotateX(${-sCurY*8}deg)`
5. Generate 22 particles bằng JS:
   - left random %, animationDuration 14-32s random,
   - animationDelay -25s random (âm để spawn đã chạy),
   - --p-drift ±60px, --p-opacity 0.2-0.7,
   - size 2-5px,
   - 1/3 particles dùng --cyan
6. Scroll fade gravity scene: y < window.innerHeight * 1.2 → 
   translateY(y * 0.2) + opacity 1 - y/(innerHeight * 0.9)
7. Smooth scroll cho a[href^="#"]

# ACCESSIBILITY & PERFORMANCE
- aria-label cho icon-only buttons (menu, social)
- alt cho img
- focus visible cho links/buttons
- semantic HTML: header / nav / section / article / footer / h1-h3
- pointer-events: none cho mọi layer decorative (scene, beams, particles, grid)
- z-index: grid 1, scene/particles 2, content 3
- prefers-reduced-motion: reduce → 
  *, ::before, ::after animation/transition 0.01ms,
  .float-shape, .particle, .beam animation none + opacity 0.4,
  .scene-inner transition none

# RESPONSIVE
@media (max-width: 980px):
- Nav links ẩn, menu-toggle hiện
- Container padding 24px
- Section padding 80px
- Hero grid 1 cột, avatar centered max 360px, initials 90px
- Shapes thu nhỏ: hex-lg 130, ring 150, bracket 70, hex-sm 50
- shape-nodes, shape-cube display none
- About grid 1 cột, services-grid 1 cột, skill-cat 1 cột (skill-cat-head bỏ sticky)
- tech-grid 3 cột, project 1 cột + reset direction ltr cho even
- exp-item 1 cột, cta-card padding 60×28
- footer-grid 2 cột

@media (max-width: 560px):
- tech-grid 2 cột, footer-grid 1 cột, about-stats 1 cột

# OUTPUT FINAL
Trả về 1 file HTML duy nhất hoàn chỉnh, đầy đủ content tiếng Việt cho mọi section
(không placeholder rỗng). Comment các block chính bằng `<!-- SECTION NAME -->`
cho dễ navigate. CSS được tổ chức rõ ràng theo block. JS gọn, không thư viện.

Bắt đầu code ngay, không hỏi lại.
```

---

## PHẦN 2 — ĐƯA CODE VÀO CÁC NỀN TẢNG VISUAL

### Cách 1: VS Code (đơn giản nhất)

1. Tải file `profile-adam.html` về máy
2. Mở **VS Code** → `File` → `Open File...` → chọn file vừa tải
3. Cài extension **Live Server** (Ritwick Dey) từ Marketplace
4. Click chuột phải vào file trong VS Code → `Open with Live Server`
5. Browser tự mở `http://127.0.0.1:5500/profile-adam.html` — sửa file là tự reload

Hoặc kéo thẳng file vào browser (Chrome/Edge) là chạy luôn, không cần server.

### Cách 2: v0.dev (Vercel)

v0 nhận HTML/React, không tốt cho HTML thuần lắm. Cách dùng:

1. Vào https://v0.dev
2. Paste **Super Prompt** ở Phần 1 vào ô chat (nhưng đổi yêu cầu "HTML thuần" thành "React + Tailwind")
3. v0 sẽ generate component React → có thể preview + chỉnh trực tiếp visual

**Lưu ý:** v0 thiên về React/Tailwind. Nếu muốn output HTML thuần, dùng Bolt hoặc Lovable.

### Cách 3: Bolt.new (StackBlitz)

1. Vào https://bolt.new
2. Paste Super Prompt nguyên xi
3. Bolt sẽ tạo full project, có preview live + sửa code trực tiếp
4. Export ZIP về máy hoặc deploy 1-click lên Netlify ngay từ Bolt

### Cách 4: Lovable

1. Vào https://lovable.dev
2. Paste Super Prompt
3. Lovable build app + có UI editor để chỉnh visual
4. Deploy 1-click lên domain của Lovable hoặc Netlify

### Cách 5: Cursor (AI code editor)

Cách hay nhất nếu anh muốn vibe coding sâu:

1. Mở **Cursor** → `File` → `New File` → save thành `profile.html`
2. Bật **Cursor Composer** (Cmd/Ctrl + I)
3. Paste Super Prompt → Cursor sẽ generate code trực tiếp vào file
4. Tiếp tục chat với Cursor để tweak: "đổi accent sang xanh navy", "thêm section pricing", v.v.

### Cách 6: Đưa lên Live (deploy)

Sau khi file đã xong:

**Vercel** (nhanh nhất):
1. Tạo repo GitHub, push file `index.html` (đổi tên `profile-adam.html` → `index.html`)
2. Vào https://vercel.com → Import Project → chọn repo → Deploy
3. Sau 30s có URL `xxx.vercel.app` miễn phí, gắn domain riêng sau cũng được

**Netlify** (kéo thả):
1. Vào https://app.netlify.com/drop
2. Kéo thẳng file `profile-adam.html` (đổi tên thành `index.html`) vào ô drop
3. Có URL ngay lập tức

**VPS riêng của anh** (vì anh quen VPS):
```bash
# SSH vào VPS
scp profile-adam.html user@your-vps:/var/www/html/index.html
# Hoặc dùng FTP/SFTP qua FileZilla
```
Cấu hình Nginx/Apache trỏ về thư mục đó, cài SSL bằng Certbot.

---

## TIP THÊM

### Để prompt hiệu quả hơn với AI agent:
- Gửi kèm **screenshot** file hiện tại cho AI xem (Claude, ChatGPT 4 đều đọc ảnh được)
- Hoặc gửi kèm file HTML hiện tại để AI tham khảo style
- Yêu cầu AI "giữ nguyên design system, chỉ đổi content"

### Để chỉnh sửa nhanh từ file hiện tại:
- Trong Cursor: chọn block code → `Cmd+K` → mô tả thay đổi
- Trong VS Code + Copilot: highlight → mở chat → "refactor this"

### Một số biến anh có thể tweak nhanh trong file:
- `--accent`, `--cyan` ở `:root` → đổi toàn bộ tone màu
- `--display`, `--body` → đổi font
- Nội dung text trong các section
- Số particles ở dòng `for (let i = 0; i < 22; i++)` — giảm xuống 10 cho mobile yếu
- Hiệu ứng beam-sweep ở `.beam-1/2/3/4/5` → tăng/giảm `animation-duration`

---

**Kết luận:** Anh có thể paste **Super Prompt ở Phần 1** vào bất kỳ AI nào có khả năng code (Claude, ChatGPT, Cursor, Bolt, Lovable, v0) — chúng sẽ tự dựng lại trang gần giống. Để có visual editor (kéo thả, sửa trực tiếp UI), nên dùng **Bolt.new** hoặc **Lovable**.
