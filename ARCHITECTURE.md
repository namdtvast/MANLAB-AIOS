# Kiến trúc MANLAB-AIOS

## Vì sao Capability là đơn vị gốc
Kiến trúc doanh nghiệp hiện đại (Microsoft, Amazon, SAP, Siemens) lấy **Business Capability** làm
đơn vị bất biến: năng lực ít thay đổi, còn quy trình/phần mềm/tổ chức thay đổi liên tục. Khi gắn
mọi thứ vào năng lực, hệ thống không bị "vỡ" mỗi lần đổi quy trình hay đổi phần mềm.

## Quan hệ các tầng
```
01_ENTERPRISE          Chiến lược, mô hình kinh doanh, lộ trình  (vì sao tồn tại)
        │
02_CAPABILITIES        Năng lực nghiệp vụ CAP-xx                 (làm được gì)   ← đơn vị gốc
        │
03_MANAGEMENT_SYSTEM   Chuẩn mực ISO + ETV.QM                    (theo luật chơi nào)
        │
04_PROCESS_LIBRARY     MP01–MP38 (Hub)                           (làm thế nào)
        │
05_MODULE_LIBRARY      M01–M38                                   (số hóa bằng gì)
        │
06_SHARED_RESOURCES    Biểu mẫu, master data, mô hình OCR        (dùng chung)
        │
07_AI_OPERATING_SYSTEM Skill, Agent, Harness, Memory, Guardrails (AI-native)
        │
08_KNOWLEDGE_GRAPH     ISO/ĐLVN/TCVN/ILAC, ontology, vector DB    (AI đọc ở đây)
        │
09_ENGINEERING         Backend/Frontend/API/DB/Test              (code)
        │
10_DEPLOYMENT          Docker/K8s/Cloud/Backup/DR                (vận hành)
        │
11_COMPLIANCE          ISO mapping, evidence, audit, CAPA, risk  (chứng minh tuân thủ)
        │
12_RESEARCH            KC4.0, DMC, OCR, paper, patent            (phát triển tương lai)
```

## Hub MPxx — manifest, không copy
Mỗi `04_PROCESS_LIBRARY/MPxx/` chỉ có 3 file:
- `README.md`   — mục đích, chủ sở hữu, điều khoản ISO, năng lực liên quan
- `manifest.yaml` — siêu dữ liệu có cấu trúc cho máy đọc
- `links.yaml`  — bản đồ liên kết tới các tầng khác (đường dẫn tương đối)

## Digital Thread
Chuỗi số xuyên suốt vòng đời một dịch vụ, ví dụ MP21 — Công bố năng lực:
```
Yêu cầu KH → Hợp đồng → Kế hoạch → Hiện trường → Hiệu chuẩn → Kết quả →
Thẩm tra → Phê duyệt → DCC/DVC/DTC → Khách hàng → Hồ sơ lưu → Audit
```
Mỗi mắt xích trỏ tới MP, M, biểu mẫu, bằng chứng, điều khoản ISO, pháp luật và AI Agent.
Định nghĩa thread đặt tại `04_PROCESS_LIBRARY/_DIGITAL_THREADS/*.yaml`.

## Quy ước mã
- `CAP-xx` Năng lực · `MPxx` Quy trình · `Mxx` Module · `F-xxx` Biểu mẫu ·
  `EV-xxx` Bằng chứng · `SK-xxx` Skill · `AG-xxx` Agent · `DT-xx` Digital Thread.
- `Mxx` số hóa `MPxx` theo quan hệ 1–1.
