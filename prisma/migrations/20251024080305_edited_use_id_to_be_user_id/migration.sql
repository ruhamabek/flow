/*
  Warnings:

  - You are about to drop the column `useId` on the `Credential` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,name]` on the table `Credential` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Credential` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Credential_useId_name_key";

-- AlterTable
ALTER TABLE "public"."Credential" DROP COLUMN "useId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Credential_userId_name_key" ON "public"."Credential"("userId", "name");
