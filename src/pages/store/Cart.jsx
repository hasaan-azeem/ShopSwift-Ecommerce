import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity, clearCart } from "../../redux/cartSlice";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { items, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (items.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <ShoppingBag size={64} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-6">Add some products to get started!</p>
        <Link
          to="/"
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Items */}
        <div className="flex-1 space-y-4">
          {items.map((item, i) => (
            <div
              key={`${item._id}-${item.size}-${item.color}-${i}`}
              className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  Size: {item.size} | Color: {item.color}
                </p>
                <p className="font-bold text-gray-900 mt-1">
                  PKR {item.price.toLocaleString()}
                </p>
              </div>
              {/* Quantity controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (item.quantity > 1) {
                      dispatch(
                        updateQuantity({
                          _id: item._id,
                          size: item.size,
                          color: item.color,
                          quantity: item.quantity - 1,
                        }),
                      );
                    }
                  }}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 font-bold"
                >
                  -
                </button>
                <span className="w-6 text-center font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        _id: item._id,
                        size: item.size,
                        color: item.color,
                        quantity: item.quantity + 1,
                      }),
                    )
                  }
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 font-bold"
                >
                  +
                </button>
              </div>
              <button
                onClick={() =>
                  dispatch(
                    removeItem({
                      _id: item._id,
                      size: item.size,
                      color: item.color,
                    }),
                  )
                }
                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="w-full lg:w-80">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm text-gray-600 border-b pb-4 mb-4">
              {items.map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="truncate max-w-[180px]">
                    {item.name} x{item.quantity}
                  </span>
                  <span>
                    PKR {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold mt-3">
              <span>Total</span>
              <span>PKR {total.toLocaleString()}</span>
            </div>
            <Link
              to="/checkout"
              className="block mt-6 bg-black text-white text-center py-3 rounded-lg hover:bg-gray-800 transition font-medium"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={() => dispatch(clearCart())}
              className="block w-full mt-3 text-center text-sm text-red-500 hover:underline"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
