const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookController');

router.get('/', controller.getAllBooks);
router.post('/', controller.addBook);
router.put('/:title/:author', controller.updateBook); // title and author in URL
router.delete('/:title/:author', controller.deleteBook); // same here

module.exports = router;
