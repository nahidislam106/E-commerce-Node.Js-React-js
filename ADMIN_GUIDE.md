# 🎮 Complete Admin Control Guide

## Quick Access

**Your Control Center:** http://localhost:3000/admin/control

This is your central hub for managing EVERYTHING in the e-commerce platform.

---

## ✅ What You Can Control

### 1. **Users Management** 👥
Control every user on your platform:

- ✅ View all users
- ✅ Change user roles (User ↔ Admin)
- ✅ Delete users
- ✅ See user registration dates
- ✅ Monitor admin vs customer counts

**Access:** Admin → Manage Users or `/admin/users`

**Quick Actions:**
```bash
# Make anyone admin via command line
psql -U postgres -d ecommerce -c "UPDATE \"Users\" SET role = 'admin' WHERE email = 'user@email.com';"

# View all users
psql -U postgres -d ecommerce -c 'SELECT name, email, role FROM "Users";'

# Count users by role
psql -U postgres -d ecommerce -c 'SELECT role, COUNT(*) FROM "Users" GROUP BY role;'
```

---

### 2. **Products Management** 📦
Complete control over your inventory:

- ✅ Add new products
- ✅ Edit existing products
- ✅ Delete products
- ✅ Update prices
- ✅ Manage stock levels
- ✅ Set brands and descriptions

**Access:** Admin → Manage Products or `/admin/products`

**How to Add Product:**
1. Click "**+ Add Product**" button
2. Fill in:
   - Name (e.g., "iPhone 14 Pro")
   - Description
   - Price (e.g., 999.99)
   - Stock quantity (e.g., 50)
   - Brand (e.g., "Apple")
3. Click "**Create**"

**Via Command Line:**
```bash
# Add product directly to database
psql -U postgres -d ecommerce << EOF
INSERT INTO "Products" (id, name, description, price, "countInStock", brand, rating, "numReviews", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'iPhone 14 Pro',
  'Latest iPhone with A16 Bionic chip',
  999.99,
  50,
  'Apple',
  4.8,
  0,
  NOW(),
  NOW()
);
EOF

# View all products
psql -U postgres -d ecommerce -c 'SELECT name, price, "countInStock" FROM "Products";'

# Update stock
psql -U postgres -d ecommerce -c 'UPDATE "Products" SET "countInStock" = 100 WHERE name = '\''iPhone 14 Pro'\'';'
```

---

### 3. **Orders Management** 📋
Track and control every order:

- ✅ View all orders
- ✅ Update order status (pending → processing → shipped → delivered)
- ✅ Mark orders as paid/unpaid
- ✅ See customer details
- ✅ View order totals
- ✅ Cancel orders

**Access:** Admin → Manage Orders or `/admin/orders`

**Order Status Flow:**
```
pending → processing → shipped → delivered
```

**Via Command Line:**
```bash
# View all orders
psql -U postgres -d ecommerce -c 'SELECT id, status, "totalPrice", "isPaid" FROM "Orders";'

# Update order status
psql -U postgres -d ecommerce -c "UPDATE \"Orders\" SET status = 'shipped' WHERE id = 'order-id-here';"

# Mark order as paid
psql -U postgres -d ecommerce -c "UPDATE \"Orders\" SET \"isPaid\" = true, \"paidAt\" = NOW() WHERE id = 'order-id-here';"

# See revenue
psql -U postgres -d ecommerce -c 'SELECT SUM("totalPrice") as total_revenue FROM "Orders" WHERE "isPaid" = true;'
```

---

### 4. **Analytics Dashboard** 📊
Real-time statistics:

- ✅ Total orders count
- ✅ Total revenue
- ✅ User statistics
- ✅ Product counts
- ✅ Recent orders list
- ✅ Order status breakdown

**Access:** Admin → Dashboard or `/admin/dashboard`

---

### 5. **Control Center** 🎮
Your central command hub:

- ✅ Overview of everything
- ✅ Quick access to all sections
- ✅ System status monitoring
- ✅ One-click actions
- ✅ Database commands reference

**Access:** Admin → 🎮 Control Center or `/admin/control`

---

## 🚀 Complete Workflow Examples

### Example 1: Set Up Your Store

```bash
# 1. Start servers
cd /home/nikola-tesla/projects/new\ folder/new
npm run dev  # Backend

cd frontend
npm run dev  # Frontend

# 2. Register an account at http://localhost:3000/register

# 3. Make yourself admin
psql -U postgres -d ecommerce -c "UPDATE \"Users\" SET role = 'admin' WHERE email = 'your@email.com';"

# 4. Add 5 sample products
psql -U postgres -d ecommerce << 'EOF'
INSERT INTO "Products" (id, name, description, price, "countInStock", brand, rating, "numReviews", "createdAt", "updatedAt") VALUES
(gen_random_uuid(), 'iPhone 14 Pro', '6.1-inch Super Retina XDR display', 999.99, 50, 'Apple', 4.8, 127, NOW(), NOW()),
(gen_random_uuid(), 'Samsung Galaxy S23', 'Latest Samsung flagship', 899.99, 75, 'Samsung', 4.6, 89, NOW(), NOW()),
(gen_random_uuid(), 'MacBook Pro 16"', 'M2 Pro chip, 16GB RAM', 2499.99, 25, 'Apple', 4.9, 203, NOW(), NOW()),
(gen_random_uuid(), 'Sony WH-1000XM5', 'Wireless noise canceling', 399.99, 100, 'Sony', 4.7, 456, NOW(), NOW()),
(gen_random_uuid(), 'Dell XPS 15', 'Intel i7, 4K display', 1899.99, 30, 'Dell', 4.5, 178, NOW(), NOW());
EOF

# 5. Visit Control Center: http://localhost:3000/admin/control
```

