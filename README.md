# Indonesia Airlines Pilot Management API

A RESTful API for managing pilot data at Indonesia Airlines. This API supports full CRUD operations for pilot records, with JWT-based authentication to ensure only authorized users can access and manage pilot data.

**Base URL:** `https://simple-crud-production-768f.up.railway.app`

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (JSON Web Token)
- **Password Hashing:** bcrypt
- **Deployment:** Railway

---

## Architecture

This project follows a **Layered Architecture** pattern:

```
Routes → Controllers → Services → Repositories
```

- **Routes** — Define API endpoints and attach middleware
- **Controllers** — Handle HTTP request and response
- **Services** — Business logic and input validation
- **Repositories** — All database queries via Prisma ORM

---

## Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/adinovaindra/simple-CRUD.git
cd simple-CRUD

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your values in .env

# Run database migrations
npx prisma migrate deploy

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your_jwt_secret_key"
PORT=3000
```

---

## API Documentation

All pilot endpoints require authentication. Include the JWT token in the request header:

```
Authorization: Bearer <your_token>
```

---

### Authentication

#### Register
```
POST /auth/register
```

Request Body:
```json
{
  "nama": "Adinova Indra Permana",
  "email": "adinova@email.com",
  "password": "yourpassword"
}
```

Response `201 Created`:
```json
{
  "pesan": "User registered!",
  "user": {
    "nama": "Adinova Indra Permana",
    "email": "adinova@email.com"
  }
}
```

---

#### Login
```
POST /auth/login
```

Request Body:
```json
{
  "email": "adinova@email.com",
  "password": "yourpassword"
}
```

Response `200 OK`:
```json
{
  "pesan": "Login success!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> Copy the token and use it as Bearer Token for all pilot endpoints.

---

### Pilot Endpoints

> All endpoints below require `Authorization: Bearer <token>` header.

---

#### Get All Pilots
```
GET /pilot
```

Response `200 OK`:
```json
{
  "pesan": "Daftar Pilot Indonesia Airlines",
  "pilots": [
    {
      "id": 1,
      "nama": "Dino",
      "jamTerbang": 1200
    }
  ]
}
```

---

#### Get Pilot by ID
```
GET /pilot/:id
```

Response `200 OK`:
```json
{
  "pesan": "Pilot dengan ID 1 ditemukan!",
  "Id": 1,
  "Nama": "Dino",
  "Jam Terbang": 1200
}
```

Response `404 Not Found`:
```json
{
  "pesan": "Pilot dengan id 1 tidak ditemukan"
}
```

---

#### Add New Pilot
```
POST /pilot
```

Request Body:
```json
{
  "nama": "Sari",
  "jamTerbang": 1500
}
```

Response `201 Created`:
```json
{
  "pesan": "Pilot Sari berhasil ditambahkan!",
  "pilotAdded": {
    "id": 2,
    "nama": "Sari",
    "jamTerbang": 1500
  }
}
```

---

#### Update Pilot
```
PUT /pilot/:id
```

Request Body:
```json
{
  "nama": "Sari Dewi",
  "jamTerbang": 1600
}
```

Response `200 OK`:
```json
{
  "pesan": "Perubahan data berhasil!",
  "selectedPilot": {
    "id": 2,
    "nama": "Sari Dewi",
    "jamTerbang": 1600
  }
}
```

---

#### Delete Pilot
```
DELETE /pilot/:id
```

Response `200 OK`:
```json
{
  "pesan": "Pilot dengan Id 2 telah dihapus!",
  "pilotDeleted": {
    "id": 2,
    "nama": "Sari Dewi",
    "jamTerbang": 1600
  }
}
```

---

## Error Responses

All errors follow a consistent format:

```json
{
  "pesan": "Error message here"
}
```

| Status Code | Description |
|---|---|
| 400 | Bad Request — invalid or missing input |
| 401 | Unauthorized — missing or expired token |
| 403 | Forbidden — invalid token |
| 404 | Not Found — resource does not exist |
| 500 | Internal Server Error |

---

## Live Demo

Base URL: `https://simple-crud-production-768f.up.railway.app`

You can test all endpoints using [Postman](https://www.postman.com/) or any HTTP client.
