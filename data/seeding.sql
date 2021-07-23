BEGIN;

INSERT INTO "author" ("firstname", "lastname", "birthdate", "deathdate", "nationality") VALUES
('George R.R.', 'Martin', '1948-09-20', NULL, 'US'),
('J.R.R.', 'Tolkien', '1892-01-03', '1973-09-02', 'UK');

INSERT INTO "publisher" ("name", "country") VALUES
('J''ai lu', 'FR') ,
('Pocket', 'FR');

INSERT INTO "genre" ("label")
VALUES ('heroic-fantasy'), 
('médieval fantastique');


INSERT INTO "book" ("original_title", "title", "publisher_id", "isbn", "publication_year", "language", "page_count", "cover") VALUES
('Game of thrones','Le trône de fer',1,'9780596520680', 1996,'FR', 600, 'http://www.domain.com/1.jpg'),
('Game of thrones','Le trône de fer : Le donjon rouge',1,'9780596520681', 1996,'FR', 600, 'http://www.domain.com/1.jpg'),
('Game of thrones','Le trône de fer : La bataille des rois',1,'9780596520682', 1999,'FR', 600, 'http://www.domain.com/1.jpg'),
('Lord of the rings', 'Le seigneur des anneaux : La communauté de l''anneau',2,'9780596520683', 1966,'FR', 600, 'http://www.domain.com/1.jpg'),
('Lord of the rings', 'Le seigneur des anneaux : Les deux tours',2,'9780596520684', 1966,'FR', 600, 'http://www.domain.com/1.jpg'),
('Lord of the rings', 'Le seigneur des anneaux : le retour du roi',2,'9780596520685', 1966,'FR', 600, 'http://www.domain.com/1.jpg');

INSERT INTO "book_has_author" ("book_id", "author_id") VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 2),
(5, 2),
(6, 2);

INSERT INTO "book_has_genre" ("book_id", "genre_id") VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 2),
(5, 2),
(6, 2),
(1, 2),
(2, 2),
(3, 2),
(4, 1),
(5, 1),
(6, 1);

COMMIT;