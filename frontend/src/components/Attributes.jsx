import React from 'react'

// Attributes Component
const Attributes = () => {
    const attributes = [
      { name: 'Color', groups: 'Default', type: 'select', required: 'No', filterable: 'Yes' },
      { name: 'Size', groups: 'Default', type: 'select', required: 'No', filterable: 'Yes' }
    ];
  
    return (
      <div className="ml-64 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Attributes</h1>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
            New Attribute
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
                <th className="text-left px-4 py-3">ATTRIBUTE NAME</th>
                <th className="text-left px-4 py-3">GROUPS</th>
                <th className="text-left px-4 py-3">TYPE</th>
                <th className="text-left px-4 py-3">IS REQUIRED?</th>
                <th className="text-left px-4 py-3">IS FILTERABLE?</th>
              </tr>
            </thead>
            <tbody>
              {attributes.map((attribute, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-3"><input type="checkbox" /></td>
                  <td className="px-4 py-3">{attribute.name}</td>
                  <td className="px-4 py-3 text-blue-600">{attribute.groups}</td>
                  <td className="px-4 py-3">{attribute.type}</td>
                  <td className="px-4 py-3">{attribute.required}</td>
                  <td className="px-4 py-3">{attribute.filterable}</td>
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
              <span className="mx-2">2 records</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
export default Attributes;  