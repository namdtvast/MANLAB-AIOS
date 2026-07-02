# Tri thức — Vòng đời & trạng thái văn bản

> Nguồn chuẩn duy nhất: `05_MODULE_LIBRARY/M14_TaiLieu/07_Workflow/StateMachine.md`. File này chỉ tóm tắt để AI tra nhanh khi trả lời — nếu có sai khác, StateMachine.md là đúng.

## Vòng đời tổng quát (mọi loại văn bản thuộc P14)

Đề xuất → Soạn thảo (**Nháp**) → Soát xét (**Chờ soát xét** → **Không soát xét** nếu bị trả) → Phê duyệt (**Chờ phê duyệt** → **Không phê duyệt** nếu bị trả) → **Đã phê duyệt** (ban hành, phân phối, công bố, sử dụng) → Soát xét định kỳ/đột xuất → **Hết hiệu lực/Hủy** (thanh lý hoặc hủy bỏ) → Lưu hồ sơ.

## 7 trạng thái chuẩn

1. Nháp
2. Chờ soát xét
3. Không soát xét (bắt buộc lý do)
4. Chờ phê duyệt
5. Không phê duyệt (bắt buộc lý do)
6. Đã phê duyệt
7. Hết hiệu lực/Hủy (bắt buộc lý do)

> **Hợp đồng không thuộc P14.** Vòng đời hợp đồng (Dự thảo → Đã ký → Gia hạn/Điều chỉnh → Thanh lý...) do P03/P07 quy định — skill này không xử lý, chỉ định tuyến (xem `CLAUDE.md` bước 1).

## Bảng slug máy (dùng trong trường `status`/`type` của YAML metadata)

> Quy ước: bỏ dấu, nối bằng gạch ngang — dùng thống nhất trong mọi khối YAML của `templates/`, `examples/`. Nhãn tiếng Việt có dấu ở trên là bản chính thức để hiển thị cho người dùng.

| Nhãn tiếng Việt | Slug máy |
|---|---|
| Nháp | `Nhap` |
| Chờ soát xét | `Cho-soat-xet` |
| Không soát xét | `Khong-soat-xet` |
| Chờ phê duyệt | `Cho-phe-duyet` |
| Không phê duyệt | `Khong-phe-duyet` |
| Đã phê duyệt | `Da-phe-duyet` |
| Hết hiệu lực/Hủy | `Het-hieu-luc-Huy` |

## Nguyên tắc AI phải tuân thủ

- Chỉ dùng đúng tên trạng thái ở trên khi mô tả tình trạng văn bản — không dịch/diễn giải khác đi.
- Không đề xuất bỏ qua bước (vd. từ Nháp thẳng lên Đã phê duyệt).
- Khi gợi ý "văn bản này nên chuyển sang trạng thái X", luôn kèm câu: "cần [LĐP/LĐV] xác nhận theo đúng RACI tại ETV.P14 §5".
