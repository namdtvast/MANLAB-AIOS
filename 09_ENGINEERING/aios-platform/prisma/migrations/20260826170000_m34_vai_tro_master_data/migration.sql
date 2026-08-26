-- M34: chuyển loại vai trò của chủ thể từ ENUM sang MASTER DATA cấu hình được.
-- Căn cứ: 09_ENGINEERING/05_Database/MasterData_ChuThe_VaiTro.md mục 4.4 —
-- thêm/bớt một vai trò phải là thêm/sửa MỘT DÒNG DỮ LIỆU, không phải một migration.
-- Migration này chồng lên 20260826153000_m34_party_role_crm, không sửa migration đó.

-- 1. Cột mã vai trò dạng text, chuyển dữ liệu cũ sang
ALTER TABLE "M34PartyRole" ADD COLUMN "roleTypeCode" TEXT;
UPDATE "M34PartyRole" SET "roleTypeCode" = "roleType"::text;

-- 2. Gỡ ràng buộc và cột enum cũ
DROP INDEX IF EXISTS "M34PartyRole_partyId_roleType_key";
ALTER TABLE "M34PartyRole" DROP COLUMN "roleType";

-- 3. Giải phóng tên "M34PartyRoleType" để dùng cho bảng (Postgres không cho type và table trùng tên)
DROP TYPE "M34PartyRoleType";

-- 4. Bảng danh mục vai trò
CREATE TABLE "M34PartyRoleType" (
  "code"        TEXT NOT NULL,
  "nameVi"      TEXT NOT NULL,
  "description" TEXT,
  "sortOrder"   INTEGER NOT NULL DEFAULT 0,
  "active"      BOOLEAN NOT NULL DEFAULT true,
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"   TIMESTAMP(3) NOT NULL,
  CONSTRAINT "M34PartyRoleType_pkey" PRIMARY KEY ("code")
);

-- 5. Nạp danh mục ban đầu: 8 vai trò đã dùng + 4 vai trò chuẩn còn thiếu
INSERT INTO "M34PartyRoleType" ("code", "nameVi", "description", "sortOrder", "updatedAt") VALUES
  ('LEAD',               'Khách hàng tiềm năng',            'Chưa phát sinh giao dịch, đang trong giai đoạn tiếp cận', 10, CURRENT_TIMESTAMP),
  ('CUSTOMER',           'Khách hàng',                      'Bên yêu cầu dịch vụ kiểm định, hiệu chuẩn, thử nghiệm, quan trắc', 20, CURRENT_TIMESTAMP),
  ('SUPPLIER',           'Nhà cung cấp (NCC)',              'Cung cấp sản phẩm, vật tư, dịch vụ cho Viện', 30, CURRENT_TIMESTAMP),
  ('SUBCONTRACTOR',      'Nhà thầu phụ (NTP)',              'Bên ngoài cung cấp theo ISO/IEC 17025 §6.6', 40, CURRENT_TIMESTAMP),
  ('MANUFACTURER',       'Nhà sản xuất (NSX)',              'Cơ sở sản xuất đối tượng được đánh giá', 50, CURRENT_TIMESTAMP),
  ('AUDITEE',            'Cơ sở được đánh giá',             'Đối tượng của hoạt động đánh giá, giám định, chứng nhận', 60, CURRENT_TIMESTAMP),
  ('PARTNER',            'Đối tác',                         'Hợp tác chuyên môn hoặc thương mại', 70, CURRENT_TIMESTAMP),
  ('REGULATOR',          'Cơ quan quản lý',                 'Cơ quan nhà nước có thẩm quyền quản lý hoạt động của Viện', 80, CURRENT_TIMESTAMP),
  ('ACCREDITATION_BODY', 'Tổ chức công nhận/chứng nhận',    'BoA, ILAC và tổ chức công nhận khác — khác cơ quan quản lý nhà nước', 90, CURRENT_TIMESTAMP),
  ('EXPERT',             'Chuyên gia',                      'Chuyên gia, đánh giá viên bên ngoài', 100, CURRENT_TIMESTAMP),
  ('EMPLOYEE',           'Nhân sự',                         'Nhân sự của Viện, nối với M03', 110, CURRENT_TIMESTAMP),
  ('INTERESTED_PARTY',   'Bên quan tâm',                    'Bên quan tâm theo ISO 9001 §4.2, nối với M25', 120, CURRENT_TIMESTAMP)
ON CONFLICT ("code") DO NOTHING;

-- 6. Ràng buộc sau khi đã có dữ liệu danh mục
ALTER TABLE "M34PartyRole" ALTER COLUMN "roleTypeCode" SET NOT NULL;
CREATE UNIQUE INDEX "M34PartyRole_partyId_roleTypeCode_key" ON "M34PartyRole"("partyId", "roleTypeCode");
CREATE INDEX "M34PartyRole_roleTypeCode_idx" ON "M34PartyRole"("roleTypeCode");
ALTER TABLE "M34PartyRole" ADD CONSTRAINT "M34PartyRole_roleTypeCode_fkey" FOREIGN KEY ("roleTypeCode") REFERENCES "M34PartyRoleType"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
