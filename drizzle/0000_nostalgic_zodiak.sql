CREATE TABLE IF NOT EXISTS "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"user_Id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "update" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
