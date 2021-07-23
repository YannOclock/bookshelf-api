const CoreModel = require('./core');

class BookModel extends CoreModel {

    static tableName = 'book';

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
        "publisher",
        "created_at",
        "updated_at"
    ];

    constructor(data){
        // execute le constructeur du CoreModel
        super(data);
        this.publisher = `${process.env.API_ENDPOINT}publishers/${data.publisher_id}`;
    }

}

module.exports = BookModel;