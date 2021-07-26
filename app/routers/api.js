const express = require('express');

const bookController = require('../controllers/book');
const apiController = require('../controllers/api');

const router = express.Router();

router.route('/books')
    .get(bookController.allBookList)
    .post(bookController.add);

router.route('/books/:id(\\d+)')
    .get(bookController.book)
    .put(bookController.update);

router.use(apiController.notFoundResource);

module.exports = router;