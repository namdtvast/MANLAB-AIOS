# Đề xuất sửa bảng lớp tài liệu — mở lớp danh mục dùng chung vào chỉ mục Copilot

> **Bản dự thảo trình duyệt — chưa có hiệu lực.** Do AI soạn theo yêu cầu, dựa trên đối chiếu các
> thủ tục đã ban hành. Người ký ở mục 9 phải là người thật; trợ lý AI không gán mức phân loại,
> không phân loại mức tác động và không phê duyệt (ETV.P27 §5.3, ETV.P30 §5.3).
>
> Ngày dự thảo: 31/08/2026 · Người đề nghị: *(điền)* · Trình: PT.ATTT, QLCL, Lãnh đạo Viện.
>
> **Đề xuất song song:** [`20260831-lop-ho-so-kiem-soat-tai-lieu`](../20260831-lop-ho-so-kiem-soat-tai-lieu/de-xuat.md) (mở lớp hồ sơ F14.01). Hai đề xuất khác lớp tài liệu nhưng **mục 3.1 dưới đây ảnh hưởng trực tiếp tới PA2 của đề xuất đó** — đọc kèm.

## 1. Việc trình

Ngày 31/08/2026, bốn bảng danh mục dùng chung được lập từ việc đối chiếu danh sách nhân sự đang vận hành trên ManLab:

| Tệp | Thư mục | Nội dung |
|---|---|---|
| `DanhMuc_ChucDanh.md` | [`06/08_Personnel`](../../../../../06_SHARED_RESOURCES/08_Personnel) | Chức danh, viết tắt vai trò dùng trong RACI |
| `MaTranNangLuc_LinhVucKiemDinh.md` | [`06/08_Personnel`](../../../../../06_SHARED_RESOURCES/08_Personnel) | 12 lĩnh vực kiểm định; thẻ kiểm định viên |
| `MaBoPhan.md` | [`06/04_Master_Data`](../../../../../06_SHARED_RESOURCES/04_Master_Data) | Mã bộ phận ↔ đơn vị; quy tắc sinh mã nhân sự |
| `LoaiHopDong_TrangThai.md` | [`06/04_Master_Data`](../../../../../06_SHARED_RESOURCES/04_Master_Data) | Loại hợp đồng, trạng thái, nhóm nhân sự, thuế/bảo hiểm |

Bốn tệp **cùng một loại nội dung** — bảng tra mã hoá dùng chung, không có tên người, không có số định danh cá nhân — nhưng bộ nạp chỉ mục Copilot đang đối xử với chúng theo **hai cách khác nhau**, và cả hai đều không đúng:

| Thư mục | Hiện trạng | Vấn đề |
|---|---|---|
| `08_Personnel` | Nằm trong `BLOCKED`, lý do ghi *"Hồ sơ nhân sự — NĐ 13/2023/NĐ-CP"* | Lý do phân loại theo **tên thư mục**, không theo nội dung. Trong thư mục không có hồ sơ nhân sự nào |
| `04_Master_Data` | Không nằm trong `ALLOWED` **cũng không** trong `BLOCKED` | Rơi vào nhóm `ngoaiLop` — báo cáo đếm được nhưng **không nêu lý do**, nên không ai biết nó vắng mặt vì cố ý hay vì quên |

Trình xin ý kiến về việc sửa bảng lớp tài liệu tại [`scripts/nap-chi-muc-copilot.ts`](../../../../../09_ENGINEERING/aios-platform/scripts/nap-chi-muc-copilot.ts).

## 2. Vì sao đây không phải dữ liệu nhân sự

`ETV.P27` §6.1.3 phân nhóm dữ liệu và gán mức tối thiểu. Hai nhóm liên quan:

| Nhóm dữ liệu | Ví dụ tại Viện *(nguyên văn §6.1.3)* | Mức tối thiểu |
|---|---|---|
| Dữ liệu nhân sự | *Hồ sơ nhân sự, lương thưởng* | **Mật** |
| Dữ liệu hệ thống quản lý | *Tài liệu, hồ sơ ISO, đánh giá nội bộ* | **Nội bộ** |

