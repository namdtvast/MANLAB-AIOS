# M26_TriThuc — OUTCOME (work-id 20260823-dac-ta-m26)

**Chế độ**: ANALYZE (chỉ đặc tả, không BUILD) · **Tier**: M (4 thực thể, có state machine, liên
thông cross-module M01/M03/M13/M14/M17/M29, sẽ kéo theo thay đổi schema khi BUILD).

## WHO
- **QLCL** — quản trị danh mục tri thức, tiếp nhận bài học kinh nghiệm và nhu cầu tri thức.
- **TP** (trưởng phòng/phụ trách lĩnh vực) — chủ sở hữu (`owner`) tri thức của lĩnh vực, soát xét
  chuyên môn, tổ chức chia sẻ.
- **LĐV** — phê duyệt mục tri thức và bài học kinh nghiệm, quyết định với tri thức trọng yếu.
- **Nhân viên chuyên môn** — người khai thác tri thức và là **nơi tri thức ẩn đang nằm**.
- **Đoàn đánh giá (nội bộ/BoA)** — người tiêu thụ bằng chứng cho ISO 9001 §7.1.6: có danh mục tri
  thức, có chủ sở hữu, có rà soát, có chia sẻ.
- **Trợ lý AI của Viện (M29)** — người tiêu thụ tri thức đã phê duyệt qua chỉ mục ngữ nghĩa.

## WHAT
Có một đặc tả đủ để lập trình được cho M26 — số hóa QM §9.3: **đăng ký – phân loại – giao chủ sở
hữu – duy trì hiệu lực – chia sẻ – kiểm soát khai thác** tri thức tổ chức, với ba dòng vào/ra là
bài học kinh nghiệm, nhu cầu tri thức và hoạt động chia sẻ.

## WHY
- QM §9.3 (đã ban hành) dẫn chiếu Thủ tục ETV.MP26 nhưng **thủ tục và biểu mẫu chưa tồn tại** →
  hiện Viện không có bằng chứng số hóa cho ISO 9001 §7.1.6.
- Rủi ro thực tế lớn nhất của một viện kiểm định/hiệu chuẩn là **tri thức ẩn nằm ở một người**:
  kỹ thuật viên nghỉ việc kéo theo mất năng lực thực hiện phép đo, có thể ảnh hưởng phạm vi công
  nhận. Không có danh mục thì không ai nhìn thấy rủi ro này trước khi nó xảy ra.
- `08_KNOWLEDGE_GRAPH` đã có kho nội dung (tiêu chuẩn, HDSD, Wiki, Lessons Learned) nhưng **không có
  lớp quản trị**: ai sở hữu, còn hiệu lực không, được phép chia sẻ tới đâu, mục nào được nạp vào
  chỉ mục AI. M26 chính là lớp đó — và là điều kiện để trợ lý AI (M29) không trả lời bằng tri thức
  lỗi thời hoặc tri thức mật.

## SUCCESS CRITERIA
1. `01_Requirement/DacTa.md` mô tả đủ: đối tượng dữ liệu + trường bắt buộc, vai trò, danh mục
   chuẩn, quy tắc nghiệp vụ, state machine, đầu ra, liên kết — đủ để BUILD mà không phải đoán thêm.
2. Mọi quy tắc **không** có trong văn bản đã ban hành được đánh dấu `[SUY DẪN]` và gom thành danh
   sách câu hỏi chốt (DacTa mục 10).
3. Ranh giới rõ với M14 (tài liệu), M15 (hồ sơ), M27 (tài sản thông tin), M03 (đào tạo), M25 (bối
   cảnh), M29 (AI) — nêu thành bảng, không để mơ hồ.
4. Nguyên tắc **một nguồn sự thật** được giữ: M26 là sổ đăng ký, tuyệt đối không sao chép nội dung
   tài liệu/tiêu chuẩn vào module.
5. `python3 _meta/validate_links.py` PASS.

## NGOÀI PHẠM VI lần này
- Không viết mã, không đụng `09_ENGINEERING/aios-platform` (M26 vẫn `COMING_SOON`).
- Không soạn/ban hành `ETV.P26` và biểu mẫu F26.01–F26.04 (việc của MP14, cần LĐV).
- Không sửa M25_BoiCanh (cùng CAP-25 nhưng khác phạm vi), không sửa `08_KNOWLEDGE_GRAPH`.
- Không thiết kế cơ chế embedding/vector cụ thể (thuộc M29 + `08_KNOWLEDGE_GRAPH/09,10`); M26 chỉ
  quy định **điều kiện** được nạp và **nghĩa vụ** gỡ khỏi chỉ mục.
