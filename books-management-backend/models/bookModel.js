const pool = require('../db');

const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      genre TEXT,
      year INT
    )
  `);
};

module.exports = { createTable };
