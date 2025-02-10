// New implementation of createProducts

import { useState, useEffect } from "react";
import { ArrowLeft, Camera, Plus, X } from "lucide-react";
import { useToast } from "../utils/toastContext";

const CreateProduct = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    SKU: "",
    base_price: "",
    description: "",
    category_id: "",
    collection_id: "",
    tax_category_id: "",
    metadata: {
      material_type: "",
      metal_purity: "",
      gemstone_details: "",
      additional_attributes: {},
    },
    variants: [
      {
        size: "",
        color: "",
        weight: "",
        price_modifier: "0",
        inventory: {
          total_quantity: 0,
          reserved_quantity: 0,
          minimum_stock_alert: 0,
        },
      },
    ],
    images: [],
  });

  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [taxCategories, setTaxCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, collectionsRes, taxCategoriesRes] =
          await Promise.all([
            fetch("http://localhost:5000/v1/categories"),
            fetch("http://localhost:5000/v1/collections"),
            fetch("http://localhost:5000/v1/tax-categories", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }),
          ]);

        const [categoriesData, collectionsData, taxCategoriesData] =
          await Promise.all([
            categoriesRes.json(),
            collectionsRes.json(),
            taxCategoriesRes.json(),
          ]);

        setCategories(categoriesData.data || []);
        setCollections(collectionsData.data || []);
        setTaxCategories(taxCategoriesData || []);
      } catch (err) {
        setError("Failed to load required data");
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMetadataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [name]: value,
      },
    }));
  };

  const handleVariantChange = (index, field, value) => {
    setFormData((prev) => {
      const newVariants = [...prev.variants];
      newVariants[index] = {
        ...newVariants[index],
        [field]: value,
      };
      return {
        ...prev,
        variants: newVariants,
      };
    });
  };

  const handleInventoryChange = (variantIndex, field, value) => {
    setFormData((prev) => {
      const newVariants = [...prev.variants];
      newVariants[variantIndex] = {
        ...newVariants[variantIndex],
        inventory: {
          ...newVariants[variantIndex].inventory,
          [field]: parseInt(value) || 0,
        },
      };
      return {
        ...prev,
        variants: newVariants,
      };
    });
  };

  const handleImageURLAdd = () => {
    const imageUrl = window.prompt("Enter image URL:");
    if (imageUrl) {
      setFormData((prev) => ({
        ...prev,
        images: [
          ...prev.images,
          {
            url: imageUrl,
            is_primary: prev.images.length === 0,
            display_order: prev.images.length === 0 ? 1 : 2,
          },
        ],
      }));
    }
  };

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          size: "",
          color: "",
          weight: "",
          price_modifier: "0",
          inventory: {
            total_quantity: 0,
            reserved_quantity: 0,
            minimum_stock_alert: 0,
          },
        },
      ],
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const productData = {
        ...formData,
        base_price: parseFloat(formData.base_price) || 0,
        variants: formData.variants.map((variant) => ({
          ...variant,
          price_modifier: parseFloat(variant.price_modifier) || 0,
          weight: parseFloat(variant.weight) || 0,
          inventory: {
            total_quantity: parseInt(variant.inventory.total_quantity) || 0,
            reserved_quantity:
              parseInt(variant.inventory.reserved_quantity) || 0,
            minimum_stock_alert:
              parseInt(variant.inventory.minimum_stock_alert) || 0,
          },
        })),
        images: formData.images.map((img) => ({
          image_url: img.url,
          is_primary: img.is_primary,
          display_order: img.is_primary ? 1 : 2,
        })),
      };

      const response = await fetch("http://localhost:5000/v1/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create product");
      }

      window.location.href = "/products";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.history.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-500" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">
              Create Product
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
            >
              {loading ? "Saving..." : "Save Product"}
            </button>
          </div>
        </div>

        {error &&
          addToast("Failed to create product. Please try again.", "error")}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* General Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">
                General Information
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brand
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SKU
                    </label>
                    <input
                      type="text"
                      name="SKU"
                      value={formData.SKU}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Base Price
                    </label>
                    <input
                      type="number"
                      name="base_price"
                      value={formData.base_price}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Product Variants */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Product Variants</h2>
                <button
                  onClick={addVariant}
                  className="inline-flex items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Variant
                </button>
              </div>

              <div className="space-y-6">
                {formData.variants.map((variant, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Size
                        </label>
                        <input
                          type="text"
                          value={variant.size}
                          onChange={(e) =>
                            handleVariantChange(index, "size", e.target.value)
                          }
                          className="w-full p-2.5 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Color
                        </label>
                        <input
                          type="text"
                          value={variant.color}
                          onChange={(e) =>
                            handleVariantChange(index, "color", e.target.value)
                          }
                          className="w-full p-2.5 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Weight
                        </label>
                        <input
                          type="number"
                          value={variant.weight}
                          onChange={(e) =>
                            handleVariantChange(index, "weight", e.target.value)
                          }
                          className="w-full p-2.5 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price Modifier
                      </label>
                      <input
                        type="number"
                        value={variant.price_modifier}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "price_modifier",
                            e.target.value
                          )
                        }
                        className="w-full p-2.5 border border-gray-300 rounded-lg"
                      />
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Total Quantity
                        </label>
                        <input
                          type="number"
                          value={variant.inventory.total_quantity}
                          onChange={(e) =>
                            handleInventoryChange(
                              index,
                              "total_quantity",
                              e.target.value
                            )
                          }
                          className="w-full p-2.5 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Reserved
                        </label>
                        <input
                          type="number"
                          value={variant.inventory.reserved_quantity}
                          onChange={(e) =>
                            handleInventoryChange(
                              index,
                              "reserved_quantity",
                              e.target.value
                            )
                          }
                          className="w-full p-2.5 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Min Stock Alert
                        </label>
                        <input
                          type="number"
                          value={variant.inventory.minimum_stock_alert}
                          onChange={(e) =>
                            handleInventoryChange(
                              index,
                              "minimum_stock_alert",
                              e.target.value
                            )
                          }
                          className="w-full p-2.5 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Metadata - Restored */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Product Metadata</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Material Type
                  </label>
                  <input
                    type="text"
                    name="material_type"
                    value={formData.metadata.material_type}
                    onChange={handleMetadataChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Metal Purity
                  </label>
                  <input
                    type="text"
                    name="metal_purity"
                    value={formData.metadata.metal_purity}
                    onChange={handleMetadataChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gemstone Details
                  </label>
                  <textarea
                    name="gemstone_details"
                    maxlength="250"
                    value={formData.metadata.gemstone_details}
                    onChange={handleMetadataChange}
                    rows={4}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Media Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Media</h2>
              <button
                onClick={handleImageURLAdd}
                className="inline-flex items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Camera className="h-4 w-4 mr-2" />
                Add Image
              </button>

              <div className="mt-4 grid grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image.url}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <button
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          images: prev.images.filter((_, i) => i !== index),
                        }));
                      }}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Restored */}
          <div className="space-y-6">
            {/* Categories and Collections */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">
                Categories & Collections
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Collection
                  </label>
                  <select
                    name="collection_id"
                    value={formData.collection_id}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Collection</option>
                    {collections.map((collection) => (
                      <option key={collection.id} value={collection.id}>
                        {collection.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Tax Settings */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Tax Settings</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tax Category
                </label>
                <select
                  name="tax_category_id"
                  value={formData.tax_category_id}
                  onChange={handleInputChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Tax Category</option>
                  {taxCategories.map((tax) => (
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
    </div>
  );
};

export default CreateProduct;
