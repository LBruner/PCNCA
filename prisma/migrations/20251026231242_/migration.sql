/*
  Warnings:

  - Added the required column `empresa_id` to the `vendas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vendas" ADD COLUMN     "empresa_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "Empresa"("empresa_id") ON DELETE RESTRICT ON UPDATE CASCADE;
