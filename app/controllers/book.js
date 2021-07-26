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
            response.json({ data: books });
        } catch (error) {
            console.error(error);

            // Dans le cas d'une erreur serveur on renvoi le code générique 500 insternal server error
            response.status(500).json({ data: [], error: `A server error occurred, pleaze try again later`});
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

            if(!book){
                return next();
            }

            response.json({ data: book });
        } catch (error) {
            console.error(error);
            response.status(500).json({ data: [], error: `A server error occurred, pleaze try again later`});
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

            const book = await newBook.save();

            // Dans le cas d'une insertion, afin d'être le plus précise possible on utilise le code 201 Created
            response.status(201).json({ data: book });
        } catch (error) {
            console.error(error);
            response.status(500).json({ data: [], error: `A server error occurred, pleaze try again later`});
        }
    },

    /**
     * Add book
     * @param {object} _ express request
     * @param {object} response express response
     * @param {object} next express next function
     */
    async update(request, response, next) {
        try {

            const book = await BookModel.findOne(request.params.id);

            if(!book){
                return next();
            }

            book.setData(request.body);

            // Comme save renvoi l'instance on peut "chainer" les methode de l'AR
            //const updatedBook = await book.save().findOne(book.id)
            ;
            //! Par contre attention, findOne est une méthode static, et on ne peut pas utiliser une péthode static sur une instance. donc on ne peut pas faire cela.

            await book.save();

            response.json({ data: book });
        } catch (error) {
            console.error(error);
            response.status(500).json({ data: [], error: `A server error occurred, pleaze try again later`});
        }
    },

    async delete(request, response, next){
        try {

            const book = await BookModel.findOne(request.params.id);

            if(!book){
                return next();
            }

            await book.delete();

            // DAns le cas d'une suppression on ne peut rien renvoyé donc, on précise qu'il ny a pas de contenu. Du côté du front afin de savoir si la suppression c'est bien déroulé, il suffira de tester le code http de retour.
            response.status(204).json();
        } catch (error) {
            console.error(error);
            response.status(500).json({ data: [], error: `A server error occurred, pleaze try again later`});
        }
    }

};

module.exports = bookController;