/*
  Warnings:

  - Changed the type of `belt` on the `rank` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Belt" AS ENUM ('white', 'yellow', 'orange', 'green', 'blue', 'brown', 'black');

-- AlterTable
ALTER TABLE "rank" ALTER COLUMN "belt" TYPE "Belt" USING "belt"::"Belt";
