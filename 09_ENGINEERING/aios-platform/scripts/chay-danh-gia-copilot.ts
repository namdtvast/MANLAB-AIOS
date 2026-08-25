// Chạy bộ 30 câu hỏi vàng của Copilot tra cứu — Increment 5, spec §11.
//
// BA CHẾ ĐỘ, cố ý tách rời vì chúng chứng minh những thứ khác nhau:
//
//   --kiem-nguon    Kiểm mọi "nguồn kỳ vọng" có thật trong chỉ mục. Không gọi mô hình, không ghi
//                   gì. Chạy trước tiên: nguồn kỳ vọng sai thì cả bộ đánh giá vô nghĩa.
//
//   --chi-truy-hoi  Đo TRUY HỒI: nguồn kỳ vọng có nằm trong các đoạn được lấy ra hay không.
//                   Không gọi mô hình, KHÔNG ghi AIEvaluationRun. Đây là điều kiện CẦN — truy hồi
//                   không lấy được đoạn đúng thì mô hình không có cách nào dẫn đúng nguồn. Đạt ở
//                   chế độ này KHÔNG có nghĩa bộ đánh giá đạt.
//
//   (mặc định)      Chạy thật qua gateway.chat(): gọi mô hình, chấm hành vi, ghi AIEvaluationRun.
//                   Cần ANTHROPIC_API_KEY. Đây là chế độ duy nhất kết luận được đạt/không đạt.
//
// Vì sao ghi AIEvaluationRun lại quan trọng: deploymentGate() đọc lần chạy GẦN NHẤT — chạy thật mà
// trượt là khoá luôn việc kích hoạt PromptVersion mới cho Copilot. Đó là chủ đích, không phải tác
// dụng phụ.
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { BO_CAU_HOI, CAU_HOI_THAT, DUONG_DAN_MOI_TIEM_LENH, NOI_DUNG_TAI_LIEU_MOI, TAT_CA_CA } from "../src/lib/m29/copilot/bo-cau-hoi-vang";
import { normalize } from "../src/lib/m29/copilot/text";
import { mucBaoMatToiDa } from "../src/lib/m29/copilot/retrieval";
import type { AIDataBoundary } from "../src/generated/prisma/enums";
import { chamCa, laLoiHaTang, renderPhieuF2903, tongHop, type KetQuaCham } from "../src/lib/m29/copilot/danh-gia";

const SCRIPT_DIR = fileURLToPath(new URL(".", import.meta.url));

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }) });

const cheDo = process.argv.includes("--kiem-nguon") ? "kiem-nguon" : process.argv.includes("--chi-truy-hoi") ? "chi-truy-hoi" : "day-du";

const pct = (x: number) => `${(x * 100).toFixed(1)}%`;

/** Mọi nguồn kỳ vọng phải là đường dẫn có thật trong chỉ mục. */
async function kiemNguon(): Promise<number> {
  const canKiem = [...new Set(CAU_HOI_THAT.flatMap((c) => c.nguonKyVong ?? []))].sort();
  const coThat = new Set(
    (await prisma.copilotDocChunk.findMany({ where: { path: { in: canKiem } }, select: { path: true }, distinct: ["path"] })).map((r) => r.path)
  );
  const thieu = canKiem.filter((p) => !coThat.has(p));
  console.log(`Kiểm ${canKiem.length} đường dẫn nguồn kỳ vọng của ${CAU_HOI_THAT.length} câu hỏi thật:`);
  console.log(`  ${coThat.size} có trong chỉ mục · ${thieu.length} KHÔNG có`);
  for (const p of thieu) {
    const ca = CAU_HOI_THAT.filter((c) => (c.nguonKyVong ?? []).includes(p)).map((c) => c.ma);
    console.log(`  ✗ ${p}   (ca ${ca.join(", ")})`);
  }
  // Câu hỏi chỉ hỏng khi KHÔNG CÒN nguồn kỳ vọng nào tồn tại — nhiều câu khai vài nguồn thay thế.
  const caHong = CAU_HOI_THAT.filter((c) => !(c.nguonKyVong ?? []).some((p) => coThat.has(p)));
  console.log(caHong.length ? `\n${caHong.length} CÂU KHÔNG CÒN NGUỒN NÀO TỒN TẠI: ${caHong.map((c) => c.ma).join(", ")}` : "\nMọi câu hỏi thật đều còn ít nhất một nguồn kỳ vọng có thật.");
  return caHong.length;
}

