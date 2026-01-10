# E-commerce Full Stack Application

A comprehensive full-stack e-commerce website similar to Amazon, built with Node.js, Express, PostgreSQL, and React.

## Features

### Backend
- **User Authentication & Authorization**: JWT-based authentication with role-based access (user, admin)
- **Product Management**: CRUD operations, search, filtering, sorting, and pagination
- **Shopping Cart**: Add, update, remove items with real-time price calculation
- **Order Management**: Create orders, track status, payment integration support
- **Review System**: Product reviews and ratings with verified purchase badges
- **Category Management**: Hierarchical category structure
- **User Profiles**: Address management, wishlist, order history
- **Admin Panel**: User, product, order, and category management

### Frontend
- **Modern React UI**: Built with React 18 and Vite
- **Responsive Design**: Tailwind CSS with mobile-first approach
- **State Management**: React Context API for auth and cart
- **Routing**: React Router v6 with protected routes
- **Product Browsing**: Advanced filtering, search, and pagination
- **User Dashboard**: Profile management, order tracking
- **Admin Dashboard**: Comprehensive management interface
- **Real-time Notifications**: Toast notifications for user feedback

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **File Upload**: Multer with Cloudinary integration
- **Payment**: Stripe integration ready
- **Email**: Nodemailer

### Frontend
- **Framework**: React 18.2.0
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS v3.3.6
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Notifications**: React Hot Toast
- **SEO**: React Helmet

## Installation

## Installation

### Backend Setup

1. **Navigate to the project root**:
```bash
cd ecommerce-backend
```

2. **Install backend dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
Create a `.env` file in the root directory:
```env
PORT=5000
NODE_ENV=development

# PostgreSQL Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce
DB_USER=postgres
DB_PASSWORD=postgres

# JWT
JWT_SECRET=your_strong_jwt_secret
JWT_EXPIRE=30d

# Cloudinary (optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe (optional)
STRIPE_SECRET_KEY=your_stripe_secret_key

# CORS
FRONTEND_URL=http://localhost:3000
```

4. **Set up PostgreSQL Database**:
```bash
# Install PostgreSQL if not already installed
# Ubuntu/Debian:
sudo apt-get install postgresql postgresql-contrib

# macOS:
brew install postgresql

# Start PostgreSQL service
sudo service postgresql start  # Linux
brew services start postgresql  # macOS

# Create database
psql -U postgres
CREATE DATABASE ecommerce;
\q
```

5. **Run the backend server**:
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The backend server will start on `http://localhost:5000`

### Frontend Setup

1. **Navigate to the frontend directory**:
```bash
cd frontend
```

2. **Install frontend dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

4. **Build for production**:
```bash
npm run build
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Users
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update user profile (Protected)
- `POST /api/users/address` - Add address (Protected)
- `PUT /api/users/address/:id` - Update address (Protected)
- `DELETE /api/users/address/:id` - Delete address (Protected)
- `POST /api/users/wishlist/:productId` - Add to wishlist (Protected)
- `DELETE /api/users/wishlist/:productId` - Remove from wishlist (Protected)
- `GET /api/users` - Get all users (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)

### Products
- `GET /api/products` - Get all products with filters
  - Query params: `page`, `limit`, `search`, `category`, `brand`, `minPrice`, `maxPrice`, `minRating`, `featured`, `sort`
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Seller/Admin)
- `PUT /api/products/:id` - Update product (Seller/Admin)
- `DELETE /api/products/:id` - Delete product (Seller/Admin)
- `GET /api/products/brands/all` - Get all brands

### Cart
- `GET /api/cart` - Get user cart (Protected)
- `POST /api/cart` - Add item to cart (Protected)
- `PUT /api/cart/:productId` - Update cart item quantity (Protected)
- `DELETE /api/cart/:productId` - Remove item from cart (Protected)
- `DELETE /api/cart` - Clear cart (Protected)

### Orders
- `POST /api/orders` - Create new order (Protected)
- `GET /api/orders/myorders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `PUT /api/orders/:id/pay` - Update order to paid (Protected)
- `DELETE /api/orders/:id` - Cancel order (Protected)
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/deliver` - Update order to delivered (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Create review (Protected)
- `PUT /api/reviews/:id` - Update review (Protected)
- `DELETE /api/reviews/:id` - Delete review (Protected)
- `PUT /api/reviews/:id/helpful` - Mark review as helpful (Protected)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

## Project Structure

### Backend
```
backend/
├── config/
│   └── database.js           # PostgreSQL Sequelize configuration
├── middleware/
│   ├── auth.js               # Authentication middleware
│   ├── errorHandler.js       # Error handling middleware
│   └── validation.js         # Request validation
├── models/
│   ├── index.js              # Model associations
│   ├── User.js               # User model (Sequelize)
│   ├── Product.js            # Product model (Sequelize)
│   ├── Category.js           # Category model (Sequelize)
│   ├── Cart.js               # Cart model (Sequelize)
│   ├── Order.js              # Order model (Sequelize)
│   └── Review.js             # Review model (Sequelize)
├── routes/
│   ├── auth.js               # Authentication routes
│   ├── users.js              # User routes
│   ├── products.js           # Product routes
│   ├── cart.js               # Cart routes
│   ├── orders.js             # Order routes
│   ├── reviews.js            # Review routes
│   └── categories.js         # Category routes
├── utils/
│   └── generateToken.js      # JWT token generation
├── .env                      # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Backend dependencies
└── server.js                # Application entry point
```

### Frontend
```
frontend/
├── public/                   # Static assets
├── src/
│   ├── components/           # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── AdminRoute.jsx
│   ├── context/              # React Context providers
│   │   ├── AuthContext.jsx   # Authentication state
│   │   └── CartContext.jsx   # Shopping cart state
│   ├── pages/                # Page components
│   │   ├── Home.jsx          # Landing page
│   │   ├── Login.jsx         # User login
│   │   ├── Register.jsx      # User registration
│   │   ├── Products.jsx      # Product listing
│   │   ├── ProductDetail.jsx # Product detail page
│   │   ├── Cart.jsx          # Shopping cart
│   │   ├── Checkout.jsx      # Checkout process
│   │   ├── Profile.jsx       # User profile
│   │   ├── Orders.jsx        # Order history
│   │   ├── OrderDetail.jsx   # Order details
│   │   └── admin/            # Admin pages
│   │       ├── Dashboard.jsx
│   │       ├── AdminProducts.jsx
│   │       ├── AdminOrders.jsx
│   │       └── AdminUsers.jsx
│   ├── utils/
│   │   └── api.js            # Axios instance with interceptors
│   ├── App.jsx               # Main app with routes
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles & Tailwind
├── index.html                # HTML template
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
└── package.json              # Frontend dependencies
```

## Frontend Pages

### Public Pages
- **Home** (`/`) - Hero section, featured products, and features showcase
- **Products** (`/products`) - Product listing with filters, search, and pagination
- **Product Detail** (`/products/:id`) - Detailed product view with image gallery, reviews, and add to cart
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - New user registration

### Protected Pages (Requires Login)
- **Cart** (`/cart`) - Shopping cart with item management
- **Checkout** (`/checkout`) - Order placement with shipping and payment
- **Profile** (`/profile`) - User profile, address, and password management
- **Orders** (`/orders`) - Order history and tracking
- **Order Detail** (`/orders/:id`) - Detailed order information

### Admin Pages (Requires Admin Role)
- **Dashboard** (`/admin/dashboard`) - Statistics and recent orders overview
- **Products Management** (`/admin/products`) - CRUD operations for products
- **Orders Management** (`/admin/orders`) - Order status and payment management
- **Users Management** (`/admin/users`) - User role management

## User Roles & Access

- **User**: Browse products, manage cart, place orders, write reviews, manage profile
- **Admin**: All user permissions plus full CRUD access to products, orders, and users

## Quick Start

1. **Start PostgreSQL database**
2. **Start the backend server**:
   ```bash
   npm run dev
   ```
   Backend runs on http://localhost:5000

3. **Start the frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on http://localhost:3000

4. **Create an admin user**:
   - Register through the frontend
   - Manually update the user role in PostgreSQL:
   ```sql
   UPDATE "Users" SET role = 'admin' WHERE email = 'your-email@example.com';
   ```

## Testing the Application

### Frontend Testing
1. Visit http://localhost:3000
2. Register a new account
3. Browse products and add items to cart
4. Complete checkout process
5. View order history
6. Test admin features (after setting admin role)

### API Testing with Postman/Thunder Client
1. Base URL: `http://localhost:5000`
2. For protected routes, include JWT token:
   - Header: `Authorization: Bearer <your-jwt-token>`
