import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "MULTI STRIPE SWEATER",
    Gender: "Men",
    image:
      "https://breakout.com.pk/cdn/shop/files/K25WS274-MLT_1.jpg?v=1763729208&width=480",
    price: 3374,
    oldPrice: 4399,
  },
  {
    id: 2,
    name: "LOOSE FIT DENIM",
    Gender: "Men",
    image:
      "https://breakout.com.pk/cdn/shop/files/K25FD433-BLU_1.jpg?v=1763729218&width=480",
    price: 2249,
    oldPrice: 3699,
  },
  {
    id: 3,
    name: "CONTRAST HOODED TOP",
    Gender: "Men",
    image:
      "https://breakout.com.pk/cdn/shop/files/K25WU269-BRN_1.jpg?v=1763535911&width=480",
    price: 2699,
    oldPrice: 3599,
  },
  {
    id: 10,
    name: "Girls Suit",
    Gender: "Kids",
    image: "https://engine.com.pk/cdn/shop/files/VTE069-BRP_6.jpg?v=1763370625",
    price: 2599,
    oldPrice: 3399,
  },
  {
    id: 4,
    name: "LOOSE CARGO DENIM",
    Gender: "Men",
    image:
      "https://breakout.com.pk/cdn/shop/files/K25FD424-BLK_1.jpg?v=1763729221&width=480",
    price: 2249,
    oldPrice: 2999,
  },
  {
    id: 8,
    name: "Cargo Trouser",
    Gender: "Kids",
    image: "https://engine.com.pk/cdn/shop/files/VTU052-BLK_1.jpg?v=1763721485",
    price: 2499,
    oldPrice: 3399,
  },
  {
    id: 5,
    name: "DROP SHOULDER VARSITY SWEATSHIRT",
    Gender: "Women",
    image:
      "https://breakout.com.pk/cdn/shop/files/K25WU371-RED_1.jpg?v=1763535904&width=480",
    price: 2399,
    oldPrice: 2999,
  },
  {
    id: 6,
    name: "BASIC SKINNY DENIM",
    Gender: "Women",
    image:
      "https://breakout.com.pk/cdn/shop/files/K25FD509-LBL_1.jpg?v=1763729211&width=480",
    price: 2099,
    oldPrice: 2699,
  },
  {
    id: 7,
    name: "CARGO LOOSE DENIM",
    Gender: "Women",
    image:
      "https://breakout.com.pk/cdn/shop/files/K25FD502-BLU_1.jpg?v=1763729214&width=480",
    price: 2399,
    oldPrice: 3399,
  },
  {
    id: 12,
    name: "Graphic Sweatshirt",
    Gender: "Kids",
    image: "https://engine.com.pk/cdn/shop/files/VTT287-CRM_1.jpg?v=1764052421",
    price: 2599,
    oldPrice: 3399,
  },
  {
    id: 8,
    name: "Graphic Sweatshirt",
    Gender: "Kids",
    image: "https://engine.com.pk/cdn/shop/files/VTT289-RED_1.jpg?v=1764052553",
    price: 2399,
    oldPrice: 3399,
  },

  {
    id: 11,
    name: "Girls Suit",
    Gender: "Kids",
    image: "https://engine.com.pk/cdn/shop/files/KE5052-BRP_5.jpg?v=1764132326",
    price: 2599,
    oldPrice: 3399,
  },

  {
    id: 13,
    name: "Girls Flared Denim",
    Gender: "Kids",
    image: "https://engine.com.pk/cdn/shop/files/VTD045-BLU_2.jpg?v=1764063747",
    price: 1799,
    oldPrice: 2699,
  },
];

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const intervalRef = useRef(null);
  const resumeTimeoutRef = useRef(null);

  // Adjust items per view based on screen width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsPerView(1);
      else if (width < 768) setItemsPerView(2);
      else if (width < 1024) setItemsPerView(3);
      else setItemsPerView(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-loop function
  const startAutoLoop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 3000);
  };

  useEffect(() => {
    startAutoLoop();
    return () => clearInterval(intervalRef.current);
  }, []);

  const stopAutoLoop = () => {
    clearInterval(intervalRef.current);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const handleMouseEnter = () => {
    stopAutoLoop();
  };

  const handleMouseLeave = () => {
    stopAutoLoop();
    resumeTimeoutRef.current = setTimeout(() => {
      startAutoLoop();
    }, 1000); // 1 second delay
  };

  const nextSlide = () => setCurrentIndex((currentIndex + 1) % products.length);
  const prevSlide = () =>
    setCurrentIndex((currentIndex - 1 + products.length) % products.length);

  // Drag handlers
  const handleDragStart = (e) => {
    setIsDragging(true);
    const x = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    setDragStartX(x);
    setDragOffset(0);
    stopAutoLoop();
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const x = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    setDragOffset(x - dragStartX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    if (dragOffset < -50) nextSlide();
    else if (dragOffset > 50) prevSlide();
    setIsDragging(false);
    setDragOffset(0);
    resumeTimeoutRef.current = setTimeout(() => {
      startAutoLoop();
    }, 1000);
  };

  return (
    <div className="text-left container mx-auto my-auto relative py-6  overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-800 mb-2 text-center">
          New Arrivals
        </h1>
        <p className="text-slate-600 font-semibold mb-8 text-center">
          Discover our latest collection and enjoy a new range of fashion made
          for every occasion.
        </p>

        <div
          className="relative cursor-grab select-none"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div
            className={`flex transition-transform duration-500`}
            style={{
              transform: `translateX(calc(-${
                (100 / itemsPerView) * currentIndex
              }% + ${dragOffset}px))`,
            }}
          >
            {[...products, ...products].map((product, index) => (
              <div
                key={index}
                className="shrink-0 px-2"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-300">
                  <div className="relative bg-gray-100 h-90 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      draggable="false"
                    />
                    {product.oldPrice > product.price && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        -
                        {Math.round(
                          ((product.oldPrice - product.price) /
                            product.oldPrice) *
                            100
                        )}
                        %
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-slate-800">
                      {product.name}
                    </h3>
                    <h3 className="text-sm font-semibold text-slate-800">
                      {product.Gender}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg font-bold text-black">
                        PKR {product.price.toLocaleString()}
                      </span>
                      {product.oldPrice > product.price && (
                        <span className="text-sm text-slate-400 line-through">
                          PKR {product.oldPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-slate-50 z-10 hidden sm:flex"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-slate-50 z-10 hidden sm:flex"
          >
            <ChevronRight className="w-6 h-6 text-slate-700" />
          </button>
        </div>
      </div>
    </div>
  );
}
