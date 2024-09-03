-- AlterTable
ALTER TABLE "Stats" ADD COLUMN     "totalDailyChallenges" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalEasyChallenges" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalHardChallenges" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalMediumChallenges" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "totalChallenges" SET DEFAULT 0,
ALTER COLUMN "totalPoints" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "dailyChallenges" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "easyChallenges" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "hardChallenges" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mediumChallenges" INTEGER NOT NULL DEFAULT 0;
