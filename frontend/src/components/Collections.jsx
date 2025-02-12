import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Trash2 } from "lucide-react";

const Collections = ({
  setCollectionName,
  setCollectionDescription,
  setCollectionThumbnail,
  setCollectionID,
}) => {
  const [collections, setCollections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCollections = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://api.shopevella.com/v1/collections");
      const formattedProducts = response.data.data.map((collection) => ({
        ID: collection.id,
        name: collection.name,
        description: collection.description,
        status: true,
        thumbnail: collection.thumbnail,
      }));
      setCollections(formattedProducts);
    } catch (error) {
      console.error("Error fetching collections:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []); // Remove collections dependency to prevent infinite loop

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api.shopevella.com/v1/collections/${id}`);
      setCollections(collections.filter((collection) => collection.ID !== id));
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };

  // Filter collections based on search term
  const filteredCollections = collections.filter((collection) => {
    const searchString = searchTerm.toLowerCase();
    return (
      collection.name.toLowerCase().includes(searchString) ||
      collection.description.toLowerCase().includes(searchString)
    );
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Collections</h1>
          <p className="mt-2 text-gray-600">
            Manage and organize your product collections
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/new-collection")}
          className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus size={20} />
          New Collection
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
              placeholder="Search collections..."
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-gray-500">
            Loading collections...
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
                {filteredCollections.map((collection, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {collection.thumbnail ? (
                        <img
                          src={collection.thumbnail}
                          alt={collection.name}
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
                        {collection.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-600 max-w-md truncate">
                        {collection.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(collection.ID)}
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
            <span className="font-medium">{filteredCollections.length}</span> of{" "}
            <span className="font-medium">{collections.length}</span>{" "}
            collections
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
