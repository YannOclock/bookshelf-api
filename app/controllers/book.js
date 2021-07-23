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
     * Get one books by its id
     * @param {object} _ express request
     * @param {object} response express response
     * @param {object} next express next function
     */
    book(request, response, next) {
        try {
            const bookId = request.params.id;
            response.json({ data: {} });
        } catch (error) {
            console.error(error);
            response.json({ data: [], error: `A server error occurred, pleaze try again later`});
        }
    }

};

module.exports = bookController;