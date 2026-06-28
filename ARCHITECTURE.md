# Kiến trúc MANLAB-AIOS v4.1

Capability là đơn vị bất biến (Microsoft/Amazon/SAP/Siemens): năng lực ít đổi, còn quy trình/phần mềm/tổ chức đổi liên tục.

```
01_ENTERPRISE → 02_CAPABILITIES → 03_MANAGEMENT_SYSTEM → 04_PROCESS_LIBRARY →
05_MODULE_LIBRARY → 06_SHARED_RESOURCES → 07_AI_OPERATING_SYSTEM → 08_KNOWLEDGE_GRAPH →
09_ENGINEERING → 10_DEPLOYMENT → 11_COMPLIANCE → 12_RESEARCH   (+ Digital Thread xuyên suốt)
```

5 lớp logic: Capability(02) → Process(04) → Application(05) → AI(07) → Compliance(11).

Đặt tên: `MPxx_Slug` quy trình · `Mxx_Slug` module (số hóa MPxx 1–1) · `CAP-xx_Slug` năng lực.
Thư mục con đánh số `01_..` theo thứ tự logic.
