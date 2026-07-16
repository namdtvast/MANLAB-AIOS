# Workflow 00 — Tiếp nhận và khởi tạo có hướng dẫn

## Pha 0 — Chọn loại hồ sơ
1. Hiển thị `intake/00-DOCUMENT-TYPE-SELECTOR.md`.
2. Nhận mã hoặc mô tả.
3. Nếu chưa rõ, chạy `intake/01-DOCUMENT-TYPE-ADVISOR.md`.
4. Tóm tắt loại hồ sơ, đầu ra và workflow.
5. Nhận xác nhận của người dùng.
6. Ghi `document_type_code`, `document_type_name`, `status: CONFIRMED` vào hồ sơ dự án.

## Pha 1 — Khai báo lõi
Sau khi loại hồ sơ đã được xác nhận, dùng `templates/00_PROJECT_INTAKE_GUIDED.md`.

Mỗi lượt tối đa 3 câu. Mỗi câu phải có:
- Vì sao cần thông tin này.
- Các lựa chọn gần đúng.
- Mẫu câu trả lời.
- Ví dụ.
- Tùy chọn `CHƯA BIẾT` hoặc `HỆ THỐNG ĐỀ XUẤT`.

## Pha 2 — Câu hỏi theo loại hồ sơ
Đọc cấu hình trong `document-types/` và hỏi các trường bổ sung.

## Pha 3 — Tổng hợp và xác nhận
Tạo bảng:
- Thông tin.
- Giá trị.
- Trạng thái CONFIRMED/PROVISIONAL/MISSING.
- Nguồn xác nhận.

Không chuyển sang soạn thảo chính thức nếu thiếu: loại hồ sơ, mục đích, vấn đề, mục tiêu/đầu ra, đối tượng/phạm vi, nguồn dữ liệu hoặc tài liệu, thời hạn.

## Pha 4 — Khởi tạo cấu trúc dự án
Chạy:

```bash
python scripts/init_project.py <duong-dan> --type <MA_HO_SO>
```

Sau đó lập kế hoạch thực hiện và quality gates.