Bốn tệp trên **không phải** "hồ sơ nhân sự, lương thưởng". Chúng là bảng tra mã hoá phục vụ thủ tục — đúng nhóm *dữ liệu hệ thống quản lý*, mức tối thiểu **Nội bộ**.

Điều này không phải suy diễn của người soạn: [`06/08_Personnel/README.md`](../../../../../06_SHARED_RESOURCES/08_Personnel/README.md) §2.2 **cấm** đặt hồ sơ cá nhân trong chính thư mục đó, và nêu rõ lý do — repo công khai trên GitHub, sơ yếu lý lịch và số CCCD là dữ liệu cá nhân theo NĐ 13/2023/NĐ-CP. Thư mục được thiết kế **để không chứa** thứ mà dòng `BLOCKED` đang viện dẫn.

Khác biệt so với `05_R`: `05_R` bị chặn cả thư mục vì *"sẽ nhận hồ sơ của mọi thủ tục về sau"* — rủi ro tương lai có thật. `08_Personnel` thì ngược lại, quy ước thư mục đã loại trừ hồ sơ ngay từ đầu.

**Nhưng quy ước không phải là cưỡng chế.** README ngăn được người đọc nó, không ngăn được một tệp bị đặt nhầm. Vì vậy đề xuất này **không** xin gỡ chặn cả thư mục (xem PA1 bị loại).

## 3. Phát hiện khi đối chiếu mã nguồn

### 3.1. `BLOCKED` thắng `ALLOWED` — thêm lớp con vào `ALLOWED` KHÔNG có tác dụng

Đây là phát hiện quan trọng nhất, và nó **vượt ra ngoài phạm vi đề xuất này**.

Trong `nap-chi-muc-copilot.ts`, vòng lặp chính xét theo đúng thứ tự:

```ts
const reason = blockedReason(relPath);
if (reason) { skipped.camNap++; …; continue; }   // ← chặn xong là bỏ qua luôn

const cls = classOf(relPath);                     // ← không bao giờ chạy tới với đường dẫn bị chặn
```

`blockedReason()` khớp theo **tiền tố đường dẫn** và `continue` ngay. Không có logic "đường dẫn cụ thể hơn thì thắng". Hệ quả: **thêm một lớp vào `ALLOWED` cho thư mục con của một root đang bị `BLOCKED` thì không thay đổi gì cả** — tệp vẫn bị đếm vào `camNap`.

**Ảnh hưởng tới đề xuất song song.** PA2 của [`20260831-lop-ho-so-kiem-soat-tai-lieu`](../20260831-lop-ho-so-kiem-soat-tai-lieu/de-xuat.md) viết: *"Giữ nguyên dòng `05_R` trong `BLOCKED`; bộ nạp xét `ALLOWED` cho đường dẫn cụ thể hơn"*. Câu đó **mô tả sai mã nguồn hiện tại**. Nếu duyệt và triển khai đúng như viết, phiếu F14.01 vẫn không vào chỉ mục và không ai hiểu vì sao — đúng tình huống mà chính đề xuất đó cảnh báo ở §5.

Cả hai đề xuất vì vậy cần **cùng một sửa đổi cơ chế**, nêu ở mục 4.

### 3.2. Hai cách vắng mặt, chỉ một cách nói được lý do

Báo cáo cuối lần nạp in bốn nhóm bị bỏ: `camNap` (có nêu lý do từng dòng `BLOCKED`), `chuaPheDuyet`, `mucKhongHopLe`, và `ngoaiLop` — **chỉ có một con số, không nêu tệp nào, không nêu vì sao**.

`04_Master_Data` rơi vào `ngoaiLop`. Nghĩa là nó vắng mặt trong chỉ mục một cách **im lặng**: không phải quyết định quản trị được ghi lại, mà là hệ quả của việc chưa ai thêm nó vào `ALLOWED`. Không phân biệt được "cố ý không nạp" với "quên chưa khai".

Đây là lớp lỗi khác với §3.1 nhưng cùng gốc: bảng lớp tài liệu đang mô tả **thư mục**, chưa mô tả **quyết định**.

### 3.3. Vẫn chưa có bản ghi tài sản nào

