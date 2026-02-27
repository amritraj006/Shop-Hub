import { useState, useEffect } from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Men's Collection",
      description: "Explore the latest trends in men's fashion.",
      image:
        "https://www.pothys.com/cdn/shop/articles/BB-1_3eebc35a-84af-4083-ab09-b5d87e8cec65.jpg?v=1770322187",
      cta: "Shop Mens",
      category: "mens",
      bgGradient:
        "bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-800 dark:to-blue-900",
    },
    {
      title: "Women's Collection",
      description: "Stay cool and stylish with our summer arrivals.",
      image:
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=2073&q=80",
      cta: "Shop Womens",
      category: "womens",
      bgGradient:
        "bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-gray-900 dark:to-orange-900",
    },
    {
      title: "Kids Collection",
      description: "Warm and cozy outfits for the cold season.",
      image:
        "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=2070&q=80",
      cta: "Shop Kids",
      category: "kids",
      bgGradient:
        "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900",
    },
    {
      title: "Accessories",
      description: "Complete your look with our stunning accessories.",
      image:
        "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=2070&q=80",
      cta: "Shop Accessories",
      category: "accessories",
      bgGradient:
        "bg-gradient-to-br from-pink-50 to-purple-100 dark:from-gray-900 dark:to-purple-900",
    },
  ];

  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative overflow-hidden">
      <div
        className={`${slides[currentSlide].bgGradient} transition-colors duration-1000 ease-in-out`}
      >
        <div className="container mx-auto px-8 py-16 md:py-24 flex flex-col md:flex-row items-center min-h-[500px]">

          {/* Text Section */}
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10 z-10 transition-all duration-700 transform translate-y-0 opacity-100">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight text-gray-900 dark:text-white transition-all duration-500 tracking-tight">
              {slides[currentSlide].title}
            </h1>

            <p className="text-lg md:text-xl mb-10 max-w-lg text-gray-700 dark:text-gray-300 leading-relaxed font-light">
              {slides[currentSlide].description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate(`/collections/${slides[currentSlide].category}`)}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-medium py-3.5 px-8 rounded-full shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
              >
                <ShoppingBag className="mr-2" size={20} />
                {slides[currentSlide].cta}
              </button>

              <button
                onClick={() => navigate("/collections")}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:bg-white dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-200/50 dark:border-gray-700/50 font-medium py-3.5 px-8 rounded-full shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
              >
                Explore More <ArrowRight className="ml-2" size={18} />
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 flex justify-center z-10">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="relative w-full max-w-md lg:max-w-xl rounded-3xl shadow-2xl object-cover transition-all duration-700 group-hover:scale-[1.02] aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                ? "bg-blue-600 scale-125"
                : "bg-gray-400 dark:bg-gray-600"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;