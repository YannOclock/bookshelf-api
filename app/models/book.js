/**
 * @typedef book
 * @property id
 * @property isbn
 * @property original_title
 * @property title
 * @property excerpt
 * @property publication_date
 * @property language
 * @property page_count
 * @property cover
 * @property created_at
 * @property updated_at
 */

const CoreModel = require('./core');

class BookModel extends CoreModel {

    static tableName = 'book';

    static fields = [
        "isbn",
        "original_title",
        "title",
        "excerpt",
        "publication_date",
        "language",
        "page_count",
        "cover",
        "publisher_id"
    ];

    constructor(data){
        // execute le constructeur du CoreModel
        super(data);
        this.publisher = `${process.env.API_ENDPOINT}publishers/${data.publisher_id}`;
        /*
        this.genres = data.genre_ids.map(genre_id => `${process.env.API_ENDPOINT}genres/${genre_id}`);
        this.authors = data.author_ids.map(author_id => `${process.env.API_ENDPOINT}authors/${author_id}`);
        */
        
    }

}

module.exports = BookModel;