Như đề xuất song song đã nêu, **chưa lớp nào có bản ghi `ETV.P.F 27.01`** — kiểm lại ngày 31/08/2026: không có tệp hồ sơ F27.01 nào trong repo. `ETV.P27` §6.1.5 quy định trình tự 6 bước để đưa một tài sản vào danh mục, kết thúc bằng phê duyệt của LĐV; `ETV.P29` §5.5 đòi nguồn cấp cho AI phải là tài sản đã đăng ký.

Nghĩa là: **mọi lớp đang nằm trong chỉ mục hôm nay cũng chưa có bản ghi tài sản.** Đề xuất này không tạo ra thiếu sót đó và cũng không sửa được nó một mình — nêu để LĐV thấy đúng quy mô (mục 8 việc 1–2).

## 4. Phương án

### PA1 — Gỡ `08_Personnel` khỏi `BLOCKED`, thêm cả thư mục vào `ALLOWED` ❌ **Không khuyến nghị**

Đơn giản nhất, nhưng mở theo **thư mục** chứ không theo **nội dung**. Một tệp hồ sơ đặt nhầm vào đây về sau sẽ tự động vào chỉ mục. Quy ước tại README không chặn được điều đó.

### PA2 — Bổ sung cơ chế `except` cho `BLOCKED`, mở đúng các tệp danh mục ✅ **Khuyến nghị**

Hai phần:

**(a) Sửa cơ chế** — cho mỗi dòng `BLOCKED` một vị ngữ loại trừ tuỳ chọn:

```ts
export const BLOCKED: { roots: string[]; reason: string; except?: (p: string) => boolean }[] = […]

function blockedReason(relPath: string): string | null {
  for (const b of BLOCKED) {
    if (!b.roots.some((r) => relPath.startsWith(`${r}/`))) continue;
    if (b.except?.(relPath)) return null;   // đã mở tường minh cho đúng tệp này
    return b.reason;
  }
  return null;
}
```

Đây là sửa đổi **ba dòng**, không đổi hành vi của bất kỳ lớp nào đang có (không dòng `BLOCKED` nào khai `except` thì mọi thứ chạy y như cũ), và nó là **điều kiện cần** để PA2 của cả hai đề xuất có tác dụng.

**(b) Mở đúng bốn tệp** — liệt kê **tên tệp tường minh**, không dùng mẫu tên:

| Dòng | Thay đổi |
|---|---|
| `BLOCKED` → `06_SHARED_RESOURCES/08_Personnel` | Sửa lý do thành *"Thư mục dùng chung cho danh mục nhân sự; hồ sơ cá nhân thuộc CSDL, không đặt ở đây (README §2.2) — chặn mặc định, mở từng tệp qua `except`"*; thêm `except` khớp đúng `README.md`, `DanhMuc_ChucDanh.md`, `MaTranNangLuc_LinhVucKiemDinh.md` |
| `ALLOWED` | Thêm lớp `DANH_MUC_DUNG_CHUNG`, `roots` = `06_SHARED_RESOURCES/04_Master_Data` + `06_SHARED_RESOURCES/08_Personnel`, `defaultLevel: "Noi-bo"`, `requireApproved: false`, kèm `accept` liệt kê đúng bốn tệp + hai `README.md` |

**Vì sao liệt kê tên tệp chứ không dùng mẫu `DanhMuc_*`:** mẫu tên không phân biệt được `DanhMuc_ChucDanh.md` với một tệp tương lai tên `DanhMuc_LuongNhanVien.md`. Thư mục này nằm cạnh nhóm dữ liệu mức **Mật**; chi phí của việc liệt kê tường minh là mỗi bảng danh mục mới cần một dòng trong PR có người soát — đúng mức nghi thức cho ranh giới này.

**`requireApproved: false`:** bốn tệp là bảng tra dùng chung, không phải tài liệu kiểm soát có lần ban hành, nên không mang `status` — giống cách lớp `HUB_MP`, `DAC_TA_MODULE`, `NANG_LUC`, `WIKI` đang được đối xử. Nếu đặt `true` thì cả bốn bị loại vì thiếu nhãn.

### PA3 — Giữ nguyên chặn, chỉ sửa lý do cho đúng ⚪

