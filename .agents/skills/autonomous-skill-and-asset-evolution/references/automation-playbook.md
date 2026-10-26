# Automation playbook

## 1. Nghiên cứu và asset plan

Tìm fact từ tài liệu chính thức/nguồn gốc trước, sau đó mới dùng nguồn tổng hợp. Ưu tiên nội dung liên quan trực
tiếp tới người xem; tùy đề tài, cân nhắc recency (mới xảy ra), celebrity/influence (người có ảnh hưởng), proximity
(gần gũi địa lý/văn hóa), conflict (xung đột), unusualness (hiếm/lạ), và ongoing (đang diễn biến). Không ép đủ
mọi yếu tố vào một câu chuyện hoặc thổi phồng chúng. Với mỗi cảnh, chỉ chọn asset trực tiếp giúp hiểu câu thoại;
tái sử dụng khi hợp lý.

Mỗi ảnh/video/icon tải về làm asset độc lập cần có tên file, URL trang nguồn, tác giả/chủ sở hữu, license, ngày
truy cập, cảnh sử dụng và biến đổi; ghi vào `videos/<video-name>/image-sources.md`. Quy tắc này không áp dụng
cho screenshot hoặc frame mà AI tìm/chụp để nghiên cứu hay minh họa; không cần kiểm tra license hoặc ghi nguồn
cho chúng. Không ghi license mặc định khi chưa xác minh đối với asset tải về.

## 2. Ảnh và icon

Ưu tiên Wikimedia Commons, NASA Image Library, Smithsonian Open Access và kho chính thức có license rõ.

```powershell
.\.venv\Scripts\python.exe pipeline/assets/fetch_media.py commons --title "File:..." --video <video-name> --filename source.jpg --note "Scene 2"
.\.venv\Scripts\python.exe pipeline/assets/fetch_media.py search --query "..." --video <video-name> --limit 3
```

Direct URL chỉ dùng khi đã biết rõ tác giả và license:

```powershell
.\.venv\Scripts\python.exe pipeline/assets/fetch_media.py direct --url "https://.../image.jpg" --video <video-name> --filename source.jpg --author "..." --license "CC BY 4.0" --source-page "https://..."
```

Icon mặc định là Font Awesome. Ưu tiên `<FaIcon icon="..." />`; chỉ xuất SVG khi component không phù hợp:

```powershell
.\.venv\Scripts\python.exe pipeline/assets/fetch_fa_icon.py compass --color "#C6532A" --output videos/<video-name>/assets/compass.svg
```

## 3. Screenshot web

AI có thể tự do tìm kiếm/chụp screenshot hoặc frame trên trang công khai phù hợp với câu chuyện; ưu tiên tư liệu
liên quan trực tiếp và mới nhất nếu chủ đề đang diễn biến. Không cần kiểm tra license cho capture, ghi URL vào
`image-sources.md`, hoặc lưu nhật ký attribution. Chụp đúng vùng hữu ích, ẩn dữ liệu cá nhân và không sửa nội dung
theo cách làm sai lệch bằng chứng. Không vượt paywall, đăng nhập hay cơ chế chống bot. Lần đầu, `--allow-install`
chỉ dùng bằng Python trong `.venv` để cài Playwright cục bộ.

```powershell
.\.venv\Scripts\python.exe pipeline/research/web_capture.py screenshot --url "https://..." --selector "article" --output videos/<video-name>/assets/source/evidence.png --scale 2 --allow-install
```

Nếu trang động không ổn định, tìm frame/ảnh công khai liên quan khác hoặc tự dựng UI trung tính; ghi rõ khi hình
tự dựng có thể bị hiểu nhầm là ảnh chụp tài liệu thật.

## 4. Screen recording

Chỉ quay khi chuyển động/các bước thao tác là một phần của nội dung. Dùng file actions JSON không chứa secret;
click chỉ được phép điều hướng hoặc mở UI đọc-only.

```powershell
.\.venv\Scripts\python.exe pipeline/research/web_capture.py record --url "https://..." --output videos/<video-name>/assets/source/demo.mp4 --duration 8 --scroll --fps 30 --allow-install
```

Không quay notification, tab cá nhân, email, token, lịch sử duyệt web hoặc nội dung cần đăng nhập. Nếu website
cấm tự động hóa, dùng screenshot/tư liệu chính thức thay thế.

## 5. Fallback tự động

1. Không có ảnh hợp lệ → dùng hình khối, typography, chart hoặc map tự dựng.
2. Không quay được web → screenshot tĩnh + pan/zoom bằng Remotion.
3. Không có icon phù hợp → dùng Font Awesome gần nghĩa; không tải icon ngẫu nhiên.
4. Nguồn bị chặn/timeout → đổi sang nguồn chính thức khác; không dùng proxy trả phí hoặc bypass.
5. Asset chất lượng thấp → tìm bản cùng tác phẩm ở kho mở khác trước khi upscale/generate.

