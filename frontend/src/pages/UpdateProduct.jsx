import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};

  const [name, setName] = useState(product?.name || "");
  const [basePrice, setBasePrice] = useState(product?.price || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedBasePrice = parseFloat(basePrice).toFixed(4);
    const originalBasePrice = parseFloat(product.price).toFixed(4);

    // Check if name & price are unchanged and only then prevent update
    if (name === product.name && formattedBasePrice === originalBasePrice) {
      alert("Product Unchanged");
      return navigate("/admin/products"); // Redirect without making an API call
    }

    try {
      await axios.put(`https://api.shopevella.com/v1/products/${product.ID}`, {
        name,
        base_price: formattedBasePrice,
      });

      alert("Product updated successfully");
      navigate("/admin/products");
    } catch (error) {
      alert("Failed to update product");
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>
      <form onSubmit={handleSubmit}>
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

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Base Price
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            required
          />
        </div>

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

export default UpdateProduct;
