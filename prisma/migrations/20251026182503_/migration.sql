/*
  Warnings:

  - You are about to drop the column `categoriaCulturaId` on the `Estoque` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Estoque" DROP CONSTRAINT "Estoque_categoriaCulturaId_fkey";

-- AlterTable
ALTER TABLE "Estoque" DROP COLUMN "categoriaCulturaId",
ADD COLUMN     "categoriaculturaId" INTEGER;

-- AddForeignKey
ALTER TABLE "Estoque" ADD CONSTRAINT "Estoque_categoriaculturaId_fkey" FOREIGN KEY ("categoriaculturaId") REFERENCES "Cultura"("id_cultura") ON DELETE SET NULL ON UPDATE CASCADE;
