import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Trash2, Pencil } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const fetchProducts = async (page) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.shopevella.com/v1/products?page=${page}&limit=10`
      );
      // console.log(response.data.data[0]);
      const formattedProducts = response.data.data.map((product) => {
        const totalStock =
          product.variants?.reduce((sum, variant) => {
            return sum + (variant.inventory?.total_quantity || 0);
          }, 0) || 0;
      
        return {
          ...product, // <-- Spread the whole product object to retain all original fields
          ID: product.id,
          stock: totalStock,
          thumbnail:
            product.images.find((img) => img.is_primary)?.image_url ||
            product.images[0]?.image_url ||
            "",
        };
      });
       formattedProducts.map((product) => {
        console.log(product.SKU)});
      setProducts(formattedProducts);
      setTotalPages(response.data.pagination.totalPages); // Assuming the API provides total pages
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api.shopevella.com/v1/products/${id}`);
      setProducts(products.filter((product) => product.ID !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdate = async (product) => {
    navigate("/admin/update-product", { state: { product } });
  };

  const filteredProducts = products.filter((product) => {
    const searchString = searchTerm?.toLowerCase();
    return (
      product?.name?.toLowerCase().includes(searchString) ||
      product?.SKU?.toLowerCase().includes(searchString) ||
      product?.base_price?.toString().includes(searchString)
    );
  });

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="mt-2 text-gray-600">
            Manage and organize your products listing
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/new-products")}
          className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus size={20} />
          New Product
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
              placeholder="Search by name, SKU, or price"
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">
            Loading products...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                    THUMBNAIL
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                    NAME
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                    PRICE
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                    STOCK
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                    SKU
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                    UPDATE
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                    DELETE
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {product.thumbnail ? (
                        <img
                          src={product.thumbnail}
                          alt={product.name}
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
                        {product.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {product.base_price}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {product.stock}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-600 max-w-md truncate">
                        {product.SKU}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleUpdate(product)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Pencil size={16} />
                        Update
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(product.ID)}
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
          <div className="flex justify-between items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <div className="text-sm text-gray-600">
              Page <span className="font-medium">{currentPage}</span> of{" "}
              <span className="font-medium">{totalPages}</span>
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
