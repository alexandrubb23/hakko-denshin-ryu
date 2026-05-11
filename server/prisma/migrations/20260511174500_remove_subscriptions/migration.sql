-- DropForeignKey
ALTER TABLE IF EXISTS "subscription" DROP CONSTRAINT IF EXISTS "subscription_userId_fkey";

-- DropTable
DROP TABLE IF EXISTS "subscription";

-- DropEnum
DROP TYPE IF EXISTS "SubscriptionPlan";
