import { useState, useEffect } from "react";
import axios from "axios";
import CollectionTemplate from "../components/CollectionTemplate";

const ProductGrid = () => {
  const [collection_Id, setCollection_Id] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultFilters = {
    color: ["Gold", "Silver"],
    occasion: ["Party", "Formal", "Traditional"],
    type: ["Modern", "Ethnic"]
  };

  useEffect(() => {
    const fetchMenCategoryId = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/v1/collections/6cd6d839-fa21-4cc6-aac4-4047e135b955');
        console.log(response.data);
        console.log(response.data.id);
        setCollection_Id(response.data.id);
      } catch (err) {
        console.error('Error fetching category:', err);
        setError('Failed to load category. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenCategoryId();
  }, []);

  if (loading || error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {loading ? (
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"/>
        ) : (
          <div className="text-red-600">{error}</div>
        )}
      </div>
    );
  }

  return collection_Id ? (
    <CollectionTemplate 
      title="Men"
      collectionId={collection_Id} // This should be the UUID string
      defaultFilters={defaultFilters}
    />
  ) : null;
};

export default ProductGrid;