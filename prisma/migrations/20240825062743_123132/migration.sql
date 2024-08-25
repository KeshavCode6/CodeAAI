-- CreateTable
CREATE TABLE "UserChallenges" (
    "challengeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "solved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserChallenges_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserChallenges_challengeId_key" ON "UserChallenges"("challengeId");
