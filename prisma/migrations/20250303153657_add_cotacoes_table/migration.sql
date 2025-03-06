/*
  Warnings:

  - You are about to drop the column `categoria_id` on the `ComercioCommodities` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `ComercioCommodities` table. All the data in the column will be lost.
  - You are about to drop the `ComercioCommoditiesCotacoes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dt_valor` to the `ComercioCommoditiesVariacaoPreco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor` to the `ComercioCommoditiesVariacaoPreco` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ComercioCommoditiesCotacoes" DROP CONSTRAINT "ComercioCommoditiesCotacoes_commodity_id_fkey";

-- AlterTable
ALTER TABLE "ComercioCommodities" DROP COLUMN "categoria_id",
DROP COLUMN "descricao";

-- AlterTable
ALTER TABLE "ComercioCommoditiesVariacaoPreco" ADD COLUMN     "dt_valor" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fonte" TEXT,
ADD COLUMN     "valor" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "ComercioCommoditiesCotacoes";
