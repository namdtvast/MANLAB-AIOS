---
id: ETV.P.F14.01
title: "Phiếu đề nghị soát xét, sửa đổi văn bản — thống nhất ETV.P29 và ETV.P34 về dữ liệu mức Hạn chế"
type: Bieu-mau
process: MP14_TaiLieu
module: M14_TaiLieu
revision: "01"
effective_date: ""
status: Cho-phe-duyet
knowledge_category: HTQL-noi-bo
permission: Noi-bo
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
related_documents: [ETV.P14, ETV.P26, ETV.P28, ETV.P29, ETV.P34, ETV.GAI01]
---

# PHIẾU ĐỀ NGHỊ SOÁT XÉT, SỬA ĐỔI VĂN BẢN

Bản đã điền theo `ETV.P.F 14.01` (ETV.P14 §10.1 bước 1–2).

| Trường | Nội dung |
|---|---|
| Mã văn bản đề nghị | **ETV.P29** (Quản lý hệ thống trí tuệ nhân tạo) và **ETV.P34** (Quản lý dữ liệu số) |
| Loại văn bản | ☒ Thủ tục |
| Loại đề nghị | ☒ Soát xét/sửa đổi |
| Người đề nghị | Dương Thành Nam |
| Ngày đề nghị | 25/08/2026 |
| Trạng thái | Cả hai đang **Chờ soát xét**, chưa ban hành — sửa được, không phải ban hành lại |

---

## 1. LÝ DO — mâu thuẫn trực tiếp giữa hai bản dự thảo

Phát hiện khi soát xét `ETV.GAI 01` (Hướng dẫn Tích hợp máy chủ mô hình AI nội bộ):

| Văn bản | Trạng thái | Câu chữ trước khi sửa |
|---|---|---|
| **ETV.P29** mục 5.1.5 điểm 5 | Chờ soát xét | "Truy cập **hoặc** lập chỉ mục dữ liệu mức Hạn chế, Mật" — **Điều cấm tuyệt đối** |
| **ETV.P34** mục 6.8 | Chờ soát xét | "Dữ liệu mức **Hạn chế** chỉ được dùng trên nền tảng AI đã đăng ký và đã phê duyệt theo ETV.P35" — **cho phép có điều kiện** |

Một bên cấm, một bên cho phép. Mọi tài liệu cấp dưới không có căn cứ để viết.

---

## 2. CĂN CỨ QUYẾT ĐỊNH HƯỚNG XỬ LÝ — hai thủ tục đã ban hành

Trong nhóm bốn thủ tục liên quan, **hai thủ tục đã có hiệu lực** và không sửa trực tiếp được (ETV.P14):

| Văn bản | Trạng thái | Nội dung ràng buộc |
|---|---|---|
| **ETV.P26** mục 5.5 | **Đã ban hành** | Mục Hạn chế/Mật "**không bao giờ**" được đưa vào **chỉ mục AI** |
| **ETV.P28** mục 5.13 | **Đã ban hành** | "Trợ lý AI và các agent của Viện **chỉ được truy cập** nguồn dữ liệu ở mức **Công khai** và **Nội bộ**" |

**ETV.P28 mục 5.13 là điểm quyết định.** Nó cấm ở mức **truy cập**, không chỉ ở mức lập chỉ mục. Một bản dự thảo (ETV.P34) không thể nới rộng hơn một thủ tục đang có hiệu lực. Vì vậy câu cho phép tại ETV.P34 mục 6.8 là **sai so với hệ thống văn bản hiện hành**, không phải là một lựa chọn chính sách ngang hàng với ETV.P29.

---

## 3. NỘI DUNG ĐÃ SỬA

Nguyên tắc: **đưa bản dự thảo về khớp bộ văn bản đã ban hành. Không nới rộng phạm vi cho phép.**

| Hình thức | Công khai | Nội bộ | **Hạn chế** | **Mật** |
|---|---|---|---|---|
| Lập chỉ mục AI (RAG) | Được | Được | **Cấm** | **Cấm** |
| Đưa vào lời nhắc / truy xuất trực tiếp | Được | Được | **Cấm** | **Cấm** |
| Gửi ra dịch vụ mô hình bên ngoài | Được | Theo chính sách | **Cấm** | **Cấm** |

**ETV.P34 mục 6.8** — cắt câu cho phép; nêu rõ Hạn chế/Mật không đưa vào hệ thống AI dưới mọi hình thức; dẫn chiếu quy tắc gốc về ETV.P29 mục 5.5 thay vì quy định song song.

