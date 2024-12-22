/*
  Warnings:

  - You are about to drop the column `turnstileSitekey` on the `QRCode` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QRCode" DROP COLUMN "turnstileSitekey",
ADD COLUMN     "turnstileSiteKey" TEXT;
