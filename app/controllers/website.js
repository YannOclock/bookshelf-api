const { response } = require("express");

module.exports = {

    homePage(_, response) {
        response.render('home');
    },

    notFoundPage(_, response) {
        response.status(404).render('error', { message: `404 page not found` })
    }

}