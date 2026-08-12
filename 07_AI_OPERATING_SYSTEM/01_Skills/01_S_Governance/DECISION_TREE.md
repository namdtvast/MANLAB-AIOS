# DECISION TREE - Quản trị ManLab/ETV

```text
Yêu cầu có đủ dữ liệu?
├─ Không -> nêu giả định hoặc yêu cầu bổ sung tối thiểu
└─ Có
   ├─ Liên quan QMS? -> kiểm tra mã tài liệu, phiên bản, phê duyệt, hồ sơ
   ├─ Liên quan phần mềm? -> kiểm tra entity, trạng thái, quyền, audit log, API
   ├─ Liên quan pháp lý? -> yêu cầu căn cứ văn bản hiện hành
   └─ Liên quan DMC? -> kiểm tra dữ liệu nguồn, ký số, QR, hash, phiên bản
```
