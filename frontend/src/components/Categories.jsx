import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Trash2 } from "lucide-react";

const Categories = ({
  setCategoryName,
  setCategoryDescription,
  setCategoryThumbnail,
  setCategoryID,
}) => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/v1/categories");
      const formattedCategories = response.data.data.map((category) => ({
        ID: category.id,
        name: category.name,
        description: category.description,
        status: true,
        thumbnail: category.thumbnail,
      }));
      setCategories(formattedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []); // Remove categories dependency to prevent infinite loop

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/v1/categories/${id}`);
      setCategories(categories.filter((category) => category.ID !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) => {
    const searchString = searchTerm.toLowerCase();
    return (
      category.name.toLowerCase().includes(searchString) ||
      category.description.toLowerCase().includes(searchString)
    );
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="mt-2 text-gray-600">
            Manage and organize your product categories
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/new-category")}
          className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus size={20} />
          New Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-5 border-b">
          <div className="relative max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search by name or description"
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">
            Loading categories...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    THUMBNAIL
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    NAME
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    DESCRIPTION
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCategories.map((category, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {category.thumbnail ? (
                        <img
                          src={category.thumbnail}
                          alt={category.name}
                          className="w-12 h-12 object-cover rounded-lg shadow-sm"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-xs">
                            No image
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {category.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-600 max-w-md truncate">
                        {category.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(category.ID)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="p-5 border-t bg-gray-50">
          <div className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-medium">{filteredCategories.length}</span> of{" "}
            <span className="font-medium">{categories.length}</span> collections
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
