# Definition of Done

Task chỉ được coi là hoàn tất khi mọi mục áp dụng được thỏa mãn:

- [ ] Outcome đạt được.
- [ ] Acceptance Criteria thỏa mãn.
- [ ] Business Rules thỏa mãn.
- [ ] Build thành công.
- [ ] Test áp dụng được đã chạy và pass.
- [ ] Access-control check thỏa mãn (nếu áp dụng).
- [ ] Data-integrity check thỏa mãn (nếu áp dụng).
- [ ] Security check thỏa mãn ([security-checklist.md](security-checklist.md)).
- [ ] Diff đã được review (chỉ file dự kiến, không secret, không debug code).
- [ ] Không có file không liên quan bị thay đổi.
- [ ] API/OpenAPI documentation đồng bộ (nếu có thay đổi API).
- [ ] Artifact đặc tả đã được cập nhật (Tier M/L — xem `SKILL.md` mục 10).
- [ ] Không còn issue `HIGH`/`CRITICAL` chưa xử lý.
- [ ] Có phương án rollback khi cần (Tier M/L, đặc biệt Tier L).
- [ ] **Riêng MANLAB-AIOS:** `python3 _meta/validate_links.py` chạy PASS nếu đụng Hub/module/capability.
- [ ] **Riêng MANLAB-AIOS:** không tự đổi mã `CAP-xx`/`MPxx`/`Mxx`; không sửa trực tiếp tài liệu `doc_status: issued`.

Điều gì chưa được verify phải được báo cáo rõ ràng là chưa verify (`NOT RUN`/`BLOCKED`) — không quy tròn thành đã xong.
