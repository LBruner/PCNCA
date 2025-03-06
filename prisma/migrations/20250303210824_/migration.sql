/*
  Warnings:

  - You are about to drop the column `dt_fim` on the `ComercioCommoditiesVariacaoPreco` table. All the data in the column will be lost.
  - You are about to drop the column `dt_inicio` on the `ComercioCommoditiesVariacaoPreco` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ComercioCommoditiesVariacaoPreco" DROP COLUMN "dt_fim",
DROP COLUMN "dt_inicio";
