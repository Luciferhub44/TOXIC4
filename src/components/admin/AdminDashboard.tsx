import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface DashboardStats {
  revenue: {
    value: string;
    change: number;
    isPositive: boolean;
  };
  orders: {
    value: string;
    change: number;
    isPositive: boolean;
  };
  customers: {
    value: string;
    change: number;
    isPositive: boolean;
  };
  averageOrder: {
    value: string;
    change: number;
    isPositive: boolean;
  };
}

interface RecentOrder {
  id: number;
  customer: string;
  total: string;
  status: string;
  date: string;
}

interface TopProduct {
  id: number;
  name: string;
  image: string;
  price: string;
  category: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, ordersRes, productsRes] = await Promise.all([
          fetch('/api/stats'),
          fetch('/api/orders/recent'),
          fetch('/api/products/top')
        ]);

        if (!statsRes.ok || !ordersRes.ok || !productsRes.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const [statsData, ordersData, productsData] = await Promise.all([
          statsRes.json(),
          ordersRes.json(),
          productsRes.json()
        ]);

        setStats(statsData);
        setRecentOrders(ordersData);
        setTopProducts(productsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Add error UI handling if needed
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div className="text-white">Loading dashboard data...</div>;
  }

  if (!stats) {
    return <div className="text-white">Error loading dashboard data</div>;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="bg-[#FFD513]/10 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-[#FFD513]" />
            </div>
            <span className={`text-sm ${stats.revenue.isPositive ? 'text-green-400' : 'text-red-400'} flex items-center`}>
              {stats.revenue.isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
              {stats.revenue.change}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mt-4">{stats.revenue.value}</h3>
          <p className="text-gray-400 text-sm">Total Revenue</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="bg-[#FFD513]/10 p-3 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-[#FFD513]" />
            </div>
            <span className={`text-sm ${stats.orders.isPositive ? 'text-green-400' : 'text-red-400'} flex items-center`}>
              {stats.orders.isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
              {stats.orders.change}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mt-4">{stats.orders.value}</h3>
          <p className="text-gray-400 text-sm">Total Orders</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="bg-[#FFD513]/10 p-3 rounded-lg">
              <Users className="w-6 h-6 text-[#FFD513]" />
            </div>
            <span className={`text-sm ${stats.customers.isPositive ? 'text-green-400' : 'text-red-400'} flex items-center`}>
              {stats.customers.isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
              {stats.customers.change}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mt-4">{stats.customers.value}</h3>
          <p className="text-gray-400 text-sm">Total Customers</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="bg-[#FFD513]/10 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-[#FFD513]" />
            </div>
            <span className={`text-sm ${stats.averageOrder.isPositive ? 'text-green-400' : 'text-red-400'} flex items-center`}>
              {stats.averageOrder.isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
              {stats.averageOrder.change}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mt-4">{stats.averageOrder.value}</h3>
          <p className="text-gray-400 text-sm">Average Order Value</p>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-6">Recent Orders</h3>
          <div className="space-y-4">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{order.customer}</p>
                  <p className="text-sm text-gray-400">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#FFD513] font-medium">{order.total}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-6">Top Products</h3>
          <div className="space-y-4">
            {topProducts.map(product => (
              <div key={product.id} className="flex items-center space-x-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-white font-medium">{product.name}</p>
                  <p className="text-sm text-gray-400">{product.category}</p>
                </div>
                <p className="text-[#FFD513] font-medium">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;