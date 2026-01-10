# E-commerce Frontend

Modern React frontend for the e-commerce platform built with Vite, Tailwind CSS, and React Router.

## Features

- 🎨 Modern, responsive UI with Tailwind CSS
- 🔐 User authentication (login, register, logout)
- 🛍️ Product browsing with search, filters, and pagination
- 🛒 Shopping cart management
- 💳 Checkout process with address and payment
- 👤 User profile and order management
- 🎯 Admin dashboard for managing products, orders, and users
- 📱 Mobile-first responsive design
- 🔔 Toast notifications for user feedback
- 🚀 Fast development with Vite HMR

## Tech Stack

- **React** 18.2.0 - UI library
- **Vite** - Build tool and dev server
- **React Router** v6 - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Context API** - State management
- **React Icons** - Icon library
- **React Hot Toast** - Notifications
- **React Helmet** - SEO management

## Prerequisites

- Node.js 16+ and npm
- Backend server running on http://localhost:5000

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will run on http://localhost:3000

## Build for Production

```bash
npm run build
```

This will create an optimized production build in the `dist` folder.

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── AdminRoute.jsx
│   ├── context/         # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Profile.jsx
│   │   ├── Orders.jsx
│   │   ├── OrderDetail.jsx
│   │   └── admin/
│   │       ├── Dashboard.jsx
│   │       ├── AdminProducts.jsx
│   │       ├── AdminOrders.jsx
│   │       └── AdminUsers.jsx
│   ├── utils/           # Utility functions
│   │   └── api.js       # Axios instance
│   ├── App.jsx          # Main app with routes
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── package.json         # Dependencies
```

## Available Routes

### Public Routes
- `/` - Home page
- `/products` - Product listing
- `/products/:id` - Product detail
- `/login` - User login
- `/register` - User registration

### Protected Routes (Requires Authentication)
- `/cart` - Shopping cart
- `/checkout` - Checkout process
- `/profile` - User profile
- `/orders` - Order history
- `/orders/:id` - Order details

### Admin Routes (Requires Admin Role)
- `/admin/dashboard` - Admin dashboard
- `/admin/products` - Manage products
- `/admin/orders` - Manage orders
- `/admin/users` - Manage users

## Key Features

### Authentication
- JWT token stored in localStorage
- Automatic token inclusion in API requests
- Protected routes with redirect to login
- Role-based access control

### Shopping Cart
- Add/remove/update items
- Persistent cart across sessions
- Real-time price calculations
- Sync with backend

### Product Management
- Advanced filtering (category, price, search)
- Sorting options
- Pagination
- Product details with image gallery

### User Dashboard
- Profile management
- Address management
- Order tracking
- Password change

### Admin Dashboard
- Statistics overview
- Product CRUD operations
- Order management and status updates
- User management and role assignments

## Environment Variables

The frontend uses a proxy configuration in `vite.config.js` to connect to the backend:

```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    },
  },
}
```

If your backend runs on a different port, update the proxy target in `vite.config.js`.

## Development

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use Tailwind utility classes
- Keep components small and focused

### State Management
- Global state: React Context (Auth, Cart)
- Local state: useState for component-specific state
- API calls: Centralized in utils/api.js

### Styling
- Tailwind CSS for all styling
- Custom component classes defined in index.css
- Responsive design with mobile-first approach

## Troubleshooting

### Port already in use
If port 3000 is already in use, you can change it in `vite.config.js`:
```javascript
server: {
  port: 3001, // Change to any available port
}
```

### Backend connection issues
Make sure the backend server is running on port 5000 before starting the frontend.

### Build errors
Clear the node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## License

MIT
