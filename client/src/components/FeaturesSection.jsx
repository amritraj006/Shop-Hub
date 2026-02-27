import { Truck, Shield, Star, RefreshCw, Users, Award, Heart, Clock } from 'lucide-react';
import CardComponent from './CardComponent';
import SectionHeader from './SectionHeader';
import { Circle } from 'lucide-react';
const FeaturesSection = () => {
  const features = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Free Shipping",
      description: "Enjoy free shipping on all orders over $50. Delivered right to your doorstep.",
      lightBg: "bg-blue-100",
      darkBg: "dark:bg-blue-900/20",
      lightIcon: "text-blue-600",
      darkIcon: "dark:text-blue-400",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Payment",
      description: "100% secure encrypted payments. Your financial data is always protected.",
      lightBg: "bg-green-100",
      darkBg: "dark:bg-green-900/20",
      lightIcon: "text-green-600",
      darkIcon: "dark:text-green-400",
      gradient: "from-green-400 to-green-600"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Curated selection of highest quality products with satisfaction guarantee.",
      lightBg: "bg-amber-100",
      darkBg: "dark:bg-amber-900/20",
      lightIcon: "text-amber-600",
      darkIcon: "dark:text-amber-400",
      gradient: "from-amber-400 to-amber-600"
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Easy Returns",
      description: "30-day hassle-free return policy. We make returns simple and quick.",
      lightBg: "bg-purple-100",
      darkBg: "dark:bg-purple-900/20",
      lightIcon: "text-purple-600",
      darkIcon: "dark:text-purple-400",
      gradient: "from-purple-400 to-purple-600"
    }
  ];

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: "10K+",
      label: "Happy Customers",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: "500+",
      label: "Premium Products",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      value: "98%",
      label: "Satisfaction Rate",
      gradient: "from-rose-500 to-pink-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: "24/7",
      label: "Customer Support",
      gradient: "from-violet-500 to-purple-500"
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10 transform -skew-y-3 -translate-y-24"></div>

      <div className="relative container mx-auto px-8">
        {/* Section Header */}
        <SectionHeader icon={Circle} badgeText="Why Choose Us" title="Experience the Difference" description="We're committed to providing an exceptional shopping experience with premium services that put you first." />

        {/* Features Grid using CardComponent */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <CardComponent
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              lightBg={feature.lightBg}
              darkBg={feature.darkBg}
              lightIcon={feature.lightIcon}
              darkIcon={feature.darkIcon}
              gradient={feature.gradient}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="relative bg-gradient-to-r from-gray-900 to-blue-900 dark:from-gray-800 dark:to-blue-800 rounded-3xl p-12 shadow-2xl overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.15)_1px,_transparent_0)] bg-[size:20px_20px]"></div>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.gradient} mb-4 text-white shadow-lg`}>
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <p className="text-blue-200 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Ready to experience premium shopping?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Start Shopping Now
            </button>
            <button className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-semibold py-4 px-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              Learn More About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;