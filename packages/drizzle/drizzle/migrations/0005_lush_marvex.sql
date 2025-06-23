CREATE TABLE "addresses" (
	"id" serial PRIMARY KEY NOT NULL,
	"address_line_1" varchar(255) NOT NULL,
	"address_line_2" varchar(255),
	"city" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"zip_code" varchar(20) NOT NULL,
	"country" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "vendor_payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"vendor_store_id" integer NOT NULL,
	"payment_provider" varchar(100),
	"payment_account_id" varchar(255),
	"is_payment_setup" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "vendor_stores" ALTER COLUMN "store_address" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "vendor_stores" ALTER COLUMN "store_address" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "vendor_stores" ALTER COLUMN "store_phone_number" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "vendor_stores" ALTER COLUMN "store_phone_number" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "vendor_stores" ADD COLUMN "store_category" text NOT NULL;--> statement-breakpoint
ALTER TABLE "vendor_payments" ADD CONSTRAINT "vendor_payments_vendor_store_id_vendor_stores_id_fk" FOREIGN KEY ("vendor_store_id") REFERENCES "public"."vendor_stores"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "vendor_payment_store_id_idx" ON "vendor_payments" USING btree ("vendor_store_id");--> statement-breakpoint
ALTER TABLE "vendor_stores" ADD CONSTRAINT "vendor_stores_store_address_addresses_id_fk" FOREIGN KEY ("store_address") REFERENCES "public"."addresses"("id") ON DELETE set null ON UPDATE no action;