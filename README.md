
# DevLink Backend

DevLink is a URL shortening and analytics service built with Node.js, Express, and MongoDB. This backend provides RESTful APIs for user authentication, link shortening, click tracking, and analytics.

## Features

- 🔐 User Authentication (Signup & Login with JWT)
- 🔗 URL Shortening with unique short IDs
- 📊 Click Tracking (timestamp, referrer, user-agent, IP)
- 📈 Analytics per user and per link
- 🧪 Unit & integration tests using Jest and Supertest

---

## Tech Stack

- **Node.js + Express**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Bcrypt for password hashing**
- **Jest & Supertest for testing**

---

## Folder Structure

```
devlink-backend/
│
├── controllers/        # Route logic (auth, link, analytics)
├── middlewares/        # Authentication middleware
├── models/             # Mongoose schemas
├── routes/             # Route declarations
├── tests/              # Jest test files
├── .env                # Environment variables
├── app.js              # Express app setup
├── server.js           # App entry point
└── package.json
```

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/AdityaPandeyIIITR/devlink-backend.git
cd devlink-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/devlink
JWT_SECRET=your_jwt_secret
```

### 4. Run the server

```bash
npm start
```

Server will run on `http://localhost:5000`

---

## Running Tests

```bash
npm test
```

Tests cover:
- User signup/login
- Duplicate email rejection
- Short URL creation
- Analytics generation

---

## API Endpoints

### Auth
- `POST /api/auth/signup` – Register a user
- `POST /api/auth/login` – Login and receive JWT

### Links
- `POST /api/links` – Create short URL (auth required)
- `GET /:shortId` – Redirect and log click

### Analytics
- `GET /api/analytics/user/:userId` – Analytics for all links by user
- `GET /api/analytics/link/:linkId` – Analytics for one link

---

## License

MIT License.  
Built with ❤️ by [Aditya Pandey](https://github.com/AdityaPandeyIIITR)