3. Get token by logging in: `POST /api/auth/login`

## Security Features

- **Password Security**: bcryptjs hashing with salt rounds
- **JWT Authentication**: Secure token-based auth with expiration
- **Role-based Access Control**: User and admin roles
- **Input Validation**: express-validator for all inputs
- **SQL Injection Prevention**: Sequelize ORM with parameterized queries
- **CORS Configuration**: Controlled cross-origin access
- **Environment Variables**: Sensitive data in .env

## Database Schema

### PostgreSQL Tables (via Sequelize)
- **Users**: Authentication, profile, addresses, wishlist
- **Products**: Product information, images, specifications, pricing
- **Categories**: Hierarchical category structure with parent-child relationships
- **Carts**: User shopping carts with JSON items
- **Orders**: Order details, shipping, payment, status tracking
- **Reviews**: Product reviews with ratings and verified badges

All models use UUID as primary keys for better security and scalability.

## Development Tips

- Backend auto-restarts on file changes (nodemon)
- Frontend has hot module replacement (Vite HMR)
- PostgreSQL GUI tools: pgAdmin, DBeaver, TablePlus
- Use React DevTools for debugging React components
- Check browser console for API errors
- Database syncs automatically in development mode

## Future Enhancements

- [ ] Image upload with Cloudinary integration
- [ ] Email notifications for orders
- [ ] Full Stripe payment integration
- [ ] Product reviews on detail page
- [ ] Wishlist functionality
- [ ] Advanced search with filters
- [ ] Product recommendations
- [ ] Order tracking with real-time updates
- [ ] Admin analytics dashboard
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] PWA support for mobile
- [ ] API rate limiting
- [ ] Redis caching for performance
- [ ] Elasticsearch for advanced search
- [ ] Unit and integration tests
- [ ] API documentation with Swagger
- [ ] Docker containerization
- [ ] CI/CD pipeline

## Technologies Used

### Backend
- Node.js & Express.js
- PostgreSQL & Sequelize ORM
- JWT for authentication
- bcryptjs for password hashing
- express-validator for validation
- CORS middleware
- dotenv for environment variables

### Frontend  
- React 18 with Hooks
- Vite for fast development
- React Router v6 for routing
- Tailwind CSS for styling
- Axios for API calls
- React Context API for state
- React Icons
- React Hot Toast
- React Helmet for SEO

## License

MIT License - Feel free to use this project for learning or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review API endpoints list

## Acknowledgments

- Inspired by Amazon's e-commerce platform
- Built with modern web development best practices
- Uses industry-standard security patterns

---

**Note**: This is a learning project. For production use, additional security hardening, testing, and optimization are recommended.
