import React from "react";
import { Link } from "react-router-dom";

const FeaturedItem = () => {
  return (
    <section className="container mx-auto relative py-8 px-5 text-left">
      <h2 className="text-3xl font-bold mb-4 ">Featured Items</h2>
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        <div className="relative flex-1">
          <img
            src="https://breakout.com.pk/cdn/shop/files/25WFS245-BRN_1.jpg?v=1761994284&width=480"
            alt=""
            draggable={false}
            className="w-full h-{700px} object-cover rounded-xl"
          />
          <div className="absolute -bottom-6 left-4 transform -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Men's Collection
            </h2>
            <Link
              to="/collections/all?gender=Men"
              className="text-gray-900 underline hover:text-primary transition duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="relative flex-1">
          <img
            src="https://breakout.com.pk/cdn/shop/files/25WJK399-BRN_1.jpg?v=1761993190&width=480"
            alt=""
            draggable={false}
            className="w-full h-{700px} object-cover rounded-xl "
          />
          <div className="absolute -bottom-6 left-4 transform -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Women's Collection
            </h2>
            <Link
              to="/collections/all?gender=Women"
              className="text-gray-900 underline hover:text-primary transition duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedItem;
