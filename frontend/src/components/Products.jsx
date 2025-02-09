import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/v1/products');
      const formattedProducts = response.data.data.map((product) => {
        const totalStock = product.variants?.reduce((sum, variant) => {
          return sum + (variant.inventory?.total_quantity || 0);
        }, 0) || 0;

        return {
          ID: product.id,
          name: product.name,
          price: product.base_price,
          sku: product.SKU,
          stock: totalStock,
          thumbnail: product.images.find((img) => img.is_primary)?.image_url || product.images[0]?.image_url || '',
        };
      });
      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [products]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/v1/products/${id}`);
      setProducts(products.filter((product) => product.ID !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // const handleUpdate = async (id) => {
  //   try {
  //     await axios.put(`http://localhost:5000/v1/products/${id}`, { /* Add update data */ });
  //     fetchProducts();
  //   } catch (error) {
  //     console.error('Error updating product:', error);
  //   }
  // };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <button
          onClick={()=>navigate('/admin/new-product')}
         className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
          New Product
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
          </select>
          <select className="px-4 py-2 border rounded-md">
            <option>Product Type</option>
          </select> */}
        </div>
        
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {/* <th className="w-12 px-4 py-3"><input type="checkbox" /></th> */}
              <th className="text-left px-4 py-3">THUMBNAIL</th>
              <th className="text-left px-4 py-3">NAME</th>
              <th className="text-left px-4 py-3">PRICE</th>
              <th className="text-left px-4 py-3">STOCK</th>
              <th className="text-left px-4 py-3">SKU</th>
              {/* <th className="text-left px-4 py-3">ID</th> */}
              {/* <th className="text-left px-4 py-3">UPDATE</th> */}
              <th className="text-left px-4 py-3">DELETE</th>
              {/* <th className="text-left px-4 py-3">STATUS</th> */}
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
                <td className="px-4 py-3">₹{product.price}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3">{product.sku}</td>
                {/* <td className="px-4 py-3">{product.ID}</td> */}
                {/* <td>
                  <button
                    onClick={()=>handleUpdate(product.ID)} 
                    className='bg-orange-600 px-3 py-2 text-white rounded-lg hover:bg-orange-700'>update</button>
                </td> */}
                <td>
                  <button
                    onClick={()=>handleDelete(product.ID)} 
                    className='bg-red-600 px-3 py-2 text-white rounded-lg hover:bg-red-700'>delete</button>
                </td>
                {/* <td className="px-4 py-3 text-red-600">{product.stock}</td>
                <td className="px-4 py-3">
                  <div className={`w-2 h-2 rounded-full ${product.status ? 'bg-emerald-400' : 'bg-gray-400'}`}></div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="p-4 border-t flex justify-between items-center">
          {/* <div className="flex items-center gap-2">
            <span>Show</span>
            <select className="border rounded px-2 py-1">
              <option>20</option>
            </select>
            <span>per page</span>
          </div> */}
          <div>
            <span className="mx-2">{products.length} records</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