Sửa chuỗi lý do của dòng `08_Personnel` và khai `04_Master_Data` vào `BLOCKED` kèm lý do thật, để cả hai vắng mặt **có chủ ý và nói được**. Không tệp nào vào chỉ mục.

Chọn PA3 nếu LĐV muốn chờ có bản ghi `F27.01` trước khi mở bất cứ lớp nào. PA3 vẫn tốt hơn hiện trạng vì nó xoá được sự im lặng ở §3.2.

### Việc phải làm ở cả ba phương án

Sửa chuỗi lý do dẫn sai của dòng `08_Personnel`: hiện ghi *"Hồ sơ nhân sự — NĐ 13/2023/NĐ-CP"* trong khi thư mục không chứa hồ sơ nhân sự. Dẫn đúng nhóm là `ETV.P27` §6.1.3 *dữ liệu hệ thống quản lý*. Sửa trích dẫn không đổi hành vi, nhưng để nguyên thì mọi lập luận dựa lên nó đều mượn một căn cứ không có — cùng lớp lỗi đã sửa cho dòng `05_R` ngày 31/08/2026.

## 5. Phạm vi thay đổi kỹ thuật nếu duyệt PA2

| # | Việc | Tệp | Đổi hành vi? |
|---|---|---|---|
| 1 | Thêm trường `except` vào `BLOCKED` và nhánh tương ứng trong `blockedReason()` | `nap-chi-muc-copilot.ts` | Không (chưa dòng nào khai `except`) |
| 2 | Sửa chuỗi lý do dòng `08_Personnel` | `nap-chi-muc-copilot.ts` | Không |
| 3 | Khai `except` cho `08_Personnel` + thêm lớp `DANH_MUC_DUNG_CHUNG` vào `ALLOWED` | `nap-chi-muc-copilot.ts` | **Có — cổng A** |
| 4 | Lập bản ghi `ETV.P.F 27.01` cho lớp tài sản "Danh mục dùng chung" | Hồ sơ giấy/ManLab | Không |
| 5 | Chạy lại `npm run nap-chi-muc-copilot` | — | Có hiệu lực |

Việc 1 **dùng chung với đề xuất `20260831-lop-ho-so-kiem-soat-tai-lieu`**. Làm một lần, hai đề xuất cùng dùng — không triển khai hai lần.

Như đề xuất song song đã nêu, cổng B (`dataBoundary` của nền tảng AI, `ETV.P29` §5.5) là điều kiện cần độc lập để bất kỳ tài liệu mức Nội bộ nào quan sát được trong chỉ mục. Việc đó không thuộc đề xuất này.

## 6. Đánh giá tác động tóm tắt

