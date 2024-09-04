/*
  Warnings:

  - The `arguments` column on the `challenges` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "challenges" DROP COLUMN "arguments",
ADD COLUMN     "arguments" JSONB[];
