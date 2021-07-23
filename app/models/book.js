const CoreModel = require('./core');

class BookModel extends CoreModel {

    static tableName = 'book_with_genre_and_author';

    static fields = [
        "id",
        "isbn",
        "orginal_title",
        "title",
        "excerpt",
        "publication_date",
        "language",
        "page_count",
        "cover",
        "created_at",
        "updated_at"
    ];

    constructor(data){
        // execute le constructeur du CoreModel
        super(data);
        this.publisher = `${process.env.API_ENDPOINT}publishers/${data.publisher_id}`;
        this.genres = data.genre_ids.map(genre_id => `${process.env.API_ENDPOINT}genres/${genre_id}`);
        this.authors = data.author_ids.map(author_id => `${process.env.API_ENDPOINT}authors/${author_id}`);
        
    }

}

module.exports = BookModel;