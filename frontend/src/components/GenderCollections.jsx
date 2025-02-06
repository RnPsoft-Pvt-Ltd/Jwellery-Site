import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ALLOWED_CATEGORIES = ["Men", "Women", "Kids"];

const GenderCollections = ({ title }) => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get("http://localhost:5000/v1/collections");
        const filteredCollections = response.data.data.filter((collection) =>
          ALLOWED_CATEGORIES.some((category) =>
            collection.name.toLowerCase().includes(category.toLowerCase())
          )
        );
        setCollections(filteredCollections);
      } catch (err) {
        console.error("Error fetching collections:", err);
        setError("Failed to load collections.");
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>

      <div className="flex flex-wrap justify-center gap-5 p-5">
        {collections.map((collection) => (
          <button
            key={collection.id}
            onClick={() => navigate(`/collections/${collection.id}`)}
            className="relative w-72 h-72 border-2 border-transparent hover:border-gray-300 rounded-md overflow-hidden focus:outline-none"
          >
            <img
              src={collection.thumbnail }
              
              alt={collection.name}
              loading="eager" 
              className="w-full h-full object-cover rounded-md brightness-75"
            />
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xl font-normal tracking-wide text-center">
              {collection.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

GenderCollections.propTypes = {
  title: PropTypes.string.isRequired,
};

export default GenderCollections;
