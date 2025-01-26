import React from 'react'

// Products Component
const Products = () => {
  const products = [
    { name: 'Striped Cotton Sweater', price: 90.00, sku: 'SCS-24680', stock: 150, status: true },
    { name: 'Denim Skinny Jeans', price: 120.00, sku: 'DSJ-54321', stock: 90, status: true },
    { name: 'Classic Leather Loafers', price: 120.00, sku: 'CLL-98765', stock: 120, status: true },
    { name: 'Floral Maxi Dress', price: 100.00, sku: 'FMD-12345', stock: 100, status: true }
  ];

  return (
    <div className="ml-64 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
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
          <select className="px-4 py-2 border rounded-md">
            <option>Status</option>
          </select>
          <select className="px-4 py-2 border rounded-md">
            <option>Product Type</option>
          </select>
        </div>
        
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-4 py-3"><input type="checkbox" /></th>
              <th className="text-left px-4 py-3">THUMBNAIL</th>
              <th className="text-left px-4 py-3">NAME</th>
              <th className="text-left px-4 py-3">PRICE</th>
              <th className="text-left px-4 py-3">SKU</th>
              <th className="text-left px-4 py-3">STOCK</th>
              <th className="text-left px-4 py-3">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-3"><input type="checkbox" /></td>
                <td className="px-4 py-3">
                  <div className="w-12 h-12 bg-gray-200 rounded"></div>
                </td>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">${product.price.toFixed(2)}</td>
                <td className="px-4 py-3">{product.sku}</td>
                <td className="px-4 py-3 text-red-600">{product.stock}</td>
                <td className="px-4 py-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="p-4 border-t flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select className="border rounded px-2 py-1">
              <option>20</option>
            </select>
            <span>per page</span>
          </div>
          <div>
            <span>1</span>
            <span className="mx-2">4 records</span>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Products;