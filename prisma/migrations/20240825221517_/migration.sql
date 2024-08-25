/*
  Warnings:

  - You are about to drop the column `pointsOverTime` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "pointsOverTime",
ADD COLUMN     "codeLeagueRank" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "solves" INTEGER NOT NULL DEFAULT 0;
