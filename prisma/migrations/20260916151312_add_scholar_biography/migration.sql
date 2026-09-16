/*
  Warnings:

  - Added the required column `biography` to the `Scholar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scholar" ADD COLUMN     "biography" TEXT NOT NULL;
