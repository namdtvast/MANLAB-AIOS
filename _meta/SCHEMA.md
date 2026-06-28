# Lược đồ file Hub

## manifest.yaml (MPxx)
```yaml
schema: manlab-aios/process@1.0
code: MP21
name: Công bố, thông báo và kiểm soát năng lực hoạt động
owner: <chức danh chủ sở hữu quy trình>
status: active            # draft | active | retired
standards: [ISO17025]
legal: ["NĐ 36/2026", "NĐ 22/2026"]
capabilities: [CAP-10]
module: M21
```

## links.yaml (MPxx) — chỉ chứa đường dẫn, không copy nội dung
```yaml
procedure:  ../../03_MANAGEMENT_SYSTEM/ETV.QM
module:     ../../05_MODULE_LIBRARY/M21
forms:      ../../06_SHARED_RESOURCES/Forms
skill:      ../../07_AI_OPERATING_SYSTEM/Skills
law:        ../../08_KNOWLEDGE_GRAPH/Regulations
iso:        ../../03_MANAGEMENT_SYSTEM
evidence:   ../../11_COMPLIANCE/Evidence
```