/** Truy hồi có lấy được đoạn thuộc nguồn kỳ vọng không (recall@k). Điều kiện CẦN, không phải đủ. */
/** Ranh giới dữ liệu của nền tảng đang phục vụ Copilot — quyết định trần mức bảo mật. */
async function ranhGioiCuaCopilot(): Promise<AIDataBoundary> {
  const agent = await prisma.aIAgent.findUnique({
    where: { code: "AGENT_COPILOT_TRACUU" },
    select: { platform: { select: { dataBoundary: true } } },
  });
  return agent?.platform.dataBoundary ?? "EXTERNAL_NO_COMMITMENT";
}

async function chiTruyHoi(): Promise<number> {
  const { retrieve } = await import("../src/lib/m29/copilot/retrieval");
  const ranhGioi = await ranhGioiCuaCopilot();
  let dat = 0;
  let tongSoTaiLieu = 0;
  console.log(`Truy hồi ${CAU_HOI_THAT.length} câu hỏi thật (không gọi mô hình) · trần "${mucBaoMatToiDa(ranhGioi)}":\n`);
  for (const ca of CAU_HOI_THAT) {
    const doan = await retrieve(ca.cauHoi, ranhGioi);
    const lay = doan.map((d) => d.path);
    const trung = (ca.nguonKyVong ?? []).filter((p) => lay.includes(p));
    const ok = trung.length > 0;
    if (ok) dat++;
    const hang = ok ? lay.indexOf(trung[0]) + 1 : 0;
    // Số TÀI LIỆU riêng biệt trong ngữ cảnh: 6 đoạn dồn vào 1-2 tài liệu nghĩa là ngữ cảnh hẹp,
    // mô hình chỉ được nhìn 1-2 nguồn dù chỉ mục có nguồn tốt hơn ở hạng 7-8.
    const soTaiLieu = new Set(lay).size;
    tongSoTaiLieu += soTaiLieu;
    console.log(`${ok ? "✓" : "✗"} ${ca.ma}  ${ok ? `hạng ${hang}` : "KHÔNG lấy được nguồn kỳ vọng"} · ${lay.length} đoạn / ${soTaiLieu} tài liệu`);
    console.log(`   ${ca.cauHoi}`);
    if (!ok) console.log(`   kỳ vọng: ${(ca.nguonKyVong ?? []).join(" | ")}\n   lấy về : ${lay.join(" | ") || "(rỗng)"}`);
  }
  console.log(`\nTruy hồi lấy đúng nguồn: ${dat}/${CAU_HOI_THAT.length} = ${pct(dat / CAU_HOI_THAT.length)}`);
  console.log(`Số tài liệu riêng biệt trung bình trong ngữ cảnh: ${(tongSoTaiLieu / CAU_HOI_THAT.length).toFixed(2)}`);
  console.log("ĐÂY KHÔNG PHẢI KẾT QUẢ ĐÁNH GIÁ — mới là điều kiện cần. Chạy không kèm cờ để đánh giá thật.");
  return CAU_HOI_THAT.length - dat;
}

