// Khung "Căn cứ pháp lý" hiển thị ở đầu mọi trang module.
//
// Nguồn sự thật là khối document/forms trong 04_PROCESS_LIBRARY/MPxx/manifest.yaml
// + links.yaml (procedure, form_files), nạp vào PlatformModule qua prisma/seed.ts —
// KHÔNG viết cứng căn cứ trong từng trang. Module chưa ban hành thủ tục thì banner
// nói thẳng "chưa ban hành", không suy diễn hộ.
import { prisma } from "@/lib/prisma";

// Cổng tài liệu để mở file gốc trong repo (docs/index.html, deep-link "#/p/<đường-dẫn>").
const DOCS_PORTAL =
  process.env.NEXT_PUBLIC_DOCS_PORTAL_URL ?? "https://namdtvast.github.io/MANLAB-AIOS/";

function portalHref(repoPath: string): string {
  return `${DOCS_PORTAL.replace(/\/$/, "")}/#/p/${repoPath}`;
}

// Ngày ban hành lưu dạng DateTime (nửa đêm UTC) — đọc theo UTC để không bị lệch
// một ngày khi máy chủ chạy ở múi giờ khác.
function formatDate(d: Date): string {
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getUTCFullYear()}`;
}

// "ISO17025" → "ISO/IEC 17025"; giữ nguyên chuỗi đã viết đầy đủ.
const STANDARD_LABEL: Record<string, string> = {
  ISO9001: "ISO 9001",
  ISO17025: "ISO/IEC 17025",
  ISO17034: "ISO 17034",
  ISO27001: "ISO/IEC 27001",
  ISO42001: "ISO/IEC 42001",
};

const DOC_STATUS: Record<string, { label: string; className: string }> = {
  issued: { label: "Đang hiệu lực", className: "bg-good-soft text-good" },
  draft: { label: "Dự thảo", className: "bg-warn-soft text-warn" },
};

interface FormRef {
  code: string;
  title: string;
  path: string | null;
}

function Chip({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <span
      title={title}
      className="inline-flex items-center rounded-full bg-surface px-2 py-0.5 text-[11px] font-medium text-ink-2"
    >
      {children}
    </span>
  );
}

export async function CanCuBanner({ moduleCode }: { moduleCode: string }) {
  const mod = await prisma.platformModule.findUnique({
    where: { code: moduleCode },
    select: {
      code: true,
      mpCode: true,
      docId: true,
      docTitle: true,
      docStatus: true,
      docVersion: true,
      issuedDate: true,
      procedurePath: true,
      procedureOwner: true,
      standards: true,
      isoClauses: true,
      legalBasis: true,
      forms: true,
    },
  });
  if (!mod) return null;

  const forms = (mod.forms as unknown as FormRef[] | null) ?? [];
  const status = mod.docStatus ? DOC_STATUS[mod.docStatus] : null;
  const standards = mod.isoClauses.length
    ? mod.isoClauses
    : mod.standards.map((s) => STANDARD_LABEL[s] ?? s);

  return (
    <section
      aria-label="Căn cứ pháp lý"
      className="max-w-4xl rounded-lg border border-border bg-sunk px-3 py-2.5 text-xs text-ink-2"
    >
      {/* 1–3. Thủ tục viện dẫn + lần ban hành/ngày + trạng thái hiệu lực */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="font-semibold text-ink-3">Căn cứ:</span>
        {mod.docId ? (
          <>
            {mod.procedurePath ? (
              <a
                href={portalHref(mod.procedurePath)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent hover:underline"
              >
                {mod.docId}
              </a>
            ) : (
              <strong className="text-ink">{mod.docId}</strong>
            )}
            <span className="text-ink">{mod.docTitle}</span>
            {mod.docVersion && <span>· lần ban hành {mod.docVersion}</span>}
            {mod.issuedDate && <span>· ngày {formatDate(mod.issuedDate)}</span>}
            {status && (
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${status.className}`}
              >
                {status.label}
              </span>
            )}
          </>
        ) : (
          <span>
            {mod.mpCode ?? mod.code} <strong className="text-ink">chưa ban hành thủ tục</strong> — module
            vận hành theo đặc tả nghiệp vụ, chưa có văn bản kiểm soát viện dẫn.
          </span>
        )}
      </div>

      {/* 4–5. Chủ sở hữu quy trình + chuẩn mực/pháp luật áp dụng */}
      {(mod.procedureOwner || standards.length > 0 || mod.legalBasis.length > 0) && (
        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
          {mod.procedureOwner && (
            <span>
              <span className="text-ink-3">Chủ sở hữu:</span>{" "}
              <span className="text-ink">{mod.procedureOwner}</span>
            </span>
          )}
          {standards.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
          {mod.legalBasis.map((l) => (
            <Chip key={l} title={l}>
              {l.length > 48 ? `${l.slice(0, 48)}…` : l}
            </Chip>
          ))}
        </div>
      )}

      {/* 6. Biểu mẫu áp dụng — mã bấm mở được file gốc ở 06_SHARED_RESOURCES */}
      {forms.length > 0 && (
        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-ink-3">Biểu mẫu áp dụng:</span>
          {forms.map((f, i) =>
            f.path ? (
              <a
                key={`${f.code}-${i}`}
                href={portalHref(f.path)}
                target="_blank"
                rel="noopener noreferrer"
                title={f.title}
                className="inline-flex items-center rounded-full bg-surface px-2 py-0.5 text-[11px] font-medium text-accent hover:underline"
              >
                {f.code.replace(/^ETV\.P\./, "")}
              </a>
            ) : (
              <Chip key={`${f.code}-${i}`} title={f.title}>
                {f.code.replace(/^ETV\.P\./, "")}
              </Chip>
            ),
          )}
        </div>
      )}
    </section>
  );
}
