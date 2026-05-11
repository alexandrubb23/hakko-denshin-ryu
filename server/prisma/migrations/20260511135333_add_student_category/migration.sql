-- CreateEnum
CREATE TYPE "StudentCategory" AS ENUM ('kid', 'senior');

-- AlterTable
ALTER TABLE "user" ADD COLUMN "category" "StudentCategory";
