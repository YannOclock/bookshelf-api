const Joi = require('joi');

module.exports = Joi.object({
    "isbn": Joi.string().length(13),
    "original_title": Joi.string(),
    "title": Joi.string(),
    "excerpt": Joi.string().length(20),
    "publication_date": Joi.date().timestamp(),
    "language": Joi.string().length(2),
    "page_count": Joi.number().integer(),
    "cover": Joi.string().uri(),
    "publisher_id": Joi.number().integer()
}).required();