import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Camera } from "lucide-react";

const UpdateProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};

  const [fullProduct, setFullProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [taxCategories, setTaxCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProductDetails = async () => {
    try {
      const [{ data: productData }, { data: categoriesData }, { data: collectionsData }, { data: taxCategoriesData }] = await Promise.all([
        axios.get(`https://api.shopevella.com/v1/products/${product.ID}`),
        axios.get("https://api.shopevella.com/v1/categories"),
        axios.get("https://api.shopevella.com/v1/collections"),
        axios.get("https://api.shopevella.com/v1/tax-categories", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
      ]);

      setFullProduct(productData);
      setCategories(categoriesData.data || []);
      setCollections(collectionsData.data || []);
      setTaxCategories(taxCategoriesData || []);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (product?.ID) fetchProductDetails();
  }, [product]);

  const [formData, setFormData] = useState({
    name: "",
    base_price: "",
    brand: "",
    description: "",
    SKU: "",
    category_id: "",
    collection_id: "",
    tax_category_id: "",
    material_type: "",
    metal_purity: "",
    gemstone_details: "",
    images: [],
  });

  useEffect(() => {
    if (fullProduct) {
      setFormData({
        name: fullProduct.name || "",
        base_price: fullProduct.base_price || "",
        brand: fullProduct.brand || "",
        description: fullProduct.description || "",
        SKU: fullProduct.SKU || "",
        category_id: fullProduct.category_id || "",
        collection_id: fullProduct.collection_id || "",
        tax_category_id: fullProduct.tax_category_id || "",
        material_type: fullProduct.product_metadata?.material_type || "",
        metal_purity: fullProduct.product_metadata?.metal_purity || "",
        gemstone_details: fullProduct.product_metadata?.gemstone_details || "",
        images: fullProduct.images || [],
      });
    }
  }, [fullProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, field, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index][field] = field === "display_order" ? parseInt(value) : value;
    setFormData((prev) => ({ ...prev, images: updatedImages }));
  };

  const handleAddImage = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const formDataUpload = new FormData();
          formDataUpload.append("file", file);

          fetch("https://api.shopevella.com/v1/upload", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formDataUpload,
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.fileUrl) {
                setFormData((prev) => ({
                  ...prev,
                  images: [
                    ...prev.images,
                    {
                      image_url: data.fileUrl,
                      is_primary: prev.images.length === 0,
                      display_order: prev.images.length + 1,
                    },
                  ],
                }));
              } else {
                throw new Error("Failed to upload image");
              }
            })
            .catch((err) => {
              console.error("Error uploading image:", err);
              alert("Failed to upload image. Please try again.");
            });
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://api.shopevella.com/v1/products/${product.ID}`, {
        name: formData.name,
        base_price: parseFloat(formData.base_price).toFixed(4),
        brand: formData.brand,
        description: formData.description,
        SKU: formData.SKU,
        category_id: formData.category_id,
        collection_id: formData.collection_id,
        tax_category_id: formData.tax_category_id,
        product_metadata: {
          material_type: formData.material_type,
          metal_purity: formData.metal_purity,
          gemstone_details: formData.gemstone_details,
        },
        images: formData.images.map((img, index) => ({
          image_url: img.image_url,
          is_primary: img.is_primary,
          display_order: img.display_order || index + 1,
        })),
      });

      alert("Product updated successfully");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product", error);
      alert("Failed to update product");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading product data...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(formData).map(([key, value]) => {
          if (key === "images") return null;

          if (["category_id", "collection_id", "tax_category_id"].includes(key)) {
            const options =
              key === "category_id"
                ? categories
                : key === "collection_id"
                ? collections
                : taxCategories;

            return (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {key.replace("_", " ")}
                </label>
                <select
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                  required
                >
                  <option value="">Select an option</option>
                  {options.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          return (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {key.replace("_", " ")}
              </label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                required
              />
            </div>
          );
        })}

        <div>
          <h3 className="text-lg font-medium">Images</h3>
         {formData.images.map((img, index) => (
  <div key={index} className="flex items-center gap-4 mt-2">
    <img
      src={img.image_url}
      alt={`Product ${index + 1}`}
      className="w-16 h-16 object-cover rounded border"
    />
    <input
      type="text"
      value={img.image_url}
      onChange={(e) => handleImageChange(index, "image_url", e.target.value)}
      className="flex-1 border rounded px-2 py-1"
    />
    <input
      type="number"
      value={img.display_order || index + 1}
      onChange={(e) => handleImageChange(index, "display_order", e.target.value)}
      className="w-20 border rounded px-2 py-1"
    />
    <label className="flex items-center space-x-1">
      <input
        type="checkbox"
        checked={img.is_primary}
        onChange={() => {
          setFormData((prev) => ({
            ...prev,
            images: prev.images.map((img, i) => ({
              ...img,
              is_primary: i === index,
            })),
          }));
        }}
      />
      <span>Primary</span>
    </label>
  </div>
))}

          <button
            type="button"
            onClick={handleAddImage}
            className="inline-flex items-center mt-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Camera className="h-4 w-4 mr-2" />
            Add Image
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
