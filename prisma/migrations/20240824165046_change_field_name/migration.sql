/*
  Warnings:

  - You are about to drop the column `profilePictureUrl` on the `Author` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Author" DROP COLUMN "profilePictureUrl",
ADD COLUMN     "profile_picture_url" TEXT;
