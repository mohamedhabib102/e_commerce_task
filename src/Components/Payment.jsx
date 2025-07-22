import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

useEffect(() => {
    document.title = "Payment | E-commerce";
  }, []);


  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalPrice);
  }, []);

  const handlePurchase = () => {
    setMessage("Product purchased successfully!");
    localStorage.removeItem("cart");

    setTimeout(() => {
      setMessage("");
      location.href = "/"
    }, 1800);
  };

  return (
    <section className="py-16 px-5 coustom_container text-center relative">
      
    <div className={`  transition 
       fixed top-32 left-1/2 -translate-x-1/2 z-40 
       ${message ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"} 
      bg-green-100 text-green-700 p-3 rounded-lg w-fit mx-auto`}>
      {message}
    </div>
    


      <h2 className="text-2xl font-bold mb-6">Payment Summary</h2>

      <div className="space-y-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border p-4 rounded shadow-sm"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <p className="font-bold text-lg">${item.price * item.quantity}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No items in your cart 🛒</p>
        )}
      </div>

      {cartItems.length > 0 && (
        <>
          <div className="mt-8 text-xl font-bold">
            Total: <span className="text-green-600">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handlePurchase}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
          >
            Buy Now 
          </button>
        </>
      )}
    </section>
  );
}
