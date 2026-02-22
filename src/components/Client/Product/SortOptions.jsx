import React from "react";
import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;

    const params = new URLSearchParams(searchParams);
    params.set("sort", sortBy);

    setSearchParams(params);
  };

  return (
    <div className="mb-4 flex items-center justify-end">
      <select
        name="sort"
        id="sort"
        onChange={handleSortChange}
        value={searchParams.get("sort") || "default"}
        className="border border-gray-300 rounded-md p-2 focus:outline-none"
      >
        <option value="default">Default</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOptions;
