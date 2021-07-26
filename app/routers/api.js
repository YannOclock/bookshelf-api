const express = require('express');

const bookController = require('../controllers/book');
const apiController = require('../controllers/api');

const validate = require('../validations/validate');
const bookSchema = require('../validations/schemas/book');
const bookPatchSchema = require('../validations/schemas/bookPatch');

const router = express.Router();

router.route('/books')
    .get(bookController.allBookList)
    .post(validate('body',bookSchema),bookController.add);

router.route('/books/:id(\\d+)')
    .get(bookController.book)
    .patch(validate('body',bookPatchSchema),bookController.update)
    .put(validate('body',bookSchema),bookController.update)
    .delete(bookController.delete);

router.use(apiController.notFoundResource);

module.exports = router;