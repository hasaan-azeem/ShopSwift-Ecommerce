import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../../components/Client/Product/FilterSidebar";
import SortOptions from "../../components/Client/Product/SortOptions";
import ProductGrid from "../../components/Client/Product/ProductGrid";
import api from "../../utils/api";

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();

        // /collections/men → gender=Men
        if (collection && collection !== "all") {
          const genderMap = { men: "Men", women: "Women", kids: "Kids" };
          const gender = genderMap[collection.toLowerCase()];
          if (gender) params.set("gender", gender);
        }

        // Extra filters from URL
        const sort = searchParams.get("sort");
        const search = searchParams.get("search");
        if (sort) params.set("sort", sort);
        if (search) params.set("search", search);

        const res = await api.get(`/products?${params.toString()}`);
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch collection products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [collection, searchParams]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const collectionTitle = collection
    ? collection.charAt(0).toUpperCase() + collection.slice(1) + "'s Collection"
    : "All Collections";

  return (
    <div className="flex flex-col lg:flex-row">
      <button
        onClick={() => setIsSidebarOpen(prev => !prev)}
        className="lg:hidden border p-2 m-2 flex justify-center items-center rounded gap-2 text-sm"
      >
        <FaFilter /> Filters
      </button>

      <div
        ref={sidebarRef}
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 lg:w-64 border-r`}
      >
        <FilterSidebar />
      </div>

      <div className="grow p-4">
        <h2 className="text-2xl uppercase mb-2 font-bold">{collectionTitle}</h2>
        <p className="text-gray-500 text-sm mb-4">{products.length} products found</p>
        <SortOptions />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No products found.</p>
            <p className="text-sm mt-2">Try a different filter or check back later.</p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
};

export default CollectionPage;