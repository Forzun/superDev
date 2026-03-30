/*
  Warnings:

  - Added the required column `maxPoint` to the `Challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notionDoc` to the `Challenge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Challenge" ADD COLUMN     "maxPoint" INTEGER NOT NULL,
ADD COLUMN     "notionDoc" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ContentSubmission" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
