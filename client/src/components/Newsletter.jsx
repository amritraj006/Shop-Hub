import { useState } from 'react';
import { Send, Mail, Gift, Shield, Truck, CheckCircle, XCircle } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { DotIcon } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const access_key = import.meta.env.VITE_APP_WEB3FORMS_ACCESS_KEY;
  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending...");
    
    const formData = new FormData(event.target);
    formData.append("access_key", access_key); // Replace with your actual access key

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Subscription successful! Check your email.");
        setIsSuccess(true);
        event.target.reset();
        setEmail('');
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setResult('');
          setIsSuccess(false);
        }, 5000);
      } else {
        console.log("Error", data);
        setResult(data.message || "Something went wrong. Please try again.");
        setIsSuccess(false);
      }
    } catch (error) {
      console.log("Error", error);
      setResult("Network error. Please try again.");
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Gift,
      title: "Exclusive Offers",
      description: "Get access to special discounts and promotions"
    },
    {
      icon: Shield,
      title: "First Access",
      description: "Be the first to know about new collections and products"
    },
    {
      icon: Truck,
      title: "Early Shipping",
      description: "Enjoy priority shipping on all your orders"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <SectionHeader
          icon={DotIcon}
          badgeText="Stay Updated"
          title="Join Our Fashion Community"
          description="Subscribe to our newsletter and never miss out on the latest trends, exclusive offers, and new arrivals."
        />

        <div className="max-w-4xl mx-auto">
          {/* Newsletter Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            {/* Result Message */}
            {result && (
              <div className={`mb-6 p-4 rounded-lg border ${
                isSuccess 
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300' 
                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
              } flex items-center space-x-3`}>
                {isSuccess ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <span className="text-sm">{result}</span>
              </div>
            )}

            <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-4 mb-8">
              {/* Hidden fields for Web3Forms */}
              <input type="hidden" name="subject" value="New Newsletter Subscription from ShopHub" />
              <input type="hidden" name="from_name" value="ShopHub Newsletter" />
              <input type="checkbox" name="botcheck" className="hidden" style={{display: 'none'}} />
              
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <span>{isSubmitting ? 'Submitting...' : 'Subscribe'}</span>
              </button>
            </form>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100 dark:border-gray-700">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <benefit.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">No spam</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm">Secure data</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
                <span className="text-sm">Easy unsubscribe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;