# 03_S_NghienCuuHocThuat — MANLAB Academic ResearchOS

**Phiên bản 3.0.1 — dùng trực tiếp trong Claude Code.**
*(Nguồn gốc: `07-repo-manLab-AcademicResearchOS`.)*

Hệ điều hành kỹ năng chỉ dành cho nghiên cứu học thuật: từ ý tưởng, đề xuất/thuyết minh đề tài, chuyên đề và báo cáo đến bài báo, luận văn/luận án, phản biện và đóng gói tái lập.

## Điểm khác biệt

- Bước 0 bắt buộc chọn loại hồ sơ học thuật trước khi khai báo.
- Mỗi câu hỏi đều có gợi ý, mẫu trả lời và ví dụ; tối đa 3 câu/lượt.
- 24 agent, nhiều workflow theo loại hồ sơ và 15 quality gate.
- Human-in-the-loop; AI không tự quyết định câu hỏi, phương pháp hoặc kết luận.
- Claim–Evidence Ledger, citation locator, Material Passport và Experiment Provenance.
- Reviewer chỉ đọc, Revision Traceability Matrix và Score Trajectory.
- Reproducibility Lock mô tả cấu hình tái lập.
- Hồ sơ riêng cho đề tài cấp Quốc gia, Bộ/ngành/địa phương, VAST và NAFOSTED.

## Nguồn kiến trúc

Repo có tham khảo và tái triển khai các mẫu kiến trúc từ `Imbad0202/academic-research-skills` v3.17.0, giấy phép CC BY-NC 4.0. Xem `ATTRIBUTION.md` để biết phần kế thừa và phần viết mới.

## Vị trí trong MANLAB-AIOS

Skill này được lưu tại `07_AI_OPERATING_SYSTEM/01_Skills/03_S_NghienCuuHocThuat/`
(Mẫu B — năng lực dùng chung, không gắn thủ tục `ETV.P{N}`). Sản phẩm nghiên cứu
do skill sinh ra (đề xuất, thuyết minh, paper, báo cáo) lưu ở `12_RESEARCH/`.
Repo không giữ `.git` riêng; việc version hóa do repo MANLAB-AIOS đảm nhiệm.

## Cài đặt / kích hoạt

Cách 1 — dùng như skill Claude Code (nhận diện qua `SKILL.md`):

```bash
cp -R 03_S_NghienCuuHocThuat ~/.claude/skills/
```

Cách 2 — chạy trực tiếp trong thư mục skill (không cần cài), dùng các script Python
và lệnh bắt đầu bên dưới.

## Lệnh bắt đầu

```text
Khởi tạo một hồ sơ nghiên cứu học thuật mới theo MANLAB Academic ResearchOS. Trước tiên hãy cho tôi chọn loại hồ sơ. Sau khi tôi xác nhận, mới hỏi thông tin khai báo; mỗi lượt tối đa 3 câu và mỗi câu phải có gợi ý trả lời.
```

## Kiểm tra

```bash
python scripts/check_repo.py              # kiểm tra cấu trúc repo (kỳ vọng: PASS)
python scripts/check_citations.py .       # quét định dạng DOI toàn thư mục
```

## Giấy phép & sử dụng thương mại — CẦN LƯU Ý

Repo phát hành theo **CC BY-NC 4.0 (phi thương mại)** và **kế thừa điều khoản NC**
từ tác phẩm gốc `Imbad0202/academic-research-skills` (xem `ATTRIBUTION.md`).

- ✅ Được dùng cho nghiên cứu, đào tạo, mục đích nội bộ phi lợi nhuận.
- ⚠️ **KHÔNG** được dùng trong dịch vụ/sản phẩm thương mại có thu phí nếu chưa xử lý
  ràng buộc NC.
- Muốn dùng thương mại: (a) xin phép/thỏa thuận license với tác giả gốc, hoặc
  (b) thay thế hoàn toàn phần kiến trúc kế thừa bằng nội dung tự viết rồi phát hành
  lại theo giấy phép phù hợp.

Đây là điểm cần cân nhắc vì ETV/ManLab có hoạt động dịch vụ có thu phí.
