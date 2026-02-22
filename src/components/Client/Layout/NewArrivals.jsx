import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../../redux/cartSlice";
import { toast } from "sonner";
import api from "../../../utils/api";

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [quickAdd, setQuickAdd] = useState(null); // productId for quick size picker
  const intervalRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    api.get("/products?isNewArrival=true")
      .then(res => setProducts(res.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setItemsPerView(1);
      else if (w < 768) setItemsPerView(2);
      else if (w < 1024) setItemsPerView(3);
      else setItemsPerView(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (products.length === 0) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [products]);

  const nextSlide = () => setCurrentIndex(p => (p + 1) % products.length);
  const prevSlide = () => setCurrentIndex(p => (p - 1 + products.length) % products.length);

  const handleQuickAddToCart = (product, size) => {
    dispatch(addItem({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image?.[0]?.url,
      size,
      color: product.colors?.[0] || "Default",
      quantity: 1,
    }));
    toast.success(`${product.name} added to cart!`);
    setQuickAdd(null);
  };

  if (products.length === 0) return null;

  const displayProducts = products.length < itemsPerView
    ? [...products, ...products, ...products].slice(0, Math.max(products.length, itemsPerView + 2))
    : products;

  return (
    <div className="container mx-auto my-auto relative py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-800 mb-2 text-center">New Arrivals</h1>
        <p className="text-slate-600 font-semibold mb-8 text-center">
          Discover our latest collection of fashion made for every occasion.
        </p>

        <div className="relative">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${(100 / itemsPerView) * currentIndex}%)` }}
          >
            {displayProducts.map((product, index) => (
              <div key={`${product._id}-${index}`} className="shrink-0 px-2" style={{ width: `${100 / itemsPerView}%` }}>
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 relative group">
                  {/* Image — clickable to product page */}
                  <Link to={`/product/${product._id}`}>
                    <div className="relative bg-gray-100 h-72 overflow-hidden">
                      <img
                        src={product.image?.[0]?.url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.oldPrice > product.price && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Quick Add to Cart button */}
                  <button
                    onClick={() => setQuickAdd(quickAdd === product._id ? null : product._id)}
                    className="absolute top-3 left-3 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black hover:text-white"
                  >
                    <ShoppingCart size={16} />
                  </button>

                  {/* Size picker popup */}
                  {quickAdd === product._id && (
                    <div className="absolute top-12 left-3 bg-white rounded-xl shadow-xl p-3 z-20 min-w-40">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Select Size:</p>
                      <div className="flex flex-wrap gap-1">
                        {product.sizes?.length > 0 ? (
                          product.sizes.map(size => (
                            <button
                              key={size}
                              onClick={() => handleQuickAddToCart(product, size)}
                              className="px-3 py-1 text-xs border border-gray-300 rounded-lg hover:bg-black hover:text-white transition"
                            >
                              {size}
                            </button>
                          ))
                        ) : (
                          <button
                            onClick={() => handleQuickAddToCart(product, "Free Size")}
                            className="px-3 py-1 text-xs border border-gray-300 rounded-lg hover:bg-black hover:text-white transition"
                          >
                            Free Size
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="p-4">
                    <Link to={`/product/${product._id}`}>
                      <h3 className="text-sm font-semibold text-slate-800 hover:text-teal-600 transition truncate">{product.name}</h3>
                      <p className="text-xs text-gray-400 mb-1">{product.gender}</p>
                    </Link>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-black">PKR {product.price?.toLocaleString()}</span>
                      {product.oldPrice > product.price && (
                        <span className="text-xs text-slate-400 line-through">PKR {product.oldPrice?.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-slate-50 z-10 hidden sm:flex">
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>
          <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-slate-50 z-10 hidden sm:flex">
            <ChevronRight className="w-5 h-5 text-slate-700" />
          </button>
        </div>
      </div>
    </div>
  );
}