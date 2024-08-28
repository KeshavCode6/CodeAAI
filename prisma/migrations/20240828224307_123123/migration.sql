/*
  Warnings:

  - Changed the type of `args` on the `test_cases` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "test_cases" DROP COLUMN "args",
ADD COLUMN     "args" JSONB NOT NULL;
