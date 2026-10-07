-- AlterTable
ALTER TABLE "event" ADD COLUMN "slug" TEXT;

-- Backfill: slugify each name (Romanian letters folded to ASCII), numbering
-- repeats by age, e.g. "taikai-2026", "taikai-2026-2"
WITH base AS (
  SELECT "id", "createdAt",
    COALESCE(NULLIF(TRIM(BOTH '-' FROM REGEXP_REPLACE(
      LOWER(TRANSLATE("name", 'ăâîșşțţĂÂÎȘŞȚŢ', 'aaissttAAISSTT')),
      '[^a-z0-9]+', '-', 'g'
    )), ''), 'event') AS "slug"
  FROM "event"
),
numbered AS (
  SELECT "id", "slug",
    ROW_NUMBER() OVER (PARTITION BY "slug" ORDER BY "createdAt", "id") AS "n"
  FROM base
)
UPDATE "event" e
SET "slug" = CASE WHEN n."n" = 1 THEN n."slug" ELSE n."slug" || '-' || n."n" END
FROM numbered n
WHERE e."id" = n."id";

ALTER TABLE "event" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "event_slug_key" ON "event"("slug");
