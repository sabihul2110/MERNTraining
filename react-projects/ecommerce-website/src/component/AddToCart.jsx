import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../features/cart/cartSlice";

/**
 * Shopping Cart Summary View
 * Displays selected cart items, per-item subtotals, and the overall order total.
 */
const AddToCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate grand total across all cart items
  const grandTotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div className="p-6">
      <div className="flex justify-center items-center">
        <button
          onClick={() => navigate("/")}
          className="text-center text-2xl font-extrabold text-red-600 p-4 m-4 cursor-pointer hover:text-red-800"
        >
          🔙 Continue Shopping
        </button>
      </div>

      {cartItems.length === 0 ? (
        <h1 className="text-center text-xl font-semibold mt-8">
          Your shopping cart is empty.
        </h1>
      ) : (
        <div className="flex justify-center items-center flex-col gap-4 p-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="w-100 flex justify-center items-center flex-col border border-b-black gap-2 p-4"
            >
              <img
                width={200}
                height={100}
                src={item.images[0]}
                alt={item.title}
              />
              <h2 className="font-semibold">{item.title}</h2>
              <p className="font-bold">Category: {item.category}</p>
              <p className="text-red-600 font-bold">Unit Price: ${item.price}</p>
              <p className="text-red-600 font-bold">Quantity: {item.quantity}</p>

              <p className="text-red-600 text-xl font-bold">
                Subtotal: ${(item.quantity * item.price).toFixed(2)}
              </p>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-[16px] border border-red-600 bg-red-500 text-white rounded-xl p-2 hover:bg-red-700 cursor-pointer"
              >
                Remove from Cart
              </button>
            </div>
          ))}

          <p className="text-2xl font-bold mt-4">
            Grand Total: ${grandTotal.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
