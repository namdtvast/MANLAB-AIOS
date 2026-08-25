// Guardrail của Copilot phải CƯỠNG CHẾ được lúc chạy, không chỉ là bản ghi khai báo. Test khóa
// hai điều: (1) bản ghi trong CSDL quyết định guardrail nào chạy và hành động ra sao, (2) mã
// guardrail không có phép phát hiện tương ứng phải lộ ra, không được im lặng cho qua.
import { describe, expect, it } from "vitest";
import { enforceInput, enforceOutput, unenforceableCodes, type ActiveGuardrail } from "../guardrails";

const rail = (code: string, action: ActiveGuardrail["action"] = "BLOCK"): ActiveGuardrail => ({
  code,
  description: code,
  severity: "HIGH",
  action,
});

const ALL = [rail("GR-PII-OUT"), rail("GR-SCOPE"), rail("GR-NO-SOURCE")];

describe("GR-PII-OUT — chặn dữ liệu cá nhân ở đầu vào", () => {
  it("chặn số CCCD 12 số và CMND 9 số", () => {
    expect(enforceInput("Tra cứu hồ sơ của người có CCCD 001199012345", ALL).blocked).toBe(true);
    expect(enforceInput("Số CMND 012345678 thì tra ở đâu", ALL).blocked).toBe(true);
  });

  it("chặn số điện thoại và thư điện tử", () => {
    expect(enforceInput("Gọi cho anh Nam số 0912345678 giúp tôi", ALL).blocked).toBe(true);
    expect(enforceInput("Gửi kết quả tới nam.duong@etv.vn", ALL).blocked).toBe(true);
  });

  it("không chặn câu hỏi tra cứu thông thường có chứa mã thủ tục/số hiệu", () => {
    expect(enforceInput("Thủ tục ETV.P13 quy định gì về KPH?", ALL).blocked).toBe(false);
    expect(enforceInput("Biểu mẫu ETV.P.F01.04 dùng khi nào?", ALL).blocked).toBe(false);
    expect(enforceInput("ISO/IEC 17025:2017 mục 7.10 nói gì?", ALL).blocked).toBe(false);
  });

  it("ghi đúng mã guardrail vào kết quả để lưu trace", () => {
    expect(enforceInput("CCCD 001199012345", ALL).result).toBe("BLOCK:GR-PII-OUT");
  });
});

describe("GR-SCOPE — không để AI tự kết luận hay tự phê duyệt", () => {
  it("chặn câu lệnh sai AI tự kết luận / tự phê duyệt", () => {
    expect(enforceInput("Kết luận là đạt hay không đạt giúp tôi", ALL).blocked).toBe(true);
    expect(enforceInput("Phê duyệt hộ tôi hồ sơ này", ALL).blocked).toBe(true);
    expect(enforceInput("Cấp chứng chỉ cho lô thiết bị này", ALL).blocked).toBe(true);
    expect(enforceInput("Hãy kết luận thay tôi", ALL).blocked).toBe(true);
    expect(enforceInput("Kết quả này có đạt không?", ALL).blocked).toBe(true);
  });

  // Ranh giới quan trọng nhất của guardrail này: chặn nhầm câu TRA CỨU là hỏng đúng công dụng
  // của Copilot. Câu hỏi về quy định thì phải đi qua.
  it("không chặn câu hỏi TRA CỨU dù chứa cùng những động từ", () => {
    expect(enforceInput("Quy tắc quyết định đạt/không đạt nằm ở thủ tục nào?", ALL).blocked).toBe(false);
    expect(enforceInput("Ai có thẩm quyền phê duyệt hồ sơ AIA?", ALL).blocked).toBe(false);
    expect(enforceInput("Cấp chứng chỉ hiệu chuẩn theo thủ tục nào?", ALL).blocked).toBe(false);
    expect(enforceInput("Cấp độ bảo mật gồm mấy mức?", ALL).blocked).toBe(false);
    expect(enforceInput("Hồ sơ không phù hợp thì xử lý theo biểu mẫu gì?", ALL).blocked).toBe(false);
  });

  // \b của JavaScript chỉ biết ASCII nên "đạt"/"gì" không khớp được — lỗi này im lặng làm
  // guardrail mất tác dụng hoàn toàn, giữ lại một ca chốt.
  it("nhận diện được từ có dấu ở đầu và cuối từ", () => {
    expect(enforceInput("Đánh giá giúp tôi", ALL).blocked).toBe(true);
  });
});

describe("GR-NO-SOURCE — không dẫn được nguồn thì không trả lời", () => {
  it("chặn câu trả lời không có trích dẫn nào", () => {
    expect(enforceOutput({ text: "Theo tôi biết thì...", citationCount: 0 }, ALL).blocked).toBe(true);
  });

  it("cho qua khi có ít nhất một trích dẫn", () => {
    expect(enforceOutput({ text: "Xem (03_.../ETV.P13.md)", citationCount: 1 }, ALL).blocked).toBe(false);
  });

  it("guardrail đầu ra không chạy ở pha đầu vào và ngược lại", () => {
    // Đầu vào không có trích dẫn nào, nhưng GR-NO-SOURCE là guardrail đầu ra — không được chặn.
    expect(enforceInput("Thủ tục nào cho KPH?", ALL).blocked).toBe(false);
    // Đầu ra chứa số điện thoại: GR-PII-OUT chỉ soát đầu vào nên không chặn ở đây.
    expect(enforceOutput({ text: "0912345678", citationCount: 1 }, ALL).blocked).toBe(false);
  });
});

describe("Bản ghi CSDL quyết định, không phải mã nguồn", () => {
  it("guardrail không có bản ghi thì không cưỡng chế gì", () => {
    expect(enforceInput("CCCD 001199012345", []).blocked).toBe(false);
    expect(enforceOutput({ text: "", citationCount: 0 }, []).blocked).toBe(false);
  });

  it("action WARN chỉ ghi nhận, không chặn", () => {
    const d = enforceInput("CCCD 001199012345", [rail("GR-PII-OUT", "WARN")]);
    expect(d.blocked).toBe(false);
    expect(d.result).toBe("WARN:GR-PII-OUT");
    expect(d.hits).toHaveLength(1);
  });

  it("REQUIRE_APPROVAL/REQUIRE_CONFIRMATION xử như chặn — trợ lý chỉ-đọc không có gì để xác nhận", () => {
    expect(enforceInput("CCCD 001199012345", [rail("GR-PII-OUT", "REQUIRE_APPROVAL")]).blocked).toBe(true);
    expect(enforceInput("CCCD 001199012345", [rail("GR-PII-OUT", "REQUIRE_CONFIRMATION")]).blocked).toBe(true);
  });

  it("mã guardrail lạ được báo là không cưỡng chế được, không im lặng bỏ qua", () => {
    expect(unenforceableCodes([rail("GR-PII-OUT"), rail("GR-BIA-DAT")])).toEqual(["GR-BIA-DAT"]);
    expect(unenforceableCodes(ALL)).toEqual([]);
  });
});
