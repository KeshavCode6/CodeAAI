/*
  Warnings:

  - You are about to drop the `challenges` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_challenges` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "test_cases" DROP CONSTRAINT "test_cases_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "user_challenges" DROP CONSTRAINT "user_challenges_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "user_challenges" DROP CONSTRAINT "user_challenges_userId_fkey";

-- DropTable
DROP TABLE "challenges";

-- DropTable
DROP TABLE "user_challenges";

-- CreateTable
CREATE TABLE "challenge" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "arguments" TEXT[],
    "points" INTEGER NOT NULL DEFAULT 0,
    "isDaily" BOOLEAN NOT NULL DEFAULT false,
    "solves" INTEGER DEFAULT 0,
    "authorId" TEXT NOT NULL,
    "creationTimestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "challenge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "test_cases" ADD CONSTRAINT "test_cases_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
