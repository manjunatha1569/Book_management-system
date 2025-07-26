const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// 📦 Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🧾 Middleware
app.use(cors());
app.use(express.json());

// 🔍 Log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ➡️  ${req.method} ${req.url}`);
  next();
});

// ✅ API Routes
const bookRoutes = require('./routes/bookRoutes');
app.use('/api/books', bookRoutes);

// 🔗 Root Route
app.get('/', (req, res) => {
  res.send('📚 Book Management API is running...');
});

// 🚀 Start server only if not testing
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
  });
} else {
  module.exports = app; // For testing with Jest / Supertest
}
