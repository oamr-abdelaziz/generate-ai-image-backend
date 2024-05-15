-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_packageId_fkey";

-- DropIndex
DROP INDEX "User_packageId_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "packageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE SET NULL ON UPDATE CASCADE;
