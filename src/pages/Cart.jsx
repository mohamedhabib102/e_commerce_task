import { useState, useEffect } from "react";
import { FaPlus , FaMinus} from "react-icons/fa6";
import { Link } from "react-router-dom";


export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const getCartItems = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
    
    };

    useEffect(() => {
    document.title = "Cart | E-commerce";
  }, []);



  useEffect(() => {
    getCartItems(); 
  }, []);

  const getTotal = () => {
    const totla = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return totla.toFixed(2)
  };


const handleQuantityChange = (id, type) => {
  const update = cartItems.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        quantity:
          type === "inc"
            ? item.quantity + 1
            : item.quantity > 1
            ? item.quantity - 1
            : 1,
      };
    }
    return item;
  });

  setCartItems(update);
  localStorage.setItem("cart", JSON.stringify(update)); 
};

   const deleteItem = (id) => {
      const update = cartItems.filter((item) => item.id !== id)
      setCartItems(update)
      localStorage.setItem("cart", JSON.stringify(update));
   }
  return (
    <section className="py-20 px-5 text-center relative">
      <h3 className="text-3xl font-semibold uppercase mb-10">
        You<span className="text-blue-400">r C</span>art
      </h3>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty!</p>
      ) : (
        <>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-200 shadow-md rounded-xl overflow-hidden">
            <thead className="bg-blue-100 text-blue-700">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Quantity</th>
                <th className="p-3 text-left">Subtotal</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">
                    <img 
                    src={item.image} 
                    alt={item.image}
                    className="lg:w-[100px] md:w-[80px] w-full lg:rounded-2xl rounded-lg"
                    />
                  </td>
                  <td className="p-3 font-medium">{item.name || "No Name"}</td>
                  <td className="p-3">${item.price}</td>
                  <td className="p-3">
                    <button onClick={() => handleQuantityChange(item.id, "dec")} className="bg-blue-400 transition hover:bg-blue-500 text-white py-2 px-3 rounded-lg cursor-pointer"><FaMinus /></button> 
                    <span className="px-2">{item.quantity} </span>
                    <button onClick={() => handleQuantityChange(item.id, "inc")} className="bg-blue-400 transition hover:bg-blue-500 text-white py-2 px-3 rounded-lg cursor-pointer"><FaPlus /></button></td>
                  <td className="p-3">${(item.price * item.quantity).toFixed(3)}</td>
                  <td><button onClick={() => deleteItem(item.id)} className="bg-red-500 text-white py-2 px-4 rounded-xl cursor-pointer transition hover:bg-red-600">Delete</button></td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-semibold">
                <td colSpan="6" className="p-3 text-right">Total:</td>
                <td className="p-3">${getTotal()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Link to={"/cart/payemnt"} className="block mt-5 m-auto bg-blue-400 transition hover:bg-blue-500 text-white py-3 px-5 rounded-xl lg:w-52 w-auto text-xl">Payment</Link>
        </>
      )}
    </section>
  );
}
