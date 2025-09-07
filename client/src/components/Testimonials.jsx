import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import SectionHeader from './SectionHeader';


const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Fashion Blogger",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      content: "The quality of clothes at ShopHub is exceptional. I've been shopping here for months and every piece has exceeded my expectations. Their customer service is also outstanding!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Regular Customer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      content: "Fast shipping, perfect fit, and amazing prices. ShopHub has become my go-to for all my fashion needs. The seasonal collections are always on point!",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Fashion Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      content: "As a designer, I appreciate the attention to detail in every garment. The fabrics are high quality and the craftsmanship is impressive. Highly recommend!",
      rating: 4
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Business Professional",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      content: "The formal wear collection is perfect for business occasions. I always receive compliments when I wear ShopHub outfits to important meetings.",
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <SectionHeader
          icon={Circle}
          badgeText="Customer Stories"
          title="What Our Customers Say"
          description="Don't just take our word for it - hear from our satisfied customers about their shopping experience."
        />

        <div className="max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 relative">
            <Quote className="absolute top-6 right-6 w-8 h-8 text-emerald-100 dark:text-emerald-900/30" />
            
            <div className="text-center">
              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonials[currentTestimonial].rating
                        ? 'text-amber-400 fill-current'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400"
                />
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {/* Indicators */}
              <div className="flex items-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentTestimonial
                        ? 'bg-emerald-600'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { number: '10K+', label: 'Happy Customers' },
              { number: '4.9/5', label: 'Average Rating' },
              { number: '98%', label: 'Satisfaction Rate' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                <div className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;