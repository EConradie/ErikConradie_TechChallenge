# Todo API - Tech Challenge

A simple **Todo API** built with **Express**, **TypeORM**, and **PostgreSQL**. Supports basic CRUD operations for users and todos.  

---

## Features

- User management (create, read, delete)  
- Todo management (create, read, update, delete)  
- TypeORM for database abstraction  
- PostgreSQL database  
- Automatic database schema synchronization  
- Swagger documentation for API endpoints
- Upload CSV using Multer and csvParser
- OpenAI integration for quick-todo function

---

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18  
- [PostgreSQL](https://www.postgresql.org/) installed locally  
- Optional: [Postman](https://www.postman.com/) or browser for testing  

---

## Setup

1. **Clone the repository**

```bash
git clone < https://github.com/EConradie/ErikConradie_TechChallenge >
cd server
```

2. **Create a PostgreSQL database**

- Open psql or pgAdmin and create a new database:

```bash
CREATE DATABASE todo_api;
```

3. **Create a .env file**

- env.example also provided.
   
```bash
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=yourpassword
DB_NAME=todo_api
JWT_SECRET=replace_with_your_secret

OPENAI_API_KEY=replace_with_your_key

```

- Make sure the username/password matches your local PostgreSQL credentials.

4. **Install dependencies**
   
```bash
npm install
```

5. **Run the app**
```bash
npm run dev
```

- The API will run at http://localhost:5000.

## API Documentation

- Swagger docs are available at:
http://localhost:5000/docs

## Project Structure

```bash
src/
├─ entities/      # TypeORM entities (User, Todo)
├─ controllers/   # Express route controllers
├─ docs/   # Hold document layout for swagger UI
├─ middleware/   # Authentication of users
├─ services/   # Logic of users and todo functions and OPENAI request.
├─ utils/   # Config for swagger multer and csvParser
├─ routes/        # API routes
├─ data-source.ts # TypeORM database configuration
└─ index.ts       # Entry point
```
## Notes

- TypeORM synchronize: Automatically syncs schema with entities. Recommended only for development.

- Reset database: If you want a fresh start, drop and recreate the database in PostgreSQL:

```bash
DROP DATABASE todo_api;
CREATE DATABASE todo_api;
```

- Ensure your PostgreSQL server is running before starting the app.
