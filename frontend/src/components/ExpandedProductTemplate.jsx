import React, { useState, useEffect } from "react";
import { Heart, Minus, Plus, Share2, ArrowLeft, Loader2 } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastProvider, useToast } from "../utils/toastContext";
import { ProductReviews, WriteReview } from "./Review";

// Custom tooltip component to replace shadcn/ui tooltip
const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-50">
          {content}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
        </div>
      )}
    </div>
  );
};

// Wrap the entire component with ToastProvider in your app
const ProductDetailWrapper = () => (
  <ToastProvider>
    <ProductDetail />
  </ToastProvider>
);

const ProductDetail = () => {
  const { addToast } = useToast();
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isWishLoading, setIsWishLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

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
    setIsAddingToCart(true);
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
      addToast(
        `${quantity} ${quantity === 1 ? "item" : "items"} added to your cart`,
        "success"
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
      addToast("Failed to add item to cart. Please try again.", "error");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlist = async () => {
    setIsWishLoading(true);
    try {
      if (isWishlisted) {
        await axios.delete(`http://localhost:5000/v1/wishlist`, {
          data: { productId },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        addToast("Item removed from your wishlist");
      } else {
        await axios.post(
          `http://localhost:5000/v1/wishlist`,
          { productId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        addToast("Item added to your wishlist", "success");
      }
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error("Error updating wishlist:", error);
      addToast("Failed to update wishlist. Please try again.", "error");
    } finally {
      setIsWishLoading(false);
    }
  };

  if (loading || error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {loading ? (
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
        ) : (
          <div className="text-red-600">{error}</div>
        )}
      </div>
    );
  }

  if (!product) return null;

  return (
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
        handleWishlist={handleWishlist}
        handleAddToCart={handleAddToCart}
        onBack={() => navigate(-1)}
        isWishLoading={isWishLoading}
        isAddingToCart={isAddingToCart}
      />
      <ProductDescription
        description={product.description}
        image1={product.images[0]?.image_url}
        image2={product.images[1]?.image_url}
      />
      {/* <SimilarProducts categoryId={product.category_id} /> */}

      <WriteReview
        productId={productId}
        onReviewSubmitted={() => {
          // This will refresh the reviews when a new one is submitted
          const reviewsComponent = document.getElementById("product-reviews");
          if (reviewsComponent) {
            reviewsComponent.scrollIntoView({ behavior: "smooth" });
          }
        }}
      />
      <div id="product-reviews">
        <ProductReviews productId={productId} />
      </div>
      <SimilarProducts categoryId={product.category_id} />
    </div>
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
  handleWishlist,
  handleAddToCart,
  onBack,
  isWishLoading,
  isAddingToCart,
}) => {
  const calculatePrice = () => {
    const basePrice = parseFloat(product.base_price);
    const modifier = parseFloat(selectedVariant?.price_modifier || 0);
    return (basePrice + modifier).toFixed(2);
  };

  const formatMetadataValue = (value) => {
    if (typeof value === "object") {
      // If the value is an object, convert it to a string representation
      return Object.entries(value)
        .map(([key, val]) => `${key}: ${val}`)
        .join(", ");
    }
    return value;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Product Gallery */}
        <div className="w-full lg:w-3/5">
          <div className="relative aspect-square overflow-hidden rounded-2xl mb-4">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Tooltip
                content={
                  isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                <button
                  onClick={handleWishlist}
                  disabled={isWishLoading}
                  className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all"
                >
                  {isWishLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Heart
                      className={`w-5 h-5 ${
                        isWishlisted
                          ? "fill-red-500 stroke-red-500"
                          : "stroke-gray-700"
                      }`}
                    />
                  )}
                </button>
              </Tooltip>

              <Tooltip content="Share product">
                <button
                  onClick={() =>
                    navigator.share({
                      title: product.name,
                      text: product.description,
                      url: window.location.href,
                    })
                  }
                  className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all"
                >
                  <Share2 className="w-5 h-5 stroke-gray-700" />
                </button>
              </Tooltip>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image) => (
              <button
                key={image.id}
                className={`aspect-square rounded-lg overflow-hidden ${
                  mainImage === image.image_url
                    ? "ring-2 ring-primary ring-offset-2"
                    : ""
                }`}
                onClick={() => setMainImage(image.image_url)}
              >
                <img
                  src={image.image_url}
                  alt={`${product.name} view`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-2/5">
          <h1 className="text-4xl font-semibold mb-2">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-6">{product.brand}</p>

          <div className="space-y-8">
            <div>
              <span className="text-3xl font-medium">₹{calculatePrice()}</span>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium">Available Variants</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      className={`px-4 py-2 rounded-full border-2 transition-all ${
                        selectedVariant?.id === variant.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedVariant(variant)}
                    >
                      {variant.color} - {variant.weight}g
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-4">
              <h3 className="font-medium">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-full border hover:bg-gray-50"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-full border hover:bg-gray-50"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h3 className="font-medium">Product Details</h3>
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(product.product_metadata).map(
                  ([key, value]) => (
                    <div key={key}>
                      <p className="text-gray-500 capitalize">
                        {key.replace(/_/g, " ")}
                      </p>
                      <p className="font-medium">
                        {formatMetadataValue(value)}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Add to Cart */}

            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="w-full bg-primary text-white py-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isAddingToCart ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Adding to Cart...</span>
                </>
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductDescription = ({ description, image1, image2 }) => (
  <div className="bg-gray-50 py-16">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-medium mb-6">About the Product</h2>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden">
            <img
              src={image1}
              alt="Product lifestyle"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 w-1/2 aspect-square rounded-xl overflow-hidden shadow-xl">
            <img
              src={image2}
              alt="Product detail"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SimilarProducts = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/v1/categories/${categoryId}`
        );
        // console.log("response",response);
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
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-medium text-center mb-12">
          You Might Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <SimilarProductCard
              key={product.id}
              product={product}
              onNavigate={() => navigate(`/products/${product.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const SimilarProductCard = ({ product, onNavigate }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToast } = useToast();

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

  const handleWishlist = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      if (isWishlisted) {
        await axios.delete(`http://localhost:5000/v1/wishlist`, {
          data: { productId: product.id },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        addToast("Item removed from your wishlist");
      } else {
        await axios.post(
          `http://localhost:5000/v1/wishlist`,
          { productId: product.id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        addToast("Item added to your wishlist", "success");
      }
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error("Error updating wishlist:", error);
      addToast("Failed to update wishlist. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setIsAddingToCart(true);
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
      addToast("Added to cart successfully", "success");
    } catch (error) {
      console.error("Error adding to cart:", error);
      addToast("Failed to add to cart. Please try again.", "error");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(product.base_price);

  return (
    <div
      onClick={onNavigate}
      className="group relative w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.images?.[0]?.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          disabled={isLoading}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Heart
              className={`w-5 h-5 transition-colors ${
                isWishlisted ? "fill-red-500 stroke-red-500" : "stroke-gray-700"
              }`}
            />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="space-y-2">
          <h3 className="font-medium text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-lg font-semibold text-gray-900">
            {formattedPrice}
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isAddingToCart ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductDetailWrapper;
