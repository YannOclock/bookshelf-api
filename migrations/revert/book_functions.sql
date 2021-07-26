-- Revert bookshelf:book_functions from pg

BEGIN;

DROP FUNCTION get_book();
DROP FUNCTION get_book(input_id int);
DROP FUNCTION insert_book(bookInput json);
DROP FUNCTION update_book(bookInput json);
DROP FUNCTION delete_book(input_id int);

COMMIT;
