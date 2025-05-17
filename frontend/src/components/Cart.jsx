import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";
//     export default WishlistPage;
import React from 'react';
import { Heart,Loader2 } from 'lucide-react';
function WishlistPage({setwishlistcheck}) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userfunction=async (token) => {
    const response = await fetch('https://api.shopevella.com/v1/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const { user } = await response.json();
    setUserInfo(user);
    console.log(user.addresses);
    if (user.addresses.length > 0) {
      console.log(true)
      setAddress(user.addresses[0]);
    }
  }
    if (!token) {
      setError('Please log in to view your wishlist');
      setLoading(false);
      return;
    }
    userfunction(token);
  }, []);

  const BASE_URL = 'https://api.shopevella.com/v1/wishlist';
  const CART_URL = 'https://api.shopevella.com/v1/cart';
  const PRODUCT_URL='https://api.shopevella.com/v1/products';

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setWishlistItems(response.data);
        if(wishlistItems.length==0){
          setwishlistcheck(false);
        }
      } catch (error) {
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
    if(!localStorage.getItem("user")||!localStorage.getItem("token"))window.location.href="/login"
    let product = null;
    const res=await axios.get(`${PRODUCT_URL}/${productId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
   const response=res.data.variants[0].id;
    console.log(response);
    try {
      console.log(product)
      alert('Adding to cart...',productId);
      console.log('Adding to cart...',productId);
      // Add the product to the cart
      await axios.post(CART_URL,  {
        productVariantId: response,
        quantity: 1,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      alert('Added to cart successfully!');
      handleRemoveFromWishlist(productId);
      window.location.reload();
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
      <div className="flex-1 p-2 bg-white">
        <h2 className="text-xl font-semibold mb-2">Wishlist</h2>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-64">
            {wishlistItems.map((item) => (
              <div 
                key={item.id} 
                className="group relative bg-gray-100 p-2 rounded-lg shadow-md flex flex-col items-center"
              >
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 overflow-hidden rounded-lg">
                <img
  src={item.product.images.length > 0 ? item.product.images[0].image_url : '/placeholder.svg'}
  alt={item.product.name}
  className="w-full h-full object-cover rounded-lg"
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
                    onClick={() => handleAddToCart(item.product.id,item.product.variants)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
           
          </div>
        ) : (
          <><p className="text-center text-gray-500">
            Your wishlist is empty. Start adding items to your wishlist!
            </p></>
        )}
      </div>
    </div>
  );
}
const SHIPPING_COST = 79;

export default function Cart() {
  const [cashfreeInstance, setCashfreeInstance] = useState(null);
  const [items, setItems] = useState([]);
  const [wishlistcheck,setwishlistcheck]=useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [promocodeapplied,setpromocode] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userfunction=async (token) => {
    const response = await fetch('https://api.shopevella.com/v1/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const { user } = await response.json();
    setUserInfo(user);
    console.log(user.addresses);
    if (user.addresses.length > 0) {
      console.log(true)
      setAddress(user.addresses[0]);
    }
  }
    if (!token) {
      alert('Please log in to view your cart');
      navigate('/login');
      return;
    }
    userfunction(token);
  }, []);
  // ✅ Initialize Cashfree SDK in sandbox mode
  useEffect(() => {
    const initializeSDK = async () => {
      const cf = await load({ mode: "production" }); // or "production" for live
      setCashfreeInstance(cf);
    };
    initializeSDK();
  }, []);

  // 🔑 Get Payment Session ID
  const getSessionId = async () => {

    try {
      // Fetch user data (optional)
      await fetch("https://api.abiv.in/fetchdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: "tpriyanshu775@gmail.com" }),
      })
        .then((response) => response.json())
        .then((data) =>
          localStorage.setItem(
            "username",
            data.data.firstName + " " + data.data.lastName
          )
        );

      const amount = total + 0.03 * total + 0.01 * total - Math.floor(discount*total);
      const totalAmount = Math.ceil(amount);
      const res = await axios.post("https://api.abiv.in/payment", {
        amount: totalAmount,
        customeremail: userInfo.email,
        customername: userInfo.name,
      });
      if (res.data && res.data.payment_session_id) {
        localStorage.setItem("orderId", res.data.order_id);
        return res.data.payment_session_id;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Verify Payment
  const verifyPayment = async (orderId) => {
    try {
      const res = await axios.post("https://api.abiv.in/verify", {
        orderId: orderId,
      });

      if (res?.data?.length > 0) {
        const payment = res.data[0];
        if (payment.payment_completion_time != null) {
          alert("Payment Successful");
          const orderDetails = {
            paymentMethod,

            items: [
              items.map((item) => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
              })),
            ],
            shippingAddress: {

              address: address.address_line1,
              city: address.city,
              zip: address.zip_code,
              country: address.country,
              contact: address.phone,
            },
          };
      
          try {
            const response = await fetch("https://api.shopevella.com/v1/checkout", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(orderDetails),
            });
      
            const data = await response.json();
            if (response.ok) {
              setShowSuccess(true);
              setTimeout(() => navigate("/"), 2000); // Redirect after success
            } else {
              alert(data.error || "Order failed!");
            }
          } catch (error) {
            alert("Something went wrong. Please try again.");
          } finally {
            setLoading(false);
          }
        } else {
          alert("Payment Failed");
        }
      } else {
        alert("Payment Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Handle Checkout
  const handleClick = async () => {
    if(address == null){
      alert("Please add an address to proceed with checkout.");
      return
    }
    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }
    if (!cashfreeInstance) {
      alert("Cashfree SDK is not ready");
      return;
    }

    try {
      const sessionId = await getSessionId();
      const orderId = localStorage.getItem("orderId");

      const checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal", // or "_blank"
      };

      cashfreeInstance.checkout(checkoutOptions).then(() => {
        console.log("Payment initialized");
        setTimeout(() => verifyPayment(orderId), 5000); // delay verification
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Fetch Cart Items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("https://api.shopevella.com/v1/cart", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.status === "success") {
          setItems(
            data.data.items.map((item) => ({
              id: item.id,
              name: item.product_variant.product.name,
              price: Number(item.unit_price),
              quantity: item.quantity,
              image: item.product_variant.product.images[0]?.image_url || "",
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + (subtotal<=4000?SHIPPING_COST:0) - discount;
  const handleQuantityChange = (id, quantity) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id));
    fetch(`https://api.shopevella.com/v1/cart/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ itemId: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          console.log("Item removed from cart");
        }
      })
      .catch((error) => console.error("Error removing item:", error));
  };

  const applyPromoCode = () => {
    if (promoCode === "FLAT10") {
      setDiscount(0.1);
      setpromocode(true)
    }
  };

  // ✅ UI Logic
  if (loading) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium">Loading your cart...</h2>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>

        <WishlistPage/>

      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
  {/* Cart + Wishlist */}
  <div className="lg:col-span-2 space-y-4">
    <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Your Cart</h1>

    {items.map((item) => (
      <CartItem
        key={item.id}
        image={item.image}
        name={item.name}
        price={item.price}
        quantity={item.quantity}
        onQuantityChange={(qty) => handleQuantityChange(item.id, qty)}
        onRemove={() => handleRemove(item.id)}
      />
    ))}
{wishlistcheck && 
    <WishlistPage setwishlistcheck={setwishlistcheck}/>}
  </div>

  {/* Order Summary */}
  <div className="bg-gray-50 p-4 sm:p-6 rounded-lg h-fit w-full">
    <h2 className="text-lg font-medium mb-4">Order Summary</h2>

    <div className="space-y-2 mb-4 text-sm sm:text-base">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>Rs.{subtotal}</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping</span>
        {total < 4000 ? (
          <span>Rs.{SHIPPING_COST}</span>
        ) : (
          <span>Free</span>
        )}
      </div>
      <div className="flex justify-between">
        <span>GST@3%</span>
        <span>Rs.{(0.03 * total).toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Payment Gateway Charges@1%</span>
        <span>Rs.{(0.01 * total).toFixed(2)}</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Promo applied</span>
          <span>-Rs.{Math.floor(discount*total)}</span>
        </div>
      )}
      <div className="flex justify-between font-medium pt-2 border-t">
        <span>Total</span>
        <span>Rs.{Math.ceil((total + 0.03 * total + 0.01 * total - Math.floor(discount*total)).toFixed(2))}</span>
      </div>
    </div>

