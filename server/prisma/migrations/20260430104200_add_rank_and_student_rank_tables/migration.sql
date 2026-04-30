-- CreateTable
CREATE TABLE "rank" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "belt" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "minimumMonths" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_rank" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rankId" INTEGER NOT NULL,
    "awardedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_rank_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rank_name_key" ON "rank"("name");

-- CreateIndex
CREATE UNIQUE INDEX "rank_order_key" ON "rank"("order");

-- CreateIndex
CREATE INDEX "student_rank_userId_idx" ON "student_rank"("userId");

-- CreateIndex
CREATE INDEX "student_rank_rankId_idx" ON "student_rank"("rankId");

-- AddForeignKey
ALTER TABLE "student_rank" ADD CONSTRAINT "student_rank_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_rank" ADD CONSTRAINT "student_rank_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "rank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
