/*
  Warnings:

  - You are about to alter the column `currentAmount` on the `Goal` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Goal" ALTER COLUMN "currentAmount" SET DATA TYPE DECIMAL(10,2);
