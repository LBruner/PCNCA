/*
  Warnings:

  - You are about to drop the `VendaPessoa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VendaPessoa" DROP CONSTRAINT "VendaPessoa_pessoa_pess_pessoa_id_fkey";

-- DropForeignKey
ALTER TABLE "VendaPessoa" DROP CONSTRAINT "VendaPessoa_venda_venda_id_fkey";

-- DropTable
DROP TABLE "VendaPessoa";

-- CreateTable
CREATE TABLE "transacoes" (
    "transacao_id" SERIAL NOT NULL,
    "mp_payment_id" TEXT NOT NULL,
    "mp_order_id" TEXT,
    "external_reference" TEXT,
    "status" VARCHAR(50) NOT NULL,
    "status_detail" VARCHAR(100),
    "payment_type" VARCHAR(50) NOT NULL,
    "payment_method" VARCHAR(50),
    "valor_total" DOUBLE PRECISION NOT NULL,
    "valor_liquido" DOUBLE PRECISION,
    "taxa_mp" DOUBLE PRECISION,
    "parcelas_qtd" INTEGER DEFAULT 1,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_aprovacao" TIMESTAMP(3),
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "pagador_email" VARCHAR(255),
    "pagador_nome" VARCHAR(255),
    "pagador_documento" VARCHAR(20),
    "pagador_telefone" VARCHAR(20),
    "venda_id" INTEGER,
    "empresa_id" INTEGER NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "metadata" JSONB,

    CONSTRAINT "transacoes_pkey" PRIMARY KEY ("transacao_id")
);

-- CreateTable
CREATE TABLE "transacao_itens" (
    "item_id" SERIAL NOT NULL,
    "transacao_id" INTEGER NOT NULL,
    "estoque_id" INTEGER NOT NULL,
    "produto_nome" VARCHAR(255) NOT NULL,
    "quantidade" DOUBLE PRECISION NOT NULL,
    "preco_unitario" DOUBLE PRECISION NOT NULL,
    "preco_total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "transacao_itens_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "webhook_logs" (
    "log_id" SERIAL NOT NULL,
    "transacao_id" INTEGER,
    "tipo" VARCHAR(50) NOT NULL,
    "action" VARCHAR(50),
    "payment_id" VARCHAR(100),
    "request_body" JSONB NOT NULL,
    "response_status" INTEGER NOT NULL,
    "recebido_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processado_em" TIMESTAMP(3),
    "erro" TEXT,
    "tentativas" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "webhook_logs_pkey" PRIMARY KEY ("log_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transacoes_mp_payment_id_key" ON "transacoes"("mp_payment_id");

-- CreateIndex
CREATE INDEX "transacoes_mp_payment_id_idx" ON "transacoes"("mp_payment_id");

-- CreateIndex
CREATE INDEX "transacoes_venda_id_idx" ON "transacoes"("venda_id");

-- CreateIndex
CREATE INDEX "transacoes_status_idx" ON "transacoes"("status");

-- CreateIndex
CREATE INDEX "transacoes_data_criacao_idx" ON "transacoes"("data_criacao");

-- CreateIndex
CREATE INDEX "transacao_itens_transacao_id_idx" ON "transacao_itens"("transacao_id");

-- CreateIndex
CREATE INDEX "transacao_itens_estoque_id_idx" ON "transacao_itens"("estoque_id");

-- CreateIndex
CREATE INDEX "webhook_logs_payment_id_idx" ON "webhook_logs"("payment_id");

-- CreateIndex
CREATE INDEX "webhook_logs_recebido_em_idx" ON "webhook_logs"("recebido_em");

-- AddForeignKey
ALTER TABLE "transacoes" ADD CONSTRAINT "transacoes_venda_id_fkey" FOREIGN KEY ("venda_id") REFERENCES "Venda"("venda_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transacoes" ADD CONSTRAINT "transacoes_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "Empresa"("empresa_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transacoes" ADD CONSTRAINT "transacoes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transacao_itens" ADD CONSTRAINT "transacao_itens_transacao_id_fkey" FOREIGN KEY ("transacao_id") REFERENCES "transacoes"("transacao_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transacao_itens" ADD CONSTRAINT "transacao_itens_estoque_id_fkey" FOREIGN KEY ("estoque_id") REFERENCES "Estoque"("estoque_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "webhook_logs" ADD CONSTRAINT "webhook_logs_transacao_id_fkey" FOREIGN KEY ("transacao_id") REFERENCES "transacoes"("transacao_id") ON DELETE SET NULL ON UPDATE CASCADE;
