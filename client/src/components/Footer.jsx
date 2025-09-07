import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  CreditCard,
  Shield,
  Truck
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Trust Badges */}
      <div className="bg-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center space-x-4">
              <Truck className="w-8 h-8 text-emerald-400" />
              <div>
                <h4 className="font-semibold">Free Shipping</h4>
                <p className="text-sm text-gray-400">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Shield className="w-8 h-8 text-emerald-400" />
              <div>
                <h4 className="font-semibold">Secure Payment</h4>
                <p className="text-sm text-gray-400">100% protected</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <CreditCard className="w-8 h-8 text-emerald-400" />
              <div>
                <h4 className="font-semibold">Easy Returns</h4>
                <p className="text-sm text-gray-400">30-day policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
                ShopHub
              </h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your one-stop destination for trendy fashion and quality clothing. 
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Shipping Info</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Categories</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Men's Clothing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Women's Clothing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Kids & Babies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Accessories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Summer Collection</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Winter Collection</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-400">123 Fashion Street, City, Country</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-400">support@shophub.com</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-3">NEWSLETTER SIGNUP</h5>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} ShopHub. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Accepted Payments:</span>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-gray-700 rounded-sm"></div>
                <div className="w-8 h-5 bg-gray-700 rounded-sm"></div>
                <div className="w-8 h-5 bg-gray-700 rounded-sm"></div>
                <div className="w-8 h-5 bg-gray-700 rounded-sm"></div>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>by ShopHub Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;