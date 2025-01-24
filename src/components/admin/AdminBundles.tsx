import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import type { Bundle, BundleFormData } from '../../types';
import { bundles } from '../../data/bundles';
import { products } from '../../data/products';



const AdminBundles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBundle, setEditingBundle] = useState<Bundle | null>(null);
  const [localBundles, setLocalBundles] = useState<Bundle[]>(bundles);

  const handleSubmit = (formData: BundleFormData) => {
    if (editingBundle?.id) {
      // Update existing bundle
      setLocalBundles(prev =>
        prev.map(b => (b.id === editingBundle.id ? {
          ...formData,
          id: b.id,
          products: products.filter(p => formData.productIds.includes(p.id)),
          createdAt: b.createdAt,
          updatedAt: new Date().toISOString()
        } : b))
      );
    } else {
      // Add new bundle
      const newBundle: Bundle = {
        ...formData,
        id: Math.max(...localBundles.map(b => b.id)) + 1,
        products: products.filter(p => formData.productIds.includes(p.id)),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setLocalBundles(prev => [...prev, newBundle]);
    }
    setIsModalOpen(false);
    setEditingBundle(null);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this bundle?')) {
      setLocalBundles(prev => prev.filter(b => b.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Bundles</h2>
        <button
          onClick={() => {
            setEditingBundle(null);
            setIsModalOpen(true);
          }}
          className="bg-[#FFD513] text-black px-4 py-2 rounded-md font-bold hover:bg-[#FAFF34] transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Bundle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {localBundles.map(bundle => (
          <div key={bundle.id} className="bg-gray-900 rounded-lg overflow-hidden">
            <img
              src={bundle.image}
              alt={bundle.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{bundle.name}</h3>
                  <p className="text-[#FFD513] font-medium mt-1">{bundle.price}</p>
                  <p className="text-green-400 text-sm">Save {bundle.savings}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingBundle(bundle);
                      setIsModalOpen(true);
                    }}
                    className="text-[#FFD513] hover:text-[#FAFF34]"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(bundle.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {bundle.products.map(product => (
                  <div key={product.id} className="flex items-center space-x-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <p className="text-white text-sm">{product.name}</p>
                      <p className="text-gray-400 text-sm">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bundle Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-6">
                {editingBundle ? 'Edit Bundle' : 'Add New Bundle'}
              </h3>
              <BundleForm
                initialData={editingBundle}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setIsModalOpen(false);
                  setEditingBundle(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface BundleFormProps {
  initialData: Bundle | null;
  onSubmit: (data: BundleFormData) => void;
  onCancel: () => void;
}

const calculateSavings = (totalPrice: number, bundlePrice: number): string => {
  return `$${(totalPrice - bundlePrice).toFixed(2)}`;
};

const BundleForm: React.FC<BundleFormProps> = ({
  initialData,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<BundleFormData>({
    name: initialData?.name || '',
    price: initialData?.price || '',
    savings: initialData?.savings || '',
    image: initialData?.image || '',
    status: initialData?.status || 'draft',
    featured: initialData?.featured || false,
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    validFrom: initialData?.validFrom || '',
    validUntil: initialData?.validUntil || '',
    productIds: initialData?.products.map(p => p.id) || []
  });

  const [selectedProductIds, setSelectedProductIds] = useState<Set<number>>(
    new Set(initialData?.products.map(p => p.id))
  );

  const [currentSavings, setCurrentSavings] = useState('$0.00');
  const [savingsPercentage, setSavingsPercentage] = useState('0');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleProduct = (productId: number) => {
    const newSelected = new Set(selectedProductIds);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProductIds(newSelected);

    // Recalculate savings
    const totalPrice = products
      .filter(p => newSelected.has(p.id))
      .reduce((sum, product) => {
        return sum + parseFloat(product.price.replace('$', ''));
      }, 0);
    
    const bundlePrice = parseFloat(formData.price.replace('$', '') || '0');
    const savings = calculateSavings(totalPrice, bundlePrice);
    setCurrentSavings(savings);
    setSavingsPercentage(
      totalPrice > 0 
        ? ((totalPrice - bundlePrice) / totalPrice * 100).toFixed(1)
        : '0'
    );
  };

  useEffect(() => {
    // Calculate initial savings
    const totalPrice = products
      .filter(p => selectedProductIds.has(p.id))
      .reduce((sum, product) => {
        return sum + parseFloat(product.price.replace('$', ''));
      }, 0);
    
    const bundlePrice = parseFloat(formData.price.replace('$', '') || '0');
    const savings = calculateSavings(totalPrice, bundlePrice);
    setCurrentSavings(savings);
    setSavingsPercentage(
      totalPrice > 0 
        ? ((totalPrice - bundlePrice) / totalPrice * 100).toFixed(1)
        : '0'
    );
  }, [formData.price, selectedProductIds]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Bundle Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Price
          </label>
          <input
            type="text"
            value={formData.price}
            onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Savings
          </label>
          <div className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white">
            {currentSavings} ({savingsPercentage}% off)
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Bundle Image
        </label>
        <div className="flex items-center space-x-4">
          {formData.image && (
            <img
              src={formData.image}
              alt="Bundle preview"
              className="w-24 h-24 object-cover rounded-lg"
            />
          )}
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Image
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Select Products
        </label>
        <div className="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto">
          {products.map(product => (
            <div
              key={product.id}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                selectedProductIds.has(product.id)
                  ? 'bg-[#FFD513]/10 border-2 border-[#FFD513]'
                  : 'bg-gray-800 border-2 border-transparent'
              }`}
              onClick={() => toggleProduct(product.id)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 rounded object-cover"
              />
              <div>
                <p className="text-white text-sm">{product.name}</p>
                <p className="text-gray-400 text-sm">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
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
          {initialData ? 'Update Bundle' : 'Add Bundle'}
        </button>
      </div>
    </form>
  );
};

export default AdminBundles;