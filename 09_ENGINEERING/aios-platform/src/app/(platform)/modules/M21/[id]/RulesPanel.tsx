// Port từ function rulesPanel() trong 08_Source/index.html — hiển thị BR2/BR3/BR5/BR6/BR8/BR9/
// BR10/BR11 theo đúng logic gốc (không phải component tương tác, chỉ đọc dữ liệu để hiển thị).
import type { M21Line, M21Record } from "@/generated/prisma/client";
import { STATUS_LABEL } from "@/lib/m21/labels";

const EXPIRY = new Date(2027, 1, 28); // 28/02/2027 — BR8, mốc cứng theo cơ chế tự công bố/thông báo

type Tone = "ok" | "warn" | "bad" | "info";

const TONE_CLASS: Record<Tone, string> = {
  ok: "border-good/30 bg-good-soft text-good",
  warn: "border-warn/30 bg-warn-soft text-warn",
  bad: "border-crit/30 bg-crit-soft text-crit",
  info: "border-accent-line bg-accent-soft text-accent",
};

function dayDiff(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

function addWorkingDays(from: Date, n: number) {
  const x = new Date(from);
  let added = 0;
  while (added < n) {
    x.setDate(x.getDate() + 1);
    const w = x.getDay();
    if (w !== 0 && w !== 6) added++;
  }
  return x;
}

function fmt(d: Date | null) {
  if (!d) return "—";
  return d.toLocaleDateString("vi-VN");
}

function Rule({ tone, title, body, cite }: { tone: Tone; title: string; body: string; cite: string }) {
  return (
    <div className={`rounded-lg border p-3 text-sm ${TONE_CLASS[tone]}`}>
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-ink-2">{body}</p>
      <p className="mt-1.5 text-xs text-ink-3">{cite}</p>
    </div>
  );
}

export function RulesPanel({ record }: { record: M21Record & { lines: M21Line[] } }) {
  const good = record.lines.filter((l) => l.ketQua === "DAPUNG" || l.ketQua === "DIEUCHINH").length;
  const bad = record.lines.filter((l) => l.ketQua === "KHONG").length;
  const missingEvidence = record.lines.filter(
    (l) => (l.ketQua === "KHONG" || l.ketQua === "DIEUCHINH") && (!l.lyDo.trim() || !(l.bangChung.trim() || l.bcFileName))
  ).length;

  const rules: { tone: Tone; title: string; body: string; cite: string }[] = [];

  const lockedBad = new Set(["TAMDUNG", "DIEUCHINH", "HUYBO", "HETHIEU"]);
  if (record.status === "CONGHIEU") {
    rules.push({
      tone: "ok",
      title: "BR5 — Được phép sử dụng",
      body: "Phạm vi “Còn hiệu lực” — hợp lệ cho báo giá, hợp đồng, chứng chỉ, phiếu kết quả, báo cáo.",
      cite: "BR5 · Mục 12",
    });
  } else if (lockedBad.has(record.status)) {
    rules.push({
      tone: "bad",
      title: "BR5 — Chặn sử dụng",
      body: `Trạng thái "${STATUS_LABEL[record.status]}": chặn/cảnh báo mạnh khi đưa vào nghiệp vụ.`,
      cite: "BR5 · Mục 12",
    });
  } else {
    rules.push({
      tone: "warn",
      title: "BR5 — Chưa công khai",
      body: "Chưa “Còn hiệu lực”; hoàn tất luồng công bố/thông báo trước khi sử dụng.",
      cite: "BR4·BR5",
    });
  }

  rules.push({
    tone: bad ? "warn" : "ok",
    title: "BR9/BR10 — Công bố phần đạt",
    body: `${good} dòng đạt, ${bad} dòng không đáp ứng. ${bad ? "Dòng không đạt giữ “Yêu cầu bổ sung”." : "Toàn bộ đạt."}${good ? "" : " Cần ≥1 dòng đạt mới được công bố."}`,
    cite: "BR9·BR10 · Mục 10.5",
  });

  if (missingEvidence) {
    rules.push({
      tone: "bad",
      title: "Thiếu lý do/bằng chứng",
      body: `Có ${missingEvidence} dòng "Không đáp ứng/Điều chỉnh" chưa ghi đủ lý do + bằng chứng (bắt buộc).`,
      cite: "BR10",
    });
  }

  if (record.loai === "DL") {
    if (record.ngayGui) {
      const han = addWorkingDays(record.ngayGui, 3);
      const left = dayDiff(new Date(), han);
      rules.push({
        tone: left < 0 ? "bad" : left <= 1 ? "warn" : "ok",
        title: "BR2 — Hạn cơ quan ghi nhận",
        body: `Gửi ${record.coQuanTiepNhan || "Trung tâm Phục vụ HCC cấp tỉnh"} (${fmt(record.ngayGui)}); ghi nhận trong 03 ngày làm việc → hạn ${fmt(han)}${left < 0 ? ` (quá ${-left} ngày)` : ` (còn ${left} ngày)`}.`,
        cite: "BR2 · Mục 11.2",
      });
    } else {
      rules.push({
        tone: "info",
        title: "BR2 — Đo lường",
        body: "Gửi Bản công bố theo Mẫu 01 Phụ lục I.3.3; ghi nhận trong 03 ngày làm việc.",
        cite: "BR2",
      });
    }
  } else {
    const canSell = record.status === "TIEPNHAN" || record.status === "CONGHIEU" || record.status === "DIEUCHINH";
    rules.push({
      tone: canSell ? "ok" : "bad",
      title: "BR3 — Thông báo trước khi cung cấp dịch vụ",
      body: canSell
        ? "Đã gửi/được tiếp nhận thông báo (Mẫu 9.01) tại Bộ Nông nghiệp và Môi trường — đủ điều kiện cung cấp dịch vụ."
        : `BẮT BUỘC gửi Mẫu 9.01 tới Bộ Nông nghiệp và Môi trường TRƯỚC khi cung cấp dịch vụ. Hiện: "${STATUS_LABEL[record.status]}".`,
      cite: "BR3 · Mục 10.4",
    });

    const now = new Date();
    const y = now.getMonth() === 0 && now.getDate() < 30 ? now.getFullYear() : now.getFullYear() + 1;
    const bc = new Date(y, 0, 30);
    const dl = dayDiff(now, bc);
    rules.push({
      tone: dl <= 30 ? "warn" : "info",
      title: "BR6 — Báo cáo hằng năm",
      body: `Mẫu 9.02 gửi Bộ Nông nghiệp và Môi trường trước 30/01/${y} (còn ${dl} ngày).`,
      cite: "BR6 · Mục 13.1",
    });
  }

  const ex = dayDiff(new Date(), EXPIRY);
  rules.push({
    tone: ex < 0 ? "bad" : ex <= 90 ? "warn" : "info",
    title: "BR8 — Hiệu lực cơ chế",
    body: `Tự công bố/thông báo áp dụng đến 28/02/2027 ${ex < 0 ? "(đã hết hiệu lực)" : `(còn ${ex} ngày)`}.`,
    cite: "BR8",
  });

  if (record.status === "CONGHIEU") {
    rules.push({
      tone: "info",
      title: "BR11 — Ghi ngược PA-B",
      body: "Đã phát sự kiện công khai → chờ Danh mục PTĐ (M05) ghi nhận năng lực & chuyển “Đang sử dụng” (M05 chưa có backend thật trong nền tảng — xem spec.md).",
      cite: "BR11",
    });
  }

  const phienBanCu = (record.phienBanCu as unknown[] | null) ?? [];
  if (phienBanCu.length > 0) {
    rules.push({
      tone: "info",
      title: "Điều chỉnh không ghi đè",
      body: `Hồ sơ đã có ${phienBanCu.length} phiên bản trước được lưu, không bị ghi đè.`,
      cite: "Mục 13.3",
    });
  }

  return (
    <div>
      <h2 className="mb-2 font-head text-sm font-bold text-ink">Quy tắc nghiệp vụ</h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {rules.map((r, i) => (
          <Rule key={i} {...r} />
        ))}
      </div>
    </div>
  );
}
