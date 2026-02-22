import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addItem } from "../../../redux/cartSlice";
import { toast } from "sonner";

const ProductGrid = ({ products }) => {
  const dispatch = useDispatch();
  const [quickAdd, setQuickAdd] = useState(null);

  const handleAddToCart = (product, size) => {
    dispatch(
      addItem({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image?.[0]?.url,
        size,
        color: product.colors?.[0] || "Default",
        quantity: 1,
      }),
    );
    toast.success(`${product.name} added to cart!`);
    setQuickAdd(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
      {products.map((product) => (
        <div key={product._id} className="relative group">
          <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition relative">
            {/* Discount Badge */}
            {product.oldPrice > product.price && (
              <div className="absolute top-7 right-7 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold z-10">
                -
                {Math.round(
                  ((product.oldPrice - product.price) / product.oldPrice) * 100,
                )}
                %
              </div>
            )}

            {/* Cart icon */}
            <button
              onClick={() =>
                setQuickAdd(quickAdd === product._id ? null : product._id)
              }
              className="absolute top-6 left-6 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-black hover:text-white"
            >
              <ShoppingCart size={16} />
            </button>

            {/* Size picker popup */}
            {quickAdd === product._id && (
              <div className="absolute top-14 left-4 bg-white rounded-xl shadow-2xl p-3 z-30 min-w-40 border border-gray-100">
                <p className="text-xs font-semibold text-gray-600 mb-2">
                  Select Size:
                </p>
                <div className="flex flex-wrap gap-1">
                  {product.sizes?.length > 0 ? (
                    product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleAddToCart(product, size)}
                        className="px-3 py-1 text-xs border border-gray-300 rounded-lg hover:bg-black hover:text-white transition"
                      >
                        {size}
                      </button>
                    ))
                  ) : (
                    <button
                      onClick={() => handleAddToCart(product, "Free Size")}
                      className="px-3 py-1 text-xs border border-gray-300 rounded-lg hover:bg-black hover:text-white transition"
                    >
                      Free Size
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Image */}
            <Link
              to={`/product/${product._id}`}
              onClick={() => setQuickAdd(null)}
            >
              <div className="w-full mb-4 rounded-lg overflow-hidden">
                <img
                  src={product.image?.[0]?.url}
                  alt={product.image?.[0]?.altText || product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">
                Material: {product.material}
              </p>
              {product.oldPrice && (
                <p className="text-sm text-gray-400 line-through">
                  PKR {product.oldPrice.toLocaleString()}
                </p>
              )}
              <p className="text-lg font-bold text-gray-900">
                PKR {product.price.toLocaleString()}
              </p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
