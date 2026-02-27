```markdown
# TrueMinds Food Ordering System - Backend API

A secure, role-based backend API built for the TrueMinds Food Ordering System. This RESTful API handles user authentication, menu management, and secure order processing with server-side price calculations.

## 🚀 Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Language:** TypeScript
* **Authentication:** JSON Web Tokens (JWT) & bcrypt

## ✨ Core Features
* **User Authentication:** Secure signup and login functionality with password hashing.
* **Role-Based Access Control (RBAC):** Middleware-driven authorization separating standard `user` accounts from `admin` restaurant managers.
* **Menu Management:** Admins can dynamically add new food items, update availability, and manage prices.
* **Secure Checkout:** Order totals are strictly calculated server-side using database price snapshots to prevent frontend manipulation.
* **Order Tracking:** Users can fetch their complete order history and track the status of current orders.

## 🛠️ Installation & Setup

1. **Clone the repository:**
   git clone https://github.com/Idowu-David/trueminds-backend-deliverable

   cd trueminds-backend-delieverable

2. **Install dependencies:**
npm install

3. **Set up Environment Variables:**
Create a `.env` file in the root directory and add the following keys:
```env
PORT=3000
JWT_SECRET_KEY=your_super_secret_jwt_key_here

```


4. **Start the development server:**
```bash
npm run dev

```


The server will start running on `http://localhost:3000`.

## 📡 API Endpoints Overview

### Authentication (`/api/auth`)

* `POST /signup` - Register a new user (Supports optional Admin secret key).
* `POST /login` - Authenticate a user and return a JWT.

### Menu (`/api/menu`)

* `GET /` - Fetch all available menu items.
* `GET /:id` - Fetch details of a specific food item.
* `POST /` - Add a new menu item *(Admin only)*.

### Orders (`/api/orders`)

* `POST /` - Submit a shopping cart and place a new order *(Protected)*.
* `GET /` - Fetch order history for the logged-in user *(Protected)*.
* `GET /:id` - Fetch details of a specific order *(Protected)*.
* `PATCH /:id/status` - Update the preparation/delivery status of an order *(Admin only)*.

## 👨‍💻 Author

**David Idowu** | Full-Stack Web Developer

```
