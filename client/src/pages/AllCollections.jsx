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
    <section className="py-16  bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
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
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
                <p className="text-blue-200 mb-4">{collection.items}</p>
                
<button
  onClick={() => navigate(`/collections/${collection.name}`)}
  className="bg-white text-gray-900 hover:bg-gray-100 font-medium py-2 px-6 rounded-lg transition-colors duration-300"
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
