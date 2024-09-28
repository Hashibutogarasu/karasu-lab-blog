-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "path" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD COLUMN     "state" TEXT NOT NULL DEFAULT 'draft';
