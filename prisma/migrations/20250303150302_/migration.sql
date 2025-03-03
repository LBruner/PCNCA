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

-- AddForeignKey
ALTER TABLE "ComercioCommoditiesCotacoes" ADD CONSTRAINT "ComercioCommoditiesCotacoes_commodity_id_fkey" FOREIGN KEY ("commodity_id") REFERENCES "ComercioCommodities"("commodity_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComercioCommoditiesVariacaoPreco" ADD CONSTRAINT "ComercioCommoditiesVariacaoPreco_commodity_id_fkey" FOREIGN KEY ("commodity_id") REFERENCES "ComercioCommodities"("commodity_id") ON DELETE CASCADE ON UPDATE CASCADE;
