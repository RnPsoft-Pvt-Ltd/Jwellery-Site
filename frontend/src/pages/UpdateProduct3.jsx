import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProduct3 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [SKU, setSKU] = useState("");
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.base_price || "");
      setDescription(product.description || "");
      setSKU(product.SKU || "");
      const safeVariants = Array.isArray(product.variants)
        ? product.variants.map((variant) => ({
            ...variant,
            inventory: variant.inventory || {
              reserved_quantity: 0,
              total_quantity: 0,
            },
          }))
        : [];
      setVariants(safeVariants);
    }
  }, [product]);

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  const handleInventoryChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index].inventory = {
      ...updatedVariants[index].inventory,
      [field]: parseInt(value) || 0,
    };
    setVariants(updatedVariants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name,
        base_price: parseFloat(price).toFixed(2),
        description,
        SKU,
        // variants: variants.map((variant) => ({
        //   color: variant.color,
        //   size: variant.size,
        //   price_modifier: parseFloat(variant.price_modifier) || 0,
        //   inventory: {
        //     reserved_quantity: parseInt(variant.inventory.reserved_quantity) || 0,
        //     total_quantity: parseInt(variant.inventory.total_quantity) || 0,
        //   },
        // })),
      };

      await axios.put(`https://api.shopevella.com/v1/products/${product.id}`, payload);

      alert("Product updated successfully");
      navigate("/admin/products");
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      alert("Failed to update product");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Price</label>
          <input
            type="number"
            step="0.01"
            className="w-full p-2 border rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">SKU</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={SKU}
            onChange={(e) => setSKU(e.target.value)}
            required
          />
        </div>

        {/* Variants */}
        {/* {variants.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mt-6 mb-3">Variants</h3>
            {variants.map((variant, index) => (
              <div key={variant.id || index} className="mb-4 border p-4 rounded bg-gray-50">
                <h4 className="font-medium mb-2">Variant {index + 1}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    className="p-2 border rounded"
                    placeholder="Color"
                    value={variant.color || ""}
                    onChange={(e) => handleVariantChange(index, "color", e.target.value)}
                  />
                  <input
                    type="text"
                    className="p-2 border rounded"
                    placeholder="Size"
                    value={variant.size || ""}
                    onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                  />
                  <input
                    type="number"
                    step="0.01"
                    className="p-2 border rounded"
                    placeholder="Price Modifier"
                    value={variant.price_modifier || ""}
                    onChange={(e) => handleVariantChange(index, "price_modifier", e.target.value)}
                  />
                  <input
                    type="number"
                    className="p-2 border rounded"
                    placeholder="Reserved Quantity"
                    value={variant.inventory?.reserved_quantity || ""}
                    onChange={(e) => handleInventoryChange(index, "quantity", e.target.value)}
                  />
                  <input
                    type="number"
                    className="p-2 border rounded"
                    placeholder="Total Quantity"
                    value={variant.inventory?.total_quantity || ""}
                    onChange={(e) => handleInventoryChange(index, "low_stock_threshold", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        )} */}

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

export default UpdateProduct3;