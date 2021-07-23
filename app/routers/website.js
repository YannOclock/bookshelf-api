const express = require('express');

const websiteController = require('../controllers/website');

const router = express.Router();

router.get('/', websiteController.homePage);

router.use(websiteController.notFoundPage);

module.exports = router;