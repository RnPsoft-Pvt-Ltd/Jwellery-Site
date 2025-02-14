// src/pages/AdminSalesPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Loader2, Trash2, Plus } from "lucide-react";

const AdminSalesPage = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await axios.get("https://api.shopevella.com/v1/sales"); // Adjust API URL
      setSales(response.data);
    } catch (err) {
      setError("Failed to load sales");
    } finally {
      setLoading(false);
    }
  };


  const handleAddProduct = async (saleId) => {
    const productId = prompt("Enter Product ID:");
    if (!productId) return;
    const discountPercent = prompt("Enter Discount Percentage:");
    const convertedDiscountDecimal = (parseFloat(discountPercent)).toFixed(4);

    try {
      await axios.post(`http://api.shopevella.com/v1/sales/${saleId}/add-product`, {
        productId: productId,
        discountPercent:  convertedDiscountDecimal || 0,
      });
      fetchSales();
    } catch (error) {
      // alert("Failed to add product");
      console.log(error);
    }
  };

  const handleDelete = async (saleId, productId) => {
    if (!window.confirm("Are you sure you want to remove this product?")) return;

    try {
      await axios.delete(`http://api.shopevella.com/v1/sales/${saleId}/remove-product/${productId}`);
      fetchSales();
    } catch (error) {
      alert("Failed to remove product");
    }
  };


  if (loading)
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Link to="/admin" className="text-blue-500">
          ← Back to Dashboard
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">All Sales</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sales.map((sale) => (
          <div key={sale.id} className="border p-4 rounded-lg shadow-lg">
            {sale.thumbnail && (
              <img
                src={sale.thumbnail}
                alt={sale.name}
                className="w-full h-40 object-cover rounded"
              />
            )}
            <h2 className="text-xl font-semibold mt-2">{sale.name}</h2>
            <p className="text-gray-600">{sale.description}</p>
            <p className="text-sm text-gray-500">
              {new Date(sale.start_date).toLocaleDateString()} -{" "}
              {new Date(sale.end_date).toLocaleDateString()}
            </p>
            <button
              onClick={() => handleAddProduct(sale.id)}
              className="bg-green-200 text-center text-green-800 flex py-2 px-3 font-bold cursor-pointer rounded-2xl hover:bg-green-300 text-[11px]"
            >
              <Plus size={16}></Plus>
              Add Product
            </button>
            <h3 className="font-bold mt-2">Products:</h3>
            <ul>
              {sale.sale_products.map((sp) => (
                <li key={sp.product_id} className="text-sm text-gray-700 flex justify-between">
                  {sp.product.name} - {sp.discount_percent}% off
                  <div
                    onClick={() => handleDelete(sale.id, sp.product_id)}
                    className="text-red-500 cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSalesPage;
