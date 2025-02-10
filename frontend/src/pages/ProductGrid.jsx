import { useState, useEffect } from "react";
import ProductTemplate from "../components/ProductTemplate";

const ProductGrid = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultFilters = {
    color: ["Gold", "Silver", "Platinum", "Rose Gold", "White Gold", "Diamond", "Pearl", "Black", "Ruby", "Emerald", "Sapphire", "Solitare"],
    // occasion: ["Party", "Formal", "Traditional"],
    // type: ["Modern", "Ethnic"]
  };

  useEffect(() => {
    const initializeProducts = async () => {
      try {
        setLoading(true);
        // Initial setup if needed
      } catch (err) {
        console.error('Error initializing products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    initializeProducts();
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

  return (
    <ProductTemplate 
      title="All Products"
      defaultFilters={defaultFilters}
    />
  );
};

export default ProductGrid;