# RECON

Khảo sát trước khi thiết kế. Không đặc tả giải pháp khi chưa hiểu repo.

## Xác định

- Cấu trúc repo liên quan tới việc đang làm.
- Module/thư mục liên quan.
- Implementation hiện tại (nếu sửa cái đã có).
- Architecture pattern đang dùng trong khu vực đó.
- Coding convention đang áp dụng (đặt tên, cấu trúc file, style).
- Test hiện có (unit/integration), cách chạy.
- Authentication/authorization hiện tại (nếu liên quan).
- Cách truy cập database hiện tại.
- API convention hiện tại (REST/RPC, format response, error code).
- Lệnh build/lint/type-check.
- Giả định về deployment.
- Tài liệu liên quan (README, `manifest.yaml`, `DacTa.md`, ADR nếu có).

Ưu tiên pattern đã có trong repo. Không tự đưa kiến trúc mới vào nếu pattern hiện tại đã đủ dùng.

## Trong MANLAB-AIOS cụ thể

Trước khi RECON sâu vào code, xác định 2 điều bằng cách đọc `CLAUDE.md` gốc + `manifest.yaml`/`links.yaml` liên quan:

1. Thay đổi này số hóa **Thủ tục** nào (`MPxx`) và **Module** nào (`Mxx`)? Nếu chưa rõ, đi theo chuỗi `Capability (02) → MP (04) → Module (05) → biểu mẫu/skill/mã nguồn` trước khi viết code.
2. Mã nguồn thật của module đó nằm ở `05_MODULE_LIBRARY/Mxx_Slug/08_Source/` — không phải `09_ENGINEERING` (đó chỉ là khung sườn tài liệu).

Nếu không tìm được `manifest.yaml`/`DacTa.md` tương ứng cho module đang sửa, đây là một `[QUESTION]` cần nêu ra trước khi sang SPEC, không phải lý do để bỏ qua bước này.

## Ghi lại quan sát theo 3 nhãn bắt buộc

```
[FACT]       Bằng chứng quan sát trực tiếp từ repo/code/test/tài liệu.
[ASSUMPTION] Diễn giải chưa được chứng minh.
[QUESTION]   Thông tin không thể xác định an toàn.
```

Ví dụ:
```
[FACT]       LeadService.cs hiện lọc Lead theo OwnerId.
[ASSUMPTION] Manager có thể xem mọi Lead trong phòng ban của họ.
[QUESTION]   Lead ở trạng thái LOST có được quay lại QUALIFIED không?
```

Không bao giờ trình bày một `[ASSUMPTION]` như thể nó là `[FACT]`.
