BEGIN;

DROP TABLE IF EXISTS "user", "password", "product", "form", "music", "text", "voice", "user_music", "user_text", "user_voice";

CREATE TABLE "user" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "password_id" int NOT NULL REFERENCES "password"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL default(now()),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "password" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "password_title" TEXT NOT NULL,
    "password_text" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL default(now()),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "product" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "product_name" TEXT NOT NULL,
    "product_description" TEXT NOT NULL,
    "product_price" TEXT NOT NULL,
    "product_image" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL default(now()),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "form" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "interlocutor_name" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_postal_address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "installer_name" TEXT NOT NULL,
    "studiocall_interlocutor" TEXT NOT NULL,
    "file_reference" TEXT NOT NULL,
    "user_id" int NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL default(now()),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "music" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "music_category" TEXT NOT NULL,
    "music_title" TEXT NOT NULL,
    "file_music" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL default(now()),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "text" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "text_category" TEXT NOT NULL,
    "template_name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL default(now()),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "voice" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "voice_category" TEXT NOT NULL,
    "voice_title" TEXT NOT NULL,
    "file_voice" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL default(now()),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user_music" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "music_id" INT NOT NULL REFERENCES "music"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL default(now()),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user_text" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "text_id" INT NOT NULL REFERENCES "text"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL default(now()),
    "updated_at" TIMESTAMPTZ
);  

CREATE TABLE "user_voice" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "voice_id" INT NOT NULL REFERENCES "voice"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL default(now()),
    "updated_at" TIMESTAMPTZ
);

COMMIT; 