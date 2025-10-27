/*
  Warnings:

  - You are about to drop the column `bloom_color` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `bloom_end` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `bloom_start` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `days_to_maturity` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `foliage_color` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `genus` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `germination_days` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `habit` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `heirloom` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `light_requirements` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `mature_height` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `mature_width` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `moisture_requirements` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `non_gmo` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `organic_seed` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `planting_depth` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `soil_type` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `spacing` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `species` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `sun_shade_info` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `uses` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `variety` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `zone_hardiness` on the `Estoque` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Estoque" DROP COLUMN "bloom_color",
DROP COLUMN "bloom_end",
DROP COLUMN "bloom_start",
DROP COLUMN "days_to_maturity",
DROP COLUMN "foliage_color",
DROP COLUMN "genus",
DROP COLUMN "germination_days",
DROP COLUMN "habit",
DROP COLUMN "heirloom",
DROP COLUMN "light_requirements",
DROP COLUMN "mature_height",
DROP COLUMN "mature_width",
DROP COLUMN "moisture_requirements",
DROP COLUMN "non_gmo",
DROP COLUMN "organic_seed",
DROP COLUMN "planting_depth",
DROP COLUMN "soil_type",
DROP COLUMN "spacing",
DROP COLUMN "species",
DROP COLUMN "sun_shade_info",
DROP COLUMN "uses",
DROP COLUMN "variety",
DROP COLUMN "zone_hardiness",
ADD COLUMN     "alturaMadura" TEXT,
ADD COLUMN     "corDaFolhagem" TEXT,
ADD COLUMN     "diasParaGerminacao" TEXT,
ADD COLUMN     "diasParaMaturidade" TEXT,
ADD COLUMN     "especie" TEXT,
ADD COLUMN     "genero" TEXT,
ADD COLUMN     "infoSolSombra" TEXT,
ADD COLUMN     "requisitosDeLuz" TEXT,
ADD COLUMN     "requisitosDeUmidade" TEXT,
ADD COLUMN     "tipoDeSolo" TEXT,
ADD COLUMN     "variedade" TEXT,
ADD COLUMN     "zonaDeResistencia" TEXT;
