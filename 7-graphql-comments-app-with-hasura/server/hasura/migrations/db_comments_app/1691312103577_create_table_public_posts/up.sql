CREATE TABLE "public"."posts" ("id" serial NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "shortDescription" text NOT NULL, "cover" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));
