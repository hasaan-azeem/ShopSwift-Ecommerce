import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";

const CartContents = () => {
  const cartProducts = [
    {
      productID: 1,
      name: "Product 1",
      price: 29.99,
      quantity: 2,
      size: "M",
      color: "Red",
      imageUrl:
        "https://breakout.com.pk/cdn/shop/files/25WFS215-GRY_1.jpg?v=1762854107&width=480",
    },
    {
      productID: 2,
      name: "Product 2",
      price: 39.99,
      quantity: 1,
      size: "L",
      color: "Blue",
      imageUrl:
        "https://breakout.com.pk/cdn/shop/files/25WSS225-OFW_1.jpg?v=1762854103&width=480",
    },
    {
      productID: 3,
      name: "Product 3",
      price: 29.99,
      quantity: 2,
      size: "M",
      color: "Red",
      imageUrl: "https://picsum.photos/200?random=3",
    },
  ];

  return (
    <div className="">
      {cartProducts.map((product) => (
        <div
          key={product.productID}
          className="flex items-center justify-between py-4 border-b"
        >
          {/* Product Info */}
          <div className="flex items-start">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-16 h-16 object-cover rounded mr-4"
            />
            <div className="flex flex-col">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">
                Size: {product.size} | Color: {product.color}
              </p>
              <div className="flex items-center mt-2 space-x-2">
                <button className="border rounded px-2 py-1 text-lg font-medium hover:bg-gray-100 transition">
                  -
                </button>
                <span className="px-2">{product.quantity}</span>
                <button className="border rounded px-2 py-1 text-lg font-medium hover:bg-gray-100 transition">
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Price + Delete */}
          <div className="flex flex-col items-end">
            <p className="font-medium">${product.price.toFixed(2)}</p>
            <button className="mt-2 hover:text-red-600 transition">
              <RiDeleteBin3Line className="h-6 w-6" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
