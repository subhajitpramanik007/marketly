CREATE TYPE "public"."vendor_staff_roles" AS ENUM('owner', 'manager', 'staff');--> statement-breakpoint
CREATE TABLE "vendor_staffs" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_id" integer NOT NULL,
	"store_id" integer NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255),
	"email" varchar(255) NOT NULL,
	"phone_number" varchar(255),
	"avatar_id" integer,
	"role" "vendor_staff_roles" NOT NULL,
	"added_by" integer,
	"removed_by" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "vendor_stores" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_by_id" integer NOT NULL,
	"store_name" varchar(255) NOT NULL,
	"store_description" varchar(255),
	"store_address" varchar(255),
	"store_phone_number" varchar(255),
	"store_email" varchar(255) NOT NULL,
	"store_logo_id" integer,
	"store_cover_id" integer,
	"is_approved" boolean DEFAULT false NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "vendor_staffs" ADD CONSTRAINT "vendor_staffs_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vendor_staffs" ADD CONSTRAINT "vendor_staffs_store_id_vendor_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."vendor_stores"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vendor_staffs" ADD CONSTRAINT "vendor_staffs_avatar_id_images_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."images"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vendor_stores" ADD CONSTRAINT "vendor_stores_created_by_id_accounts_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."accounts"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vendor_stores" ADD CONSTRAINT "vendor_stores_store_logo_id_images_id_fk" FOREIGN KEY ("store_logo_id") REFERENCES "public"."images"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vendor_stores" ADD CONSTRAINT "vendor_stores_store_cover_id_images_id_fk" FOREIGN KEY ("store_cover_id") REFERENCES "public"."images"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "vendor_staffs_email_idx" ON "vendor_staffs" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "vendor_stores_name_idx" ON "vendor_stores" USING btree ("store_name");--> statement-breakpoint
CREATE UNIQUE INDEX "vendor_stores_email_idx" ON "vendor_stores" USING btree ("store_email");--> statement-breakpoint
CREATE INDEX "vendor_stores_created_by_idx" ON "vendor_stores" USING btree ("created_by_id");--> statement-breakpoint
ALTER TABLE "accounts" DROP COLUMN "name";