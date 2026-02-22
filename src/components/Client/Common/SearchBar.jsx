import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
    console.log("Searching for:", searchTerm);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {isOpen ? (
        <div className="fixed top-0 left-0 w-full bg-white h-16 z-50 flex items-center justify-center shadow-md">
          <form
            onSubmit={handleSearch}
            className="flex items-center w-full max-w-xl px-4"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-1 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray"
                autoFocus
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                <HiMagnifyingGlass className="h-5 w-5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-600 hover:text-teal-600"
            >
              <HiMiniXMark className="h-6 w-6" />
            </button>
          </form>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)}>
          <FiSearch className="h-6 w-6 text-gray-700 hover:text-teal-600 transition" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
