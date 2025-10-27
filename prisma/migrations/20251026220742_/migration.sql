/*
  Warnings:

  - You are about to drop the `Venda` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VendaEstoque` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HistoricoEstoque" DROP CONSTRAINT "HistoricoEstoque_venda_venda_id_fkey";

-- DropForeignKey
ALTER TABLE "VendaEstoque" DROP CONSTRAINT "VendaEstoque_estoque_estoque_id_fkey";

-- DropForeignKey
ALTER TABLE "VendaEstoque" DROP CONSTRAINT "VendaEstoque_venda_venda_id_fkey";

-- DropForeignKey
ALTER TABLE "VendaFormaPagamento" DROP CONSTRAINT "VendaFormaPagamento_venda_venda_id_fkey";

-- DropForeignKey
ALTER TABLE "transacoes" DROP CONSTRAINT "transacoes_venda_id_fkey";

-- AlterTable
ALTER TABLE "Noticia" ALTER COLUMN "descricao" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Venda";

-- DropTable
DROP TABLE "VendaEstoque";

-- CreateTable
CREATE TABLE "vendas" (
    "id" SERIAL NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "comprador" BOOLEAN NOT NULL DEFAULT false,
    "status" VARCHAR(50) NOT NULL DEFAULT 'PENDENTE',
    "valor_total" DOUBLE PRECISION,
    "data_pagamento" TIMESTAMP(3),
    "observacoes" TEXT,
    "data_venda" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vendas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venda_estoque" (
    "id" SERIAL NOT NULL,
    "venda_id" INTEGER NOT NULL,
    "estoque_id" INTEGER NOT NULL,
    "quantidade" DOUBLE PRECISION NOT NULL,
    "preco_unitario" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "venda_estoque_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "venda_estoque_venda_id_idx" ON "venda_estoque"("venda_id");

-- CreateIndex
CREATE INDEX "venda_estoque_estoque_id_idx" ON "venda_estoque"("estoque_id");

-- AddForeignKey
ALTER TABLE "HistoricoEstoque" ADD CONSTRAINT "HistoricoEstoque_venda_venda_id_fkey" FOREIGN KEY ("venda_venda_id") REFERENCES "vendas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "Empresa"("empresa_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venda_estoque" ADD CONSTRAINT "venda_estoque_venda_id_fkey" FOREIGN KEY ("venda_id") REFERENCES "vendas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venda_estoque" ADD CONSTRAINT "venda_estoque_estoque_id_fkey" FOREIGN KEY ("estoque_id") REFERENCES "Estoque"("estoque_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendaFormaPagamento" ADD CONSTRAINT "VendaFormaPagamento_venda_venda_id_fkey" FOREIGN KEY ("venda_venda_id") REFERENCES "vendas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transacoes" ADD CONSTRAINT "transacoes_venda_id_fkey" FOREIGN KEY ("venda_id") REFERENCES "vendas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
