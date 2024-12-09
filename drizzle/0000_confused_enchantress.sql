CREATE TABLE IF NOT EXISTS "activites" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "activites_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer,
	"name" varchar(255) NOT NULL,
	"threshold" integer DEFAULT 0,
	"dopamine" integer DEFAULT 0,
	"social" integer DEFAULT 0,
	"accomplishment" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
