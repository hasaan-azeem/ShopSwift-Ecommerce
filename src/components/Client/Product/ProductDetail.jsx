/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

const selectedProduct = {
  name: "Stylish Shirt",
  price: 3499,
  originalPrice: 3999,
  description:
    "A stylish shirt made from high-quality materials. Perfect for casual and formal occasions.",
  brand: "FashionBrand",
  material: "Cotton",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Red", "Blue", "Green"],
  images: [
    {
      url: "https://breakout.com.pk/cdn/shop/files/25WUP222-KHK_1.jpg?v=1759911225&width=3000",
      alt: "Stylish Shirt - Front View",
    },
    {
      url: "https://breakout.com.pk/cdn/shop/files/25WUP222-KHK_4.jpg?v=1759911225&width=3000",
      alt: "Stylish Shirt - Back View",
    },
    {
      url: "https://breakout.com.pk/cdn/shop/files/25WUP222-KHK_2.jpg?v=1759911225&width=3000",
      alt: "Stylish Shirt - pose view",
    },
    {
      url: "https://breakout.com.pk/cdn/shop/files/25WUP222-KHK_3.jpg?v=1759911225&width=3000",
      alt: "Stylish Shirt - side view",
    },
    {
      url: "https://breakout.com.pk/cdn/shop/files/25WUP222-KHK_5.jpg?v=1759910844&width=3000",
      alt: "Stylish Shirt - pose view",
    },
  ],
};

const similarProducts = [
  {
    _id: 1,
    name: "Casual Pants",
    price: 2999,
    oldPrice: 3499,
    material: "Cotton Blend",
    image: [
      {
        url: "https://breakout.com.pk/cdn/shop/files/K25FW274-BLU_1.jpg?v=1759496712&width=480",
      },
    ],
  },
  {
    _id: 2,
    name: "Box Fit Sweatshirt",
    price: 3199,
    oldPrice: 3999,
    material: "Fleece",
    image: [
      {
        url: "https://breakout.com.pk/cdn/shop/files/24WUP281-CHR_1_8cd45de2-c75a-4bc1-a536-5dabe3ce552b.jpg?v=1761828505&width=480",
      },
    ],
  },
  {
    _id: 3,
    name: "Straight Fit Cargo Denim",
    price: 3399,
    oldPrice: 3999,
    material: "100% Cotton",
    image: [
      {
        url: "https://breakout.com.pk/cdn/shop/files/25FMD251BLU_1.jpg?v=1763016547&width=480",
      },
    ],
  },
  {
    _id: 4,
    name: "Denim Jacket",
    price: 4599,
    oldPrice: 4999,
    material: "100% Cotton",
    image: [
      {
        url: "https://breakout.com.pk/cdn/shop/files/25WJK247-KHK_1.jpg?v=1762422784&width=480",
      },
    ],
  },
];

const ProductDetail = () => {
  const [mainImage, setMainImage] = useState(
    selectedProduct?.images?.[0]?.url || ""
  );
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color before adding to cart.", {
        duration: 1000,
      });
      return;
    }
    setIsButtonDisabled(true);
    // Simulate adding to cart
    setTimeout(() => {
      toast.success("Product added to cart!", { duration: 1000 });
      setIsButtonDisabled(false);
    }, 1000);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl text-center font-bold mt-5 mb-2">Best Seller</h2>
      <div className="w-full md:max-w-6xl mx-auto bg-white p-4 md:p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left Thumbnail */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImage}
                alt="Main Product"
                className="w-full h-auto object-cover rounded-lg border"
              />
            </div>
          </div>
          {/* Mobile Thumbnail */}
          <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/* Product Info */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>
            <p className="text-lg text-gray-600 mb-1">
              <span>PKR</span>
              <span className="line-through ml-1">
                {selectedProduct.originalPrice &&
                  selectedProduct.originalPrice.toLocaleString()}
              </span>
            </p>

            <p className="text-xl text-gray-500 mb-2">
              PKR {selectedProduct.price.toLocaleString()}
            </p>

            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColor === color
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor: color.toLocaleLowerCase(),
                      filter: "brightness(0.5)",
                    }}
                  ></button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-700"> Sizes:</p>
              <div className=" flex gap-2 mt-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border rounded ${
                      selectedSize === size
                        ? "border-black bg-black text-white font-semibold"
                        : "border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handleQuantityChange("minus")}
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("plus")}
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${
                isButtonDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-900"
              }`}
            >
              {isButtonDisabled ? "Adding..." : "Add to Cart"}
            </button>
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-20 ">
          <h2 className="text-2xl text-center font-medium mb-4">
            You may also like
          </h2>
          <ProductGrid products={similarProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
