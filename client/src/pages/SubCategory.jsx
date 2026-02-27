import { useParams } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SectionHeader from "../components/SectionHeader";
import ProductCard from "../components/ProductCard";
import { Tag } from "lucide-react";

const SubCategory = () => {
  const { category } = useParams(); // category comes from route like /collections/:category
  const { products } = useAppContext();

  // Filter products for this category
  const categoryProducts = products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 py-12 md:py-20 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <SectionHeader
        icon={Tag}
        badgeText="Category"
        title={category}
        description={`Explore all products available in the ${category} collection.`}
      />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {categoryProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SubCategory;


