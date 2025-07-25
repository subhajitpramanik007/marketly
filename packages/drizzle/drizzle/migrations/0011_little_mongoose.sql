ALTER TABLE "wishlists" DROP CONSTRAINT "wishlists_consumer_id_consumers_id_fk";
--> statement-breakpoint
DROP INDEX "wishlists_consumer_id_idx";--> statement-breakpoint
ALTER TABLE "wishlists" ADD COLUMN "account_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "wishlists_account_id_idx" ON "wishlists" USING btree ("account_id");--> statement-breakpoint
ALTER TABLE "wishlists" DROP COLUMN "consumer_id";