DO $$ BEGIN
 CREATE TYPE "pdf_status" AS ENUM('completed', 'failed', 'pending');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pdf_summaries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"original_file_url" text NOT NULL,
	"summary_text" text,
	"status" "pdf_status" DEFAULT 'pending' NOT NULL,
	"title" text NOT NULL,
	"file_name" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pdf_summaries" ADD CONSTRAINT "pdf_summaries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
