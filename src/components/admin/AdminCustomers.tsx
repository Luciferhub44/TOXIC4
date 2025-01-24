import { Search, Filter, Mail, ExternalLink, Edit, Trash2, UserPlus } from 'lucide-react';
import { useState } from 'react';
interface Customer {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  orders: number;
  totalSpent: string;
  status: 'Active' | 'Inactive';
  phone?: string;
  address?: string;
  notes?: string;
}

const initialCustomers: Customer[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    joinDate: '2024-02-15',
    orders: 3,
    totalSpent: '$529.97',
    status: 'Active',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    notes: 'VIP customer, prefers email communication'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    joinDate: '2024-01-20',
    orders: 5,
    totalSpent: '$849.95',
    status: 'Active',
    phone: '+1 (555) 987-6543',
    address: '456 Oak Ave, Los Angeles, CA 90001',
    notes: 'Frequent buyer, interested in new collections'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    joinDate: '2024-03-01',
    orders: 1,
    totalSpent: '$129.99',
    status: 'Inactive',
    phone: '+1 (555) 456-7890',
    address: '789 Pine St, Chicago, IL 60601'
  }
];

const AdminCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [selectedCustomers, setSelectedCustomers] = useState<Set<number>>(new Set());

  const filteredCustomers = customers.filter(customer => {
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.address?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      setCustomers(prev => prev.filter(c => c.id !== id));
      setSelectedCustomers(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleSubmit = (formData: Omit<Customer, 'id' | 'orders' | 'totalSpent'>) => {
    if (selectedCustomer) {
      setCustomers(prev =>
        prev.map(c =>
          c.id === selectedCustomer.id
            ? { ...c, ...formData }
            : c
        )
      );
    } else {
      const newCustomer = {
        ...formData,
        id: Math.max(...customers.map(c => c.id)) + 1,
        orders: 0,
        totalSpent: '$0.00'
      };
      setCustomers(prev => [...prev, newCustomer]);
    }
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically integrate with your email service
    alert('Email sent successfully!');
    setIsEmailModalOpen(false);
    setEmailSubject('');
    setEmailContent('');
  };

  const toggleCustomerSelection = (id: number) => {
    setSelectedCustomers(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAllCustomers = () => {
    if (selectedCustomers.size === filteredCustomers.length) {
      setSelectedCustomers(new Set());
    } else {
      setSelectedCustomers(new Set(filteredCustomers.map(c => c.id)));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Customers</h2>
        <div className="flex space-x-4">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-md font-bold hover:bg-gray-700 transition-colors flex items-center"
            onClick={() => setIsEmailModalOpen(true)}
            disabled={selectedCustomers.size === 0}
          >
            <Mail className="w-5 h-5 mr-2" />
            Email Selected ({selectedCustomers.size})
          </button>
          <button
            className="bg-[#FFD513] text-black px-4 py-2 rounded-md font-bold hover:bg-[#FAFF34] transition-colors flex items-center"
            onClick={() => {
              setSelectedCustomer(null);
              setIsModalOpen(true);
            }}
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-4 py-2 bg-gray-900 text-white rounded-md border border-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FFD513] appearance-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedCustomers.size === filteredCustomers.length}
                  onChange={toggleAllCustomers}
                  className="w-4 h-4 text-[#FFD513] border-gray-700 rounded focus:ring-[#FFD513] focus:ring-offset-gray-900"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Join Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Orders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Total Spent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredCustomers.map(customer => (
              <tr key={customer.id}>
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedCustomers.has(customer.id)}
                    onChange={() => toggleCustomerSelection(customer.id)}
                    className="w-4 h-4 text-[#FFD513] border-gray-700 rounded focus:ring-[#FFD513] focus:ring-offset-gray-900"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-white">
                      {customer.name}
                    </div>
                    <div className="text-sm text-gray-400">{customer.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {customer.joinDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {customer.orders}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#FFD513] font-medium">
                  {customer.totalSpent}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    customer.status === 'Active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setIsModalOpen(true);
                    }}
                    className="text-[#FFD513] hover:text-[#FAFF34] mr-4"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="text-red-400 hover:text-red-300 mr-4"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedCustomer(customer)}
                    className="text-gray-400 hover:text-white"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">
                  {selectedCustomer ? 'Edit Customer' : 'Add New Customer'}
                </h3>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedCustomer(null);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                handleSubmit({
                  name: formData.get('name') as string,
                  email: formData.get('email') as string,
                  phone: formData.get('phone') as string,
                  address: formData.get('address') as string,
                  notes: formData.get('notes') as string,
                  status: formData.get('status') as 'Active' | 'Inactive',
                  joinDate: formData.get('joinDate') as string
                });
              }}>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={selectedCustomer?.name}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        defaultValue={selectedCustomer?.email}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        defaultValue={selectedCustomer?.phone}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Join Date
                      </label>
                      <input
                        type="date"
                        name="joinDate"
                        defaultValue={selectedCustomer?.joinDate || new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      defaultValue={selectedCustomer?.address}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Notes
                    </label>
                    <textarea
                      name="notes"
                      defaultValue={selectedCustomer?.notes}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      defaultValue={selectedCustomer?.status || 'Active'}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setSelectedCustomer(null);
                      }}
                      className="px-4 py-2 border border-gray-700 rounded-md text-gray-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#FFD513] text-black px-4 py-2 rounded-md font-bold hover:bg-[#FAFF34] transition-colors"
                    >
                      {selectedCustomer ? 'Update Customer' : 'Add Customer'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Send Email</h3>
                <button
                  onClick={() => setIsEmailModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleSendEmail} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
                    rows={6}
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEmailModalOpen(false)}
                    className="px-4 py-2 border border-gray-700 rounded-md text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#FFD513] text-black px-4 py-2 rounded-md font-bold hover:bg-[#FAFF34] transition-colors flex items-center"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Send Email
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Customer Details Modal */}
      {selectedCustomer && !isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Customer Details</h3>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Name</p>
                    <p className="text-white font-medium">{selectedCustomer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white">{selectedCustomer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="text-white">{selectedCustomer.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Join Date</p>
                    <p className="text-white">{selectedCustomer.joinDate}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Address</p>
                  <p className="text-white">{selectedCustomer.address || 'N/A'}</p>
                </div>

                {selectedCustomer.notes && (
                  <div>
                    <p className="text-sm text-gray-400">Notes</p>
                    <p className="text-white">{selectedCustomer.notes}</p>
                  </div>
                )}

                <div className="border-t border-gray-800 pt-4">
                  <h4 className="font-medium text-white mb-4">Customer Stats</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Total Orders</p>
                      <p className="text-xl font-bold text-white">{selectedCustomer.orders}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Total Spent</p>
                      <p className="text-xl font-bold text-[#FFD513]">{selectedCustomer.totalSpent}</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setSelectedCustomer(null);
                      setEmailSubject('');
                      setEmailContent('');
                      setIsEmailModalOpen(true);
                      setSelectedCustomers(new Set([selectedCustomer.id]));
                    }}
                    className="flex-1 bg-[#FFD513] text-black py-2 rounded-md font-bold hover:bg-[#FAFF34] transition-colors flex items-center justify-center"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Email Customer
                  </button>
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                    className="flex-1 border border-[#FFD513] text-[#FFD513] py-2 rounded-md font-bold hover:bg-[#FFD513] hover:text-black transition-colors flex items-center justify-center"
                  >
                    <Edit className="w-5 h-5 mr-2" />
                    Edit Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCustomers;