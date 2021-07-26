const { BookModel } = require('../models/');
const bookController = {

    /**
     * Get list of all books
     * @param {object} _ express request not used
     * @param {object} response express response
     */
    async allBookList(_, response) {
        try {
            const books = await BookModel.find();
            console.log(books);
            response.json({ data: books });
        } catch (error) {
            console.error(error);
            response.json({ data: [], error: `A server error occurred, pleaze try again later`});
        }
    },

    /**
     * Get one book by its id
     * @param {object} _ express request
     * @param {object} response express response
     * @param {object} next express next function
     */
    async book(request, response, next) {
        try {
            const bookId = request.params.id;

            const book = await BookModel.findOne(bookId);

            response.json({ data: book });
        } catch (error) {
            console.error(error);
            response.json({ data: [], error: `A server error occurred, pleaze try again later`});
        }
    },

    /**
     * Add book
     * @param {object} _ express request
     * @param {object} response express response
     * @param {object} next express next function
     */
    async add(request, response, next) {
        try {

            const newBook = new BookModel(request.body)

            const book = await newBook.insert();

            response.json({ data: book });
        } catch (error) {
            console.error(error);
            response.json({ data: [], error: `A server error occurred, pleaze try again later`});
        }
    },

};

module.exports = bookController;