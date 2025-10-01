# Product Store

A full-stack web application for managing products with a Node.js/Express backend and vanilla JavaScript frontend.

## Features

- **Backend API**: RESTful API for CRUD operations on products
- **Database**: PostgreSQL with Neon serverless database
- **Frontend**: Modern, responsive web interface
- **Security**: Helmet for security headers, CORS enabled
- **Error Handling**: Comprehensive error handling and validation

## Setup Instructions

### 1. Environment Configuration

Create a `.env` file in the root directory with your database credentials:

```env
# Database Configuration
PGHOST=your-neon-host
PGDATABASE=your-database-name
PGUSER=your-username
PGPASSWORD=your-password

# Server Configuration
PORT=3000
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Backend Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The backend will be available at `http://localhost:3000`

### 4. Start the Frontend

In a new terminal window:

```bash
npm run serve-frontend
```

The frontend will be available at `http://localhost:8080`

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

## Project Structure

```
product-store/
├── backend/
│   ├── config/
│   │   └── db.js          # Database configuration
│   ├── controllers/
│   │   └── productController.js  # Product business logic
│   ├── routes/
│   │   └── productRoutes.js       # API routes
│   └── server.js          # Main server file
├── frontend/
│   ├── index.html         # Main HTML file
│   ├── styles.css         # CSS styles
│   └── script.js          # Frontend JavaScript
├── .env                   # Environment variables
└── package.json           # Dependencies and scripts
```

## Database Schema

The `products` table has the following structure:

- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR(255) NOT NULL)
- `image` (VARCHAR(255) NOT NULL)
- `price` (DECIMAL(10, 2) NOT NULL)
- `created_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)

## Troubleshooting

### Database Connection Issues

1. Ensure your `.env` file has the correct database credentials
2. Check that your Neon database is active and accessible
3. Verify the connection string format in `backend/config/db.js`

### Frontend Not Loading

1. Make sure the backend server is running on port 3000
2. Check browser console for any CORS or network errors
3. Ensure the frontend is being served from port 8080

### Common Issues

- **Port conflicts**: Change the PORT in `.env` if 3000 is already in use
- **CORS errors**: The backend has CORS enabled, but check if your frontend URL matches
- **Database errors**: Check Neon dashboard for connection limits or issues

## Development Notes

- The project uses ES6 modules (`"type": "module"` in package.json)
- Database connection is tested before starting the server
- Error handling includes proper HTTP status codes
- Frontend includes form validation and error states
- Responsive design works on mobile and desktop
