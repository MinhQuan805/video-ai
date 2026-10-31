---
name: physical-interaction-direction
description: >-
  Design and choreograph causal interactions between cards, UI, objects, or characters in code-driven
  videos. Use for contact, pressure, dragging, blocking, eating, assembly, or state changes; route
  creature construction separately and preserve frame-deterministic playback in Remotion.
---

# Tương tác có nguyên nhân và hệ quả

Chỉ dùng khi quan hệ/hành động giúp người xem hiểu ý. Card, chữ và UI có thể là nhân vật của tương tác;
không bắt buộc con vật, giả lập vật lý hay diễn hoạt mọi phần tử. Quyết định cảnh theo
[creative-video-direction](../creative-video-direction/SKILL.md).

Trong hướng video hiện tại, graphic beat phải có primary motion có nghĩa, không dừng ở fade card tĩnh.
Tái dùng grammar motion của project paper trước qua
[paper-motion-continuity.md](../motion-graphic-design/references/paper-motion-continuity.md), rồi phát triển
contact, lực, vật liệu và diễn xuất cho tình huống mới. Giữ hold sau hành động để dễ đọc.

## Hợp đồng của một hành động

Trong scene plan, mô tả ngắn: ai tác động ai, động từ, vì sao liên quan câu nói, trạng thái đầu/cuối,
điểm chạm hoặc điều kiện kích hoạt, cue lời nói và phản ứng cần thấy. Chỉ thêm trường kỹ thuật khi code cần.
Tách kết quả minh họa khỏi fact: vật nuốt email không có nghĩa hệ thống thật sự xóa email.

1. Chọn hành động chính và bên chịu tác động. Dùng một focal action để mắt theo kịp.
2. Lập vài pose quan trọng: chuẩn bị, tiếp cận, tiếp xúc, hệ quả, ổn định. Pha không cần thì bỏ.
3. Neo contact/reveal vào từ hoặc ý được nói. Đoạn lấy đà có thể đi trước cue; không lộ punchline quá sớm.
4. Cho các bên dùng chung event và hệ tọa độ. Dẫn xuất phản ứng từ cùng một contact time/anchor.
5. Chọn chất liệu, trọng lượng và mức cường điệu theo art direction. Giữ text dễ đọc.
6. Chừa khoảng để hiểu trạng thái mới. Camera/SFX/secondary motion chỉ nhấn hành động chính.

Không bật spring sớm cho vật dưới, không cho vật xuyên nhau để che timing sai, không dùng shockwave chữa mọi tiếp xúc.

## Các bất biến cần giữ

- **Nhân quả (Action-Reaction)**: phản ứng không xuất hiện trước nguyên nhân. Mọi va chạm, thả rơi, dập nắp đều phải sinh ra lực nén, độ thụt lún (\dropRecoil\) và chấn động đàn hồi tắt dần (\dampedOscillation\).
- **Chuyển động liên tục (Always Alive)**: không để phần tử đứng im vô vị sau khi vào khung hình; luôn duy trì nhịp thở hữu cơ (\continuousFloat\), rung chấn cơ học hoặc xoay kim/bánh răng.
- **Tiếp xúc & Bám dính (Real-Time Sub-Pixel Tracking)**:
  - Khi vẽ nét/viết văn bản: ngòi bút chì/bút lông phải bám chính xác tuyệt đối theo đầu mút của dòng mực đang tuôn ra, kèm độ rung nhẹ của tay viết (\writingJitter = sin(f * 2.5) * 1.5\).
  - Khi kéo thả: con trỏ chuột nghiêng nhẹ góc giật khi kéo (otate(-4deg)\), đối tượng bị kéo bám sát tọa độ con trỏ, và khi nhả chuột thì đối tượng rơi vào khay kích hoạt phản lực nảy lò xo.
