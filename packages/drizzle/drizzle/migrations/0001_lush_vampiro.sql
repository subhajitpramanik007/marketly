CREATE TABLE "consumers" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_id" integer NOT NULL,
	"avatar_id" integer,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"revoked_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "images" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" varchar(255) NOT NULL,
	"file_id" varchar(255),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_id" integer NOT NULL,
	"refresh_token" text NOT NULL,
	"role" "user_role" NOT NULL,
	"expires_at" timestamp NOT NULL,
	"user_agent" varchar(255) NOT NULL,
	"ip_address" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"revoked_at" timestamp
);
--> statement-breakpoint
DROP INDEX "email";--> statement-breakpoint
DROP INDEX "email_role";--> statement-breakpoint
ALTER TABLE "consumers" ADD CONSTRAINT "consumers_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consumers" ADD CONSTRAINT "consumers_avatar_id_images_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."images"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "consumers_account_id_idx" ON "consumers" USING btree ("account_id");--> statement-breakpoint
CREATE UNIQUE INDEX "consumers_email_idx" ON "consumers" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "images_url_idx" ON "images" USING btree ("url");--> statement-breakpoint
CREATE UNIQUE INDEX "sessions_refresh_token_idx" ON "sessions" USING btree ("refresh_token");--> statement-breakpoint
CREATE INDEX "sessions_account_id_idx" ON "sessions" USING btree ("account_id");--> statement-breakpoint
CREATE UNIQUE INDEX "accounts_email_idx" ON "accounts" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "accounts_email_role_idx" ON "accounts" USING btree ("email","role");