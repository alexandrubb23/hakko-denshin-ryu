-- CreateTable
CREATE TABLE "invitation_token" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invitation_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invitation_token_tokenHash_key" ON "invitation_token"("tokenHash");

-- CreateIndex
CREATE INDEX "invitation_token_userId_idx" ON "invitation_token"("userId");

-- AddForeignKey
ALTER TABLE "invitation_token" ADD CONSTRAINT "invitation_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