| Hạng mục | Đánh giá |
|---|---|
| Dữ liệu cá nhân đưa thêm vào chỉ mục | **Không.** Bốn tệp không có tên người, số định danh, lương, hay thông tin liên hệ — đã quét xác nhận khi lập chúng (PR #195) |
| Mức phân loại | Nội bộ — đúng mức tối thiểu §6.1.3 cho nhóm dữ liệu hệ thống quản lý, **không hạ mức** so với thủ tục |
| Phạm vi mở | 4 tệp danh mục + 2 `README.md`. Mọi tệp khác trong hai thư mục vẫn bị chặn/bỏ qua |
| Người dùng thấy gì | Copilot dẫn được mã bộ phận, chức danh, loại hợp đồng, lĩnh vực kiểm định khi trả lời câu hỏi về nhân sự — thay vì im lặng hoặc đoán |
| Mức tác động thay đổi | Đề nghị QLCL phân loại theo `ETV.P30` §6.2.1 |

## 7. Rủi ro và phương án quay lui

| Rủi ro | Mức | Xử lý |
|---|---|---|
| Tệp có dữ liệu cá nhân được đặt vào `08_Personnel` với đúng một trong ba tên đã liệt kê | Thấp | `except` khớp **tên tệp tuyệt đối**, không phải mẫu; thêm tệp mới vào danh sách là PR có người soát |
| Nội dung bốn tệp về sau bị bổ sung dữ liệu cá nhân | Thấp–Trung bình | README §2.2 và §3 (phép thử 3 câu) đã quy định; bổ sung kiểm CI đối chiếu mẫu số định danh là việc nên làm, chưa thuộc đề xuất này |
| `except` bị dùng rộng cho lớp khác về sau | Trung bình | Ràng buộc quản trị: mỗi lần khai `except` phải nêu trong hồ sơ `F27.01` của lớp tương ứng |

**Quay lui:** xoá dòng `except` và lớp `DANH_MUC_DUNG_CHUNG`, chạy lại bộ nạp. Chỉ mục được dựng lại mỗi lần chạy nên không có trạng thái tồn dư.

## 8. Việc phải làm và thẩm quyền

| # | Việc | Vai trò | Căn cứ |
|---|---|---|---|
| 1 | Gán mức phân loại **Nội bộ** cho lớp tài sản "Danh mục dùng chung" | TP *(chủ sở hữu)* lập — **PT.ATTT** duyệt | ETV.P27 §6.1.5 |
| 2 | Phê duyệt tài sản vào danh mục `F27.01` | **Lãnh đạo Viện** | ETV.P27 §6.1.5 |
| 3 | Duyệt tài sản được dùng làm nguồn cho hệ thống AI | TP + PT.ATTT đề nghị — **Lãnh đạo Viện phê duyệt** | ETV.P27 §6.9 |
| 4 | Phân loại mức tác động của thay đổi | **QLCL** | ETV.P30 §6.2.1 |
| 5 | Phê duyệt thay đổi | **Lãnh đạo Viện** | ETV.P30 §6.2.2 |
| 6 | Sửa lại PA2 của đề xuất `20260831-lop-ho-so-kiem-soat-tai-lieu` theo §3.1 | Người soạn đề xuất đó | — |

Việc 6 **không chờ duyệt** — đó là sửa một mô tả sai về mã nguồn, làm ngay để LĐV không duyệt trên thông tin sai.

## 9. Ý kiến và phê duyệt

**Ý kiến PT.ATTT** *(mức phân loại — ETV.P27 §6.1.5 bước 3)*

☐ Đồng ý mức Nội bộ · ☐ Không đồng ý — lý do: .....................

Người soát xét: ..................... · Ngày: .....................

**Ý kiến QLCL** *(mức tác động thay đổi — ETV.P30 §6.2.1)*

Mức: ..................... · Người phân loại: ..................... · Ngày: .....................

**Phê duyệt Lãnh đạo Viện**

☐ PA1 · ☐ **PA2** *(khuyến nghị)* · ☐ PA3 · ☐ Không phê duyệt — lý do: .....................

Người phê duyệt: ..................... · Ngày: .....................

---

## Phụ lục — tài liệu đã đối chiếu

| Tài liệu | Mục dùng |
|---|---|
| [`ETV.P27`](../../../../../03_MANAGEMENT_SYSTEM/02_P/ETV.P27_QuanTriDuLieuTaiSanTT.md) | §6.1.3 nhóm dữ liệu và mức tối thiểu · §6.1.5 trình tự đăng ký tài sản · §6.2 thang 4 mức |
| [`ETV.P29`](../../../../../03_MANAGEMENT_SYSTEM/02_P/ETV.P29_QuanLyTriTueNhanTao.md) | §5.5 nguồn cấp cho AI phải là tài sản đã đăng ký |
| [`ETV.P30`](../../../../../03_MANAGEMENT_SYSTEM/02_P/ETV.P30_QuanLyThayDoi.md) | §6.2.1 phân loại mức tác động · §6.2.2 phê duyệt |
| [`06/08_Personnel/README.md`](../../../../../06_SHARED_RESOURCES/08_Personnel/README.md) | §2.2 cấm đặt hồ sơ cá nhân · §3 phép thử 3 câu |
| [`nap-chi-muc-copilot.ts`](../../../../../09_ENGINEERING/aios-platform/scripts/nap-chi-muc-copilot.ts) | `ALLOWED`, `BLOCKED`, `blockedReason()`, vòng lặp chính |
| [Đề xuất song song](../20260831-lop-ho-so-kiem-soat-tai-lieu/de-xuat.md) | PA2, §5 phạm vi kỹ thuật |
