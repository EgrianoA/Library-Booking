var express = require('express');
var router = express.Router();
const bookController = require('../controllers/book/book')

/* GET users listing. */
router.get('/:bookName/:page/:size', bookController.searchBook);
router.get('/genre/:genre/:page/:size', bookController.getBookByGenre);
router.get('/genre', bookController.getBookGenreList);
router.get('/author/:authorName/:page/:size', bookController.getBookByAuthor);

module.exports = router;
