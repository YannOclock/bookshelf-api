-- Revert bookshelf:init from pg

BEGIN;

DROP TABLE "book_has_genre";

DROP TABLE "book_has_author";

DROP TABLE "book";

DROP TABLE "genre";

DROP TABLE "publisher";

DROP TABLE "author";

DROP DOMAIN country_iso_code_2;

DROP DOMAIN isbn;

DROP DOMAIN url;

DROP DOMAIN pint;

COMMIT;
