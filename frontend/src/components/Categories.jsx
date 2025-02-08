import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Categories = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/v1/categories');
        const formattedProducts = response.data.data.map((product) => ({
          ID: product.id,
          name: product.name,
          description: product.description,
          status: true,
          thumbnail: product.thumbnail,
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="ml-64 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
          New Category
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex gap-4">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 max-w-sm px-4 py-2 border rounded-md"
          />
          {/* <select className="px-4 py-2 border rounded-md">
            <option>Status</option>
          </select> */}
        </div>
        
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {/* <th className="w-12 px-4 py-3"><input type="checkbox" /></th> */}
              <th className="text-left px-4 py-3">THUMBNAIL</th>
              <th className="text-left px-4 py-3">NAME</th>
              <th className="text-left px-4 py-3">DESCRIPTION</th>
              <th className="text-left px-4 py-3">ID</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={idx} className="border-t">
                {/* <td className="px-4 py-3"><input type="checkbox" /></td> */}
                <td className="px-4 py-3">
                  {product.thumbnail ? (
                    <img src={product.thumbnail} alt={product.name} className="w-12 h-12 object-cover rounded" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  )}
                </td>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">{product.description}</td>
                <td className="px-4 py-3">{product.ID}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="p-4 border-t flex justify-between items-center">
          <div>
            <span className="mx-2">{products.length} records</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Categories;