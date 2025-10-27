/*
  Warnings:

  - You are about to drop the column `empresa_id` on the `vendas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "vendas" DROP CONSTRAINT "vendas_empresa_id_fkey";

-- AlterTable
ALTER TABLE "vendas" DROP COLUMN "empresa_id";
