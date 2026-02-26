
import {  Clock, TrendingUp, } from 'lucide-react';
import SectionHeader from './SectionHeader';

import ProductCard from './ProductCard';
import {useNavigate} from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext';

const FeaturedProducts = () => {
  // Dummy product data

  const navigate = useNavigate();
  const {products} = useAppContext();

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-8">
        {/* Section Header */}
        <SectionHeader
  icon={TrendingUp}
  badgeText="Trending Now"
  title="Featured Products"
  description="Discover our most popular and trending items that everyone is loving right now."
/>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {products.slice(0,4).map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button 
          onClick={() => {navigate("/products");scrollTo(0,0)}}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

const OurCollections = () => {
  // Dummy collections data
  const collections = [
    {
      id: 1,
      name: "Summer Collection",
      items: "125+ Items",
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      id: 2,
      name: "Winter Essentials",
      items: "89+ Items",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      gradient: "from-gray-400 to-blue-500"
    },
    {
      id: 3,
      name: "Party Wear",
      items: "67+ Items",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      id: 4,
      name: "Casual Style",
      items: "203+ Items",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      gradient: "from-amber-400 to-orange-500"
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-8">
        {/* Section Header */}
       <SectionHeader
  icon={Clock}
  badgeText="New Arrivals"
  title="Our Collections"
  description="Explore our carefully curated collections designed for every season and occasion."
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
                <button className="bg-white text-gray-900 hover:bg-gray-100 font-medium py-2 px-6 rounded-lg transition-colors duration-300 transform group-hover:translate-y-0">
                  Explore Collection
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-transparent border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5">
            Browse All Collections
          </button>
        </div>
      </div>
    </section>
  );
};

// Export both components
export { FeaturedProducts, OurCollections };