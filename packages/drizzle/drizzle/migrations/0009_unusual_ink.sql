ALTER TABLE "product_images" RENAME COLUMN "url" TO "image_id";--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "file_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "images" ADD COLUMN "alt" varchar(255);--> statement-breakpoint
ALTER TABLE "images" ADD COLUMN "metadata" json DEFAULT '{}'::json;--> statement-breakpoint
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_images" DROP COLUMN "file_id";--> statement-breakpoint
ALTER TABLE "product_images" DROP COLUMN "alt";--> statement-breakpoint
ALTER TABLE "product_images" DROP COLUMN "metadata";