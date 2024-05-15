/*
  Warnings:

  - Added the required column `name` to the `Package` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PackageName" AS ENUM ('Silver', 'Gold', 'Platinum');

-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "name" "PackageName" NOT NULL;
