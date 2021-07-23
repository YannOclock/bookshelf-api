-- Deploy bookshelf:book_view to pg

BEGIN;

CREATE VIEW book_with_genre_and_author AS
SELECT book.*, 
array_agg(DISTINCT book_has_genre.genre_id) AS genre_ids,
array_agg(DISTINCT book_has_author.author_id) AS author_ids
FROM book
JOIN book_has_genre ON book_has_genre.book_id = book.id
JOIN book_has_author ON book_has_author.book_id = book.id
GROUP BY book.id;

COMMIT;
