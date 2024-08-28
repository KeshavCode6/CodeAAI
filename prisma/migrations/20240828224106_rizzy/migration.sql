/*
  Warnings:

  - The `args` column on the `test_cases` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "test_cases" DROP COLUMN "args",
ADD COLUMN     "args" INTEGER[];
