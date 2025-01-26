import React from 'react'

// Categories Component
const Categories = () => {
    const categories = [
      { name: 'Men', status: true, includeInMenu: true },
      { name: 'Women', status: true, includeInMenu: true },
      { name: 'Kids', status: true, includeInMenu: true }
    ];
  
    return (
      <div className="ml-64 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Categories</h1>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
            New Category
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <input
              type="text"
              placeholder="Search"
              className="w-full max-w-sm px-4 py-2 border rounded-md"
            />
          </div>
          
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-4 py-3"><input type="checkbox" /></th>
                <th className="text-left px-4 py-3">CATEGORY NAME</th>
                <th className="text-left px-4 py-3">STATUS</th>
                <th className="text-left px-4 py-3">INCLUDE IN MENU</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-3"><input type="checkbox" /></td>
                  <td className="px-4 py-3">{category.name}</td>
                  <td className="px-4 py-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  </td>
                  <td className="px-4 py-3">Yes</td>
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
              <span className="mx-2">3 records</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
export default Categories;  