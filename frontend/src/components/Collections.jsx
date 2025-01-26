import React from 'react';

const Collections = () => {
  const collections = [
    { id: 1, name: 'Featured Products', code: 'homepage' }
  ];

  return (
    <div className="ml-64 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Collections</h1>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
          New Collection
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <input
            type="text"
            placeholder="Search"
            className="w-full max-w-sm px-4 py-2 border rounded-md"
          />
          <a href="#" className="text-blue-600 hover:text-blue-700">
            Clear filter
          </a>
        </div>
        
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-4 py-3"><input type="checkbox" /></th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">COLLECTION NAME</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">CODE</th>
            </tr>
          </thead>
          <tbody>
            {collections.map((collection) => (
              <tr key={collection.id} className="border-t">
                <td className="px-4 py-3"><input type="checkbox" /></td>
                <td className="px-4 py-3">{collection.id}</td>
                <td className="px-4 py-3">{collection.name}</td>
                <td className="px-4 py-3">{collection.code}</td>
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
            <span className="mx-2">1 records</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;