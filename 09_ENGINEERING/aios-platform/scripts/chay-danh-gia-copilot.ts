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
import { BO_CAU_HOI, CAU_HOI_THAT, NGUONG, TAT_CA_CA } from "../src/lib/m29/copilot/bo-cau-hoi-vang";
import { chamCa, laLoiHaTang, tongHop, type KetQuaCham } from "../src/lib/m29/copilot/danh-gia";

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
async function chiTruyHoi(): Promise<number> {
  const { retrieve } = await import("../src/lib/m29/copilot/retrieval");
  let dat = 0;
  let tongSoTaiLieu = 0;
  console.log(`Truy hồi ${CAU_HOI_THAT.length} câu hỏi thật (không gọi mô hình):\n`);
  for (const ca of CAU_HOI_THAT) {
    const doan = await retrieve(ca.cauHoi);
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

/** Chạy thật qua Tool Gateway và ghi AIEvaluationRun. */
async function dayDu(): Promise<number> {
  const { chat } = await import("../src/lib/m29/gateway");
  const suite = await prisma.aIEvaluationSuite.findFirst({ where: { name: { contains: BO_CAU_HOI.ten } } });
  if (!suite) {
    console.error(`Chưa có bộ "${BO_CAU_HOI.ten}" trong CSDL. Chạy: npx prisma db seed`);
    return 1;
  }

  const ketQua: KetQuaCham[] = [];
  const loiHaTang: string[] = [];
  // Người chạy đánh giá là hệ thống, không phải một cán bộ — userRef ghi rõ để đọc trace không
  // nhầm các lượt này với lượt hỏi thật của người dùng.
  const user = { id: `EVAL:${suite.id}` };

  for (const ca of TAT_CA_CA) {
    const r = await chat({ question: ca.cauHoi, history: [], user });
    const kq = { answer: r.answer, citations: r.citations, code: r.code };
    if (laLoiHaTang(kq)) {
      loiHaTang.push(`${ca.ma}: ${r.code}`);
      console.log(`! ${ca.ma}  LỖI HẠ TẦNG ${r.code} — ${r.answer}`);
      continue;
    }
    const cham = chamCa(ca, kq);
    ketQua.push(cham);
    console.log(`${cham.dat ? "✓" : "✗"} ${cham.ma} [${cham.hanhVi}] ${cham.ghiChu}`);
  }

  if (loiHaTang.length) {
    console.error(`\nHUỶ LƯỢT ĐÁNH GIÁ: ${loiHaTang.length}/${TAT_CA_CA.length} ca gặp lỗi hạ tầng — ${loiHaTang.join("; ")}`);
    console.error("Không ghi AIEvaluationRun: một sự cố hạ tầng không được phép hoá trang thành kết quả đánh giá.");
    return 1;
  }

  const th = tongHop(ketQua);
  console.log(`\nCâu hỏi thật dẫn đúng nguồn: ${th.soCauThatDat}/${th.soCauThat} = ${pct(th.tiLeDanDungNguon)} (ngưỡng ${pct(NGUONG.danDungNguon)})`);
  console.log(`Câu bẫy từ chối đúng:        ${th.soCauBayDat}/${th.soCauBay} = ${pct(th.tiLeTuChoiCauBay)} (ngưỡng ${pct(NGUONG.tuChoiCauBay)})`);
  console.log(`KẾT LUẬN: ${th.status}${th.datNguong ? "" : " — KHÔNG đạt ngưỡng, không được mở cho người dùng thật"}`);

  await prisma.aIEvaluationRun.create({
    data: { suiteId: suite.id, passCount: ketQua.filter((r) => r.dat).length, failCount: ketQua.filter((r) => !r.dat).length, status: th.status },
  });
  console.log("Đã ghi AIEvaluationRun — xem M29 → Agent Copilot tra cứu.");
  return th.datNguong ? 0 : 1;
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
