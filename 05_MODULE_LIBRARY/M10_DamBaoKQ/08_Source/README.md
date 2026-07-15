# M10_DamBaoKQ — Mã nguồn tham chiếu (webapp)

Ứng dụng chạy thật minh hoạ module M10, **thực thi** các quy tắc nghiệp vụ trong đặc tả (không chỉ mock tĩnh). Không phụ thuộc npm — vanilla ES modules, lưu `localStorage`.

## Chạy

```bash
cd webapp
python3 -m http.server 8010     # hoặc: npx serve .
# mở http://localhost:8010
```

> ES modules cần phục vụ qua HTTP (không mở bằng `file://`). Có sẵn cấu hình `.claude/launch.json` tên `m10-webapp`.

## Cấu trúc

| File | Vai trò |
|---|---|
| `webapp/index.html` | Khung app (sidebar, topbar, chọn vai, đổi giao diện) |
| `webapp/styles.css` | Design tokens (petrol teal + 3 màu semantic), sáng/tối, responsive |
| `webapp/src/model.js` | Kiểu dữ liệu, enum trạng thái/kết quả, vai trò, dữ liệu mẫu |
| `webapp/src/rules.js` | **Control rules R1–R8**: validation, guard phân quyền, transition, trạng thái công bố |
| `webapp/src/store.js` | Kho trạng thái + localStorage + audit trail append-only |
| `webapp/src/app.js` | Render 5 màn (Danh sách · Tạo · Chi tiết/workflow · Công bố F10.09 · Dashboard) |

## Quy tắc được thực thi (khớp [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) §3)

| # | Thực thi trong app |
|---|---|
| R2 | Chặn gửi soát xét nếu thiếu trường bắt buộc/dữ liệu thô/bằng chứng theo `record_type` |
| R3 | Trả lại / Từ chối bắt buộc nhập lý do |
| R4 | Kết quả KHÔNG ĐẠT khóa phê duyệt/phát hành cho tới khi liên kết KPH-CAPA |
| R6 | Nhật ký append-only; sửa bản đã phê duyệt → tạo phiên bản mới |
| R8 | Tách tạo–soát xét–phê duyệt; không ai tự soát xét/tự phê duyệt hồ sơ mình tạo (đổi vai để thấy nút bật/tắt) |
| Công bố | Bảng trạng thái PASS/CONDITIONAL/WARNING/FAIL-BLOCKED/EXPIRED khống chế phát hành |
| AI | Chỉ gắn cờ cảnh báo; không có thao tác "AI tự duyệt" |

## Phạm vi
Nguyên mẫu chạy được với lớp dữ liệu trong bộ nhớ (localStorage) thay cho API [`../02_API/API.md`](../02_API/API.md). Khi triển khai thật: thay `store.js` bằng lời gọi API, giữ nguyên `rules.js`. Bản mock tĩnh trước đó: [`../04_UI/mockup/`](../04_UI/mockup).
