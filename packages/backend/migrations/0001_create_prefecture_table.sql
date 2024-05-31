-- CreateTable
CREATE TABLE "Prefecture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "prefectureId" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Prefecture_prefectureId_key" ON "Prefecture"("prefectureId");
