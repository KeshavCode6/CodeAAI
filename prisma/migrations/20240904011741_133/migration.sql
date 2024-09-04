/*
  Warnings:

  - Changed the type of `arguments` on the `challenges` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "challenges" DROP COLUMN "arguments",
ADD COLUMN     "arguments" JSONB NOT NULL;
