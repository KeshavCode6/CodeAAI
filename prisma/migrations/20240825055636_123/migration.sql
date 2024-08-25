/*
  Warnings:

  - You are about to drop the `challenge` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "test_cases" DROP CONSTRAINT "test_cases_challengeId_fkey";

-- DropTable
DROP TABLE "challenge";

-- CreateTable
CREATE TABLE "challenges" (
    "id" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "arguments" TEXT[],
    "points" INTEGER NOT NULL DEFAULT 0,
    "isDaily" BOOLEAN NOT NULL DEFAULT false,
    "solves" INTEGER DEFAULT 0,
    "authorId" TEXT NOT NULL,
    "creationTimestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "challenges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "challenges_challengeId_key" ON "challenges"("challengeId");

-- CreateIndex
CREATE UNIQUE INDEX "challenges_name_key" ON "challenges"("name");

-- AddForeignKey
ALTER TABLE "test_cases" ADD CONSTRAINT "test_cases_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;
