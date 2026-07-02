# Template — Biểu mẫu

> Nhóm 2 — thể thức ETV tự quy định. Mã hoá: `ETV.P.F xx.yy` (biểu mẫu của thủ tục) hoặc `ETV.MCa.F xx.yy`/`ETV.Gb.F xx.yy` (biểu mẫu của quy trình/hướng dẫn). Xem các ví dụ thực tế tại `06_SHARED_RESOURCES/01_Forms/`.

```yaml
id: ""            # ETV.P.F xx.yy
title: ""
type: Bieu-mau
owner: ""
department: ""
process: ""
revision: "01"     # tăng khi có soát xét — không nhất thiết trùng lần BH của thủ tục cha
status: Nhap
knowledge_category: Noi-bo
permission: ""
retention: ""
source: "ETV"
```

---

# ETV.P.F xx.yy — TÊN BIỂU MẪU

*(Bảng/trường dữ liệu cần thu thập — thiết kế theo đúng nhu cầu nghiệp vụ, không thêm trường không dùng đến)*

| Trường | Nội dung |
|---|---|
| | |

Footer: mã số | lần/ngày soát xét gần nhất.

## Checklist trước khi ban hành biểu mẫu
Xem `validation/checklist_template.md`.

## Nguyên tắc thiết kế biểu mẫu mới
1. Kiểm tra `06_SHARED_RESOURCES/01_Forms/` trước — không tạo biểu mẫu trùng chức năng.
2. Biểu mẫu phải map được vào metadata schema (`knowledge/04_metadata_schema.md`) nếu dữ liệu cần đưa vào ManLab.
