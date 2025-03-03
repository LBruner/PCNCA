/*
  Warnings:

  - You are about to drop the `ComercioCommodities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ComercioCommoditiesCotacoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ComercioCommoditiesVariacaoPreco` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ComercioCommoditiesCotacoes" DROP CONSTRAINT "ComercioCommoditiesCotacoes_commodity_id_fkey";

-- DropForeignKey
ALTER TABLE "ComercioCommoditiesVariacaoPreco" DROP CONSTRAINT "ComercioCommoditiesVariacaoPreco_commodity_id_fkey";

-- DropTable
DROP TABLE "ComercioCommodities";

-- DropTable
DROP TABLE "ComercioCommoditiesCotacoes";

-- DropTable
DROP TABLE "ComercioCommoditiesVariacaoPreco";
