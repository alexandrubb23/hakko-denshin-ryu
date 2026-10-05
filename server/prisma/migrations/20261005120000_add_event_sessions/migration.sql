-- CreateTable
CREATE TABLE "event_session" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3),

    CONSTRAINT "event_session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "event_session_eventId_startsAt_idx" ON "event_session"("eventId", "startsAt");

-- AddForeignKey
ALTER TABLE "event_session" ADD CONSTRAINT "event_session_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Backfill: every existing event becomes a single session spanning its old range
INSERT INTO "event_session" ("id", "eventId", "startsAt", "endsAt")
SELECT 'ses_' || "id", "id", "startDate", "endDate" FROM "event";
