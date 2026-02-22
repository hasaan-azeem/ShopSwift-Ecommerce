import { useEffect, useState } from "react";
import Hero from "../../components/Client/Layout/Hero";
import FeaturedItem from "../../components/Client/Product/FeaturedItem";
import FeaturedCollection from "../../components/Client/Product/FeaturedCollection";
import FeaturesSection from "../../components/Client/Product/FeaturesSection";
import NewArrivals from "../../components/Client/Layout/NewArrivals";
import BestSellerSection from "../../components/Client/Product/ProductDetail";
import ProductGrid from "../../components/Client/Product/ProductGrid";
import api from "../../utils/api";

const Home = () => {
  const [menProducts, setMenProducts] = useState([]);
  const [womenProducts, setWomenProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [menRes, womenRes] = await Promise.all([
          api.get("/products?gender=Men"),
          api.get("/products?gender=Women"),
        ]);
        setMenProducts(menRes.data.slice(0, 4));
        setWomenProducts(womenRes.data.slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Hero />
      <FeaturedItem />
      <NewArrivals />
      <BestSellerSection />

      {menProducts.length > 0 && (
        <div className="container mx-auto mt-12 px-4">
          <h2 className="text-3xl text-center font-bold mb-4">
            Top Wears for Men
          </h2>
          <ProductGrid products={menProducts} />
        </div>
      )}

      {womenProducts.length > 0 && (
        <div className="container mx-auto mt-12 px-4">
          <h2 className="text-3xl text-center font-bold mb-4">
            Top Wears for Women
          </h2>
          <ProductGrid products={womenProducts} />
        </div>
      )}

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
