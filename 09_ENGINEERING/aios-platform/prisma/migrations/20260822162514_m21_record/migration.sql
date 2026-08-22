-- CreateEnum
CREATE TYPE "M21RecordType" AS ENUM ('DL', 'QTMT');

-- CreateEnum
CREATE TYPE "M21Status" AS ENUM ('CHUALAP', 'DANGLAP', 'SOATXET', 'DNLDV', 'PHENOIBO', 'DAGUI', 'YEUCAUBOSUNG', 'TIEPNHAN', 'CONGHIEU', 'DIEUCHINH', 'TAMDUNG', 'HUYBO', 'HETHIEU');

-- CreateEnum
CREATE TYPE "M21LineResult" AS ENUM ('DAPUNG', 'KHONG', 'DIEUCHINH');

-- CreateTable
CREATE TABLE "M21Record" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "loai" "M21RecordType" NOT NULL,
    "lan" TEXT NOT NULL DEFAULT '01',
    "status" "M21Status" NOT NULL DEFAULT 'CHUALAP',
    "toChuc" TEXT NOT NULL,
    "diaChi" TEXT NOT NULL,
    "daiDien" TEXT NOT NULL,
    "dienThoai" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "diaDiem" TEXT NOT NULL DEFAULT '',
    "coQuanTiepNhan" TEXT NOT NULL,
    "coQuanChuQuan" TEXT NOT NULL DEFAULT '',
    "congNhanSo" TEXT NOT NULL DEFAULT '',
    "congNhanHieuLuc" TEXT NOT NULL DEFAULT '',
    "kyso" BOOLEAN NOT NULL DEFAULT false,
    "kysoAt" TIMESTAMP(3),
    "ngayGui" TIMESTAMP(3),
    "maBienNhan" TEXT,
    "ngayTiepNhan" TIMESTAMP(3),
    "ngayCongKhai" TIMESTAMP(3),
    "phienBanCu" JSONB,
    "baoCaoHangNam" JSONB,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M21Record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M21Line" (
    "id" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "dichVu" TEXT NOT NULL,
    "ten" TEXT NOT NULL DEFAULT '',
    "linhVuc" TEXT NOT NULL DEFAULT '',
    "phamVi" TEXT NOT NULL DEFAULT '',
    "ccx" TEXT NOT NULL DEFAULT '',
    "quyTrinh" TEXT NOT NULL DEFAULT '',
    "nguoiTH" TEXT NOT NULL DEFAULT '',
    "ghiChu" TEXT NOT NULL DEFAULT '',
    "ketQua" "M21LineResult" NOT NULL DEFAULT 'DAPUNG',
    "lyDo" TEXT NOT NULL DEFAULT '',
    "bangChung" TEXT NOT NULL DEFAULT '',
    "bcFileName" TEXT NOT NULL DEFAULT '',
    "linked" BOOLEAN NOT NULL DEFAULT false,
    "catalogRef" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M21Line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M21AuditEntry" (
    "id" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "reason" TEXT,

    CONSTRAINT "M21AuditEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "M21Record_code_key" ON "M21Record"("code");

-- AddForeignKey
ALTER TABLE "M21Record" ADD CONSTRAINT "M21Record_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M21Line" ADD CONSTRAINT "M21Line_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "M21Record"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M21AuditEntry" ADD CONSTRAINT "M21AuditEntry_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "M21Record"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M21AuditEntry" ADD CONSTRAINT "M21AuditEntry_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
