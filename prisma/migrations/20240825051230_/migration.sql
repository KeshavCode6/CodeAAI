/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `challenge` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "challenge_name_key" ON "challenge"("name");
