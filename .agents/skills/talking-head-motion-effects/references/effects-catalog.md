# Danh mục chi tiết 48 hiệu ứng Talking-Head

Bảng tra cứu tham số và công thức triển khai cho 48 hiệu ứng Talking-Head hợp nhất từ Facecammaxxing và Claude Video Effects:

| # | Tên hiệu ứng (`fx`) | Nhóm | Lớp zIndex | Vị trí hiển thị | Tùy chọn tham số chính |
|---|---|---|---|---|---|
| 1 | `lean-in` | Camera | L6 | Toàn khung hình | `zoom` (1.3 - 1.5), `speed` (snappy/elastic) |
| 2 | `slow-push` | Camera | L6 | Toàn khung hình | `zoom` (1.2 - 1.6), `blur` (hậu cảnh 0-12px) |
| 3 | `locked-on` | Camera | L6 | Vùng đầu/mặt | `zoom` (1.35), `tag` (nhãn định danh) |
| 4 | `spotlight` | Ánh sáng | L1 & L2 | Nền tối, rọi mặt | `text` (chữ phát sáng), `color`, `push` |
| 5 | `glitter-spotlight` | Ánh sáng | L2 | Phía sau đầu | `text`, `color` (#D4AF37), `sparkles` (true) |
| 6 | `freeze-frame` | Camera | L3 | Quanh người | `sticker_color` (#FFFFFF), `tag` (chú thích) |
| 7 | `rabbit-hole` | Camera | L6 | Tâm khung hình | `speed`, `spin` (độ xoay) |
| 8 | `text-behind` | Typography | L2 | Trồi sau gáy | `text`, `font` (Anton/Title), `color`, `scale` |
| 9 | `backdrop-word` | Typography | L2 | Rơi sau đầu | `text`, `color`, `font` (bold/serif) |
| 10 | `split-headline` | Typography | L5 | Nửa trên | `text` (dòng 1 \| dòng 2), `pill` (tag) |
| 11 | `headline-wall` | Typography | L2 & L5 | Toàn nền sau | `headlines` (danh sách tít), `total` (con số) |
| 12 | `led-sign` | Typography | L2 | Bức tường sau | `text`, `color` (#FF3B30 / #00E5FF) |
| 13 | `red-collage` | Typography | L2 & L4 | Toàn màn hình | `text` (chữ đỏ), `filter` (grayscale người) |
| 14 | `pastel-word` | Typography | L2 & L5 | Sau đầu + vai | `text`, `name`, `handle`, `color` (#E2D9F3) |
| 15 | `cover-star` | Typography | L2 & L5 | Sau đầu + 2 vai | `masthead`, `lines`, `issue` (ngày/tháng) |
| 16 | `kinetic-caption` | Typography | L2 & L5 | Cổ áo / cằm | `words`, `highlightColor`, `tuckBehind` |
| 17 | `glass-widgets` | Widgets | L5 | Quanh vai và cằm | `kpi`, `badge`, `status`, `look` (frosted/bento) |
| 18 | `liquid-glass-graph` | Widgets | L5 | Dưới cằm | `from`, `to` (ví dụ: 0 -> 100K), `color` |
| 19 | `apple-toggles` | Widgets | L5 | Dưới cằm / trên đầu | `items` (danh sách toggles), `color` (#34C759) |
| 20 | `checklist` | Widgets | L5 | Bên vai trái/phải | `items` (các bước), `title`, `tickSpeed` |
| 21 | `messages` | Widgets | L5 | Nảy từ dưới lên | `messages` (nội dung), `title` (Messages) |
| 22 | `comment-box` | Widgets | L5 | Dưới cằm | `text` (bình luận), `avatar`, `platform` |
| 23 | `the-bill` | Widgets | L2 | Treo sau đầu | `items` (hóa đơn), `paperColor` (#FAF8F5) |
| 24 | `tap` | Widgets | L5 | Bên vai | `label` (Follow -> Following), `color` |
| 25 | `orbit` | Media | L2 & L5 | 3D quanh đầu | `images` / `reels`, `count` (4-6), `radius` |
| 26 | `carousel-spin` | Media | L2 & L5 | 3D quanh người | `items`, `turns` (vòng xoay), `focusIndex` |
| 27 | `phone-fan` | Media | L5 | Xòe dưới cằm | `screens` (3-5 ảnh màn hình), `spreadAngle` |
| 28 | `profile-wall` | Media | L2 | Phủ kín tường sau | `grid` (3x3), `followerCounter` (tăng vọt) |
| 29 | `place-in-grid` | Media | L5 & L4 | Thu nhỏ ô trung tâm | `reels` (8 ô xung quanh), `views` |
| 30 | `window-cards` | Media | L5 | Trôi nổi 2 bên vai | `windows` (tiêu đề, ảnh), `cursorClick` |
| 31 | `lineup-fan` | Media | L2 | Vòng cung trên đầu | `tiles` (1-2-3-4-5) |
| 32 | `broll-split` | Media | L6 | Chia đôi 50/50 | `brollSrc`, `tag` (nhãn dán) |
| 33 | `prop-3d` (Trophy) | 3D Props | L5 | Bên vai | `model: 'trophy.glb'`, `rotation`, `light` |
| 34 | `prop-3d` (Clock) | 3D Props | L5 | Bên vai | `model: 'clock.glb'`, `hours` (quay nhanh) |
| 35 | `prop-3d` (Coin) | 3D Props | L5 | Rơi nảy trước ngực | `model: 'coin.glb'`, `bounce` (đàn hồi) |
| 36 | `prop-3d` (Phone) | 3D Props | L5 | Nghiêng trước mặt | `model: 'phone.glb'`, `screenTexture` |
| 37 | `prop-3d` (Check & X) | 3D Props | L5 | Đập xuống dứt khoát | `model: 'check.glb' \| 'x.glb'` |
| 38 | `reject-stamp` | 3D Props | L6 | Đóng dấu sập xuống | `text` (REJECTED/APPROVED), `angle` (-15deg) |
| 39 | `shortcut-rain` | 3D Props | L2 | Mưa sau lưng | `keys` (Cmd, Alt, Shift, Space), `count` |
| 40 | `kallaway-split` | Editorial | L2 & L5 | Thu thẻ + skyline | `skylineData` (cột số), `cardScale` |
| 41 | `over-the-shoulder` | Editorial | L6 & L5 | Chuyển góc qua vai | `beforeCard`, `afterCard`, `pushAngle` |
| 42 | `color-grade-swipe` | Editorial | L6 | Quét thanh trượt | `lut` (LOG -> Cinematic Grade) |
| 43 | `timeline` | Editorial | L6 | Dải đáy + góc trên | `timecode` (REC đỏ), `playhead` |
| 44 | `moody` | Editorial | L6 | Toàn khung hình | `grade` (teal-orange, bw, warm) |
| 45 | `dot-reveal` | Editorial | L4 | Người nói | `dotGridSize` (12px), `glowColor` |
| 46 | `tier-list` | Editorial | L5 | Bảng dưới cằm | `tiers` (S, A, B, C, D), `highlightItem` |
| 47 | `match-cut` | Editorial | L2 | Hộp đỏ sau đầu | `keyword`, `articles` |
| 48 | `bottom-fade` | Editorial | L4 | Đáy người nói | `fadeHeight` (80px), `fadeColor` (#FAF8F5) |
