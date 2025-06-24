ALTER TABLE "vendor_payments" DROP CONSTRAINT "vendor_payments_vendor_store_id_vendor_stores_id_fk";
--> statement-breakpoint
DROP INDEX "vendor_payment_store_id_idx";--> statement-breakpoint
ALTER TABLE "vendor_stores" ADD COLUMN "store_payment_method_id" integer;--> statement-breakpoint
ALTER TABLE "vendor_stores" ADD COLUMN "is_onboard" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "vendor_stores" ADD CONSTRAINT "vendor_stores_store_payment_method_id_vendor_payments_id_fk" FOREIGN KEY ("store_payment_method_id") REFERENCES "public"."vendor_payments"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vendor_payments" DROP COLUMN "vendor_store_id";