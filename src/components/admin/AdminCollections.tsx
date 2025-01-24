import { Plus, Edit, Trash2, Upload, Search, Filter, Archive, Star } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Collection, CollectionFormData } from '../../types';
import { formatDate } from '../../utils/formatters';

const AdminCollections = () => {
  const [localCollections, setLocalCollections] = useState<Collection[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Collection['status']>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [productList, setProductList] = useState<Product[]>([]);

  // Fetch collections on component mount
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch('/api/collections');
        if (!response.ok) throw new Error('Failed to fetch collections');
        const data = await response.json();
        setLocalCollections(data);
      } catch (error) {
        console.error('Error fetching collections:', error);
        // Add error handling UI if needed
      }
    };

    fetchCollections();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProductList(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredCollections = localCollections.filter(collection => {
    const matchesStatus = statusFilter === 'all' || collection.status === statusFilter;
    const matchesSearch = 
      collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleSubmit = async (formData: CollectionFormData) => {
    try {
      const method = editingCollection ? 'PUT' : 'POST';
      const url = editingCollection 
        ? `/api/collections/${editingCollection.id}` 
        : '/api/collections';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save collection');
      const savedCollection = await response.json();

      setLocalCollections(prev => {
        if (editingCollection) {
          return prev.map(c => c.id === savedCollection.id ? savedCollection : c);
        }
        return [...prev, savedCollection];
      });

      setIsModalOpen(false);
      setEditingCollection(null);
    } catch (error) {
      console.error('Error saving collection:', error);
      // Add error handling UI if needed
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this collection?')) {
      try {
        const response = await fetch(`/api/collections/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) throw new Error('Failed to delete collection');
        
        setLocalCollections(prev => prev.filter(c => c.id !== id));
      } catch (error) {
        console.error('Error deleting collection:', error);
        // Add error handling UI if needed
      }
    }
  };

  const toggleFeatured = (id: number) => {
    setLocalCollections(prev =>
      prev.map(c => (c.id === id ? { ...c, featured: !c.featured } : c))
    );
  };

  const updateStatus = (id: number, status: Collection['status']) => {
    setLocalCollections(prev =>
      prev.map(c => (c.id === id ? { ...c, status } : c))
    );
  };

  // Filters Section
  const renderFilters = () => (
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search collections..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
        />
      </div>
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className="pl-10 pr-4 py-2 bg-gray-900 text-white rounded-md border border-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FFD513] appearance-none cursor-pointer"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>
    </div>
  );

  const getStatusColor = (status: Collection['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Collections</h2>
        <button
          onClick={() => {
            setEditingCollection(null);
            setIsModalOpen(true);
          }}
          className="bg-[#FFD513] text-black px-4 py-2 rounded-md font-bold hover:bg-[#FAFF34] transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Collection
        </button>
      </div>

      {renderFilters()}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCollections.map(collection => (
          <div key={collection.id} className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{collection.name}</h3>
                  {collection.featured && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FFD513] text-black mt-2">
                      Featured
                    </span>
                  )}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-2 ${getStatusColor(collection.status)}`}>
                    {collection.status.charAt(0).toUpperCase() + collection.status.slice(1)}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingCollection(collection);
                      setIsModalOpen(true);
                    }}
                    className="text-[#FFD513] hover:text-[#FAFF34]"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => toggleFeatured(collection.id)}
                    className={`${
                      collection.featured ? 'text-[#FFD513]' : 'text-gray-400'
                    } hover:text-[#FAFF34]`}
                  >
                    <Star className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => updateStatus(collection.id, 'archived')}
                    className="text-gray-400 hover:text-white"
                  >
                    <Archive className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(collection.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-gray-400 mb-4">{collection.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{collection.products.length} products</span>
                <span>Updated {formatDate(collection.updatedAt)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Collection Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-6">
                {editingCollection ? 'Edit Collection' : 'Add New Collection'}
              </h3>
              <CollectionForm
                initialData={editingCollection}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setIsModalOpen(false);
                  setEditingCollection(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
}

interface CollectionFormProps {
  initialData: Collection | null;
  onSubmit: (data: CollectionFormData) => void;
  onCancel: () => void;
}

const CollectionForm: React.FC<CollectionFormProps> = ({
  initialData,
  onSubmit,
  onCancel
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    image: initialData?.image || '',
    featured: initialData?.featured || false,
    products: initialData?.products || [],
    status: initialData?.status || 'draft',
    slug: initialData?.slug || ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Collection Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Collection Image
        </label>
        <div className="flex items-center space-x-4">
          {formData.image && (
            <img
              src={formData.image}
              alt="Collection preview"
              className="w-24 h-24 object-cover rounded-lg"
            />
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Image
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Status
        </label>
        <select
          value={formData.status}
          onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as Collection['status'] }))}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
        >
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={e => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
          className="w-4 h-4 text-[#FFD513] border-gray-700 rounded focus:ring-[#FFD513] focus:ring-offset-gray-900"
        />
        <label htmlFor="featured" className="ml-2 text-sm text-gray-400">
          Feature this collection
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Products
        </label>
        <div className="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto">
          {products.map(product => (
            <div
              key={product.id}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                formData.products.includes(product.id)
                  ? 'bg-[#FFD513]/10 border-2 border-[#FFD513]'
                  : 'bg-gray-800 border-2 border-transparent'
              }`}
              onClick={() => {
                const newProducts = formData.products.includes(product.id)
                  ? formData.products.filter(id => id !== product.id)
                  : [...formData.products, product.id];
                setFormData(prev => ({ ...prev, products: newProducts }));
              }}
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
          {initialData ? 'Update Collection' : 'Add Collection'}
        </button>
      </div>
    </form>
  );
};

export default AdminCollections;