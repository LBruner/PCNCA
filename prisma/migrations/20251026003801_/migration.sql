-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_empresa_empresa_id_fkey";

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "empresa_empresa_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_empresa_empresa_id_fkey" FOREIGN KEY ("empresa_empresa_id") REFERENCES "Empresa"("empresa_id") ON DELETE SET NULL ON UPDATE CASCADE;
