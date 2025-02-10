import { useState, useEffect } from "react";
// import axios from "axios";
import CategoryTemplate from "../components/CategoryTemplate";
import { useParams } from 'react-router-dom';

const CategoryGrid = () => {
  const { categoryId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultFilters = {
    color: ["Gold", "Silver", "Platinum", "Rose Gold", "White Gold", "Diamond", "Pearl", "Black" , "Ruby", "Emerald", "Sapphire", "Solitare"],
    // occasion: ["Party", "Formal", "Traditional"],
    // type: ["Modern", "Ethnic"]
  };

  useEffect(() => {
    const fetchCategoryId = async () => {
      try {
        setLoading(true);
      } catch (err) {
        console.error('Error fetching category:', err);
        setError('Failed to load category. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryId();
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

  return categoryId ? (
    <CategoryTemplate 
      title="Men"
      categoryId={categoryId} // This should be the UUID string
      defaultFilters={defaultFilters}
    />
  ) : null;
};

export default CategoryGrid;