import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { Settings, Package, Tag, Users, BarChart, LogOut, Gift, Grid, Ticket } from 'lucide-react';
import AdminProducts from '../components/admin/AdminProducts';
import AdminOrders from '../components/admin/AdminOrders';
import AdminCustomers from '../components/admin/AdminCustomers';
import AdminSettings from '../components/admin/AdminSettings';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminBundles from '../components/admin/AdminBundles';
import AdminCollections from '../components/admin/AdminCollections';
import AdminDiscounts from '../components/admin/AdminDiscounts';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is authenticated on mount
    const isAuth = localStorage.getItem('adminAuthenticated') === 'true';
    setIsAuthenticated(isAuth);

    // Redirect to admin dashboard if authenticated
    if (isAuth && window.location.pathname === '/admin') {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      alert('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin', { replace: true });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-gray-900 rounded-lg p-8">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#FFD513] text-black py-2 rounded-md font-bold hover:bg-[#FAFF34] transition-colors"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 p-6">
        <h1 className="text-xl font-bold text-white mb-8">TOXIC Admin</h1>
        <nav className="space-y-2 flex flex-col">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
              location.pathname === '/admin/dashboard'
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <BarChart className="w-5 h-5 mr-3" />
            Dashboard
          </button>
          <button
            onClick={() => navigate('/admin/products')}
            className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
              location.pathname === '/admin/products'
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Package className="w-5 h-5 mr-3" />
            Products
          </button>
          <button
            onClick={() => navigate('/admin/bundles')}
            className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
              location.pathname === '/admin/bundles'
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Gift className="w-5 h-5 mr-3" />
            Bundles
          </button>
          <button
            onClick={() => navigate('/admin/collections')}
            className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
              location.pathname === '/admin/collections'
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Grid className="w-5 h-5 mr-3" />
            Collections
          </button>
          <button
            onClick={() => navigate('/admin/discounts')}
            className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
              location.pathname === '/admin/discounts'
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Ticket className="w-5 h-5 mr-3" />
            Discounts
          </button>
          <button
            onClick={() => navigate('/admin/orders')}
            className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
              location.pathname === '/admin/orders'
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Tag className="w-5 h-5 mr-3" />
            Orders
          </button>
          <button
            onClick={() => navigate('/admin/customers')}
            className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
              location.pathname === '/admin/customers'
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Users className="w-5 h-5 mr-3" />
            Customers
          </button>
          <button
            onClick={() => navigate('/admin/settings')}
            className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
              location.pathname === '/admin/settings'
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </button>
          <div className="flex-1" />
          <button
            onClick={handleLogout}
            className="w-full flex items-center text-red-400 hover:text-red-300 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Routes>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/products" element={<AdminProducts />} />
          <Route path="/bundles" element={<AdminBundles />} />
          <Route path="/collections" element={<AdminCollections />} />
          <Route path="/discounts" element={<AdminDiscounts />} />
          <Route path="/orders" element={<AdminOrders />} />
          <Route path="/customers" element={<AdminCustomers />} />
          <Route path="/settings" element={<AdminSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;