### Example 2: Process an Order

1. Customer places order on website
2. You see it in **Admin → Manage Orders**
3. Click "**Edit**" on the order
4. Change status: **pending** → **processing**
5. Click "**Mark as Paid**" if paid
6. When shipped: Update to **shipped**
7. When received: Update to **delivered**

### Example 3: Manage Inventory

```bash
# Check low stock items
psql -U postgres -d ecommerce -c 'SELECT name, "countInStock" FROM "Products" WHERE "countInStock" < 10;'

# Restock a product
psql -U postgres -d ecommerce -c 'UPDATE "Products" SET "countInStock" = "countInStock" + 50 WHERE name = '\''iPhone 14 Pro'\'';'

# Delete out-of-stock products
psql -U postgres -d ecommerce -c 'DELETE FROM "Products" WHERE "countInStock" = 0;'
```

### Example 4: User Management

```bash
# List all admins
psql -U postgres -d ecommerce -c 'SELECT name, email FROM "Users" WHERE role = '\''admin'\'';'

# Promote user to admin
psql -U postgres -d ecommerce -c "UPDATE \"Users\" SET role = 'admin' WHERE email = 'user@example.com';"

# Demote admin to user
psql -U postgres -d ecommerce -c "UPDATE \"Users\" SET role = 'user' WHERE email = 'admin@example.com';"

# Delete a user (and their orders)
psql -U postgres -d ecommerce -c "DELETE FROM \"Users\" WHERE email = 'user@example.com';"
```

---

## 🔥 Power User Commands

### Database Management

```bash
# Backup database
pg_dump -U postgres ecommerce > backup_$(date +%Y%m%d).sql

# Restore database
psql -U postgres ecommerce < backup_20260110.sql

# Check database size
psql -U postgres -c "SELECT pg_size_pretty(pg_database_size('ecommerce'));"

# Vacuum and analyze (optimize)
psql -U postgres -d ecommerce -c 'VACUUM ANALYZE;'
```

### Bulk Operations

```bash
# Update all product prices by 10%
psql -U postgres -d ecommerce -c 'UPDATE "Products" SET price = price * 1.10;'

# Mark all pending orders as processing
psql -U postgres -d ecommerce -c "UPDATE \"Orders\" SET status = 'processing' WHERE status = 'pending';"

# Give 20% discount to all products from a brand
psql -U postgres -d ecommerce -c "UPDATE \"Products\" SET price = price * 0.80 WHERE brand = 'Samsung';"
```

### Analytics Queries

```bash
# Top selling products
psql -U postgres -d ecommerce -c "
SELECT p.name, COUNT(o.id) as order_count 
FROM \"Products\" p 
JOIN \"Orders\" o ON o.\"orderItems\"::text LIKE '%' || p.id::text || '%'
GROUP BY p.name 
ORDER BY order_count DESC 
LIMIT 10;"

# Revenue by month
psql -U postgres -d ecommerce -c "
SELECT DATE_TRUNC('month', \"createdAt\") as month, SUM(\"totalPrice\") as revenue 
FROM \"Orders\" 
WHERE \"isPaid\" = true 
GROUP BY month 
ORDER BY month DESC;"

# Customer lifetime value
psql -U postgres -d ecommerce -c "
SELECT u.name, u.email, COUNT(o.id) as orders, SUM(o.\"totalPrice\") as total_spent
FROM \"Users\" u
JOIN \"Orders\" o ON o.\"userId\" = u.id
GROUP BY u.id, u.name, u.email
ORDER BY total_spent DESC
LIMIT 10;"
```

---

## 📱 Access Points Summary

| What to Control | Web UI Access | Command Line |
|----------------|---------------|--------------|
| **Everything** | `/admin/control` | All commands below |
| **Users** | `/admin/users` | `psql ... "Users"` |
| **Products** | `/admin/products` | `psql ... "Products"` |
| **Orders** | `/admin/orders` | `psql ... "Orders"` |
| **Analytics** | `/admin/dashboard` | SQL queries |

---

## 🛡️ Security Tips

1. **Keep admin accounts secure** - Strong passwords only
2. **Regularly backup database** - Use pg_dump daily
3. **Monitor order status** - Check for fraudulent orders
4. **Review user accounts** - Remove suspicious accounts
5. **Check inventory** - Prevent overselling

---

## ⚡ Quick Reference

```bash
# Make user admin
psql -U postgres -d ecommerce -c "UPDATE \"Users\" SET role = 'admin' WHERE email = 'EMAIL';"

# Add product
# Use web UI at /admin/products or direct SQL insert

# Update order status
# Use web UI at /admin/orders for easy management

# View all data
psql -U postgres -d ecommerce -c 'SELECT * FROM "TABLENAME";'

# Tables: Users, Products, Orders, Carts, Reviews, Categories
```

---

## 🎯 Your Next Steps

1. ✅ Open **Control Center**: http://localhost:3000/admin/control
2. ✅ Add 10+ products via **Manage Products**
3. ✅ Create test orders as a customer
4. ✅ Practice updating order status
5. ✅ Explore all admin panels

**You now have COMPLETE CONTROL over your e-commerce platform!** 🚀

Every aspect of the store - users, products, orders, and system settings - is at your fingertips through both the web interface and command line.
