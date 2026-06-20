# RoboSpark Backend REST API

This is the production-ready full-stack backend service for **RoboSpark: AI & Robotics Summer Workshop**. It is built using **Node.js, Express, and MongoDB (Mongoose)** following clean architecture patterns and enterprise software standards.

---

## Features
- **Clean Architecture**: Complete separation of configurations, database schemas, request validation rules, controllers, error handlers, and route mappings.
- **Input Validations**: Implements strict payload parameter checks and sanitizations using `express-validator`.
- **Duplicate Prevention**: Rejects duplicate registrations with a `409 Conflict` payload response.
- **Robust Exception Handling**: Global error parsing middleware catching unhandled exceptions and formatting them using a custom `ApiError` class.
- **Spam Protection**: Integrated endpoint rate-limiting using `express-rate-limit` to prevent registration spam.
- **Response GZIP Compression**: Lightweight packet transmission using `compression`.
- **Security Headers**: Standard security configuration using `helmet` and `cors`.

---

## Folder Layout

All application source code resides under the `src/` directory:
```text
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection hook
│   ├── controllers/
│   │   └── enquiry.controller.js # Enquiry logic controllers
│   ├── middlewares/
│   │   ├── error.middleware.js   # Global exception payload formatting
│   │   └── notFound.middleware.js# 404 Route interceptor
│   ├── models/
│   │   └── Enquiry.js            # Mongoose Schema
│   ├── routes/
│   │   └── enquiry.routes.js     # Route mappings & rate limit definitions
│   ├── validators/
│   │   └── enquiry.validator.js  # Schema parameter validations
│   ├── utils/
│   │   ├── ApiError.js           # Custom Error class wrapper
│   │   ├── ApiResponse.js        # Standard Response class wrapper
│   │   └── constants.js          # App constant definitions
│   ├── app.js                    # Express application middlewares mount
│   └── server.js                 # Server bootstrapper & process hooks listener
├── .env                          # Local Environment parameters
├── .gitignore                    # Git file exclusions
├── README.md                     # Backend API manual
└── package.json                  # Dependencies configuration
```

---

## Environment Variables

Create a `.env` file in the root of the `backend/` folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

---

## Installation & Local Runs

### 1. Database Setup
Ensure that you have **MongoDB** installed and running on your system, or set up a cluster on **MongoDB Atlas** and retrieve your connection string.

### 2. Startup Commands
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Boot the local development server (uses `nodemon` to watch server.js change triggers):
   ```bash
   npm run dev
   ```
4. Run in production mode:
   ```bash
   npm start
   ```

---

## API Specifications

### Root Endpoint
- **Endpoint**: `/`
- **Method**: `GET`
- **Response (`200 OK`)**:
  ```json
  {
    "statusCode": 200,
    "data": null,
    "message": "RoboSpark API Running",
    "success": true
  }
  ```

### Health Check Endpoint
- **Endpoint**: `/api/v1/health`
- **Method**: `GET`
- **Response (`200 OK`)**:
  ```json
  {
    "statusCode": 200,
    "data": {
      "status": "OK",
      "uptime": "12s",
      "timestamp": "2026-06-20T08:48:21.000Z"
    },
    "message": "System is running healthy",
    "success": true
  }
  ```

### Enquiry Submission Endpoint
- **Endpoint**: `/api/v1/enquiry`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body Schema**:
  ```json
  {
    "name": "Anjali Gupta",
    "email": "anjali@gmail.com",
    "phone": "9876543210"
  }
  ```

#### Success Response (`201 Created`)
```json
{
  "statusCode": 201,
  "data": {
    "id": "60c72b2f9b1d8b2498b83592",
    "name": "Anjali Gupta",
    "email": "anjali@gmail.com"
  },
  "message": "Registration Successful",
  "success": true
}
```

#### Validation Error Response (`400 Bad Request`)
```json
{
  "success": false,
  "message": "Validation Failed",
  "errors": [
    {
      "field": "phone",
      "message": "Phone number must be exactly 10 digits"
    }
  ]
}
```

#### Duplicate Email Conflict Response (`409 Conflict`)
```json
{
  "success": false,
  "message": "An enquiry with this email address has already been registered",
  "errors": []
}
```

---

## Deployment on Render
1. Create a new **Web Service** on Render.
2. Link your GitHub repository.
3. Configure the settings:
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Under **Environment Variables**, add the config variables defined in `.env` (like `MONGODB_URI`, `PORT`, `NODE_ENV`, and `FRONTEND_URL`).