/** Chạy thật qua Tool Gateway, xuất bản nháp F29.03 và ghi AIEvaluationRun. */
async function dayDu(): Promise<number> {
  const { chat, callTool, COPILOT_AGENT_CODE } = await import("../src/lib/m29/gateway");
  const suite = await prisma.aIEvaluationSuite.findFirst({ where: { name: { contains: "Copilot tra cứu v1" } } });
  if (!suite) {
    console.error(`Chưa có bộ "${BO_CAU_HOI.ten}" trong CSDL. Chạy: npx prisma db seed`);
    return 1;
  }
  const agent = await prisma.aIAgent.findUnique({ where: { code: COPILOT_AGENT_CODE }, select: { id: true, activePromptVersionId: true, model: { select: { modelId: true } } } });
  if (!agent) {
    console.error("Chưa khai Agent Copilot trong danh mục M29.");
    return 1;
  }
  const toolThu = await prisma.aITool.findFirst({ select: { id: true } });

  const ketQua: KetQuaCham[] = [];
  const loiHaTang: string[] = [];
  // Người chạy đánh giá là hệ thống, không phải một cán bộ — userRef ghi rõ để đọc trace không
  // nhầm các lượt này với lượt hỏi thật của người dùng.
  const user = { id: `EVAL:${suite.id}` };

  // Tài liệu mồi cho kiểm thử tiêm lệnh: chèn trước, xoá trong finally. Xoá cả ở đầu để một lượt
  // chạy trước bị ngắt giữa chừng không để lại rác trong chỉ mục.
  const xoaTaiLieuMoi = () => prisma.copilotDocChunk.deleteMany({ where: { path: DUONG_DAN_MOI_TIEM_LENH } });
  await xoaTaiLieuMoi();

  try {
    if (TAT_CA_CA.some((c) => c.dungTaiLieuMoi)) {
      await prisma.copilotDocChunk.create({
        data: {
          path: DUONG_DAN_MOI_TIEM_LENH,
          title: "Quy định đăng ký thiết bị đo lường mới (TÀI LIỆU MỒI KIỂM THỬ)",
          heading: "Đăng ký thiết bị",
          docClass: "KIEM_THU",
          securityLevel: mucBaoMatToiDa(await ranhGioiCuaCopilot()),
          approvalRef: "tài liệu mồi, chỉ tồn tại trong lượt chạy đánh giá",
          content: NOI_DUNG_TAI_LIEU_MOI,
          searchTitle: normalize("Quy định đăng ký thiết bị đo lường mới"),
          searchText: normalize(NOI_DUNG_TAI_LIEU_MOI),
        },
      });
      await prisma.$executeRawUnsafe(
        `UPDATE "CopilotDocChunk" SET "tsv" = setweight(to_tsvector('simple', "searchTitle"), 'A') || setweight(to_tsvector('simple', "searchText"), 'D') WHERE "path" = $1`,
        DUONG_DAN_MOI_TIEM_LENH
      );
      console.log(`Đã chèn tài liệu mồi ${DUONG_DAN_MOI_TIEM_LENH} cho kiểm thử tiêm lệnh (sẽ xoá khi xong).\n`);
    }

    for (const ca of TAT_CA_CA) {
      if (ca.phepThu === "goi-cong-cu") {
        if (!toolThu) {
          loiHaTang.push(`${ca.ma}: KHONG_CO_TOOL_DE_THU`);
          continue;
        }
        const r = await callTool({
          toolId: toolThu.id,
          agentId: ca.ma === "QUYEN-02" ? undefined : agent.id,
          input: {},
          user: { id: user.id, role: "SUPER_ADMIN" },
        });
        const cham = chamCa(ca, { loai: "goi-cong-cu", goi: { ok: r.ok, code: r.ok ? null : r.code } });
        ketQua.push(cham);
        console.log(`${cham.dat ? "✓" : "✗"} ${cham.ma} [${cham.hanhVi}] ${cham.ghiChu}`);
        continue;
      }

      const soLan = ca.phepThu === "lap-lai" ? (ca.soLanLap ?? 3) : 1;
      const luot = [];
      let hong = false;
      for (let i = 0; i < soLan; i++) {
        const r = await chat({ question: ca.cauHoi, history: [], user });
        const kq = { answer: r.answer, citations: r.citations, code: r.code };
        if (laLoiHaTang(kq)) {
          loiHaTang.push(`${ca.ma}: ${r.code}`);
          console.log(`! ${ca.ma}  LỖI HẠ TẦNG ${r.code} — ${r.answer}`);
          hong = true;
          break;
        }
        luot.push(kq);
      }
      if (hong) continue;

      const cham = chamCa(ca, ca.phepThu === "lap-lai" ? { loai: "lap-lai", luot } : { loai: "hoi", luot: luot[0] });
      ketQua.push(cham);
      console.log(`${cham.dat ? "✓" : "✗"} ${cham.ma} [${cham.hanhVi}] ${cham.ghiChu}`);
    }
  } finally {
    await xoaTaiLieuMoi();
  }

  if (loiHaTang.length) {
    console.error(`\nHUỶ LƯỢT ĐÁNH GIÁ: ${loiHaTang.length}/${TAT_CA_CA.length} ca gặp lỗi hạ tầng — ${loiHaTang.join("; ")}`);
    console.error("Không ghi AIEvaluationRun: một sự cố hạ tầng không được phép hoá trang thành kết quả đánh giá.");
    return 1;
  }

  const th = tongHop(ketQua);
  console.log("\nKết quả theo nhóm kiểm thử của ETV.P.F29.03:");
  for (const d of th.theoNhom)
    console.log(
      `  ${d.nhom}. ${d.soDat}/${d.soTinhHuong} (${pct(d.tiLe)}) · ngưỡng ${pct(d.nguong)} · ${d.datNguong ? "đạt ngưỡng" : "CHƯA đạt"}${d.batBuocDat ? " · BẮT BUỘC ĐẠT" : ""} — ${d.ten}`
    );

  // KHÔNG in "Đạt/Không đạt": F29.03 giao việc kết luận cho người ký (ETV.P29 §4.8).
  console.log(
    `\nĐo được: ${th.soDat}/${th.soCa} tình huống đạt · các nhóm bắt buộc ${th.dungMoiNguongBatBuoc ? "ĐỀU đạt ngưỡng" : "CÓ NHÓM CHƯA đạt ngưỡng"}.`
  );
  console.log("Kết luận Đạt/Không đạt KHÔNG do phần mềm ghi — người thực hiện và người soát xét điền vào phiếu F29.03.");

  const duongDanPhieu = ghiPhieuF2903(
    renderPhieuF2903(th, ketQua, { modelId: agent.model?.modelId ?? "—", promptVersionId: agent.activePromptVersionId ?? "—" })
  );
  console.log(`Đã xuất bản nháp phiếu: ${duongDanPhieu}`);

  // Lượt chạy dưới TRẦN THU HẸP không phải một lượt đánh giá hợp lệ: ETV.P29 §5.3.1 đánh giá hệ
  // thống ĐÚNG NHƯ NÓ SẼ VẬN HÀNH. Chạy trên 12 đoạn Công khai rồi ghi thành hồ sơ đánh giá là
  // ghi một hồ sơ nói về một hệ thống khác. Không ghi run — nói thẳng lý do.
  const ranhGioi = await ranhGioiCuaCopilot();
  if (mucBaoMatToiDa(ranhGioi) !== "Noi-bo") {
    console.error(
      `\nKHÔNG ghi AIEvaluationRun: đang chạy dưới trần mức bảo mật "${mucBaoMatToiDa(ranhGioi)}" (ETV.P29 §5.5 — nhà cung cấp` +
        " chưa bảo đảm điều khoản không dùng dữ liệu để huấn luyện lại). Kết quả trên đây chỉ chứng minh đường dây kỹ thuật," +
        " KHÔNG phải hồ sơ đánh giá chất lượng theo §5.3.1."
    );
    return 1;
  }

  await prisma.aIEvaluationRun.create({
    data: {
      suiteId: suite.id,
      passCount: th.soDat,
      failCount: th.soCa - th.soDat,
      // CHO_KET_LUAN, không phải PASS/FAIL: cổng triển khai chỉ mở khi có người ghi kết luận Đạt.
      status: "CHO_KET_LUAN",
    },
  });
  console.log("Đã ghi AIEvaluationRun ở trạng thái CHO_KET_LUAN — cổng triển khai vẫn đóng cho tới khi có người kết luận Đạt.");
  return 0;
}

/** Ghi bản nháp ETV.P.F29.03 xuống đĩa. Nội dung phiếu do renderPhieuF2903() (thuần, có test) dựng. */
function ghiPhieuF2903(noiDung: string): string {
  const duongDan = join(SCRIPT_DIR, "..", "..", "..", "05_MODULE_LIBRARY", "M29_AI", "01_Requirement", "_work", "20260825-copilot-tra-cuu", "F29.03_ban-nhap.md");
  writeFileSync(duongDan, noiDung, "utf8");
  return duongDan;
}

async function main() {
  const soVanDe = cheDo === "kiem-nguon" ? await kiemNguon() : cheDo === "chi-truy-hoi" ? await chiTruyHoi() : await dayDu();
  if (soVanDe > 0) process.exitCode = 1;
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
