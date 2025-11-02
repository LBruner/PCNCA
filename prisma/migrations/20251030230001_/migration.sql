-- CreateTable
CREATE TABLE "VendaPessoa" (
    "vpes_id" SERIAL NOT NULL,
    "venda_venda_id" INTEGER NOT NULL,
    "pessoa_pess_pessoa_id" INTEGER NOT NULL,
    "tipo_pessoa" VARCHAR(15) NOT NULL,

    CONSTRAINT "VendaPessoa_pkey" PRIMARY KEY ("vpes_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VendaPessoa_venda_venda_id_pessoa_pess_pessoa_id_key" ON "VendaPessoa"("venda_venda_id", "pessoa_pess_pessoa_id");

-- AddForeignKey
ALTER TABLE "VendaPessoa" ADD CONSTRAINT "VendaPessoa_pessoa_pess_pessoa_id_fkey" FOREIGN KEY ("pessoa_pess_pessoa_id") REFERENCES "Pessoa"("pess_pessoa_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendaPessoa" ADD CONSTRAINT "VendaPessoa_venda_venda_id_fkey" FOREIGN KEY ("venda_venda_id") REFERENCES "vendas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
