/*
  Warnings:

  - You are about to drop the column `explanation` on the `Opinion` table. All the data in the column will be lost.
  - You are about to drop the column `school` on the `Opinion` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `Opinion` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Topic` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Topic` table. All the data in the column will be lost.
  - Added the required column `methodologyNote` to the `Opinion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reasoning` to the `Opinion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scholarId` to the `Opinion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verificationStatus` to the `Opinion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Topic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Opinion" DROP COLUMN "explanation",
DROP COLUMN "school",
DROP COLUMN "source",
ADD COLUMN     "methodologyNote" TEXT NOT NULL,
ADD COLUMN     "reasoning" TEXT NOT NULL,
ADD COLUMN     "scholarId" INTEGER NOT NULL,
ADD COLUMN     "verificationStatus" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "question" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Scholar" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "school" TEXT NOT NULL,

    CONSTRAINT "Scholar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" SERIAL NOT NULL,
    "reference" TEXT NOT NULL,
    "opinionId" INTEGER NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvidenceReference" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "opinionId" INTEGER NOT NULL,

    CONSTRAINT "EvidenceReference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubmittedQuestion" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubmittedQuestion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Opinion" ADD CONSTRAINT "Opinion_scholarId_fkey" FOREIGN KEY ("scholarId") REFERENCES "Scholar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_opinionId_fkey" FOREIGN KEY ("opinionId") REFERENCES "Opinion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvidenceReference" ADD CONSTRAINT "EvidenceReference_opinionId_fkey" FOREIGN KEY ("opinionId") REFERENCES "Opinion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
