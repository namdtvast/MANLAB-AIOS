# VERIFY — Bộ test logic M29 (hạ tầng test đầu tiên của aios-platform)

**Bối cảnh:** `verify.md` của Increment 4 ghi **NOT RUN** cho hạng mục "kiểm thử tự động cho
`rules.ts`" vì `aios-platform` chưa có bộ test nào. Việc này đóng khoảng trống đó.

**Môi trường:** worktree riêng `m29-test-wt` trên `origin/main`. Bộ test **không cần Postgres** —
Prisma được giả lập trong từng file test.

## 1. Phạm vi

| File test | Phủ gì | Số ca |
|---|---|---|
| `rules.test.ts` | Vòng đời phê duyệt chung, AIA, phiên bản lời nhắc, ràng buộc Tool EXECUTE, quyền gọi Tool theo vai trò, vòng đời phiếu sự cố, AI chưa đăng ký | 32 |
| `gateway.test.ts` | Tool Gateway: 8 chốt chặn và thứ tự của chúng, AIA Gate, ghi trace khi nền tảng lỗi | 14 |
| `model.test.ts` | Ma trận phân quyền: ranh giới không được nới (kiểm toán chỉ đọc, kho bí mật, nhật ký append-only) | 10 |
| `evaluation.test.ts` | Chấm bộ ca kiểm thử, ngưỡng gắn cờ, Cổng triển khai | 9 |
| `sweep.test.ts` | Vòng quét AIA quá hạn: tạm dừng tác tử, nhật ký `actor=SYSTEM`, tính idempotent | 8 |
| **Tổng** | | **73** |

## 2. Kết quả

| Hạng mục | Lệnh | Kết quả |
|---|---|---|
| Bộ test | `npm test` | **73/73 PASS** — 5 file, chạy hết 0,6 giây |
| Build | `npm run build` | **PASS** |
| Lint | `npm run lint` | **PASS** — 0 lỗi (2 cảnh báo `no-unused-vars` có sẵn trong `prisma/seed.ts` từ code đã merge trước, không thuộc thay đổi này) |
| CI | `.github/workflows/test-aios-platform.yml` | Chạy trên mọi push/PR chạm `09_ENGINEERING/aios-platform/**` |

## 3. Kiểm chứng bộ test thật sự bắt lỗi

Test xanh ngay lần đầu chưa chứng minh điều gì — nên tôi cố tình phá từng chốt chặn trong mã sản
phẩm rồi chạy lại, sau đó khôi phục nguyên trạng:

| Đột biến gieo vào mã | Điều khoản bị vi phạm | Kết quả |
|---|---|---|
| Gỡ bước kiểm tra `agent.status` trong Tool Gateway | P29 5.2.3 + 5.7.3 | **3 test đỏ** |
| Bỏ chặn người phát hiện tự đóng phiếu sự cố | P29 5.7.3 | **1 test đỏ** |
| Bỏ ràng buộc bắt buộc mã KPH khi đóng sự cố Nghiêm trọng/Đáng kể | P29 5.7.3 + MP13 | **1 test đỏ** |
| Cho vòng quét đè lý do tạm dừng của tác tử đang khống chế sự cố | P29 5.7.3 | **1 test đỏ** |
| Nới quyền ghi cho nhật ký kiểm toán | DacTa quy tắc 2 (append-only) | **1 test đỏ** |

Sau khi khôi phục cả 5: **73/73 PASS** trở lại.

## 4. Quyết định thiết kế

- **Giả lập Prisma thay vì dùng Postgres thật.** Bộ test chạy được trên máy sạch và trong CI mà
  không cần dựng service, chạy hết dưới 1 giây. Đổi lại, test **không** phủ tầng truy vấn thật
  (kiểu cột, ràng buộc khóa ngoại, giao dịch) — phần đó vẫn dựa vào verify qua Browser như
  Increment 4 đã làm.
- **Test bám điều khoản, không bám hàm.** Mỗi nhóm test dẫn chiếu mục của ETV.P29 mà nó bảo vệ, để
  khi test đỏ thì người sửa biết mình đang phá quy định nào chứ không chỉ biết một hàm đổi hành vi.
- **Không viết test cho `actions.ts`.** Lớp đó chủ yếu là điều phối (gọi rule → ghi DB → ghi nhật
  ký); phần quyết định đã nằm hết ở `rules.ts` và đã được phủ. Test `actions.ts` với Prisma giả lập
  sẽ chủ yếu khẳng định lại chính cấu trúc giả lập, giá trị thấp.

## 5. Chưa làm / giới hạn đã biết

| Hạng mục | Trạng thái | Ghi chú |
|---|---|---|
| Test tích hợp chạy trên Postgres thật | **NOT DONE** | Đã cân nhắc và loại khỏi phạm vi lần này (xem mục 4) |
| Test cho `actions.ts`, `adapters.ts`, `usage.ts` | **NOT DONE** | Lớp điều phối và bộ chuyển đổi nền tảng |
| Test giao diện (component/E2E) | **NOT DONE** | Chưa có hạ tầng; giao diện M29 hiện verify bằng Browser thủ công |
| Test cho các module khác (M01–M25) | **NOT DONE** | Ngoài phạm vi; hạ tầng `vitest` dựng lần này dùng lại được cho mọi module |
