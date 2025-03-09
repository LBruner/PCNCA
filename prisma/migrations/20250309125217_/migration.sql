-- AlterTable
ALTER TABLE "Estoque" ADD COLUMN     "foi_utilizado" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "unidade_medida" SET DATA TYPE VARCHAR(25);
