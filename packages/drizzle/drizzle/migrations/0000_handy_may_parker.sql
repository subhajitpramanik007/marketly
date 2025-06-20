CREATE TYPE "public"."user_role" AS ENUM('consumer', 'vendor', 'admin');--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" "user_role" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX "email" ON "accounts" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "email_role" ON "accounts" USING btree ("email","role");