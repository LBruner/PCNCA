-- CreateTable
CREATE TABLE "ComercioCommodities" (
    "commodity_id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "categoria_id" INTEGER NOT NULL,

    CONSTRAINT "ComercioCommodities_pkey" PRIMARY KEY ("commodity_id")
);

-- CreateTable
CREATE TABLE "ComercioCommoditiesCotacoes" (
    "cotacao_id" SERIAL NOT NULL,
    "commodity_id" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "dt_valor" TIMESTAMP(3) NOT NULL,
    "fonte" TEXT,

    CONSTRAINT "ComercioCommoditiesCotacoes_pkey" PRIMARY KEY ("cotacao_id")
);

-- CreateTable
CREATE TABLE "ComercioCommoditiesVariacaoPreco" (
    "variacao_id" SERIAL NOT NULL,
    "commodity_id" INTEGER NOT NULL,
    "dt_inicio" TIMESTAMP(3) NOT NULL,
    "dt_fim" TIMESTAMP(3) NOT NULL,
    "variacao" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ComercioCommoditiesVariacaoPreco_pkey" PRIMARY KEY ("variacao_id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerType" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "accessTokenExpires" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Autor" (
    "autor_id" INTEGER NOT NULL,
    "nome_autor" VARCHAR(100) NOT NULL,

    CONSTRAINT "Autor_pkey" PRIMARY KEY ("autor_id")
);

-- CreateTable
CREATE TABLE "Noticia" (
    "notId" SERIAL NOT NULL,
    "titulo" VARCHAR(200) NOT NULL,
    "subtitulo" VARCHAR(1000) NOT NULL,
    "corpo" TEXT NOT NULL,
    "data_publicacao" TIMESTAMP(3) NOT NULL,
    "descricao" VARCHAR(1000),
    "id_autor" INTEGER NOT NULL,
    "id_cultura" INTEGER NOT NULL,
    "imagem_link" VARCHAR(300) NOT NULL,

    CONSTRAINT "Noticia_pkey" PRIMARY KEY ("notId")
);

-- CreateTable
CREATE TABLE "Cultura" (
    "id_cultura" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" VARCHAR(500),
    "imagem_link" VARCHAR(300),

    CONSTRAINT "Cultura_pkey" PRIMARY KEY ("id_cultura")
);

-- CreateTable
CREATE TABLE "VerificationRequest" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoPessoa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "TipoPessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriaPessoa" (
    "categ_pessoa_id" SERIAL NOT NULL,
    "codigo" INTEGER NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "CategoriaPessoa_pkey" PRIMARY KEY ("categ_pessoa_id")
);

-- CreateTable
CREATE TABLE "ComercioInternacionalNoticia" (
    "cint_id" INTEGER NOT NULL,
    "com_int_com_int_id" INTEGER NOT NULL,
    "not_not_id" INTEGER NOT NULL,

    CONSTRAINT "ComercioInternacionalNoticia_pkey" PRIMARY KEY ("cint_id")
);

-- CreateTable
CREATE TABLE "ComercioInternacionalProduto" (
    "cipi_id" INTEGER NOT NULL,
    "prd_inac_prd_inac_id" INTEGER NOT NULL,
    "com_int_com_int_id" INTEGER NOT NULL,

    CONSTRAINT "ComercioInternacionalProduto_pkey" PRIMARY KEY ("cipi_id")
);

-- CreateTable
CREATE TABLE "ComercioInternacional" (
    "com_int_id" INTEGER NOT NULL,
    "nome" VARCHAR(50),
    "valor" DOUBLE PRECISION,
    "dt_valor" TIMESTAMP(3),
    "categoria" VARCHAR(1),
    "descrição" VARCHAR(300),

    CONSTRAINT "ComercioInternacional_pkey" PRIMARY KEY ("com_int_id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "empresa_id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "serial" BIGINT NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("empresa_id")
);

-- CreateTable
CREATE TABLE "Endereco" (
    "endereco_id" SERIAL NOT NULL,
    "logradouro" VARCHAR(100) NOT NULL,
    "numero" INTEGER NOT NULL,
    "bairro" VARCHAR(100) NOT NULL,
    "complemento" VARCHAR(100) NOT NULL,
    "cidade" VARCHAR(100) NOT NULL,
    "estado" VARCHAR(2),
    "cep" INTEGER,
    "pais" VARCHAR(100) NOT NULL,
    "pessoa_pess_pessoa_id" INTEGER NOT NULL,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("endereco_id")
);

-- CreateTable
CREATE TABLE "Estoque" (
    "estoque_id" SERIAL NOT NULL,
    "produto" VARCHAR(50) NOT NULL,
    "categoriaculturaId" INTEGER,
    "tipo" VARCHAR(1) NOT NULL,
    "descricao" VARCHAR(2000) NOT NULL,
    "qtd" DOUBLE PRECISION NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "unidade_medida" VARCHAR(5) NOT NULL,
    "imagem_link" VARCHAR(300),

    CONSTRAINT "Estoque_pkey" PRIMARY KEY ("estoque_id")
);

-- CreateTable
CREATE TABLE "FormaPagamento" (
    "form_pag_id" INTEGER NOT NULL,
    "codigo" INTEGER NOT NULL,
    "tipo" VARCHAR(30) NOT NULL,

    CONSTRAINT "FormaPagamento_pkey" PRIMARY KEY ("form_pag_id")
);

-- CreateTable
CREATE TABLE "HistoricoEstoque" (
    "hist_estq_id" SERIAL NOT NULL,
    "dt_alter" TIMESTAMP(3) NOT NULL,
    "hora_alter" VARCHAR(5) NOT NULL,
    "valor_alter" DOUBLE PRECISION NOT NULL,
    "comprador" BOOLEAN NOT NULL DEFAULT false,
    "estoque_estoque_id" INTEGER NOT NULL,
    "venda_venda_id" INTEGER NOT NULL,
    "usuario_usuario_id" TEXT NOT NULL,

    CONSTRAINT "HistoricoEstoque_pkey" PRIMARY KEY ("hist_estq_id")
);

-- CreateTable
CREATE TABLE "HistoricoValores" (
    "hist_valores_id" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "dt_valor_hist" TIMESTAMP(3) NOT NULL,
    "com_int_com_int_id" INTEGER NOT NULL,

    CONSTRAINT "HistoricoValores_pkey" PRIMARY KEY ("hist_valores_id")
);

-- CreateTable
CREATE TABLE "Imagem" (
    "imagem_id" INTEGER NOT NULL,
    "imagem" VARCHAR(200) NOT NULL,

    CONSTRAINT "Imagem_pkey" PRIMARY KEY ("imagem_id")
);

-- CreateTable
CREATE TABLE "Mensagem" (
    "mensagem_id" INTEGER NOT NULL,
    "descricao" VARCHAR(100) NOT NULL,

    CONSTRAINT "Mensagem_pkey" PRIMARY KEY ("mensagem_id")
);

-- CreateTable
CREATE TABLE "Moeda" (
    "sigla" VARCHAR(10) NOT NULL,
    "nome" VARCHAR(40) NOT NULL,
    "codigo_bandeira" VARCHAR(40) NOT NULL,

    CONSTRAINT "Moeda_pkey" PRIMARY KEY ("sigla")
);

-- CreateTable
CREATE TABLE "Pessoa" (
    "pess_pessoa_id" SERIAL NOT NULL,
    "pess_email" VARCHAR(50) NOT NULL,
    "imagem_link" VARCHAR(300),
    "categ_pess_categ_pessoa_id" INTEGER NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("pess_pessoa_id")
);

-- CreateTable
CREATE TABLE "PessoaFisica" (
    "pess_pessoa_id" SERIAL NOT NULL,
    "pepf_nome" VARCHAR(100) NOT NULL,
    "pepf_cpf" BIGINT NOT NULL,
    "pepf_dt_nascimento" TIMESTAMP(3) NOT NULL,
    "pepf_rg" BIGINT,

    CONSTRAINT "PessoaFisica_pkey" PRIMARY KEY ("pess_pessoa_id")
);

-- CreateTable
CREATE TABLE "PessoaJuridica" (
    "pess_pessoa_id" SERIAL NOT NULL,
    "psjr_razao_social" VARCHAR(100) NOT NULL,
    "psjr_cnpj" BIGINT NOT NULL,
    "psjr_insc_esta" BIGINT NOT NULL,
    "psjr_nome_fant" VARCHAR(100),

    CONSTRAINT "PessoaJuridica_pkey" PRIMARY KEY ("pess_pessoa_id")
);

-- CreateTable
CREATE TABLE "ProdutoInac" (
    "prd_inac_id" INTEGER NOT NULL,
    "pais" VARCHAR(30) NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "total_exp_val_pais" DOUBLE PRECISION,

    CONSTRAINT "ProdutoInac_pkey" PRIMARY KEY ("prd_inac_id")
);

-- CreateTable
CREATE TABLE "Telefone" (
    "telefone_id" SERIAL NOT NULL,
    "tipo" VARCHAR(30) NOT NULL,
    "numero" VARCHAR(30) NOT NULL,
    "pessoa_pess_pessoa_id" INTEGER NOT NULL,

    CONSTRAINT "Telefone_pkey" PRIMARY KEY ("telefone_id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "senha" VARCHAR(14) NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "alterarSenha" BOOLEAN NOT NULL DEFAULT false,
    "imagem_link" VARCHAR(300),
    "inativado" BOOLEAN NOT NULL DEFAULT false,
    "email" VARCHAR(300),
    "esp1" VARCHAR(20),
    "esp2" VARCHAR(20),
    "empresa_empresa_id" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venda" (
    "venda_id" SERIAL NOT NULL,
    "dt_venda" TIMESTAMP(3) NOT NULL,
    "valor_venda" DOUBLE PRECISION NOT NULL,
    "qtd_venda" DOUBLE PRECISION NOT NULL,
    "desconto" DOUBLE PRECISION,

    CONSTRAINT "Venda_pkey" PRIMARY KEY ("venda_id")
);

-- CreateTable
CREATE TABLE "VendaEstoque" (
    "vest_id" SERIAL NOT NULL,
    "prc_prop" DOUBLE PRECISION NOT NULL,
    "estoque_estoque_id" INTEGER NOT NULL,
    "venda_venda_id" INTEGER NOT NULL,

    CONSTRAINT "VendaEstoque_pkey" PRIMARY KEY ("vest_id")
);

-- CreateTable
CREATE TABLE "VendaFormaPagamento" (
    "vfpag_id" SERIAL NOT NULL,
    "venda_venda_id" INTEGER NOT NULL,
    "forma_pagamento_form_pag_id" INTEGER NOT NULL,

    CONSTRAINT "VendaFormaPagamento_pkey" PRIMARY KEY ("vfpag_id")
);

-- CreateTable
CREATE TABLE "VendaPessoa" (
    "vpes_id" SERIAL NOT NULL,
    "venda_venda_id" INTEGER NOT NULL,
    "pessoa_pess_pessoa_id" INTEGER NOT NULL,
    "tipo_pessoa" VARCHAR(15) NOT NULL,

    CONSTRAINT "VendaPessoa_pkey" PRIMARY KEY ("vpes_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_providerId_providerAccountId_key" ON "Account"("providerId", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Session_accessToken_key" ON "Session"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationRequest_token_key" ON "VerificationRequest"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationRequest_identifier_token_key" ON "VerificationRequest"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "ComercioInternacionalNoticia_com_int_com_int_id_key" ON "ComercioInternacionalNoticia"("com_int_com_int_id");

-- CreateIndex
CREATE UNIQUE INDEX "ComercioInternacionalProduto_com_int_com_int_id_prd_inac_pr_key" ON "ComercioInternacionalProduto"("com_int_com_int_id", "prd_inac_prd_inac_id");

-- CreateIndex
CREATE UNIQUE INDEX "VendaEstoque_venda_venda_id_estoque_estoque_id_key" ON "VendaEstoque"("venda_venda_id", "estoque_estoque_id");

-- CreateIndex
CREATE UNIQUE INDEX "VendaFormaPagamento_forma_pagamento_form_pag_id_venda_venda_key" ON "VendaFormaPagamento"("forma_pagamento_form_pag_id", "venda_venda_id");

-- CreateIndex
CREATE UNIQUE INDEX "VendaPessoa_venda_venda_id_pessoa_pess_pessoa_id_key" ON "VendaPessoa"("venda_venda_id", "pessoa_pess_pessoa_id");

-- AddForeignKey
ALTER TABLE "ComercioCommoditiesCotacoes" ADD CONSTRAINT "ComercioCommoditiesCotacoes_commodity_id_fkey" FOREIGN KEY ("commodity_id") REFERENCES "ComercioCommodities"("commodity_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComercioCommoditiesVariacaoPreco" ADD CONSTRAINT "ComercioCommoditiesVariacaoPreco_commodity_id_fkey" FOREIGN KEY ("commodity_id") REFERENCES "ComercioCommodities"("commodity_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noticia" ADD CONSTRAINT "Noticia_id_autor_fkey" FOREIGN KEY ("id_autor") REFERENCES "Autor"("autor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noticia" ADD CONSTRAINT "Noticia_id_cultura_fkey" FOREIGN KEY ("id_cultura") REFERENCES "Cultura"("id_cultura") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComercioInternacionalNoticia" ADD CONSTRAINT "ComercioInternacionalNoticia_com_int_com_int_id_fkey" FOREIGN KEY ("com_int_com_int_id") REFERENCES "ComercioInternacional"("com_int_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComercioInternacionalNoticia" ADD CONSTRAINT "ComercioInternacionalNoticia_not_not_id_fkey" FOREIGN KEY ("not_not_id") REFERENCES "Noticia"("notId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComercioInternacionalProduto" ADD CONSTRAINT "ComercioInternacionalProduto_prd_inac_prd_inac_id_fkey" FOREIGN KEY ("prd_inac_prd_inac_id") REFERENCES "ProdutoInac"("prd_inac_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComercioInternacionalProduto" ADD CONSTRAINT "ComercioInternacionalProduto_com_int_com_int_id_fkey" FOREIGN KEY ("com_int_com_int_id") REFERENCES "ComercioInternacional"("com_int_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_pessoa_pess_pessoa_id_fkey" FOREIGN KEY ("pessoa_pess_pessoa_id") REFERENCES "Pessoa"("pess_pessoa_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estoque" ADD CONSTRAINT "Estoque_categoriaculturaId_fkey" FOREIGN KEY ("categoriaculturaId") REFERENCES "Cultura"("id_cultura") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoEstoque" ADD CONSTRAINT "HistoricoEstoque_estoque_estoque_id_fkey" FOREIGN KEY ("estoque_estoque_id") REFERENCES "Estoque"("estoque_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoEstoque" ADD CONSTRAINT "HistoricoEstoque_venda_venda_id_fkey" FOREIGN KEY ("venda_venda_id") REFERENCES "Venda"("venda_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoEstoque" ADD CONSTRAINT "HistoricoEstoque_usuario_usuario_id_fkey" FOREIGN KEY ("usuario_usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoValores" ADD CONSTRAINT "HistoricoValores_com_int_com_int_id_fkey" FOREIGN KEY ("com_int_com_int_id") REFERENCES "ComercioInternacional"("com_int_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pessoa" ADD CONSTRAINT "Pessoa_categ_pess_categ_pessoa_id_fkey" FOREIGN KEY ("categ_pess_categ_pessoa_id") REFERENCES "CategoriaPessoa"("categ_pessoa_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PessoaFisica" ADD CONSTRAINT "PessoaFisica_pess_pessoa_id_fkey" FOREIGN KEY ("pess_pessoa_id") REFERENCES "Pessoa"("pess_pessoa_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PessoaJuridica" ADD CONSTRAINT "PessoaJuridica_pess_pessoa_id_fkey" FOREIGN KEY ("pess_pessoa_id") REFERENCES "Pessoa"("pess_pessoa_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Telefone" ADD CONSTRAINT "Telefone_pessoa_pess_pessoa_id_fkey" FOREIGN KEY ("pessoa_pess_pessoa_id") REFERENCES "Pessoa"("pess_pessoa_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_empresa_empresa_id_fkey" FOREIGN KEY ("empresa_empresa_id") REFERENCES "Empresa"("empresa_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendaEstoque" ADD CONSTRAINT "VendaEstoque_estoque_estoque_id_fkey" FOREIGN KEY ("estoque_estoque_id") REFERENCES "Estoque"("estoque_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendaEstoque" ADD CONSTRAINT "VendaEstoque_venda_venda_id_fkey" FOREIGN KEY ("venda_venda_id") REFERENCES "Venda"("venda_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendaFormaPagamento" ADD CONSTRAINT "VendaFormaPagamento_venda_venda_id_fkey" FOREIGN KEY ("venda_venda_id") REFERENCES "Venda"("venda_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendaFormaPagamento" ADD CONSTRAINT "VendaFormaPagamento_forma_pagamento_form_pag_id_fkey" FOREIGN KEY ("forma_pagamento_form_pag_id") REFERENCES "FormaPagamento"("form_pag_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendaPessoa" ADD CONSTRAINT "VendaPessoa_venda_venda_id_fkey" FOREIGN KEY ("venda_venda_id") REFERENCES "Venda"("venda_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendaPessoa" ADD CONSTRAINT "VendaPessoa_pessoa_pess_pessoa_id_fkey" FOREIGN KEY ("pessoa_pess_pessoa_id") REFERENCES "Pessoa"("pess_pessoa_id") ON DELETE RESTRICT ON UPDATE CASCADE;