**ETV.P29** — dọn hai chỗ câu chữ lệch trong nội bộ, không đổi phạm vi:

- Mục **1.3.6** trước chỉ cấm *lập chỉ mục*, trong khi mục 5.1.5 cấm cả *truy cập* → nay nói cùng một điều.
- Mục **4.7** viết "không nhập dữ liệu mức Hạn chế, Mật… vào lời nhắc **khi không được phép**" — vế "khi không được phép" ngầm mở một ngoại lệ **không tồn tại ở bất kỳ mục nào** → bỏ, tách riêng phần dữ liệu cá nhân vốn thật sự có điều kiện.

**Không sửa ETV.P26 và ETV.P28** — đã ban hành, và câu chữ hiện tại đã đúng.

---

## 4. VẤN ĐỀ CÒN LẠI ĐỂ LĐV QUYẾT ĐỊNH RIÊNG

Việc sửa ở mục 3 **gỡ được mâu thuẫn**, nhưng để lại một câu hỏi nghiệp vụ chưa trả lời:

> Máy chủ mô hình AI nội bộ vừa đầu tư — nơi dữ liệu **không rời khỏi hạ tầng của Viện** — có nên được phép xử lý tài liệu mức **Hạn chế** hay không?

Lập luận của ETV.P28 mục 5.13 và ETV.P26 mục 5.5 được viết khi Viện **chưa có** năng lực suy luận nội bộ, tức khi mọi lượt gọi AI đều đồng nghĩa với gửi dữ liệu ra ngoài. Tiền đề đó nay đã thay đổi.

Nếu LĐV muốn cho phép, đây là **một đề nghị riêng**, không gộp vào phiếu này, và phải:

1. **Ban hành lại ETV.P28** (lần ban hành 02) sửa mục 5.13 — đây là thủ tục thuộc phạm vi ISO/IEC 27001, không sửa gọn được;
2. Phân định rõ **lập chỉ mục** (giữ cấm tuyệt đối, thống nhất ETV.P26) với **truy xuất trực tiếp theo từng lượt** (mở có điều kiện);
3. Đặt điều kiện tối thiểu: nền tảng nội bộ đã phê duyệt theo ETV.P35 · LĐV phê duyệt mục đích, có ý kiến PT.ATTT · AIA đã phê duyệt · nhật ký nền tảng không ghi nội dung lời nhắc · mọi lượt ghi `AIRequest`;
4. Có sẵn **kiểm soát kỹ thuật** trước khi bật: trần mức bảo mật **theo từng nền tảng** (hiện đang là biến toàn cục, nới lên sẽ nới cho **cả** dịch vụ bên ngoài) và phép thử nhật ký tại `ETV.GAI 01` Gate 3b.

Chưa có điểm 1 thì không có cơ sở làm điểm 2–4.

---

## 5. TÁC ĐỘNG THỰC TẾ CỦA VIỆC GIỮ NGUYÊN CẤM

Không lớn ở giai đoạn này. Trần đang fail-closed ở mức **Công khai** (12/1.865 đoạn trong chỉ mục). Việc cần làm trước mắt là nới lên mức **Nội bộ** cho nền tảng nội bộ — 1.865 đoạn, gần như toàn bộ giá trị — và việc đó **không** vướng mâu thuẫn nào, chỉ chờ kiểm soát kỹ thuật tại mục 4 điểm 4.

---

## 6. Ý KIẾN LĐP (thẩm định sự cần thiết)

☐ Không cần thiết — lý do: .....................

☐ Cần thiết — phân công:

| Vai trò | Người được phân công | Thời hạn hoàn thành |
|---|---|---|
| Người soạn thảo | | |
| Người soát xét | | |

Chữ ký LĐP: ..................... Ngày: .....................

## 7. KẾT QUẢ SOÁT XÉT

☐ Đạt → chuyển Chờ phê duyệt · ☐ Không đạt → **Không soát xét** (bắt buộc lý do): .....................

## 8. KẾT QUẢ PHÊ DUYỆT (LĐV)

☐ Phê duyệt nội dung sửa tại mục 3 · ☐ Không phê duyệt (bắt buộc lý do): .....................

Về mục 4 (cho phép mức Hạn chế trên nền tảng nội bộ): ☐ Lập đề nghị riêng, ban hành lại ETV.P28 · ☐ Không xem xét

Lần ban hành: ......... Ngày ban hành: ......... Chữ ký LĐV: .....................

---

*Bản dự thảo do AI hỗ trợ soạn theo ETV.P29 mục 1.3.1 — AI chỉ đề xuất, không tự quyết định.*
