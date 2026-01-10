import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import {
  FiUsers,
  FiPackage,
  FiShoppingCart,
  FiDollarSign,
  FiSettings,
  FiDatabase,
  FiActivity,
  FiTrendingUp,
  FiRefreshCw,
  FiTrash2,
  FiDownload,
} from 'react-icons/fi';

const ControlCenter = () => {
  const [stats, setStats] = useState({
    users: { total: 0, admins: 0, customers: 0 },
    products: { total: 0, inStock: 0, outOfStock: 0 },
    orders: { total: 0, pending: 0, delivered: 0, revenue: 0 },
    system: { dbSize: 'N/A', uptime: 'N/A' },
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchAllStats();
  }, []);

  const fetchAllStats = async () => {
    setLoading(true);
    try {
      const [usersRes, productsRes, ordersRes] = await Promise.all([
        api.get('/users'),
        api.get('/products'),
        api.get('/orders'),
      ]);

      const users = usersRes.data;
      const products = productsRes.data;
      const orders = ordersRes.data;

      setStats({
        users: {
          total: users.length,
          admins: users.filter((u) => u.role === 'admin').length,
          customers: users.filter((u) => u.role === 'user').length,
        },
        products: {
          total: products.length,
          inStock: products.filter((p) => p.countInStock > 0).length,
          outOfStock: products.filter((p) => p.countInStock === 0).length,
        },
        orders: {
          total: orders.length,
          pending: orders.filter((o) => o.status === 'pending').length,
          delivered: orders.filter((o) => o.status === 'delivered').length,
          revenue: orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0),
        },
        system: {
          dbSize: 'PostgreSQL',
          uptime: 'Active',
        },
      });
    } catch (error) {
      toast.error('Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = async (action) => {
    switch (action) {
      case 'refresh':
        await fetchAllStats();
        toast.success('Data refreshed');
        break;
      case 'export':
        toast.info('Export functionality - Coming soon!');
        break;
      case 'backup':
        toast.info('Database backup - Contact your system admin');
        break;
      default:
        break;
    }
  };

  const QuickActionCard = ({ icon: Icon, title, value, color, link }) => (
    <Link to={link} className={`card hover:shadow-lg transition-all ${color} text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <Icon size={40} className="text-white/80" />
      </div>
    </Link>
  );

  const StatCard = ({ label, value, sublabel }) => (
    <div className="bg-gray-50 p-4 rounded-lg">
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {sublabel && <p className="text-xs text-gray-500 mt-1">{sublabel}</p>}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🎮 Control Center</h1>
        <p className="text-gray-600">Complete control over your e-commerce platform</p>
      </div>

      {/* Quick Action Buttons */}
      <div className="mb-8 flex flex-wrap gap-3">
        <button
          onClick={() => handleQuickAction('refresh')}
          className="btn btn-primary flex items-center gap-2"
        >
          <FiRefreshCw /> Refresh Data
        </button>
        <button
          onClick={() => handleQuickAction('export')}
          className="btn btn-secondary flex items-center gap-2"
        >
          <FiDownload /> Export Reports
        </button>
        <button
          onClick={() => handleQuickAction('backup')}
          className="btn btn-secondary flex items-center gap-2"
        >
          <FiDatabase /> Database Info
        </button>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <QuickActionCard
          icon={FiUsers}
          title="Total Users"
          value={stats.users.total}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          link="/admin/users"
        />
        <QuickActionCard
          icon={FiPackage}
          title="Total Products"
          value={stats.products.total}
          color="bg-gradient-to-br from-green-500 to-green-600"
          link="/admin/products"
        />
        <QuickActionCard
          icon={FiShoppingCart}
          title="Total Orders"
          value={stats.orders.total}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          link="/admin/orders"
        />
        <QuickActionCard
          icon={FiDollarSign}
          title="Total Revenue"
          value={`$${stats.orders.revenue.toFixed(2)}`}
          color="bg-gradient-to-br from-orange-500 to-orange-600"
          link="/admin/dashboard"
        />
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FiUsers /> User Statistics
          </h2>
          <div className="space-y-3">
            <StatCard label="Total Users" value={stats.users.total} />
            <StatCard label="Admin Users" value={stats.users.admins} sublabel="Full access" />
            <StatCard label="Customers" value={stats.users.customers} sublabel="Regular users" />
          </div>
          <Link to="/admin/users" className="btn btn-primary w-full mt-4">
            Manage Users
          </Link>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FiPackage /> Product Statistics
          </h2>
          <div className="space-y-3">
            <StatCard label="Total Products" value={stats.products.total} />
            <StatCard
              label="In Stock"
              value={stats.products.inStock}
              sublabel="Available for sale"
            />
            <StatCard
              label="Out of Stock"
              value={stats.products.outOfStock}
              sublabel="Need restocking"
            />
          </div>
          <Link to="/admin/products" className="btn btn-primary w-full mt-4">
            Manage Products
          </Link>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FiShoppingCart /> Order Statistics
          </h2>
          <div className="space-y-3">
            <StatCard label="Total Orders" value={stats.orders.total} />
            <StatCard
              label="Pending Orders"
              value={stats.orders.pending}
              sublabel="Needs attention"
            />
            <StatCard
              label="Delivered"
              value={stats.orders.delivered}
              sublabel="Completed orders"
            />
          </div>
          <Link to="/admin/orders" className="btn btn-primary w-full mt-4">
            Manage Orders
          </Link>
        </div>
      </div>

      {/* System & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FiSettings /> System Status
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded">
              <span className="font-medium">Backend Server</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                ✓ Running
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded">
              <span className="font-medium">Database</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                ✓ Connected
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
              <span className="font-medium">Database Type</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                PostgreSQL
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
              <span className="font-medium">Environment</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                Development
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FiActivity /> Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/admin/products" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
              <FiPackage className="mb-2 text-blue-600" size={24} />
              <p className="font-medium text-sm">Add Product</p>
            </Link>
            <Link to="/admin/users" className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition">
              <FiUsers className="mb-2 text-green-600" size={24} />
              <p className="font-medium text-sm">Manage Users</p>
            </Link>
            <Link to="/admin/orders" className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
              <FiShoppingCart className="mb-2 text-purple-600" size={24} />
              <p className="font-medium text-sm">Process Orders</p>
            </Link>
            <Link to="/admin/dashboard" className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition">
              <FiTrendingUp className="mb-2 text-orange-600" size={24} />
              <p className="font-medium text-sm">View Analytics</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Administrative Commands Guide */}
      <div className="card mt-6 bg-gradient-to-r from-gray-50 to-gray-100">
        <h2 className="text-xl font-bold mb-4">🔧 Database Management Commands</h2>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-white rounded border-l-4 border-blue-500">
            <p className="font-semibold mb-1">View All Data:</p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
              psql -U postgres -d ecommerce -c 'SELECT * FROM "Users";'
            </code>
          </div>
          <div className="p-3 bg-white rounded border-l-4 border-green-500">
            <p className="font-semibold mb-1">Make User Admin:</p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
              psql -U postgres -d ecommerce -c "UPDATE \"Users\" SET role = 'admin' WHERE email = 'user@email.com';"
            </code>
          </div>
          <div className="p-3 bg-white rounded border-l-4 border-purple-500">
            <p className="font-semibold mb-1">Check Database Size:</p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
              psql -U postgres -c "SELECT pg_size_pretty(pg_database_size('ecommerce'));"
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlCenter;
