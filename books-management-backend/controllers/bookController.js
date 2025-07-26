const db = require('../db');

// GET all books
exports.getAllBooks = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

// POST new book
exports.addBook = async (req, res) => {
  const { title, author, genre, year } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO books (title, author, genre, year) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, author, genre, year]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add book' });
  }
};

// PUT update book
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, year } = req.body;
  try {
    const result = await db.query(
      'UPDATE books SET title=$1, author=$2, genre=$3, year=$4 WHERE id=$5 RETURNING *',
      [title, author, genre, year, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update book' });
  }
};

// DELETE book
exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM books WHERE id = $1', [id]);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete book' });
  }
};
