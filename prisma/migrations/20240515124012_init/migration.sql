/*
  Warnings:

  - A unique constraint covering the columns `[packageId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `numberOfTokens` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packageId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "numberOfTokens" BIGINT NOT NULL,
ADD COLUMN     "packageId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL,
    "numberOfTokens" BIGINT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_packageId_key" ON "User"("packageId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
