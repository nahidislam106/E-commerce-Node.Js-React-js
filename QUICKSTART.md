# Quick Start Guide

Get the e-commerce platform up and running in minutes!

## Prerequisites

Make sure you have these installed:
- ✅ Node.js (v16 or higher)
- ✅ npm (comes with Node.js)
- ✅ PostgreSQL (v12 or higher)

## Step-by-Step Setup

### 1. Database Setup

```bash
# Start PostgreSQL service
# On Linux:
sudo service postgresql start

# On macOS:
brew services start postgresql

# Create the database
psql -U postgres
CREATE DATABASE ecommerce;
\q
```

### 2. Backend Setup

```bash
# Navigate to project root
cd /path/to/project

# Install dependencies
npm install

# Create .env file
cat > .env << EOL
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce
DB_USER=postgres
DB_PASSWORD=postgres

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=30d

# CORS
FRONTEND_URL=http://localhost:3000
EOL

# Start the backend server
npm run dev
```

The backend should now be running on **http://localhost:5000** ✅

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend should now be running on **http://localhost:3000** ✅

## First Time Use

### Create Your First User

1. Open your browser and go to **http://localhost:3000**
2. Click "Register" in the navigation
3. Fill in:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
   - Confirm Password: password123
4. Click "Register"

You'll be automatically logged in! 🎉

### Make Your User an Admin

To access admin features, you need to set your user as admin:

```bash
# Connect to PostgreSQL
psql -U postgres -d ecommerce

# Find your user ID
SELECT id, name, email, role FROM "Users";

# Update your user to admin role
UPDATE "Users" SET role = 'admin' WHERE email = 'john@example.com';

# Verify the change
SELECT id, name, email, role FROM "Users";

# Exit
\q
```

Now refresh the page and you'll see the admin menu! 🎯

### Add Sample Products

1. Log in with your admin account
2. Go to **Admin → Manage Products**
3. Click "Add Product"
4. Fill in product details:
   - Name: iPhone 14 Pro
   - Description: Latest iPhone with A16 chip
   - Price: 999.99
   - Stock: 50
   - Brand: Apple
5. Click "Create"

Repeat for a few more products to populate your store! 📱💻🎧

## Common Commands

### Backend
```bash
# Start development server (with auto-restart)
npm run dev

# Start production server
npm start
```

### Frontend
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Database
```bash
# Connect to database
psql -U postgres -d ecommerce

# View all users
SELECT * FROM "Users";

# View all products
SELECT * FROM "Products";

# View all orders
SELECT * FROM "Orders";

# Reset database (WARNING: deletes all data)
DROP DATABASE ecommerce;
CREATE DATABASE ecommerce;
```

## Testing the Features

### As a Customer:
1. ✅ Browse products on home page
2. ✅ Use filters and search on products page
3. ✅ Click on a product to see details
4. ✅ Add products to cart
5. ✅ View cart and update quantities
6. ✅ Proceed to checkout
7. ✅ Fill in shipping address
8. ✅ Place order
9. ✅ View order in "My Orders"
10. ✅ Update profile information

### As an Admin:
1. ✅ View dashboard with statistics
2. ✅ Create/edit/delete products
3. ✅ Manage orders and update status
4. ✅ Manage users and roles
5. ✅ View all recent orders

## Troubleshooting

### Backend won't start
- **Error: "EADDRINUSE: port 5000 already in use"**
  ```bash
  # Kill the process using port 5000
  lsof -ti:5000 | xargs kill -9
  ```

- **Error: "password authentication failed"**
  ```bash
  # Reset PostgreSQL password
  psql -U postgres
  ALTER USER postgres PASSWORD 'postgres';
  \q
  ```

### Frontend won't start
- **Error: "vite: not found"**
  ```bash
  # Reinstall dependencies
  cd frontend
  rm -rf node_modules package-lock.json
  npm install
  ```

### Can't connect to database
```bash
# Check if PostgreSQL is running
sudo service postgresql status  # Linux
brew services list              # macOS

# Start PostgreSQL if not running
sudo service postgresql start   # Linux
brew services start postgresql  # macOS
```

### API calls failing
1. Check backend is running on port 5000
2. Check browser console for errors
3. Verify JWT token is being sent (check Network tab)
4. Make sure you're logged in for protected routes

## URLs to Remember

- 🌐 **Frontend**: http://localhost:3000
- 🔌 **Backend API**: http://localhost:5000
- 📊 **Admin Dashboard**: http://localhost:3000/admin/dashboard

## Default Test Accounts

After setup, you can create these test accounts:

**Admin User:**
- Email: admin@ecommerce.com
- Password: admin123
- Role: admin (set manually in database)

**Regular User:**
- Email: user@ecommerce.com
- Password: user123
- Role: user (default)

## Next Steps

1. 📝 Read the full README.md for detailed documentation
2. 🎨 Customize the UI colors in tailwind.config.js
3. 🔧 Add your own products and categories
4. 📧 Configure email notifications (optional)
5. 💳 Set up Stripe for payments (optional)
6. 🚀 Deploy to production when ready

## Need Help?

- Check the main [README.md](README.md) for full documentation
- Review [API Endpoints](README.md#api-endpoints) for backend routes
- See [Frontend README](frontend/README.md) for React component details

---

Happy coding! 🎉✨
