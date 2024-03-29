-- Deploy bookshelf:init to pg

BEGIN;

CREATE DOMAIN country_iso_code_2 AS text
CHECK (VALUE ~ '^[A-Z]{2}$');
COMMENT ON DOMAIN country_iso_code_2 IS 'check if the country passed with rule ISO 3166-1 alpha-2';

CREATE DOMAIN isbn AS text
CHECK (VALUE ~ '^(?:ISBN(?:-13)?:?●)?(?=[0-9]{13}$|(?=(?:[0-9]+[-●]){4})[-●0-9]{17}$)↵
97[89][-●]?[0-9]{1,5}[-●]?[0-9]+[-●]?[0-9]+[-●]?[0-9]$');
COMMENT ON DOMAIN isbn IS 'check if it is a valid isbn code';

CREATE DOMAIN url AS text
CHECK (VALUE ~ '^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)$');
COMMENT ON DOMAIN url IS 'check if it is an distant or local url';

CREATE DOMAIN pint AS int
CHECK (VALUE >= 0);
COMMENT ON DOMAIN pint IS 'only positive integer is accepted';

CREATE TABLE "publisher" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL UNIQUE,
    "country" country_iso_code_2 NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "author" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" text NOT NULL,
    "lastname" text NOT NULL,
    "nationality" country_iso_code_2 NOT NULL,
    "birthdate" date NOT NULL,
    "deathdate" date,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ,
    UNIQUE ("firstname", "lastname", "nationality", "birthdate")
);

CREATE TABLE "genre" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" text NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "book" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "isbn" text NOT NULL,
    "original_title" text NOT NULL,
    "title" text,
    "excerpt" text,
    "publication_year" int,
    "language" country_iso_code_2 NOT NULL,
    "page_count" pint NOT NULL,
    "cover" text,
    "publisher_id" int NOT NULL REFERENCES "publisher"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "book_has_author" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "book_id" int NOT NULL REFERENCES "book"("id") ON DELETE CASCADE,
    "author_id" int NOT NULL REFERENCES "author"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE ("book_id","author_id")
);

CREATE TABLE "book_has_genre" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "book_id" int NOT NULL REFERENCES "book"("id") ON DELETE CASCADE,
    "genre_id" int NOT NULL REFERENCES "genre"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE ("book_id","genre_id")
);

COMMIT;
