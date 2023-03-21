-- CreateTable
CREATE TABLE "Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "secureId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "timeCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Message_secureId_key" ON "Message"("secureId");
