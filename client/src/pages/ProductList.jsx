
import { List } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../contexts/AppContext";
import Loading from "../components/Loading";


const ProductsList = () => {
  const { products, productLoading } = useAppContext();
  if (productLoading) return <Loading />
  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 py-12 md:py-20 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <SectionHeader
        icon={List}
        badgeText="All Products"
        title="Explore Our Collection"
        description="Browse through our latest range of products. Find the perfect choice for your needs with a variety of colors, sizes, and styles."
      />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
