import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "../../../../redux/cartSlice";
import { RiDeleteBin3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const CartContents = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  if (items.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
        <ShoppingBag size={40} className="mb-3 text-gray-200" />
        <p className="text-sm">Your cart is empty</p>
        <Link to="/" className="mt-3 text-xs text-black underline">
          Start Shopping
        </Link>
      </div>
    );

  return (
    <div>
      {items.map((item, i) => (
        <div
          key={`${item._id}-${item.size}-${item.color}-${i}`}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start gap-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-medium text-sm leading-tight">{item.name}</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Size: {item.size} | Color: {item.color}
              </p>
              <p className="text-sm font-semibold mt-1">
                PKR {item.price.toLocaleString()}
              </p>
              <div className="flex items-center mt-2 space-x-2">
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
                    } else {
                      dispatch(
                        removeItem({
                          _id: item._id,
                          size: item.size,
                          color: item.color,
                        }),
                      );
                    }
                  }}
                  className="border rounded px-2 py-0.5 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  -
                </button>
                <span className="text-sm font-medium">{item.quantity}</span>
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
                  className="border rounded px-2 py-0.5 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
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
            className="mt-1 hover:text-red-600 transition cursor-pointer"
          >
            <RiDeleteBin3Line className="h-5 w-5" />
          </button>
        </div>
      ))}
      <div className="pt-3 text-sm font-semibold text-right text-gray-700">
        Total: PKR {total.toLocaleString()}
      </div>
    </div>
  );
};

export default CartContents;
