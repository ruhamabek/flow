/*
  Warnings:

  - A unique constraint covering the columns `[transactionId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Made the column `transactionId` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Transaction" ALTER COLUMN "transactionId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_transactionId_key" ON "public"."Transaction"("transactionId");
