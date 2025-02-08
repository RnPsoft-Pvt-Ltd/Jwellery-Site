import { useState, useEffect } from 'react';
import { ArrowLeft, Camera } from 'lucide-react';
import Sidebar from './Sidebar';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    // Basic Product Info
    name: '',
    brand: '',
    SKU: '',
    base_price: '',
    description: '',
    category_id: '',
    collection_id: '',
    tax_category_id: '',
    
    // Product Metadata
    metadata: {
      material_type: '',
      metal_purity: '',
      gemstone_details: '',
      additional_attributes: {}
    },
    
    // Product Variants
    variants: [{
      size: '',
      color: '',
      weight: '',
      price_modifier: '0',
      inventory: {
        total_quantity: 0,
        reserved_quantity: 0,
        minimum_stock_alert: 0
      }
    }],
    
    // Product Images
    images: []
  });

  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [taxCategories, setTaxCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, collectionsRes, taxCategoriesRes] = await Promise.all([
          fetch('http://localhost:5000/v1/categories'),
          fetch('http://localhost:5000/v1/collections'),
          fetch('http://localhost:5000/v1/tax-categories', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
        ]);
  
        const [categoriesData, collectionsData, taxCategoriesData] = await Promise.all([
          categoriesRes.json(),
          collectionsRes.json(),
          taxCategoriesRes.json()
        ]);
  
        setCategories(categoriesData.data || []);
        setCollections(collectionsData.data || []);
        setTaxCategories(taxCategoriesData || []);
      } catch (err) {
        setError('Failed to load required data');
        console.error('Error fetching data:', err);
      }
    };
  
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMetadataChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [name]: value
      }
    }));
  };

  const handleVariantChange = (index, field, value) => {
    setFormData(prev => {
      const newVariants = [...prev.variants];
      newVariants[index] = {
        ...newVariants[index],
        [field]: value
      };
      return {
        ...prev,
        variants: newVariants
      };
    });
  };

  const handleInventoryChange = (variantIndex, field, value) => {
    setFormData(prev => {
      const newVariants = [...prev.variants];
      newVariants[variantIndex] = {
        ...newVariants[variantIndex],
        inventory: {
          ...newVariants[variantIndex].inventory,
          [field]: parseInt(value) || 0
        }
      };
      return {
        ...prev,
        variants: newVariants
      };
    });
  };

  const handleImageURLAdd = () => {
    const imageUrl = window.prompt("Enter image URL:");
    if (imageUrl) {
      setFormData(prev => ({
        ...prev,
        images: [
          ...prev.images,
          {
            url: imageUrl,
            is_primary: prev.images.length === 0, // First image is primary
            display_order: prev.images.length === 0 ? 1 : 2
          }
        ]
      }));
    }
  };

  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, {
        size: '',
        color: '',
        weight: '',
        price_modifier: '0',
        inventory: {
          total_quantity: 0,
          reserved_quantity: 0,
          minimum_stock_alert: 0
        }
      }]
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
  
      // Prepare the product data with image URLs
      const productData = {
        name: formData.name,
        brand: formData.brand,
        SKU: formData.SKU,
        base_price: parseFloat(formData.base_price) || 0,
        description: formData.description,
        category_id: formData.category_id,
        collection_id: formData.collection_id,
        tax_category_id: formData.tax_category_id || null,
        metadata: formData.metadata,
        variants: formData.variants.map(variant => ({
          ...variant,
          price_modifier: parseFloat(variant.price_modifier) || 0,
          weight: parseFloat(variant.weight) || 0,
          inventory: {
            total_quantity: parseInt(variant.inventory.total_quantity) || 0,
            reserved_quantity: parseInt(variant.inventory.reserved_quantity) || 0,
            minimum_stock_alert: parseInt(variant.inventory.minimum_stock_alert) || 0
          }
        })),
        images: formData.images.map(img => ({
          image_url: img.url,
          is_primary: img.is_primary,
          display_order: img.is_primary ? 1 : 2
        }))
      };
  
      console.log('Product data:', productData);
      // Create the product
      const response = await fetch('http://localhost:5000/v1/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create product');
      }
  
      const data = await response.json();
      console.log('Product created:', data);
      window.location.href = '/products';
    } catch (err) {
      setError(err.message);
      console.error('Error creating product:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="pl-64 pt-16">
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button className="mr-4">
              <ArrowLeft className="h-6 w-6 text-gray-500" />
            </button>
            <h1 className="text-2xl font-medium">Create a new product</h1>
          </div>

          <div className="flex gap-6">
            {/* Main Form Section */}
            <div className="flex-1 space-y-6">
              {/* General Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">General</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Brand</label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-md"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">SKU</label>
                      <input
                        type="text"
                        name="SKU"
                        value={formData.SKU}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-200 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Base Price</label>
                      <input
                        type="number"
                        name="base_price"
                        value={formData.base_price}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-200 rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-md h-32"
                    />
                  </div>
                </div>
              </div>

              {/* Product Metadata */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">Product Metadata</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Material Type</label>
                    <input
                      type="text"
                      name="material_type"
                      value={formData.metadata.material_type}
                      onChange={handleMetadataChange}
                      className="w-full p-2 border border-gray-200 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Metal Purity</label>
                    <input
                      type="text"
                      name="metal_purity"
                      value={formData.metadata.metal_purity}
                      onChange={handleMetadataChange}
                      className="w-full p-2 border border-gray-200 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Gemstone Details</label>
                    <textarea
                      name="gemstone_details"
                      value={formData.metadata.gemstone_details}
                      onChange={handleMetadataChange}
                      className="w-full p-2 border border-gray-200 rounded-md h-32"
                    />
                  </div>
                </div>
              </div>

              {/* Product Variants */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Product Variants</h2>
                  <button 
                    onClick={addVariant}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Variant
                  </button>
                </div>
                {formData.variants.map((variant, index) => (
                  <div key={index} className="border-t pt-4 mt-4 first:border-t-0 first:pt-0 first:mt-0">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Size</label>
                        <input
                          type="text"
                          value={variant.size}
                          onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Color</label>
                        <input
                          type="text"
                          value={variant.color}
                          onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Weight</label>
                        <input
                          type="number"
                          value={variant.weight}
                          onChange={(e) => handleVariantChange(index, 'weight', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-1">Price Modifier</label>
                      <input
                        type="number"
                        value={variant.price_modifier}
                        onChange={(e) => handleVariantChange(index, 'price_modifier', e.target.value)}
                        className="w-full p-2 border border-gray-200 rounded-md"
                      />
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Total Quantity</label>
                        <input
                          type="number"
                          value={variant.inventory.total_quantity}
                          onChange={(e) => handleInventoryChange(index, 'total_quantity', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Reserved Quantity</label>
                        <input
                          type="number"
                          value={variant.inventory.reserved_quantity}
                          onChange={(e) => handleInventoryChange(index, 'reserved_quantity', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Minimum Stock Alert</label>
                        <input
                          type="number"
                          value={variant.inventory.minimum_stock_alert}
                          onChange={(e) => handleInventoryChange(index, 'minimum_stock_alert', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Media Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">Media</h2>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8">
                  <div className="text-center">
                    <button
                      onClick={handleImageURLAdd}
                      className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      <Camera className="mr-2 h-5 w-5" />
                      Add Image URL
                    </button>
                  </div>
                  
                  {formData.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-4 gap-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image.url}
                            alt={`Product ${index + 1}`}
                            className="w-full h-24 object-cover rounded"
                          />
                          {image.is_primary && (
                            <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                              Primary
                            </span>
                          )}
                          <button
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                images: prev.images.filter((_, i) => i !== index)
                              }));
                            }}
                            className="absolute top-0 left-0 bg-red-500 text-white text-xs p-1 rounded-bl"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between py-4">
              <button 
                onClick={() => window.history.back()} 
                className="px-4 py-2 text-red-500 border border-red-500 rounded-md hover:bg-red-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:bg-emerald-300"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-500 rounded-md">
                {error}
              </div>
            )}
            </div>

            {/* Right Sidebar */}
            <div className="w-80 space-y-6">
              {/* Categories and Collections */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">Categories & Collections</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-md"
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Collection</label>
                    <select
                      name="collection_id"
                      value={formData.collection_id}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-md"
                    >
                      <option value="">Select Collection</option>
                      {collections.map(collection => (
                        <option key={collection.id} value={collection.id}>
                          {collection.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Tax Category */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">Tax Settings</h2>
                <div>
                  <label className="block text-sm font-medium mb-1">Tax Category</label>
                  <select
                    name="tax_category_id"
                    value={formData.tax_category_id}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-200 rounded-md"
                  >
                    <option value="">Select Tax Category</option>
                    {taxCategories.map(tax => (
                      <option key={tax.id} value={tax.id}>
                        {tax.name} - ({tax.standard_rate}%)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateProduct;