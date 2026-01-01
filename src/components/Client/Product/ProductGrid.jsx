import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products }) => {
  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
      {products.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="block"
        >
          <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition relative ">
            {/* Discount Badge */}
            {product.oldPrice > product.price && (
              <div className="absolute top-7 right-7 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                -
                {Math.round(
                  ((product.oldPrice - product.price) / product.oldPrice) * 100
                )}
                %
              </div>
            )}

            <div className="w-full h-full mb-4 rounded-lg overflow-hidden">
              <img
                src={product.image[0].url}
                alt={product.image[0].altText || product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {product.name}
            </h3>
            <h3 className="text-sm font-semibold text-gray-800">
             Material: <span className="text-gray-600 tracking-tighter">{product.material}</span>
            </h3>

            {/* Original Price Line Through */}
            {product.oldPrice && (
              <p className="text-sm text-gray-500 line-through">
                PKR {product.oldPrice.toLocaleString()}
              </p>
            )}

            {/* Sale Price */}
            {product.price && (
              <p className="text-lg text-gray-800 font-bold">
                PKR {product.price.toLocaleString()}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
    </>
  );
};

export default ProductGrid;
