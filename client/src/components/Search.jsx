import { useState } from "react";
import { X, SearchIcon } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const { setOpenSearch, products } = useAppContext();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex flex-col items-center justify-start pt-32">
      {/* Close button */}
      <button
        className="absolute top-6 right-6 text-gray-300 hover:text-white cursor-pointer transition-colors p-2 rounded-full hover:bg-white/10"
        onClick={() => setOpenSearch(false)}
        aria-label="Close search"
      >
        <X size={28} />
      </button>

      <div className="w-full max-w-xl px-6">
        {/* Search input */}
        <form className="relative" onSubmit={(e) => e.preventDefault()}>
          <SearchIcon
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            value={query}
            placeholder="What are you looking for?"
            className="w-full border border-gray-700 rounded-xl pl-12 pr-4 py-4 text-lg bg-gray-900/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-lg"
          />
        </form>

        {/* Search results */}
        <div className="mt-4 max-h-96 overflow-y-auto space-y-2">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div
                key={item._id}
                onClick={() => {
                  navigate(`/product/${item._id}`);
                  setOpenSearch(false);
                }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/60 cursor-pointer transition-colors"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="text-white font-medium">{item.name}</h3>
                  <p className="text-gray-400 text-sm">${item.price}</p>
                  <p className="text-gray-400 text-xs">
                    Size: {item.size || "N/A"} | Stock: {item.stock}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 mt-2">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
