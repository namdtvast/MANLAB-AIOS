# OUTCOME — M29 Increment 4: Giám sát AIA quá hạn, AI chưa đăng ký, Sự cố AI

**Work-id:** 20260824-m29-giam-sat-su-co · **Tier:** M · **Mode:** BUILD

## WHO

- **PT.AI / AI_ADMIN** — người quản trị AI của Viện, phải biết tác tử nào đang chạy quá hạn AIA,
  hệ thống AI nào bị phát hiện dùng chui, sự cố AI nào đang mở.
- **SUPER_ADMIN (vai LĐV)** — người phê duyệt/đóng sự cố mức Nghiêm trọng, hủy phiếu.
- **AI_OPERATOR / người dùng** — người phát hiện và khai báo sự cố AI.
- **AI_AUDITOR** — đọc toàn bộ hồ sơ làm bằng chứng đánh giá ISO/IEC 42001.

## WHAT

Bù 3 khoảng trống giữa **Thủ tục ETV.P29 (đã ban hành 24/8/2026)** và phần mềm M29 hiện có:

| # | Điều khoản P29 | Hiện trạng phần mềm | Cần có |
|---|---|---|---|
| 1 | 5.2.3 — AIA quá hạn rà soát thì **tác tử bị tạm dừng** | `checkHealthAction()` chỉ đổi AIA sang `REVIEW_REQUIRED` khi **bấm nút thủ công**; `AIAgent.status` không đổi; Gateway **không** kiểm tra `agent.status` | Sweep tự động; tác tử chuyển `SUSPENDED`; Gateway chặn tác tử không ACTIVE; tự phục hồi khi AIA được duyệt lại |
| 2 | 5.1.7 — theo dõi **hệ thống AI chưa đăng ký** | Không có thực thể nào | Sổ theo dõi phát hiện, hạn 15 ngày, buộc mở sự cố khi dính dữ liệu nhạy cảm |
| 3 | 5.7 + 6.3 — vòng đời **phiếu sự cố AI** | Không có thực thể nào | Phiếu sự cố đủ vòng đời, ràng buộc tách vai trò, tự khống chế tác tử khi sự cố Nghiêm trọng |

## WHY

Thủ tục P29 vừa ban hành đặt ra ba nghĩa vụ mà phần mềm chưa thực thi được. Nếu để nguyên, ba
điều khoản này chỉ tồn tại trên giấy — đúng thứ mà đoàn đánh giá ISO/IEC 42001 sẽ hỏi bằng chứng.
Riêng khoảng trống #1 còn là **lỗ hổng kiểm soát thật**: hiện `AIAgent.status` có thể là `DISABLED`
mà Tool Gateway vẫn cho gọi Tool, vì 7 bước kiểm tra của Gateway không hề xét trạng thái Agent.

## SUCCESS CRITERIA

1. AIA `APPROVED` quá `reviewDate` → tự chuyển `REVIEW_REQUIRED` **và** tác tử chuyển `SUSPENDED`,
   không cần người bấm nút; nhật ký ghi `actor = SYSTEM`, không phải một người cụ thể.
2. Tác tử `SUSPENDED`/`DISABLED` gọi Tool → Gateway từ chối với mã lỗi riêng, có ghi trace.
3. AIA được phê duyệt lại → tác tử tự trở lại `ACTIVE`, ghi nhật ký.
4. Lập được phiếu sự cố AI, chạy đủ vòng đời `Mới → Đang xử lý → Chờ xác nhận → Đã đóng/Hủy`.
5. Sự cố mức **Nghiêm trọng** khi lập → tác tử liên quan bị **tạm dừng ngay**; khi đóng bắt buộc
   có mã KPH (MP13); dính dữ liệu nhạy cảm bắt buộc có số phiếu F28.03; ảnh hưởng kết quả đã phát
   hành bắt buộc có mã hồ sơ MP10/MP11.
6. Người phát hiện sự cố **không** đóng được chính sự cố đó.
7. Ghi nhận được hệ thống AI chưa đăng ký, có hạn xử lý; đóng bằng "Đã đăng ký" bắt buộc trỏ tới
   Agent thật; dính dữ liệu nhạy cảm bắt buộc gắn phiếu sự cố trước khi đóng.
8. `python3 _meta/validate_links.py` PASS; `npm run build` và `npm run lint` PASS.

## NGOÀI PHẠM VI (không làm ở increment này)

- UI cho `AISecret`, UI biên tập Evaluation Suite tùy biến — hai khoảng trống còn lại của mục 7
  DacTa, không thuộc yêu cầu lần này.
- Tích hợp Platform Registry M35/VI-CONNECT thật.
- Deprecate bản `08_Source` cũ.
- Hạ tầng cron thật của môi trường production (chỉ cung cấp điểm gọi HTTP + sweep khi truy cập).
