



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import Navbar from "./Navbar";

const SHIPPING_COST = 99;

export default function Cart() {
  const [items, setItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage

        const response = await fetch("http://localhost:5000/v1/cart", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include token in request headers
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

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + SHIPPING_COST - discount;

  const handleQuantityChange = (id, quantity) => {
    setItems(items.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode === "FLAT50") {
      setDiscount(200);
    }
  };

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
        <button className="bg-blue-500 text-white p-2 rounded" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

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
        </div>

        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-lg font-medium mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs.{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Rs.{SHIPPING_COST}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Promo applied</span>
                <span>-Rs.{discount}</span>
              </div>
            )}
            <div className="flex justify-between font-medium pt-2 border-t">
              <span>Total</span>
              <span>Rs.{total}</span>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo Code"
              className="border px-2 py-1 rounded"
            />
            <button onClick={applyPromoCode} className="bg-gray-700 text-white p-2 rounded">
              Apply
            </button>
          </div>

          <button className="w-full bg-blue-500 text-white p-3 rounded" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}


