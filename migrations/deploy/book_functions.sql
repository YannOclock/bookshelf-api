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
-- Le mot clé STRICT permet de ne même pas exécuté les instruction de la fun tion si jamais les arguments fournis ne correspondent pas au parmètre définis.
-- Il renvoi null directement. sous la forme du type de retour.
CREATE FUNCTION get_book(input_id int) RETURNS book_with_genre_and_author AS $$
    SELECT * FROM book_with_genre_and_author WHERE id = input_id;
$$ LANGUAGE SQL STRICT;
-- Ua final dans l'appli on verifie sur le retour est null ou pas, pour savoir si cela c'est bien passé.

-- ajouter un livres
CREATE FUNCTION insert_book(bookInput json) RETURNS book AS $$
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
        bookInput->>'isbn',
        bookInput->>'original_title',
        bookInput->>'title',
        bookInput->>'excerpt',
        (bookInput->>'publication_year')::int,
        bookInput->>'language',
        (bookInput->>'page_count')::int,
        bookInput->>'cover',
        (bookInput->>'publisher_id')::int

    )
	RETURNING *
$$ LANGUAGE SQL STRICT;

-- modifier un livre
CREATE FUNCTION update_book(bookInput json) RETURNS book AS $$
    UPDATE book 
    SET
    "isbn" = bookInput->>'isbn', 
    "original_title" = bookInput->>'original_title', 
    "title" = bookInput->>'title', 
    "excerpt" = bookInput->>'excerpt', 
    "publication_year" = (bookInput->>'publication_year')::int, 
    "language" = bookInput->>'language', 
    "page_count" = (bookInput->>'page_count')::int, 
    "cover" = bookInput->>'cover', 
    "publisher_id" = (bookInput->>'publisher_id')::int
    WHERE id = (bookInput->>'id')::int
	RETURNING *
$$ LANGUAGE SQL STRICT;

-- supprimer un livre
-- Cas particulier du delete, il ne renvoi rien, mais une fonction en SQL doit TOUJOURS renvoyer quelque chose. Ici on renvoi du néant pour "hacker" la contrainte.
CREATE FUNCTION delete_book(input_id int) RETURNS void AS $$
    DELETE FROM book WHERE id = input_id
$$ LANGUAGE SQL;

COMMIT;
