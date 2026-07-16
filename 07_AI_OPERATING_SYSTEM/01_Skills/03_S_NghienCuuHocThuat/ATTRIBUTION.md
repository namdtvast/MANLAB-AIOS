# Ghi công và nguồn cảm hứng

Repo này được thiết kế riêng cho MANLAB và nghiên cứu học thuật tại Việt Nam. Kiến trúc có tham khảo các ý tưởng công khai từ:

- **Imbad0202/academic-research-skills**, phiên bản được khảo sát: v3.17.0.
- DOI của dự án gốc: **10.5281/zenodo.20696614**.
- Giấy phép dự án gốc: **CC BY-NC 4.0**.

## Những ý tưởng được tái triển khai

Không sao chép nguyên văn các prompt hoặc agent của dự án gốc. Repo MANLAB tái thiết kế bằng tiếng Việt các mẫu kiến trúc sau:

1. Phân tách thành Deep Research, Academic Writing, Peer Review và Pipeline Orchestrator.
2. Human-in-the-loop: AI hỗ trợ, nhà nghiên cứu quyết định.
3. Quy trình nhiều giai đoạn có cổng kiểm soát trước khi chuyển pha.
4. Material Passport để truy vết nguồn, dữ liệu, thí nghiệm và sản phẩm.
5. Claim–Evidence Ledger và kiểm toán mức độ hỗ trợ của trích dẫn.
6. Experiment Provenance Intake cho thí nghiệm được thực hiện bên ngoài AI.
7. Reviewer ở chế độ chỉ đọc; không tự sửa bản thảo khi đang phản biện.
8. Handoff schema giữa các agent và nhật ký quyết định.
9. Score trajectory để theo dõi chất lượng qua các vòng sửa.
10. Reproducibility lock mô tả cấu hình tái lập, không cam kết đầu ra LLM giống từng byte.

## Những phần viết mới cho MANLAB

- Bước 0 chọn loại hồ sơ học thuật trước khi khai báo.
- Bộ câu hỏi có gợi ý trả lời bằng tiếng Việt.
- Workflow riêng cho đề tài cấp Quốc gia, Bộ/ngành/địa phương, VAST và NAFOSTED.
- Chuyên đề, báo cáo khoa học, báo cáo tổng kết và nghiệm thu.
- Tích hợp yêu cầu đo lường, liên kết chuẩn, độ không đảm bảo đo, QA/QC và quan trắc môi trường.
- Agent chuyên ngành thủy sản, bệnh tôm, AI/OCR/IoT và đo lường.

Khi phân phối hoặc chuyển thể repo này, phải giữ tệp `ATTRIBUTION.md` và tuân thủ CC BY-NC 4.0.
