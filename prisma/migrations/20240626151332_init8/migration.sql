/*
  Warnings:

  - You are about to drop the column `location` on the `Branch` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Branch" DROP COLUMN "location",
ADD COLUMN     "locationURL" TEXT;
