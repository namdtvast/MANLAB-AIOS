# /ars-audit — Kiểm toán tính toàn vẹn

**Mục đích:** Rà soát citation, claim, dữ liệu và experiment provenance trước các cổng toàn vẹn.

**Khi dùng:** Trước Integrity Gate 1 (sau draft) và Integrity Gate 2 (trước nộp).

**Quy trình:**
1. Đối chiếu mọi claim quan trọng với evidence/experiment ID + locator trong `templates/CLAIM_EVIDENCE_LEDGER.csv`.
2. Quét định dạng trích dẫn: `scripts/check_citations.py <file_hoặc_thư_mục>`; kiểm nguồn nghi ngờ.
3. Rà soát provenance thí nghiệm theo `shared/experiment_provenance.md` và `templates/EXPERIMENT_PROVENANCE.md`.
4. Kiểm tính nhất quán dữ liệu; đánh dấu các failure mode ở `references/ai_research_failure_modes.md`.

**Agent:** `agents/14-integrity-auditor.md`, `agents/16-experiment-provenance-auditor.md`, `agents/23-claim-evidence-mapper.md`
**Workflow:** `workflows/14-integrity-audit.md`
**Đầu ra:** báo cáo kiểm toán, danh sách claim thiếu bằng chứng, cờ rủi ro toàn vẹn
**Quality gate:** G08 (Claim Support), G12 (Final Integrity)

**Nguyên tắc:** Không được PASS khi còn fabricated citation, unsupported major claim hoặc mâu thuẫn dữ liệu. `CONDITIONAL` chỉ dùng khi rủi ro còn lại được ghi rõ và có người chịu trách nhiệm.
