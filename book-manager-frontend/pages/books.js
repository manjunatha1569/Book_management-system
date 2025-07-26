import React, { useEffect, useState } from 'react';
import styles from '../styles/books.module.css';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', genre: '', year: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch books on mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/books');
      if (!res.ok) throw new Error('Failed to fetch books');
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error(err);
      setError('Could not load books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, author } = form;

    if (!title.trim() || !author.trim()) {
      alert('Title and Author are required.');
      return;
    }

    const url = isEditing
      ? `http://localhost:5000/api/books/${editingId}`
      : 'http://localhost:5000/api/books';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Something went wrong while saving book!');
      const updatedBook = await res.json();

      if (isEditing) {
        setBooks((prev) =>
          prev.map((book) => (book.id === editingId ? updatedBook : book))
        );
        setIsEditing(false);
        setEditingId(null);
      } else {
        setBooks((prev) => [...prev, updatedBook]);
      }

      setForm({ title: '', author: '', genre: '', year: '' });
    } catch (err) {
      alert('Failed to save book.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error();
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch {
      alert('Failed to delete the book.');
    }
  };

  const handleEdit = (book) => {
    setForm({
      title: book.title,
      author: book.author,
      genre: book.genre,
      year: book.year,
    });
    setIsEditing(true);
    setEditingId(book.id);
  };

  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author} ${book.genre}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>📚 Book Manager</h1>

      <input
        className={styles.searchBar}
        type="text"
        placeholder="🔍 Search by title, author, or genre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="title"
          placeholder="Book Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="author"
          placeholder="Author Name"
          value={form.author}
          onChange={handleChange}
          required
        />
        <input
          name="genre"
          placeholder="Genre"
          value={form.genre}
          onChange={handleChange}
        />
        <input
          name="year"
          placeholder="Year"
          type="number"
          value={form.year}
          onChange={handleChange}
        />
        <button type="submit" className={styles.addBtn}>
          {isEditing ? 'Update Book' : 'Add Book'}
        </button>
        {isEditing && (
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => {
              setIsEditing(false);
              setEditingId(null);
              setForm({ title: '', author: '', genre: '', year: '' });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {loading && <p>Loading books...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <ul className={styles.bookList}>
        {filteredBooks.length === 0 ? (
          <p className={styles.noBooks}>No books found.</p>
        ) : (
          filteredBooks.map((book) => (
            <li key={book.id} className={styles.bookItem}>
              <span>
                <strong>{book.title}</strong> by {book.author} (
                {book.genre || 'N/A'}, {book.year || 'Unknown'})
              </span>
              <div className={styles.actions}>
                <button onClick={() => handleEdit(book)}>Edit</button>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
