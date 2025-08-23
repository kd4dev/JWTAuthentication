# Authentication Session Project

## Overview

A Node.js authentication API using JWT, PostgreSQL, and Drizzle ORM. It supports user signup, login, session management, and role-based access (USER/ADMIN). This project demonstrates secure authentication flows, middleware usage, and RESTful API structure.

---

## Tech Stack

- **Node.js** (JavaScript, ES Modules)
- **Express** (Web framework)
- **Drizzle ORM** (Database ORM)
- **PostgreSQL** (Database)
- **JWT (jsonwebtoken)** (Authentication)
- **dotenv** (Environment variables)
- **Docker** (For running PostgreSQL)
- **pnpm** (Package manager)

---

## What You Learned

- Difference between session based and token based authentication
- Pros's and cons's of session based and token based auth  system
- Setting up an Express server with modular routing
- Using Drizzle ORM for database operations
- Implementing JWT authentication and middleware
- Role-based access control (USER/ADMIN)
- Secure password hashing with salt and HMAC
- Error handling and status codes in REST APIs
- Running PostgreSQL in Docker
- Environment variable management with dotenv

---

## How to Run This Project

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd authenticationSession
```

### 2. Install Dependencies

```sh
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```
DATABASE_URL=postgres://postgres:mypassword@localhost:5432/postgres
JWT_SECRET=your_jwt_secret
```

### 4. Start PostgreSQL with Docker

```sh
docker compose up -d
```

### 5. Run Database Migrations

```sh
pnpm db:push
```

### 6. Start the Server

```sh
pnpm dev
```

Server runs on [http://localhost:8000](http://localhost:8000) by default.

---

## API Endpoints

- `POST /user/signup` — Register a new user
- `POST /user/login` — Login and get JWT token
- `GET /user` — Get current user info (requires JWT)
- `PATCH /user` — Update user info (requires JWT)
- `GET /admin/users` — List all users (ADMIN only)

---

## Extra Notes

- Passwords are securely hashed and salted.
- JWT tokens are required for protected routes (`Authorization: Bearer <token>`).
- Role-based access is enforced for admin routes.
- You can explore and manage your database with `pnpm db:studio`.
- For production, change your JWT secret and