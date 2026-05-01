-- CreateTable
CREATE TABLE "student_attendance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "attended" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_attendance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "student_attendance_userId_idx" ON "student_attendance"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "student_attendance_userId_date_key" ON "student_attendance"("userId", "date");

-- AddForeignKey
ALTER TABLE "student_attendance" ADD CONSTRAINT "student_attendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
