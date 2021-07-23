-- Verify bookshelf:book_view on pg

BEGIN;

SELECT id FROM book_with_genre_and_author WHERE false;

ROLLBACK;
