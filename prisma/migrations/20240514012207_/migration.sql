/*
  Warnings:

  - A unique constraint covering the columns `[id,belongsToId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Image_id_belongsToId_key" ON "Image"("id", "belongsToId");
