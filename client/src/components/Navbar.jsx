import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HeartIcon,
  Search,
  ShoppingBagIcon,
  Menu,
  X,
  UserIcon,
} from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import ThemeToggleBtn from "./ThemeToggleBtn";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

const Navbar = ({ theme, setTheme }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { setOpenSearch, setOpenCart, cartCount, user, logout } = useAppContext(); // ✅ get cartCount

  const handleLogout = () => {
    logout();
    navigate("/");
  };


  return (
    <nav className="flex justify-between items-center px-6 sm:px-8 lg:px-32 py-4 sticky top-0 z-20 backdrop-blur-xl bg-white/60 dark:bg-gray-900/70">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center space-x-2 hover:scale-105 transition duration-300"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-400 to-emerald-600 flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-lg">S</span>
        </div>
        <h1 className="font-bold text-xl hidden sm:block dark:text-white text-gray-800 md:text-2xl">
          Shop
          <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
            Hub
          </span>
        </h1>
      </Link>

      {/* Desktop Links */}
      <div className="hidden sm:flex gap-8 text-gray-700 dark:text-white text-sm font-medium">
        <Link to="/" className="relative group p-1">
          <span className="group-hover:text-emerald-600 transition-colors duration-300">Home</span>
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-green-400 to-emerald-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link to="/products" className="relative group p-1">
          <span className="group-hover:text-emerald-600 transition-colors duration-300">All Products</span>
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-green-400 to-emerald-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link to="/collections" className="relative group p-1">
          <span className="group-hover:text-emerald-600 transition-colors duration-300">Collections</span>
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-green-400 to-emerald-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Search
          onClick={() => setOpenSearch(true)}
          className="dark:text-white size-6 cursor-pointer hover:scale-110 transition"
        />


        {/* 🛒 Cart Icon with count */}
        <div
          onClick={() => setOpenCart(true)}
          className="relative cursor-pointer hover:scale-110 transition"
        >
          <ShoppingBagIcon className="dark:text-white size-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>

        <ThemeToggleBtn theme={theme} setTheme={setTheme} />

        {!user ? (
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => navigate('/login')}
              className="text-sm bg-gradient-to-r from-green-400 to-emerald-600 text-white px-5 py-2 rounded-full hover:scale-105 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="text-sm border border-emerald-500 text-emerald-600 dark:text-emerald-400 px-5 py-2 rounded-full hover:scale-105 transition"
            >
              Register
            </button>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 text-sm text-gray-700 dark:text-white hover:text-emerald-600 transition"
            >
              <UserIcon className="w-5 h-5" />
              <span className="font-medium">{user.name.split(" ")[0]}</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 transition"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-gray-700 dark:text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="absolute top-16 right-0 w-2/3 h-screen bg-white dark:bg-gray-900 shadow-lg flex flex-col items-start px-6 py-10 gap-6 sm:hidden">
          <Link to="/" onClick={() => setSidebarOpen(false)} className="hover:text-emerald-600">Home</Link>
          <Link to="/products" onClick={() => setSidebarOpen(false)} className="hover:text-emerald-600">All Products</Link>
          <Link to="/collections" onClick={() => setSidebarOpen(false)} className="hover:text-emerald-600">Collections</Link>
          {!user ? (
            <div className="w-full flex gap-3">
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  navigate('/login');
                }}
                className="w-1/2 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-white py-2 rounded-full hover:scale-105 transition"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  navigate('/register');
                }}
                className="w-1/2 text-center border border-emerald-500 text-emerald-600 dark:text-emerald-400 py-2 rounded-full hover:scale-105 transition"
              >
                Register
              </button>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-4">
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  navigate("/profile");
                  scrollTo(0, 0);
                }}
                className="w-full flex items-center gap-3 text-gray-700 dark:text-white"
              >
                <UserIcon width={20} />
                Profile
              </button>
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-3 text-red-500"
              >
                <LogOut width={20} />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
