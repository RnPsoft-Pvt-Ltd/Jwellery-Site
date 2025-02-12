// import React, { useEffect, useState } from 'react';
// import { Heart } from 'lucide-react';
// import axios from 'axios';

// function WishlistPage() {
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const BASE_URL = 'http://54.206.185.32/v1/wishlist';

//   useEffect(() => {
//     const fetchWishlistItems = async () => {
//       try {
//         const response = await axios.get(BASE_URL, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         setWishlistItems(response.data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWishlistItems();
//   }, []);

//   const handleAddToWishlist = async (productId) => {
//     try {
//       const response = await axios.post(BASE_URL, { productId }, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setWishlistItems([...wishlistItems, response.data]);
//     } catch (error) {
//       console.error('Error adding to wishlist:', error);
//     }
//   };

//   const handleRemoveFromWishlist = async (productId) => {
//     try {
//       await axios.delete(BASE_URL, {
//         data: { productId },
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setWishlistItems(wishlistItems.filter(item => item.product.id !== productId));
//     } catch (error) {
//       console.error('Error removing from wishlist:', error);
//     }
//   };

//   if (loading) return <div className="flex items-center justify-center h-screen text-lg">Loading...</div>;
//   if (error) return <div className="flex items-center justify-center h-screen text-red-500">Error: {error}</div>;

//   return (
//         <div className="min-h-screen bg-white">
//           <div className="flex gap-8">
//             <div className="flex-1">
//               <h1 className="text-2xl font-bold mb-8">My Account</h1>
//               <h2 className="text-xl font-semibold mb-6">Wishlist</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {wishlistItems.map((item) => (
//                   <div key={item.id} className="group relative">
//                     <div className="aspect-square relative overflow-hidden rounded-lg">
//                       <img
//                         src={item.product.images.length > 0 ? item.product.images[0].image_url : '/placeholder.svg'}
//                         alt={item.product.name}
//                         className="w-full h-full object-cover"
//                       />
//                       <button
//                         className="absolute top-2 right-2 p-2 rounded-full bg-white"
//                         onClick={() => handleRemoveFromWishlist(item.product.id)}
//                       >
//                         <Heart className="w-4 h-4 text-red-500 fill-red-500" />
//                       </button>
//                     </div>
//                     <div className="mt-2">
//                       <h3 className="text-sm font-medium">{item.product.name}</h3>
//                       <p className="text-sm text-gray-600">{item.product.price}</p>
//                       <button
//                         className="w-full mt-2 bg-black text-white text-xs py-2 rounded"
//                         onClick={() => handleAddToWishlist(item.product.id)}
//                       >
//                         Add to Cart
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     }
    
//     export default WishlistPage;
import React, { useEffect, useState } from 'react';
import { Heart,Loader2 } from 'lucide-react';
import axios from 'axios';

function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = 'http://54.206.185.32/v1/wishlist';
  const CART_URL = 'http://54.206.185.32/v1/cart';

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setWishlistItems(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistItems();
  }, []);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await axios.delete(BASE_URL, {
        data: { productId },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setWishlistItems(wishlistItems.filter(item => item.product.id !== productId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await axios.post(CART_URL, { productId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert('Added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // if (loading) return <div className="flex items-center justify-center h-screen text-lg">Loading...</div>;
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">Error: {error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 p-6 bg-white">
        <h1 className="text-2xl font-bold mb-8">My Account</h1>
        <h2 className="text-xl font-semibold mb-6">Wishlist</h2>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div 
                key={item.id} 
                className="group relative bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center"
              >
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 overflow-hidden rounded-lg">
                  <img
                    src={item.product.images.length > 0 ? item.product.images[0].image_url : '/placeholder.svg'}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md"
                  onClick={() => handleRemoveFromWishlist(item.product.id)}
                >
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                </button>
                <div className="mt-4 text-center">
                  <h3 className="text-sm font-medium">{item.product.name}</h3>
                  <p className="text-sm text-gray-600">{item.product.price}</p> {/* Removed $ symbol */}
                  <button
                    className="mt-2 px-4 py-2 bg-black text-white text-xs rounded hover:bg-gray-800 transition"
                    onClick={() => handleAddToCart(item.product.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
}

export default WishlistPage;
