-- AlterTable
ALTER TABLE "public"."workflow" ADD COLUMN     "cron" TEXT,
ADD COLUMN     "nextRunAt" TIMESTAMP(3);
