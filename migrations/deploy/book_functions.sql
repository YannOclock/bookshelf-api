-- Deploy bookshelf:book_functions to pg

BEGIN;

-- récupérer tout les livres
-- Cette fonction va renvoyé plusieurs enregistrement de type book
-- un set d'enregistrement
-- Et en p^lus on peut se servir de la vue précédemment créer qui a elle aussi sont type d'enregistrement
CREATE FUNCTION get_book() RETURNS SETOF book_with_genre_and_author AS $$
    SELECT * FROM book_with_genre_and_author;
$$ LANGUAGE SQL;

-- récupérer un livre
CREATE FUNCTION get_book(input_id int) RETURNS book_with_genre_and_author AS $$
    SELECT * FROM book_with_genre_and_author WHERE id = input_id;
$$ LANGUAGE SQL;

-- ajouter un livres
CREATE FUNCTION insert_book(book json) RETURNS book AS $$
    INSERT INTO book 
    (
        "isbn", 
        "original_title", 
        "title", 
        "excerpt", 
        "publication_year", 
        "language", 
        "page_count", 
        "cover", 
        "publisher_id"
    ) VALUES 
    (
        book->>'isbn',
        book->>'original_title',
        book->>'title',
        book->>'excerpt',
        (book->>'publication_year')::int,
        book->>'language',
        (book->>'page_count')::int,
        book->>'cover',
        (book->>'publisher_id')::int

    )
	RETURNING *
$$ LANGUAGE SQL;

-- modifier un livre

-- supprimer un livre

COMMIT;
