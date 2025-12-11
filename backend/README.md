# Mai Mai Flowers Backend API

Node.js + Express + SQLite backend for the Mai Mai Flowers e-commerce website.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

**No database installation required!** SQLite is file-based and included with the project.

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
```

Then edit `.env` with your actual values:
- `DATABASE_PATH`: Path to SQLite database file (default: ./database.sqlite)
- `JWT_SECRET`: A secure random string for JWT tokens
- `EMAIL_USER` & `EMAIL_PASSWORD`: Gmail credentials for sending emails (optional)
- `FRONTEND_URL`: Your React app URL (default: http://localhost:5173)

3. **Start the server:**

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Orders (`/api/orders`)
- `POST /api/orders` - Create new order (public or protected)
- `GET /api/orders` - Get all orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `PUT /api/orders/:id/status` - Update order status (admin only)

### Contact (`/api/contact`)
- `POST /api/contact` - Submit contact form (public)
- `GET /api/contact` - Get all messages (admin only)
- `PUT /api/contact/:id/status` - Update message status (admin only)

### Products (`/api/products`)
- `GET /api/products` - Get all products (public)
- `GET /api/products/:id` - Get single product (public)
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

## 🔐 Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 📝 Example Requests

### Register User
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password123"
}
```

### Create Order
```bash
POST http://localhost:5000/api/orders
Content-Type: application/json

{
  "items": [
    {
      "productId": "rose-bouquet",
      "title": "Red Rose Bouquet",
      "price": 45.99,
      "quantity": 2,
      "image": "/p92/images/roses.jpg"
    }
  ],
  "subtotal": 91.98,
  "deliveryFee": 10.00,
  "total": 101.98,
  "customerInfo": {
    "email": "customer@example.com",
    "phone": "555-0123"
  }
}
```

### Submit Contact Form
```bash
POST http://localhost:5000/api/contact
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "555-0123",
  "subject": "Question about delivery",
  "message": "Do you deliver to my area?"
}
```

## 🗄️ Database Models

- **User**: id, username, email, password (hashed), role, timestamps
- **Order**: id, userId, items (JSON), subtotal, deliveryFee, total, status, customerInfo (JSON), timestamps
- **Contact**: id, name, email, phone, subject, message, status, timestamps
- **Product**: id, productId (unique), title, description, price, image, inStock, timestamps

### SQLite Benefits:
- ✅ **Zero configuration** - no separate database server needed
- ✅ **Portable** - entire database is a single file
- ✅ **Perfect for development** and small to medium projects
- ✅ **Easy backup** - just copy the .sqlite file
- ✅ **Fast** - great performance for local development

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes middleware
- Admin-only routes
- Input validation with express-validator
- CORS configuration

## 📧 Email Configuration (Optional)

To enable email notifications for contact form:

1. Use Gmail with App Password:
   - Go to Google Account settings
   - Enable 2-factor authentication
   - Generate an App Password
   - Use that password in `.env`

2. Or use other email services (update `routes/contact.js` transporter config)

## 🔧 Development Tips

- Use [Postman](https://www.postman.com/) or [Thunder Client](https://www.thunderclient.com/) to test API endpoints
- Use [MongoDB Compass](https://www.mongodb.com/products/compass) to view your database
- Check server logs for debugging
- Health check endpoint: `GET /api/health`

## 📦 Project Structure

```
backend/
├── config/
│   └── database.js        # MongoDB connection
├── models/
│   ├── User.js           # User model
│   ├── Order.js          # Order model
│   ├── Contact.js        # Contact model
│   └── Product.js        # Product model
├── routes/
│   ├── auth.js           # Authentication routes
│   ├── orders.js         # Order routes
│   ├── contact.js        # Contact routes
│   └── products.js       # Product routes
├── middleware/
│   └── auth.js           # Auth middleware
├── .env.example          # Environment template
├── .gitignore
├── package.json
├── server.js             # Entry point
└── README.md
```

## 🚨 Important Notes

- Never commit `.env` file to git
- Change `JWT_SECRET` to a secure random string in production
- Use MongoDB Atlas for production (free tier available)
- Consider rate limiting for production deployment
- Add proper error logging (Winston, Morgan, etc.)
