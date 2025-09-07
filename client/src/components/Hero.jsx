import { useState, useEffect } from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Summer Collection 2023",
      description: "Discover our new summer arrivals with up to 30% off",
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80",
      cta: "Shop Summer",
      bgGradient: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-blue-900"
    },
    {
      title: "Winter Essentials",
      description: "Cozy sweaters, jackets and accessories for the cold season",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      cta: "Shop Winter",
      bgGradient: "bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-800 dark:to-blue-900"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Content with theme support */}
      <div className={`${slides[currentSlide].bgGradient} transition-colors duration-500`}>
        <div className="container mx-auto px-8 py-16 md:py-24 flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-gray-900 dark:text-white">
              {slides[currentSlide].title}
            </h1>
            
            <p className="text-lg mb-8 max-w-md text-gray-700 dark:text-gray-300">
              {slides[currentSlide].description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center">
                <ShoppingBag className="mr-2" size={20} />
                {slides[currentSlide].cta}
              </button>
              <button className="bg-white/90 hover:bg-white dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 font-medium py-3 px-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center">
                View Collection <ArrowRight className="ml-2" size={16} />
              </button>
            </div>
          </div>
          
          {/* Image Content */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-lg shadow-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;