import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
const Categories = ({ setCategoryName, setCategoryDescription, setCategoryThumbnail, setCategoryID}) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/v1/categories');
      const formattedCategories = response.data.data.map((category) => ({
        ID: category.id,
        name: category.name,
        description: category.description,
        status: true,
        thumbnail: category.thumbnail,
      }));
      setCategories(formattedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [categories]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/v1/categories/${id}`);
      setCategories(categories.filter((category) => category.ID !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // const handleUpdate = async (name, description, thumbnail, id) => {
  //   setCategoryName(name)
  //   setCategoryDescription(description)
  //   setCategoryThumbnail(thumbnail)
  //   setCategoryID(id)
  //   navigate('/admin/update-category')
  // };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <button
          onClick={()=>navigate("/admin/new-category")}
          className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
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
              {/* <th className="text-left px-4 py-3">ID</th> */}
              {/* <th className="text-left px-4 py-3">UPDATE</th> */}
              <th className="text-left px-4 py-3">DELETE</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, idx) => (
              <tr key={idx} className="border-t">
                {/* <td className="px-4 py-3"><input type="checkbox" /></td> */}
                <td className="px-4 py-3">
                  {category.thumbnail ? (
                    <img src={category.thumbnail} alt={category.name} className="w-12 h-12 object-cover rounded" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  )}
                </td>
                <td className="px-4 py-3">{category.name}</td>
                <td className="px-4 py-3">{category.description}</td>
                {/* <td className="px-4 py-3">{category.ID}</td> */}
                {/* <td>
                  <button
                    onClick={()=>handleUpdate(category.name, category.description, category.thumbnail, category.ID)} 
                    className='bg-orange-600 px-3 py-2 text-white rounded-lg hover:bg-orange-700'>update</button>
                </td> */}
                <td>
                  <button
                    onClick={()=>handleDelete(category.ID)} 
                    className='bg-red-600 px-3 py-2 text-white rounded-lg hover:bg-red-700'>delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="p-4 border-t flex justify-between items-center">
          <div>
            <span className="mx-2">{categories.length} records</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Categories;