{total >= 4000 ? (
  <p className="text-green-600 text-sm mt-1"> Free delivery on orders above Rs. 4000!</p>
) : (
  <p className="text-gray-500 text-sm mt-1">Add items worth Rs. {4000 - total} more for free delivery.</p>
)}
    {/* Promo Code Input */}
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <input
        type="text"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
        placeholder="Promo Code"
        className="border px-2 py-2 rounded w-full"
      />
      <button
        onClick={applyPromoCode}
        className="bg-gray-700 text-white px-4 py-2 rounded w-full sm:w-auto"
      >
        Apply
      </button>
    </div>
     <p className="text-gray-500 text-sm mt-1">Use FLAT10 to avail 10% Discount</p>
<br></br>
    <button
      className="w-full bg-blue-500 text-white py-3 rounded"
      onClick={handleClick}
    >
      Proceed to Checkout
    </button>

    {/* Address Display */}
    {address == null ? (
      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl border border-gray-200 bg-yellow-50 shadow-sm">
        <p className="text-sm text-gray-700 mb-2 sm:mb-0">
          Please add an address to proceed with checkout.
        </p>
        <button
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
          onClick={() => navigate("/account/address")}
        >
          Add
        </button>
      </div>
    ) : (
      <div className="mt-4 p-4 rounded-2xl shadow-md border border-gray-200 bg-white w-full">
        <p className="text-sm text-gray-500 mb-1">Delivering to:</p>
        <p className="text-base font-medium text-gray-800">{address.full_name}</p>
        <p className="text-gray-700">{address.address_line1}</p>
        <p className="text-gray-700">{address.city}, {address.state}</p>
        <p className="text-gray-700">{address.country} - {address.zip_code}</p>
        <p className="text-gray-700 mb-4">{address.phone}</p>
        <button
          onClick={() => navigate("/account/address")}
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          Edit Address
        </button>
      </div>
    )}
  </div>
</div>

  );
}
