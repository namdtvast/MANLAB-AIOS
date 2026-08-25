-- CreateTable
CREATE TABLE "CopilotDocChunk" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "heading" TEXT NOT NULL DEFAULT '',
    "docClass" TEXT NOT NULL,
    "securityLevel" TEXT NOT NULL,
    "approvalRef" TEXT NOT NULL DEFAULT '',
    "ordinal" INTEGER NOT NULL DEFAULT 0,
    "content" TEXT NOT NULL,
    "searchText" TEXT NOT NULL,
    "tsv" tsvector,
    "indexedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CopilotDocChunk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CopilotThread" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "moduleContext" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CopilotThread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CopilotMessage" (
    "id" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "citations" JSONB NOT NULL DEFAULT '[]',
    "requestId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CopilotMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CopilotDocChunk_path_idx" ON "CopilotDocChunk"("path");

-- CreateIndex
CREATE INDEX "CopilotDocChunk_securityLevel_idx" ON "CopilotDocChunk"("securityLevel");

-- CreateIndex
CREATE INDEX "CopilotDocChunk_tsv_idx" ON "CopilotDocChunk" USING GIN ("tsv");

-- CreateIndex
CREATE INDEX "CopilotThread_userId_idx" ON "CopilotThread"("userId");

-- CreateIndex
CREATE INDEX "CopilotMessage_threadId_idx" ON "CopilotMessage"("threadId");

-- AddForeignKey
ALTER TABLE "CopilotThread" ADD CONSTRAINT "CopilotThread_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CopilotMessage" ADD CONSTRAINT "CopilotMessage_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "CopilotThread"("id") ON DELETE CASCADE ON UPDATE CASCADE;
