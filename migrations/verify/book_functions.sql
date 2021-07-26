-- Verify bookshelf:book_functions on pg

BEGIN;

SELECT id FROM get_book();
SELECT id FROM get_book(1);
SELECT id FROM insert_book('{"isbn": "9781234567899","original_title": "the handmaid's tale","title": "La servante écarlante","excerpt": "La servante écarlante n'était pas bleu","publication_date": 1985,"language": "FR","page_count": "300","cover": "http://image.cover.com/tale.jpg","publisher_id": 1
}');
SELECT id FROM update_book('{"id":1,"isbn": "9781234567899","original_title": "the handmaid's tale","title": "La servante écarlante","excerpt": "La servante écarlante n'était pas bleu","publication_date": 1985,"language": "FR","page_count": "300","cover": "http://image.cover.com/tale.jpg","publisher_id": 1
}');
SELECT delete_book(1);

ROLLBACK;
