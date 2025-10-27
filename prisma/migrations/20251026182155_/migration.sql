/*
  Warnings:

  - You are about to drop the column `categoriaculturaId` on the `Estoque` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Estoque" DROP CONSTRAINT "Estoque_categoriaculturaId_fkey";

-- AlterTable
ALTER TABLE "Estoque" DROP COLUMN "categoriaculturaId",
ADD COLUMN     "categoriaCulturaId" INTEGER;

-- AddForeignKey
ALTER TABLE "Estoque" ADD CONSTRAINT "Estoque_categoriaCulturaId_fkey" FOREIGN KEY ("categoriaCulturaId") REFERENCES "Cultura"("id_cultura") ON DELETE SET NULL ON UPDATE CASCADE;
