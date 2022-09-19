-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bookName" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "price" TEXT,
    "isdonation" TEXT NOT NULL DEFAULT 'no',
    "thumbnail" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'not sold',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Book" ("author", "bookName", "createdAt", "id", "phone", "price", "status", "thumbnail", "updatedAt") SELECT "author", "bookName", "createdAt", "id", "phone", "price", "status", "thumbnail", "updatedAt" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
