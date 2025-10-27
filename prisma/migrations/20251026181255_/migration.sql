/*
  Warnings:

  - You are about to drop the column `full_description` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `vendor_name` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `usuario_usuario_id` on the `HistoricoEstoque` table. All the data in the column will be lost.
  - Made the column `empresa_id` on table `Estoque` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `empresa_id` to the `HistoricoEstoque` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Estoque" DROP CONSTRAINT "Estoque_empresa_id_fkey";

-- DropForeignKey
ALTER TABLE "HistoricoEstoque" DROP CONSTRAINT "HistoricoEstoque_usuario_usuario_id_fkey";

-- AlterTable
ALTER TABLE "Estoque" DROP COLUMN "full_description",
DROP COLUMN "vendor_name",
ALTER COLUMN "empresa_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "HistoricoEstoque" DROP COLUMN "usuario_usuario_id",
ADD COLUMN     "empresa_id" INTEGER NOT NULL,
ADD COLUMN     "usuarioId" TEXT;

-- AddForeignKey
ALTER TABLE "Estoque" ADD CONSTRAINT "Estoque_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "Empresa"("empresa_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoEstoque" ADD CONSTRAINT "HistoricoEstoque_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "Empresa"("empresa_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoEstoque" ADD CONSTRAINT "HistoricoEstoque_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