- **Tỷ số truyền cơ khí (Interlocking Ratio)**: hai bánh răng ăn khớp nhau thì bánh răng A quay thuận chiều kim đồng hồ góc θ, bánh răng B phải quay ngược chiều góc -θ × (R_A / R_B).
- **Tiếp xúc**: hai điểm chạm khớp sau khi áp parent transform, pivot và scale; không chỉ so tâm bounding box.
- **Ràng buộc**: đang cầm/kéo/gắn thì target theo điểm gắn; chỉ rời sau release. Không trượt chân vô cớ.
- **Vật liệu**: giấy gập/uốn/phấp phới (\lutter\); vật cứng giữ hình; cao su có thể squash; card UI thường đổi state/layout.
- **Liên tục**: vị trí liền mạch ở ranh pha; vận tốc có thể đổi đột ngột khi impact có chủ đích.
- **Ngữ nghĩa**: state kết thúc khớp lời nói và vẫn đọc được sau animation.
- **Tái lập**: frame bất kỳ cho cùng pose, kể cả seek ngược hoặc render nhiều worker.
- **Đọc được**: contact không nằm dưới caption/face/platform UI; chữ không bị bóp méo để làm gag.

## 5 Recipe Tương Tác Vật Lý Cốt Lõi:
1. **Damped Oscillation (Chấn động tắt dần sau va chạm)**:
\\	ypescript
export const dampedOscillation = (frame: number, trigger: number, duration = 20, amplitude = 12, frequency = 0.6, decay = 0.18): number => {
  const rel = frame - trigger;
  if (rel < 0 || rel > duration) return 0;
  return Math.sin(rel * frequency) * Math.exp(-rel * decay) * amplitude;
};
\2. **Real-time Pencil Tip Tracking (Bút bám đầu nét vẽ)**:
   Ngòi bút nằm tại \(x, y)\ của đầu nét mực đang render:
\\	ypescript
const currentTipX = startX + progress * lineWidth;
const jitterY = isWriting ? Math.sin(frame * 2.2) * 1.2 : 0;
<WritingPencil tipX={currentTipX} tipY={lineY + jitterY} />
\3. **Cursor Drag & Recoil (Kéo thả & Lún phản lực)**:
   Chuột kẹp token nghiêng góc -4°, thả rơi kích hoạt recoil của container nhận:
\\	ypescript
const dropRecoil = dampedOscillation(frame, dropFrame, 18, 14, 0.65, 0.22);
\4. **Interlocking Gears (Bánh răng ăn khớp ngược chiều)**:
\\	ypescript
const gear1 = (frame * 1.2) % 360;
const gear2 = (-frame * 1.2 * (radius1 / radius2)) % 360;
\5. **Pneumatic Press & Output Ejection (Nén khí dập & Đẩy sản phẩm)**:
   Piston nén thụt lùi -> dập mạnh xuống -> khay thành phẩm trượt bật ra từ khe đáy.

## Chọn recipe và kỹ thuật

- Nghiên cứu lực, contact lifetime, ma sát, quán tính, spring, khớp và deformation:
  đọc [physical-dynamics.md](references/physical-dynamics.md) khi lập interaction phức tạp hoặc tuning vật lý.
- Card/UI, push/pull, crush, eat, block, assemble: đọc [interaction-recipes.md](references/interaction-recipes.md).
- Event model, pivot/contact math, motion track, fixed-step và seek QA: đọc
  [frame-driven-motion.md](references/frame-driven-motion.md) khi triển khai code.
- Khi phải thiết kế hàm, tay, chân hoặc vật biến dạng: dùng
  [character-and-object-design](../character-and-object-design/SKILL.md).

Mặc định dùng path/key pose + easing/spring xác định theo frame. Chỉ dùng mô phỏng khi nó giảm công sức hoặc
tạo tương tác cần thiết. Không cài engine để làm một card nảy. Recipe là gợi ý, không phải quota hay layout bắt buộc.

## Đầu ra và QA

Đặt interaction plan trong scene hiện có; không duy trì một timeline riêng. Code mới riêng video nằm đúng project.
Ghi geometry/contact bounds, cue, kết quả mong đợi và các mốc cần xem sau duyệt trong QA report.
Kiểm state/timing, tính liên tục và contact bằng số trước duyệt. Pixel/motion thực tế chỉ xác nhận sau render được duyệt.
Tuân thủ AGENTS.md: không render hoặc mở media bị hạn chế để minh chứng cho skill.
