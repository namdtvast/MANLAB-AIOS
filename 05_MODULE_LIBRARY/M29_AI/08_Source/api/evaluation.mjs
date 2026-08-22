// AIOS Control Plane — thực thi Evaluation Case thật (Phase 2), làm nền cho Deployment Gate.
// Quy tắc đánh giá khớp đúng nội dung Prompt hiệu lực của Trợ lý AI (M29) đã seed:
// "chỉ gắn cờ cảnh báo khi z-score |>=2|" — Phase 1 chỉ có 1 rule này, đủ để Evaluation
// Run phản ánh thật sự PASS/FAIL thay vì luôn PASS như bản nháp trước.
function evaluateCase(input) {
  const z = input?.['z-score'];
  return typeof z === 'number' && Math.abs(z) >= 2 ? 'flag_warning' : 'no_flag';
}

export function runCases(cases) {
  const results = cases.map((c) => {
    const actual = evaluateCase(c.input);
    return { case_id: c.id, expected: c.expected, actual, pass: actual === c.expected };
  });
  const pass_count = results.filter((r) => r.pass).length;
  const fail_count = results.length - pass_count;
  return { results, pass_count, fail_count, status: results.length === 0 ? 'NO_CASES' : fail_count === 0 ? 'PASS' : 'FAIL' };
}
