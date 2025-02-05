// ProductGrid.jsx
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import ExpandedProductTemplate from "../components/ExpandedProductTemplate";

const ExpandedProduct = () => {
  const { productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultFilters = {
    color: ["Gold", "Silver"],
    occasion: ["Party", "Formal", "Traditional"],
    type: ["Modern", "Ethnic"]
  };

  useEffect(() => {
    const fetchProductId = async () => {
      try {
        setLoading(true);
      } catch (err) {
        console.error('Error fetching category:', err);
        setError('Failed to load category. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductId();
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

  return productId ? (
    <ExpandedProductTemplate
      title="Jewelry Collection"
      productId={productId}
      defaultFilters={defaultFilters}
    />
  ) : null;
};

export default ExpandedProduct;
