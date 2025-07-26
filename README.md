#  Book Management System

A full-stack web application that allows users to manage a collection of books with Create, Read, Update, and Delete (CRUD) functionality.

# Tech Stack

Layer       Technology       
 Frontend  | Next.js (React), CSS Modules 
 Backend   | Express.js (Node.js) 
 Database  | YugabyteDB (PostgreSQL-compatible) 
 Language  | JavaScript (ES6) 


# Folder Structure:
 book_management_system/
├── books-management-backend/ # Express + Yugabyte API
├── book-manager-frontend/ # Next.js Frontend UI



## 🧪 How to Run the Project Locally

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/book_management_system.git
cd book_management_system


# Install & start Yugabyte (follow docs: https://docs.yugabyte.com)

# Create the database and table:

CREATE DATABASE book_db;

\c book_db

CREATE TABLE books (
  title TEXT,
  author TEXT,
  genre TEXT,
  year INT
);

#3. Backend Setup (Express)

cd books-management-backend
npm install


#Create a .env file:

 DB_USER=yugabyte
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=5433
DB_DATABASE=book_db

# Run the server:
node server.js


# Frontend Setup (Next.js)

cd ../book-manager-frontend
npm install
npm run dev


#commit it
git add README.md
git commit -m "Add complete README documentation"
git push origin main


