# Nhập danh sách nhân sự ManLab vào M03 — đặc tả di trú

> Work-id `20260831-nhap-nhan-su-manlab` · Tier M · Script: [`scripts/nhap-nhan-su-manlab.ts`](../../../../../09_ENGINEERING/aios-platform/scripts/nhap-nhan-su-manlab.ts)
>
> Tiếp nối [`_work/20260831-m03-k2-k3-k4`](../20260831-m03-k2-k3-k4) và [`_work/20260831-m03-k5`](../20260831-m03-k5) — hai đợt đó chốt **chỗ chứa** (schema), đợt này **đổ dữ liệu thật vào chỗ đó**.

## 1. OUTCOME

**Ai:** Văn phòng ETV (chủ sở hữu dữ liệu nhân sự), Lãnh đạo Viện (người đọc báo cáo nhân lực).

**Việc gì:** đưa 145 bản ghi nhân sự đang vận hành trên ManLab sang M03 của nền tảng AIOS, giữ nguyên dữ liệu — kể cả dữ liệu sai — và **báo cáo** chỗ sai thay vì tự sửa.

**Vì sao:** M03 vừa chốt K2–K5 (`legacyCode`, `recordStatus`, `M03EmployeeField`, `M03InspectorCard`) nhưng chưa có một hồ sơ thật nào. Chừng nào nền tảng còn rỗng thì mọi kết luận về nó — kể cả bốn khoảng cách vừa chốt — vẫn là suy luận trên đặc tả, chưa phải trên dữ liệu.

**Tiêu chí thành công**
- Mọi người lao động thật trong bản kết xuất đều có hồ sơ trên nền tảng, không ai bị ràng buộc kỹ thuật loại bỏ âm thầm.
- Chạy lại script không nhân bản dữ liệu.
- Số thẻ hết hạn / đảo ngày / trùng đếm được trên CSDL **khớp** số liệu đã ghi ở `DataModel.md` K5 — nếu lệch thì hoặc script sai, hoặc tài liệu sai, phải truy ra bên nào.
- Không có trường nhân thân nào lọt vào CSDL ngoài phạm vi §5 `DataModel.md`.

## 2. Quyết định của Văn phòng (31/08/2026)

Bốn điểm dưới đây **không** suy ra được từ dữ liệu; script chỉ thi hành:

| Vấn đề | Quyết định |
|---|---|
| 9 mã nhân sự dùng chung nhiều người, 5 bản ghi không có mã | Nhập hết, thêm hậu tố `#2`, `#3`… vào `legacyCode`; mã gốc thuộc về bản ghi xuất hiện trước |
| 12 bản ghi không phải người lao động | Loại khỏi đợt nhập, in danh sách để Văn phòng đối chiếu |
| CSDL đích | DB dev local trước, VPS sau khi đối chiếu số liệu |
| Phạm vi | `M03Employee` + `M03EmployeeField` + `M03InspectorCard`; hợp đồng chờ chốt K7 |

`recordStatus` của 27 người đã chấm dứt hợp đồng đặt `APPROVED` — **suy đoán**, vì ManLab gộp hai trục trạng thái nên thông tin đó không còn (K3). Căn cứ: họ đã làm việc thật và có hợp đồng, nên bản ghi hẳn đã qua duyệt.

## 3. Ánh xạ cột

