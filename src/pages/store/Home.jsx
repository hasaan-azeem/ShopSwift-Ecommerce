// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts } from '../../redux/productSlice';
import { Grid, Typography } from "@mui/material";
import Header from "../../components/Common/Header";
import Footer from "../../components/Common/Footer";
import Hero from "../../components/Client/Layout/Hero";
import FeaturedItem from "../../components/Client/Product/FeaturedItem";
import ProductDetail from "../../components/Client/Product/ProductDetail";
import NewArrivals from "../../components/Client/Layout/NewArrivals";
import ProductGrid from "../../components/Client/Product/ProductGrid";
import FeaturedCollection from "../../components/Client/Product/FeaturedCollection";
import FeaturesSection from "../../components/Client/Product/FeaturesSection";

const placeholderProducts = [
  {
    _id: 1,
    name: "BAND COLLAR JACKET",
    price: 7999,
    oldPrice: 15999,
    material: "100% Polyester",
    image: [
      {
        url: "https://breakout.com.pk/cdn/shop/files/24WJK232-NVY_1_e9ff6a7d-d7fc-4242-9b7b-5fa4136b3556.jpg?v=1761982836&width=480",
      },
    ],
  },
  {
    _id: 2,
    name: "KANGAROO POCKET HOODIE",
    price: 1649,
    oldPrice: 5499,
    material: "80% Cotton 20% Polyester",
    image: [
      {
        url: "https://breakout.com.pk/cdn/shop/files/24WUP252-MSD_1_b2fa23b9-b36f-4f1b-b429-951783734e18.jpg?v=1761828275&width=3000",
      },
    ],
  },
  {
    _id: 3,
    name: "BOMBER JACKET",
    price: 4999,
    oldPrice: 9999,
    material: "100% Polyester",
    image: [
      {
        url: "https://breakout.com.pk/cdn/shop/files/24WJK204-WHT_1.jpg?v=1761983387&width=3000",
      },
    ],
  },
  {
    _id: 4,
    name: "Neck Half Zipper",
    price: 1799,
    oldPrice: 4299,
    material: "60% Cotton 40% Polyester",
    image: [
      {
        url: "https://breakout.com.pk/cdn/shop/files/24WUP283-MSD_1.jpg?v=1761046172&width=480",
      },
    ],
  },
];

const womenPlaceholderProducts = [
  {
     _id: 1,
    name: "OVERSIZED DENIM JACKET",
    price: 7299,
    oldPrice: 8799,
    material: "100% Cotton",
    image: [
      {
        url: "https://breakout.com.pk/cdn/shop/files/25WJK532-BLK_1.jpg?v=1764675107&width=480",
      },
    ],
  },
  {
     _id: 2,
    name: "TEXTURED OVERSIZED COAT",
    price: 22999,
    oldPrice: 25999,
    material: "Wool Blend",
    image: [
      {
        url: "https://breakout.com.pk/cdn/shop/files/25WWC348-BGE_1.jpg?v=1761564894&width=480",
      },
    ],
  },
  {
     _id: 3,
    name: "OVERSIZED HOODIE",
    price: 5999,
    oldPrice: 7499,
    material: "65% Cotton 35% Polyester",
    image: [
      {
        url: "https://breakout.com.pk/cdn/shop/files/25WUP525-BRN_1.jpg?v=1764749948&width=480",
      },
    ],
  },
  {
     _id: 4,
    name: "PANELED OVERSIZED HOODIE",
    price: 5999,
    oldPrice: 6299,
    material: "62% Polyester 20% Viscose",
    image: [
      {
        url: "https://breakout.com.pk/cdn/shop/files/25WUP369-NVY_6.jpg?v=1761116096&width=480",
      },
    ],
  },
]

const Home = () => {
  return (
    <div className="">
      <Header />
      <Hero />
      <FeaturedItem />
      <NewArrivals />
      <ProductDetail />

      <div className="container mx-auto mt-12">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Men
        </h2>
        <ProductGrid products={placeholderProducts} />
      </div>
      <div className="container mx-auto mt-12">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={womenPlaceholderProducts} />
      </div>

      <FeaturedCollection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Home;
