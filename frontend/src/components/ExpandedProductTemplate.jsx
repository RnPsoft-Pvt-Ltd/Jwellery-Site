// ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const ExpandedProductTemplate = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProductAndWishlistStatus = async () => {
      try {
        setLoading(true);
        const [productResponse, wishlistResponse] = await Promise.all([
          axios.get(`http://localhost:5000/v1/products/${productId}`),
          axios.get("http://localhost:5000/v1/wishlist", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        setProduct(productResponse.data);
        setMainImage(
          productResponse.data.images.find((img) => img.is_primary)
            ?.image_url || productResponse.data.images[0]?.image_url
        );
        setSelectedVariant(productResponse.data.variants[0]);

        // Check if product is in wishlist
        const isInWishlist = wishlistResponse.data.some(
          (item) => item.product_id === productId
        );
        setIsWishlisted(isInWishlist);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductAndWishlistStatus();
    }
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      if (!selectedVariant) return;

      await axios.post(
        "http://localhost:5000/v1/cart",
        {
          productVariantId: selectedVariant.id,
          quantity,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      // Show success message or update cart UI
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Show error message
    }
  };

  const handleWishlist = async () => {
    try {
      if (isWishlisted) {
        await axios.delete(`http://localhost:5000/v1/wishlist`, {
          data: { productId }, // Request body needs to be in a 'data' property
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      } else {
        await axios.post(`http://localhost:5000/v1/wishlist`, {
          productId },{ // Request body needs to be in a 'data' property
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error("Error updating wishlist:", error);
      // Show error message
    }
  };

  if (loading || error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {loading ? (
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent" />
        ) : (
          <div className="text-red-600">{error}</div>
        )}
      </div>
    );
  }

  if (!product) return null;

  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen bg-white">
      <ProductDetailSection
        product={product}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        mainImage={mainImage}
        setMainImage={setMainImage}
        quantity={quantity}
        setQuantity={setQuantity}
        isWishlisted={isWishlisted}
        // setIsWishlisted={setIsWishlisted}
        handleWishlist={handleWishlist}
        handleAddToCart={handleAddToCart}
      />

      <ProductDescription description={product.description} />

      <SimilarProducts categoryId={product.category_id} />
    </div>
    </>
  );
};

const ProductDetailSection = ({
  product,
  selectedVariant,
  setSelectedVariant,
  mainImage,
  setMainImage,
  quantity,
  setQuantity,
  isWishlisted,
  // setIsWishlisted,
  handleWishlist,
  handleAddToCart,
}) => {
  const handleQuantityChange = (increment) => {
    setQuantity((prev) => Math.max(1, prev + increment));
  };

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
  };

  const handleImageClick = (imageUrl) => {
    setMainImage(imageUrl);
  };


  const calculatePrice = () => {
    const basePrice = parseFloat(product.base_price);
    const modifier = parseFloat(selectedVariant?.price_modifier || 0);
    return (basePrice + modifier).toFixed(2);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4 max-w-7xl mx-auto">
      {/* Product Gallery */}
      <div className="w-full md:w-1/2">
        <div className="relative mb-4">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full aspect-square object-cover rounded-lg"
          />
          <button
            onClick={handleWishlist}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white"
          >
            <Heart
              className={`w-6 h-6 ${
                isWishlisted ? "fill-red-500 stroke-red-500" : "stroke-gray-600"
              }`}
            />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {product.images.map((image) => (
            <img
              key={image.id}
              src={image.image_url}
              alt={`${product.name} ${image.display_order}`}
              className="w-full aspect-square object-cover rounded cursor-pointer"
              onClick={() => handleImageClick(image.image_url)}
            />
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.brand}</p>

        <div className="flex items-center gap-4 mb-6">
          <span className="text-2xl font-medium">Rs. {calculatePrice()}</span>
        </div>

        {/* Product Metadata */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium mb-2">Product Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Material</p>
              <p className="font-medium">
                {product.product_metadata.material_type}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Purity</p>
              <p className="font-medium">
                {product.product_metadata.metal_purity}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Gemstone</p>
              <p className="font-medium">
                {product.product_metadata.gemstone_details}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Weight</p>
              <p className="font-medium">
                {product.product_metadata.additional_attributes.weight}
              </p>
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-8">{product.description}</p>

        {/* Variants Selection */}
        {product.variants && product.variants.length > 0 && (
          <div className="space-y-6 mb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span>Select Variant</span>
              </div>
              <div className="flex gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    className={`px-4 py-2 border rounded ${
                      selectedVariant?.id === variant.id
                        ? "border-black bg-gray-200"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => handleVariantSelect(variant)}
                  >
                    Colour : {variant.color} | {variant.weight}g
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">Quantity</label>
          <div className="inline-flex items-center border border-gray-300 rounded">
            <button
              className="px-3 py-2 hover:bg-gray-100"
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </button>
            <span className="px-4 py-2 border-x">{quantity}</span>
            <button
              className="px-3 py-2 hover:bg-gray-100"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full max-w-xs bg-black text-white py-3 px-6 rounded hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const ProductDescription = ({ description }) => {
  return (
    <div className="w-full bg-[#FCF8FC] p-10 min-h-[800px]">
      <div className="flex gap-10">
        <div className="w-[55%]">
          <div className="w-[337px] h-[77px] flex items-center px-5">
            <h1 className="text-3xl font-light text-gray-800">Description</h1>
          </div>
          <div className="px-5 max-w-[500px]">
            <p className="text-base text-gray-600 leading-relaxed mb-4 mr-12">
              {description}
            </p>
          </div>
        </div>

        <div className="relative aspect-[100/85]">
          <img
            src="/api/placeholder/400/340"
            alt="Model wearing jewelry"
            className="absolute left-[20%] w-full h-[85%] object-cover"
          />
          {/* TODO get image from variant here  */}
          <img
            src="/api/placeholder/180/180"
            alt="Close-up of jewelry"
            className="absolute bottom-10 left-0 w-[45%] h-[45%] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const SimilarProducts = ({ categoryId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/v1/categories/${categoryId}`
        );
        setProducts(response.data.products.slice(0, 4));
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    };

    if (categoryId) {
      fetchSimilarProducts();
    }
  }, [categoryId]);

  return (
    <div className="max-w-[1200px] mx-auto p-5">
      <h1 className="text-center mb-8 font-normal text-2xl">
        Similar Products
      </h1>
      <div className="flex overflow-x-auto gap-5 pb-2.5">
        {products.map((product) => (
          <SimilarProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

const SimilarProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const checkWishlistStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/v1/wishlist", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const isInWishlist = response.data.some(
          (item) => item.product_id === product.id
        );
        setIsWishlisted(isInWishlist);
      } catch (error) {
        console.error("Error checking wishlist status:", error);
      }
    };

    checkWishlistStatus();
  }, [product.id]);

  const handleWishlist = async () => {
    try {
      if (isWishlisted) {
        await axios.delete(`http://localhost:5000/v1/wishlist`, {
          data: { productId : product.id },  // Request body needs to be in a 'data' property
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        
      } else {
        await axios.post(`http://localhost:5000/v1/wishlist`, {
          data: { productId: product.id },  // Request body needs to be in a 'data' property
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        
      }
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      await axios.post(
        "http://localhost:5000/v1/cart",
        {
          productVariantId: product.variants[0].id,
          quantity: 1,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      // Show success message
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Show error message
    }
  };


  return (
    <div className="relative w-[300px] flex-shrink-0 flex flex-col">
      <img
        src={product.images?.[0]?.image_url}
        alt={product.name}
        className="w-full h-[300px] object-cover"
      />
      <button
        onClick={handleWishlist}
        className="absolute top-2.5 right-2.5 bg-transparent border-none cursor-pointer"
      >
        <div className="w-[30px] h-[30px] relative">
          <div className="absolute inset-0 bg-white rounded-full" />
          <Heart
            className={`w-full h-full ${
              isWishlisted ? "fill-red-500 stroke-red-500" : "stroke-black"
            }`}
          />
        </div>
      </button>

      <div className="flex flex-col flex-grow mt-2.5 min-h-[80px] relative">
        <div className="flex justify-between mb-2">
          <div className="text-base font-semibold max-w-[65%]">
            {product.name}
          </div>
          <div className="text-sm font-medium">Rs {product.base_price}</div>
        </div>
        <button
          // onClick={() => onAddToCart?.(product.id)}
          onClick={handleAddToCart}
          className="absolute right-0 bottom-0 bg-black text-white px-4 py-2 text-xs hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ExpandedProductTemplate;
