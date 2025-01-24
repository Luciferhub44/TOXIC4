import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import type { Bundle, BundleFormData, Product } from '../../types';

interface BundleFormProps {
  initialData: Bundle | null;
  onSubmit: (data: BundleFormData) => void;
  onCancel: () => void;
  products: Product[];
}

const AdminBundles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBundle, setEditingBundle] = useState<Bundle | null>(null);
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bundlesRes, productsRes] = await Promise.all([
          fetch('/api/bundles'),
          fetch('/api/products')
        ]);

        if (!bundlesRes.ok || !productsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [bundlesData, productsData] = await Promise.all([
          bundlesRes.json(),
          productsRes.json()
        ]);

        setBundles(bundlesData);
        setProducts(productsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        alert('Failed to fetch data. Please try again.');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (formData: BundleFormData) => {
    try {
      const method = editingBundle ? 'PUT' : 'POST';
      const url = editingBundle 
        ? `/api/bundles/${editingBundle.id}` 
        : '/api/bundles';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          valid_from: formData.valid_from,
          valid_until: formData.valid_until,
          product_ids: Array.from(formData.product_ids)
        }),
      });

      if (!response.ok) throw new Error('Failed to save bundle');
      
      const savedBundle = await response.json();
      
      setBundles(prev => 
        editingBundle
          ? prev.map(b => b.id === savedBundle.id ? savedBundle : b)
          : [...prev, savedBundle]
      );
      
      setIsModalOpen(false);
      setEditingBundle(null);
    } catch (error) {
      console.error('Failed to save bundle:', error);
      alert('Failed to save bundle. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this bundle?')) return;
    
    try {
      const response = await fetch(`/api/bundles/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete bundle');
      
      setBundles(prev => prev.filter(b => b.id !== id));
    } catch (error) {
      console.error('Failed to delete bundle:', error);
      alert('Failed to delete bundle. Please try again.');
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
        {bundles.map(bundle => (
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
                products={products}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const calculateSavings = (totalPrice: number, bundlePrice: number): string => {
  return `$${(totalPrice - bundlePrice).toFixed(2)}`;
};

const BundleForm: React.FC<BundleFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  products
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
    valid_from: initialData?.valid_from || '',
    valid_until: initialData?.valid_until || '',
    product_ids: initialData?.products?.map(p => p.id) || []
  });

  const [selectedProductIds, setSelectedProductIds] = useState<Set<number>>(
    new Set(initialData?.products.map(p => p.id) || [])
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
  }, [formData.price, selectedProductIds, products]);

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