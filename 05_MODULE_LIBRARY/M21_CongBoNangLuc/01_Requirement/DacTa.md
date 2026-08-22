# M21_CongBoNangLuc — Đặc tả yêu cầu

> Đã hợp nhất từ `_work/20260822-di-tru-m21/spec.md` (Increment 1 — di trú vào aios-platform).
> Xem `_work/20260822-di-tru-m21/` để đối chiếu evidence/quyết định phạm vi chi tiết.

## 1. Mục tiêu module

Số hóa quy trình MP21 — Công bố năng lực đo lường (NQ 66.18) và thông báo hoạt động dịch vụ quan
trắc môi trường (NQ 66.19): lập hồ sơ → soát xét → phê duyệt & ký số → gửi cơ quan tiếp nhận →
công khai → duy trì/điều chỉnh.

## 2. Đối tượng dữ liệu chính

Hồ sơ công bố năng lực (2 loại: **DL** — Đo lường/Mẫu 01, **QTMT** — Quan trắc môi trường/Mẫu
9.01), mỗi hồ sơ có 1..N **dòng đối tượng** (đối tượng/dịch vụ nằm trong phạm vi công bố).

## 3. Trường dữ liệu bắt buộc

### Hồ sơ (header)

| Trường | Kiểu | Bắt buộc lúc "Gửi soát xét" | Ghi chú |
|---|---|---|---|
| loai | DL / QTMT | có | không đổi sau khi tạo |
| toChuc, diaChi, daiDien | string | có | |
| diaDiem | string | **có, chỉ loại DL** | Địa điểm thực hiện hoạt động |
| coQuanTiepNhan | string | có | mặc định theo loại — xem mục 5 |

### Dòng đối tượng

| Trường | Bắt buộc khi "Gửi soát xét" | Ghi chú |
|---|---|---|
| ten, linhVuc, phamVi, quyTrinh, ccx | có | ccx = Cấp/ĐCX/MPE/LOD |
| lyDo, bangChung | **có, khi kết quả ∈ {Không đáp ứng, Điều chỉnh}** | BR10 |

Bảng đầy đủ (tất cả trường, kiểu Prisma) xem
`09_ENGINEERING/aios-platform/prisma/schema.prisma` — model `M21Record`/`M21Line` là nguồn dữ
liệu authoritative của module này trong nền tảng hợp nhất.

## 4. Vai trò

`NTH` (Người thực hiện) · `LDP` (Lãnh đạo phòng) · `LDV` (Lãnh đạo Viện) — có cấp bậc
(`NTH < LDP < LDV`): vai trò cao hơn làm được thao tác của vai trò thấp hơn (vd LĐV làm được cả
thao tác chỉ định `role: LDP`). Không có vai trò "Người công bố" riêng — LDP thực hiện bước gửi
cơ quan tiếp nhận và công khai.

## 5. Quy tắc nghiệp vụ

Xem đầy đủ BR1–BR11 + gate G1/G3/G6 + state machine 12 trạng thái tại
`_work/20260822-di-tru-m21/spec.md` (mục "RECON — phát hiện chính"). Implementation authoritative:
`09_ENGINEERING/aios-platform/src/lib/m21/rules.ts`.

Tóm tắt các mốc quan trọng cần nhớ khi vận hành:
- **BR8**: cơ chế tự công bố/thông báo chỉ áp dụng đến **28/02/2027** — cần quyết định hướng xử
  lý (gia hạn cơ chế pháp luật hay đổi luồng) trước mốc này.
- **BR2** (DL): hạn ghi nhận của cơ quan tiếp nhận = 3 ngày làm việc kể từ ngày gửi.
- **BR6** (QTMT): Báo cáo hằng năm Mẫu 9.02 hạn 30/01 hằng năm (UI nhập liệu form này **chưa xây**
  — xem mục 7).

## 6. Liên kết

Quy trình: MP21 · Năng lực: CAP-21 · Căn cứ: Pháp luật (NĐ 36/2026; NĐ 22/2026), NQ 66.18/66.19.
Tích hợp dữ liệu (chưa xây thật): Danh mục Phương tiện đo — thuộc M05_ThietBi (M05 hiện
`COMING_SOON`, chưa có backend — `catalog.ts` dùng dữ liệu nhúng tĩnh).

## 7. Trạng thái triển khai (aios-platform)

- ✅ **Increment 1** (2026-08-22 → 2026-08-23): state machine 12 trạng thái + BR1–BR11 + gate
  G1/G3/G6 port 1:1 từ `08_Source/index.html` sang `src/lib/m21/`, có DB Postgres thật (không còn
  localStorage riêng từng trình duyệt), gate theo vai trò thật qua `ModuleRoleAssignment`, verify
  qua Browser thật (xem `_work/20260822-di-tru-m21/verify.md`).
- ❌ **Chưa làm**: trang công khai + QR tra cứu, in A4 Mẫu 01/9.01, form Báo cáo hằng năm Mẫu
  9.02, upload file thật cho bằng chứng (hiện là text), tích hợp DB thật với M05.
- ❌ Bản `08_Source/index.html` (submodule, localStorage) **vẫn chạy song song**, chưa deprecate.
