import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewSale = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    is_active: true,
    thumbnail: '',
    products: [],
  });

  // Handle input change for general fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle changes for products array
  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    let updatedProducts = [...formData.products];
    let parsedValue = parseFloat(value);

    if (name === "discount_percent" || name === "discount_amount") {
      if (parsedValue > 9.9999) parsedValue = 9.9999; // Cap values at 9.9999
    }

    updatedProducts[index] = {
      ...updatedProducts[index],
      [name]: name.includes("discount") ? parsedValue : value,
    };

    setFormData({ ...formData, products: updatedProducts });
  };

  // Add a new product to the sale
  const addProduct = () => {
    setFormData({
      ...formData,
      products: [
        ...formData.products,
        { product_id: '', discount_percent: 0, discount_amount: 0 },
      ],
    });
  };

  // Remove a product from the sale
  const removeProduct = (index) => {
    const updatedProducts = [...formData.products];
    updatedProducts.splice(index, 1);
    setFormData({ ...formData, products: updatedProducts });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formattedData = {
      ...formData,
      start_date: new Date(formData.start_date).toISOString(), // Ensure date format
      end_date: new Date(formData.end_date).toISOString(),
      products: formData.products.map((product) => ({
        product_id: product.product_id,
        discount_percent: Number(product.discount_percent) || 0, // Ensure number
        discount_amount: Number(product.discount_amount) || 0,   // Ensure number
      })),
    };
  
    console.log("Sending data:", formattedData); // Debugging: See what is sent
  
    try {
      await axios.post('https://api.shopevella.com/v1/sales', formattedData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is included
        },
      });
      navigate('/admin'); // Redirect to admin dashboard
    } catch (error) {
      console.error('Error creating sale:', error.response?.data || error.message);
    }
  };
  

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create New Sale</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Sale Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <label className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
          />
          Active Sale
        </label>
        <input
          type="text"
          name="thumbnail"
          placeholder="Thumbnail URL"
          value={formData.thumbnail}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />

        <h3 className="text-lg font-semibold mt-4">Products</h3>
        {formData.products.map((product, index) => (
          <div key={index} className="border p-3 mb-3 rounded">
            <input
              type="text"
              name="product_id"
              placeholder="Product ID"
              value={product.product_id}
              onChange={(e) => handleProductChange(index, e)}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              name="discount_percent"
              placeholder="Discount % (Max: 9.9999)"
              value={product.discount_percent}
              onChange={(e) => handleProductChange(index, e)}
              step="0.0001"
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              name="discount_amount"
              placeholder="Discount Amount (Max: 9.9999)"
              value={product.discount_amount}
              onChange={(e) => handleProductChange(index, e)}
              step="0.0001"
              className="w-full p-2 mb-2 border rounded"
            />
            <button
              type="button"
              onClick={() => removeProduct(index)}
              className="bg-red-500 text-white px-3 py-1 rounded mt-2"
            >
              Remove Product
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addProduct}
          className="bg-gray-500 text-white px-3 py-2 rounded mb-4"
        >
          Add Product
        </button>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Sale
        </button>
      </form>
    </div>
  );
};

export default NewSale;
