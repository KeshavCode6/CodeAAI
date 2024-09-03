/*
  Warnings:

  - You are about to drop the column `isDaily` on the `challenges` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "challenges" DROP COLUMN "isDaily";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "pointsOverTime" JSONB NOT NULL DEFAULT '{}';

-- CreateTable
CREATE TABLE "Stats" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "totalChallenges" INTEGER NOT NULL,
    "totalPoints" INTEGER NOT NULL,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);
