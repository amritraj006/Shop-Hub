import { useAppContext } from "../contexts/AppContext";
import SectionHeader from "../components/SectionHeader";
import { Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AllCollections = () => {
  const { products } = useAppContext();
  const navigate = useNavigate();


  // Extract unique categories from products
  const categories = [...new Set(products.map((p) => p.category))];

  // Generate collections dynamically from categories
  const collections = categories.map((category, index) => {
    // Filter products for this category
    const categoryProducts = products.filter((p) => p.category === category);

    return {
      id: index + 1,
      name: category,
      items: `${categoryProducts.length}+ Items`,
      image: categoryProducts[0]?.image || "https://via.placeholder.com/500", // use first product's image or fallback
      gradient: "from-emerald-400 to-teal-500", // static gradient, you can randomize if needed
    };
  });

  return (
    <section className="py-16 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-8">
        {/* Section Header */}
        <SectionHeader
          icon={Package}
          badgeText="Shop by Category"
          title="All Collections"
          description="Browse all our available collections curated from your favorite categories."
        />

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => navigate(`/collections/${collection.name}`)}
            >
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-bold mb-2 tracking-tight">{collection.name}</h3>
                <p className="text-emerald-300 font-medium mb-6">{collection.items}</p>

                <button
                  className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-gray-900 font-medium py-3 px-8 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center tracking-wide"
                >
                  Explore {collection.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-transparent border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5">
            Browse All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllCollections;
