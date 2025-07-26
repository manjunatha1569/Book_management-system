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

// POST a new book
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

// UPDATE a book using title + author
exports.updateBook = async (req, res) => {
  const { title, author } = req.params;
  const { genre, year } = req.body;
  try {
    const result = await db.query(
      'UPDATE books SET genre = $1, year = $2 WHERE title = $3 AND author = $4 RETURNING *',
      [genre, year, title, author]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update book' });
  }
};

// DELETE a book using title + author
exports.deleteBook = async (req, res) => {
  const { title, author } = req.params;
  try {
    const result = await db.query(
      'DELETE FROM books WHERE title = $1 AND author = $2 RETURNING *',
      [title, author]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete book' });
  }
};
