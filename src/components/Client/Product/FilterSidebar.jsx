import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FilterSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState(100);

  const categories = [
    "Shirts",
    "Pants",
    "Top Wears",
    "Bottom Wears",
    "Footwear",
  ];
  const genders = ["Men", "Female", "Kids"];
  const colors = ["Red", "Blue", "Green", "Black", "White", "Yellow"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = ["Cotton", "Polyester", "Wool", "Silk", "Denim"];

  // READ URL PARAMS
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const params = Object.fromEntries(searchParams.entries());

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: 0,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : 100,
    });

    setPriceRange(params.maxPrice ? Number(params.maxPrice) : 100);
  }, [location.search]);

  // UPDATE URL
  const updateURL = (newFilters) => {
    const params = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length) {
        params.set(key, value.join(","));
      } else if (!Array.isArray(value) && value !== "" && value !== 0) {
        params.set(key, value);
      }
    });

    navigate(`?${params.toString()}`, { replace: true });
  };

  // SINGLE SELECT (radio, color)
  const handleSingle = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters((prev) => ({ ...prev, ...newFilters }));
    updateURL(newFilters);
  };

  // MULTI SELECT (checkbox)
  const handleMulti = (field, value) => {
    setFilters((prev) => {
      const current = prev[field] || [];

      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      const newFilters = { ...prev, [field]: updated };

      updateURL(newFilters);
      return newFilters;
    });
  };

  // PRICE
  const handlePrice = (e) => {
    const val = Number(e.target.value);
    setPriceRange(val);

    const newFilters = { ...filters, maxPrice: val };
    setFilters((prev) => ({ ...prev, ...newFilters }));

    updateURL(newFilters);
  };

  return (
    <div className="p-4 space-y-6">
      <h3 className="text-xl font-semibold">Filters</h3>

      {/* Category */}
      <div>
        <p className="font-medium mb-2">Category</p>
        {categories.map((c) => (
          <label key={c} className="flex items-center gap-2 mb-1">
            <input
              type="radio"
              checked={filters.category === c}
              onChange={() => handleSingle("category", c)}
            />
            {c}
          </label>
        ))}
      </div>

      {/* Gender */}
      <div>
        <p className="font-medium mb-2">Gender</p>
        {genders.map((g) => (
          <label key={g} className="flex items-center gap-2 mb-1">
            <input
              type="radio"
              checked={filters.gender === g}
              onChange={() => handleSingle("gender", g)}
            />
            {g}
          </label>
        ))}
      </div>

      {/* Colors */}
      <div>
        <p className="font-medium mb-2">Colors</p>
        <div className="flex gap-2 flex-wrap">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => handleSingle("color", c)}
              className={`w-8 h-8 rounded-full border-2 ${
                filters.color === c
                  ? "border-black scale-110"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: c.toLowerCase() }}
            />
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="font-medium mb-2">Sizes</p>
        {sizes.map((s) => (
          <label key={s} className="flex items-center gap-2 mb-1">
            <input
              type="checkbox"
              checked={filters.size?.includes(s)}
              onChange={() => handleMulti("size", s)}
            />
            {s}
          </label>
        ))}
      </div>

      {/* Price */}
      <div className="mb-8">
        <label className="block text-gray-700 font-medium mb-3">
          Price Range
        </label>

        <input
          type="range"
          min={0}
          max={100}
          value={priceRange}
          onChange={handlePrice}
          className="
      w-full h-2 rounded-lg appearance-none cursor-pointer
      bg-gray-300
      [&::-webkit-slider-thumb]:appearance-none
      [&::-webkit-slider-thumb]:h-4
      [&::-webkit-slider-thumb]:w-4
      [&::-webkit-slider-thumb]:rounded-full
      [&::-webkit-slider-thumb]:bg-blue-600
      [&::-webkit-slider-thumb]:cursor-pointer
    "
        />

        <div className="flex justify-between text-gray-600 text-sm mt-2">
          <span>$0</span>
          <span>${priceRange}</span>
        </div>
      </div>

      {/* Materials — FIX: was using handleSingle (radio), should be handleMulti (checkbox) */}
      <div>
        <p className="font-medium mb-2">Materials</p>
        {materials.map((s) => (
          <label key={s} className="flex items-center gap-2 mb-1">
            <input
              type="checkbox"
              checked={filters.material?.includes(s)}
              onChange={() => handleMulti("material", s)}
            />
            {s}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
