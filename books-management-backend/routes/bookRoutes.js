const express = require('express');
const router = express.Router();

const {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');

// ❌ Remove authenticateToken middleware
router.get('/', getAllBooks);
router.post('/', addBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
