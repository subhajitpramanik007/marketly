ALTER TABLE "accounts" ADD COLUMN "is_onboarded" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "is_verified" boolean DEFAULT false NOT NULL;