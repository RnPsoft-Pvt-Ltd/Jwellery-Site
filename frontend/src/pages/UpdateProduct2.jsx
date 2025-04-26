import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProduct2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  
  // const [catName, setCatName] = useState(product?.category?.name || "");
  
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    SKU: "",
    description: "",
    base_price: "",
    stock: "",
    thumbnail: "",
    variants: [],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        brand: product.brand || "",
        SKU: product.SKU || "",
        description: product.description || "",
        base_price: product.base_price || "",
        stock: product.stock || "",
        thumbnail: product.thumbnail || "",
        variants: product.variants || [],
      });
      //setCatName(product.category?.name || ""); Set category name from the product
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // if (name === "category") {
    //   setCatName(value);
    // } 
    // else 
      setFormData((prev) => ({ ...prev, [name]: value }));
    
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index][field] = value;
    setFormData((prev) => ({ ...prev, variants: updatedVariants }));
  };

  const handleInventoryChange = (index, field, value) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index].inventory[field] = value;
    setFormData((prev) => ({ ...prev, variants: updatedVariants }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://api.shopevella.com/v1/products/${product.id}`, {
        ...formData,
        // category: {
        //   name: catName,
        // },
        price: parseFloat(formData.price).toFixed(4),
        variants: formData.variants.map((variant) => ({
          ...variant,
          price_modifier: parseFloat(variant.price_modifier).toFixed(4),
        })),
      });

      alert("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error("Error during product update: ", err);
      alert("Failed to update product");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[ 
          { label: "Name", name: "name" }, 
          { label: "Brand", name: "brand" }, 
          { label: "SKU", name: "SKU" }, 
          { label: "Description", name: "description", type: "textarea" }, 
          { label: "Base Price", name: "base_price", type: "number" }, 
          { label: "Stock", name: "stock", type: "number" }, 
          { label: "Thumbnail URL", name: "thumbnail" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block text-gray-700 font-medium mb-1">
              {label}
            </label>
            {type === "textarea" ? (
              <textarea
                name={name}
                className="w-full p-2 border rounded"
                value={formData[name]}
                onChange={handleInputChange}
              />
            ) : (
              <input
                type={type}
                name={name}
                className="w-full p-2 border rounded"
                value={formData[name]}
                onChange={handleInputChange}
              />
            )}
          </div>
        ))}
        
        {/* Category input */}
        {/* <label className="block text-gray-700 font-medium mb-1">Category</label>
        <input
          type="text"
          name="category"
          className="w-full p-2 border rounded"
          value={catName}
          onChange={handleInputChange}
        /> */}
        
        {/* Variants section */}
        {formData.variants.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mt-6 mb-3">Variants</h3>
            {formData.variants.map((variant, index) => (
              <div
                key={variant.id || index}
                className="mb-4 border p-4 rounded bg-gray-50"
              >
                <h4 className="font-medium mb-2">Variant {index + 1}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    className="p-2 border rounded"
                    placeholder="Color"
                    value={variant.color}
                    onChange={(e) =>
                      handleVariantChange(index, "color", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    className="p-2 border rounded"
                    placeholder="Size"
                    value={variant.size}
                    onChange={(e) =>
                      handleVariantChange(index, "size", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    className="p-2 border rounded"
                    placeholder="Price Modifier"
                    value={variant.price_modifier}
                    onChange={(e) =>
                      handleVariantChange(index, "price_modifier", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    className="p-2 border rounded"
                    placeholder="Total Quantity"
                    value={variant.inventory.total_quantity}
                    onChange={(e) =>
                      handleInventoryChange(index, "total_quantity", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    className="p-2 border rounded"
                    placeholder="Reserved Quantity"
                    value={variant.inventory.reserved_quantity}
                    onChange={(e) =>
                      handleInventoryChange(index, "reserved_quantity", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct2;