| Trường M03 | Cột ManLab | Quy tắc |
|---|---|---|
| `legacyCode` | Mã nhân sự | Giữ nguyên chuỗi gốc kể cả khoảng trắng; trùng → `<mã>#n`; trống → `(chưa có mã)#n` |
| `code` | *(sinh)* | `NS-<năm vào làm>-<NNNN>`, tiếp nối số lớn nhất đang có theo từng năm |
| `fullName` | Họ và tên (người lao động) | Nguyên văn |
| `position` | Chức vụ (vị trí) | Trống → `Chưa xác định` |
| `department` | Bộ phận (Phòng/ Ban) | `CDHĐ` hoặc trống → khôi phục từ tiền tố mã (K1) |
| `status` | Trạng thái (NS) + Loại hợp đồng | `Chấm dứt HĐLĐ` → `DANGHIVIEC`; thử việc → `THUVIEC`; còn lại `CHINHTHUC` |
| `recordStatus` | Trạng thái (NS) | Nháp/Chờ duyệt/Đã duyệt/Không duyệt → DRAFT/PENDING_APPROVAL/APPROVED/REJECTED |
| `employmentType` | Loại hợp đồng | Thử việc→`THUVIEC`, Thực tập→`THUCTAP`, HĐ phổ thông/chuyên môn→`HDDV`, HĐLĐ→`CHINHTHUC`; trống → suy từ Nhóm nhân sự rồi tới Bộ phận |
| `hireDate` | Ngày bắt đầu (khởi tạo NS) | Trống → `Ngày khởi tạo (NS)` |
| `M03EmployeeField.field` | Lĩnh vực kiểm định (M4-TT24) | Tách `;`; `Không áp dụng`/`Không lĩnh vực` không sinh dòng nào |
| `M03InspectorCard` | Số thẻ / Số QĐ / Ngày QĐ / Ngày hết hạn | Nhập nguyên trạng, kể cả sai |

Bảng nhãn lĩnh vực lấy thẳng từ `src/lib/m03/labels.ts`, không chép lại — hai hệ chỉ khác nhau ở dấu gạch (`–` vs `-`) và `Hoá/Hóa`, chuẩn hoá bỏ đúng hai khác biệt đó.

**43 cột không nhập.** CCCD, nơi cấp, ngày sinh, giới tính, mã số thuế, mã BHXH, số tài khoản, lương, chỗ ở, biển số xe, người thân báo tin, ảnh, Facebook… Đây là quyết định đã ghi tại §5 `DataModel.md`, không phải thiếu sót của đợt nhập.

## 4. Nguyên tắc: không sửa dữ liệu nghiệp vụ

Script nhập nguyên trạng và **báo cáo**; nó không gia hạn thẻ, không đảo lại ngày, không gộp bản ghi trùng người. Lý do: sửa ở đường di trú thì bản trên nền tảng khác bản trên ManLab mà không ai ký nhận sự khác đó. Phát hiện thuộc về Văn phòng; `validateInspectorCard()` và `duplicateCardNumbers()` trong `rules.ts` là nơi hiển thị chúng ra giao diện.

## 5. Phát hiện mới trong lúc di trú

Ba điều dưới đây **chưa có** trong K1–K9, phát hiện khi đối chiếu từng dòng:

1. **Mã nhân sự ManLab không duy nhất.** K2 ngầm coi mã ManLab là định danh; thực tế 9 mã dùng chung (`CTV110` cho 6 bản ghi) và 5 bản ghi không có mã. Nếu K2 chốt "giữ mã ManLab làm `code`" thay vì `legacyCode` thì đã hỏng ngay lần nhập đầu.
2. **Số thẻ `3961` không phải trùng giữa hai người.** `DataModel.md` K5 ghi "trùng ở hai người và chưa biết bên nào sai". Đối chiếu lại: `Hoàng Kim Tùng` (CDHĐ01) và `Hoàng Kim Tùng (CTV)` (CTV18) **cùng ngày sinh 06/06/1989, cùng email, cùng số điện thoại** — một người, hai giai đoạn (nghỉ ETV rồi quay lại làm cộng tác viên qua EVTC). Chỗ sai thật nằm ở **ngày hết hạn**: cùng số thẻ, cùng ngày cấp, nhưng hai hạn khác nhau (27/09/2023 và 10/03/2023).
3. **Ba người mất hẳn phòng ban gốc.** K1 nói tiền tố mã còn giữ phòng ban của người đã nghỉ — đúng với 27/30 người. Ba người còn lại không suy được: một người mã chính là `CDHĐ01`, hai người không có mã.

## 6. Ngoài phạm vi

- Hợp đồng lao động / dịch vụ — chờ K7 (`M03ContractType` thiếu *có xác định thời hạn <36 tháng*).
- Pháp nhân (K6) — 18 đơn vị công tác chưa có chỗ chứa, cần FK `M34Party`, không nhập vào `department`.
- Vết audit (`M03AuditEntry`) — mỗi bản ghi cần `actorId` là một `User` thật; di trú không có người thao tác nên không sinh vết giả. Bằng chứng của đợt nhập là script + báo cáo này.
