import { Link } from "react-router-dom";

const CartSummary = ({ product }) => (
  <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-base font-semibold text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-600 mt-1">PKR {product.price}</p>
      <Link
        to={`/product/${product._id}`}
        className="mt-3 inline-block bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-800 transition"
      >
        View
      </Link>
    </div>
  </div>
);

export default CartSummary;
