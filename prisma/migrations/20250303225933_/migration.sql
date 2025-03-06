/*
  Warnings:

  - You are about to drop the column `dt_valor` on the `ComercioCommoditiesVariacaoPreco` table. All the data in the column will be lost.
  - You are about to drop the column `variacao` on the `ComercioCommoditiesVariacaoPreco` table. All the data in the column will be lost.
  - Added the required column `data` to the `ComercioCommoditiesVariacaoPreco` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ComercioCommoditiesVariacaoPreco" DROP COLUMN "dt_valor",
DROP COLUMN "variacao",
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL;
