import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Discount {
  id: number;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  description: string;
  validFrom: string;
  validUntil: string;
  usageLimit: number;
  usageCount: number;
  active: boolean;
}

const initialDiscounts: Discount[] = [
  {
    id: 1,
    code: 'SUMMER20',
    type: 'percentage',
    value: 20,
    description: 'Summer sale discount',
    validFrom: '2024-06-01',
    validUntil: '2024-08-31',
    usageLimit: 100,
    usageCount: 45,
    active: true
  },
  {
    id: 2,
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    description: 'New customer discount',
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    usageLimit: 0,
    usageCount: 156,
    active: true
  }
];

const AdminDiscounts = () => {
  const [discounts, setDiscounts] = useState<Discount[]>(initialDiscounts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this discount?')) {
      setDiscounts(prev => prev.filter(d => d.id !== id));
    }
  };

  const handleSubmit = (formData: Omit<Discount, 'id' | 'usageCount'>) => {
    if (editingDiscount) {
      setDiscounts(prev =>
        prev.map(d =>
          d.id === editingDiscount.id
            ? { ...formData, id: d.id, usageCount: d.usageCount }
            : d
        )
      );
    } else {
      const newDiscount = {
        ...formData,
        id: Math.max(...discounts.map(d => d.id)) + 1,
        usageCount: 0
      };
      setDiscounts(prev => [...prev, newDiscount]);
    }
    setIsModalOpen(false);
    setEditingDiscount(null);
  };

  const toggleActive = (id: number) => {
    setDiscounts(prev =>
      prev.map(d => (d.id === id ? { ...d, active: !d.active } : d))
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Discount Codes</h2>
        <button
          onClick={() => {
            setEditingDiscount(null);
            setIsModalOpen(true);
          }}
          className="bg-[#FFD513] text-black px-4 py-2 rounded-md font-bold hover:bg-[#FAFF34] transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Discount
        </button>
      </div>

      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Usage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Valid Until
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
            {discounts.map(discount => (
              <tr key={discount.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-white">
                      {discount.code}
                    </div>
                    <div className="text-sm text-gray-400">
                      {discount.description}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {discount.type === 'percentage'
                    ? `${discount.value}%`
                    : `$${discount.value}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {discount.usageCount}
                  {discount.usageLimit > 0 && ` / ${discount.usageLimit}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {new Date(discount.validUntil).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleActive(discount.id)}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      discount.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {discount.active ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingDiscount(discount);
                      setIsModalOpen(true);
                    }}
                    className="text-[#FFD513] hover:text-[#FAFF34] mr-4"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(discount.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Discount Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-6">
                {editingDiscount ? 'Edit Discount' : 'Add New Discount'}
              </h3>
              <DiscountForm
                initialData={editingDiscount}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setIsModalOpen(false);
                  setEditingDiscount(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface DiscountFormProps {
  initialData: Discount | null;
  onSubmit: (data: Omit<Discount, 'id' | 'usageCount'>) => void;
  onCancel: () => void;
}

const DiscountForm: React.FC<DiscountFormProps> = ({
  initialData,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    code: initialData?.code || '',
    type: initialData?.type || 'percentage',
    value: initialData?.value || 0,
    description: initialData?.description || '',
    validFrom: initialData?.validFrom || new Date().toISOString().split('T')[0],
    validUntil: initialData?.validUntil || '',
    usageLimit: initialData?.usageLimit || 0,
    active: initialData?.active ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Discount Code
        </label>
        <input
          type="text"
          value={formData.code}
          onChange={e => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Discount Type
          </label>
          <select
            value={formData.type}
            onChange={e => setFormData(prev => ({ ...prev, type: e.target.value as 'percentage' | 'fixed' }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
          >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Value
          </label>
          <input
            type="number"
            value={formData.value}
            onChange={e => setFormData(prev => ({ ...prev, value: parseFloat(e.target.value) }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
            required
            min="0"
            max={formData.type === 'percentage' ? '100' : undefined}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Description
        </label>
        <input
          type="text"
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Valid From
          </label>
          <input
            type="date"
            value={formData.validFrom}
            onChange={e => setFormData(prev => ({ ...prev, validFrom: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Valid Until
          </label>
          <input
            type="date"
            value={formData.validUntil}
            onChange={e => setFormData(prev => ({ ...prev, validUntil: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Usage Limit (0 for unlimited)
        </label>
        <input
          type="number"
          value={formData.usageLimit}
          onChange={e => setFormData(prev => ({ ...prev, usageLimit: parseInt(e.target.value) }))}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
          min="0"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="active"
          checked={formData.active}
          onChange={e => setFormData(prev => ({ ...prev, active: e.target.checked }))}
          className="w-4 h-4 text-[#FFD513] border-gray-700 rounded focus:ring-[#FFD513] focus:ring-offset-gray-900"
        />
        <label htmlFor="active" className="ml-2 text-sm text-gray-400">
          Active
        </label>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-700 rounded-md text-gray-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#FFD513] text-black px-4 py-2 rounded-md font-bold hover:bg-[#FAFF34] transition-colors"
        >
          {initialData ? 'Update Discount' : 'Add Discount'}
        </button>
      </div>
    </form>
  );
};

export default AdminDiscounts;