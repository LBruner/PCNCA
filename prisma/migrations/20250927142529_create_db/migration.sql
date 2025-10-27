/*
  Warnings:

  - You are about to drop the column `id_autor` on the `Noticia` table. All the data in the column will be lost.
  - You are about to drop the `Autor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Noticia" DROP CONSTRAINT "Noticia_id_autor_fkey";

-- AlterTable
ALTER TABLE "Noticia" DROP COLUMN "id_autor";

-- DropTable
DROP TABLE "Autor";
