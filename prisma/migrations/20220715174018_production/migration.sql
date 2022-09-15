-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "activeSticker" INTEGER NOT NULL DEFAULT -1
);

-- CreateTable
CREATE TABLE "stickers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_id" TEXT NOT NULL,
    "file_id_unique" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "stickers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "aliases" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stickerId" INTEGER NOT NULL,
    "alias" TEXT NOT NULL,
    CONSTRAINT "aliases_stickerId_fkey" FOREIGN KEY ("stickerId") REFERENCES "stickers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "stickers_file_id_unique_key" ON "stickers"("file_id_unique");

-- CreateIndex
CREATE UNIQUE INDEX "aliases_id_key" ON "aliases"("id");
