const request = require('supertest');
const app = require('../server'); // Make sure server.js exports app
const db = require('../db');

let bookId;

beforeAll(async () => {
  await db.query('DELETE FROM books'); // Clear table before tests
});

afterAll(async () => {
  await db.end(); // Close DB connection after tests
});

describe('Book API CRUD Tests', () => {
  test('should create a new book', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({
        title: 'Test Book',
        author: 'John Doe',
        genre: 'Fiction',
        year: 2023
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Book');
    bookId = res.body.id;
  });

  test('should fetch all books', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('should update the book', async () => {
    const res = await request(app)
      .put(`/api/books/${bookId}`)
      .send({
        title: 'Updated Book',
        author: 'Jane Doe',
        genre: 'Mystery',
        year: 2024
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Book');
  });

  test('should delete the book', async () => {
    const res = await request(app).delete(`/api/books/${bookId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Book deleted successfully');
  });

  test('should return empty result after deletion', async () => {
    const res = await request(app).get('/api/books');
    const bookStillExists = res.body.find(book => book.id === bookId);
    expect(bookStillExists).toBeUndefined();
  });
});
