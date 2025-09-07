
import { Circle, List } from "lucide-react";
import SectionHeader from "../components/SectionHeader";


const ProductsList = () => {
  


  return (
  <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 py-12 md:py-20 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
  <SectionHeader
    icon={List}
    badgeText="All Products"
    title="Explore Our Collection"
    description="Browse through our latest range of products. Find the perfect choice for your needs with a variety of colors, sizes, and styles."
  />

  <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
    
  </div>
</div>

  );
};

export default ProductsList;
