-- Revert bookshelf:book_view from pg

BEGIN;

DROP VIEW book_with_genre_and_author;

COMMIT;
