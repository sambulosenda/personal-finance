ALTER TABLE "accounts" RENAME COLUMN "user_Id" TO "user_id";--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "category_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" DROP COLUMN IF EXISTS "user_Id";