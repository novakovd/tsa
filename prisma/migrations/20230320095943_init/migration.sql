-- CreateTable
CREATE TABLE "Message" (
    "intMessageId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "strSecureId" TEXT NOT NULL,
    "strValue" TEXT NOT NULL,
    "dtmCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);