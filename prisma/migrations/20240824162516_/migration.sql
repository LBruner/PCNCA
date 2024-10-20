/*
  Warnings:

  - You are about to drop the column `shortDescriptption` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Tag` table. All the data in the column will be lost.
  - Added the required column `thumbnailText` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Article_slug_key";

-- DropIndex
DROP INDEX "Category_slug_key";

-- DropIndex
DROP INDEX "Tag_slug_key";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "shortDescriptption",
DROP COLUMN "slug",
DROP COLUMN "summary",
ADD COLUMN     "thumbnailText" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "slug";

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "articleId" INTEGER NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
