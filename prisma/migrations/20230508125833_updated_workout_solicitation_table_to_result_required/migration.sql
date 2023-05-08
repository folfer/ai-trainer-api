/*
  Warnings:

  - Made the column `result` on table `workout-solicitations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "workout-solicitations" ALTER COLUMN "result" SET NOT NULL;
