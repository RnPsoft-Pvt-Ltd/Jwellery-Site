import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Collections = ({ setCollectionName, setCollectionDescription, setCollectionThumbnail, setCollectionID }) => {
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();

  const fetchCollections = async () => {
    try {
      const response = await axios.get('http://localhost:5000/v1/collections');
      const formattedProducts = response.data.data.map((collection) => ({
        ID: collection.id,
        name: collection.name,
        description: collection.description,
        status: true,
        thumbnail: collection.thumbnail,
      }));
      setCollections(formattedProducts);
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [collections]);
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/v1/collections/${id}`);
      setCollections(collections.filter((collection) => collection.ID !== id));
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  };

  // const handleUpdate = async (name, description, thumbnail, id) => {
  //   setCollectionName(name)
  //   setCollectionDescription(description)
  //   setCollectionThumbnail(thumbnail)
  //   setCollectionID(id)
  //   onNavigate('/update-collection')
  // };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Collections</h1>
        <button
          onClick={()=>navigate("/admin/new-collection")}
          className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
          New Collection
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
            {collections.map((collection, idx) => (
              <tr key={idx} className="border-t">
                {/* <td className="px-4 py-3"><input type="checkbox" /></td> */}
                <td className="px-4 py-3">
                  {collection.thumbnail ? (
                    <img src={collection.thumbnail} alt={collection.name} className="w-12 h-12 object-cover rounded" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  )}
                </td>
                <td className="px-4 py-3">{collection.name}</td>
                <td className="px-4 py-3">{collection.description}</td>
                {/* <td className="px-4 py-3">{collection.ID}</td> */}
                {/* <td>
                  <button
                    onClick={()=>handleUpdate(collection.name, collection.description, collection.thumbnail, collection.ID)} 
                    className='bg-orange-600 px-3 py-2 text-white rounded-lg hover:bg-orange-700'>update</button>
                </td> */}
                <td>
                  <button
                    onClick={()=>handleDelete(collection.ID)} 
                    className='bg-red-600 px-3 py-2 text-white rounded-lg hover:bg-red-700'>delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="p-4 border-t flex justify-between items-center">
          <div>
            <span className="mx-2">{collections.length} records</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
