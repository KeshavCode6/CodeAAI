/*
  Warnings:

  - The primary key for the `UserChallenges` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "UserChallenges_challengeId_key";

-- AlterTable
ALTER TABLE "UserChallenges" DROP CONSTRAINT "UserChallenges_pkey",
ADD CONSTRAINT "UserChallenges_pkey" PRIMARY KEY ("challengeId");
