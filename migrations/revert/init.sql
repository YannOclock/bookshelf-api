-- Revert bookshelf:init from pg

BEGIN;

DROP TABLE "book_has_genre","book_has_author","book","genre","publisher","author";

DROP DOMAIN country_iso_code_2;

DROP DOMAIN isbn;

DROP DOMAIN url;

DROP DOMAIN pint;

COMMIT;
