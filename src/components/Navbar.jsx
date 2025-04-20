import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaParking,
  FaUser,
  FaMoon,
  FaSun,
  FaBell,
  FaClock,
  FaChevronUp,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useBooking } from "../contexts/BookingContext";

export default function Navbar({ darkMode, toggleDarkMode }) {
  const { user } = useAuth();
  const { activeBooking, timer, finishBooking } = useBooking();
  const location = useLocation();

  // States for enhanced interactivity
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBookingNotification, setShowBookingNotification] = useState(true);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation for active booking notification
  useEffect(() => {
    if (activeBooking) {
      setShowBookingNotification(true);
    }
  }, [activeBooking]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
    // Reset search state
    setSearchQuery("");
    setShowSearch(false);
  };

  // Function to determine if a route is active
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`hidden md:flex fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 dark:bg-dark/90 backdrop-blur-md shadow-lg py-2"
            : "bg-white dark:bg-dark py-4"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl transform group-hover:rotate-6 transition-transform">
              P
            </div>
            <span className="text-2xl font-bold bg-primary bg-clip-text text-transparent transition-all group-hover:tracking-wider">
              Mostqer
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`relative px-3 py-2 transition-all duration-300 hover:text-primary ${
                isActive("/") ? "text-primary font-medium" : ""
              }`}
            >
              {isActive("/") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
              )}
              Home
            </Link>
            <Link
              to="/find-parking"
              className={`relative px-3 py-2 transition-all duration-300 hover:text-primary ${
                isActive("/find-parking") ? "text-primary font-medium" : ""
              }`}
            >
              {isActive("/find-parking") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
              )}
              Find Parking
            </Link>
            <Link
              to="/about-us"
              className={`relative px-3 py-2 transition-all duration-300 hover:text-primary ${
                isActive("/about-us") ? "text-primary font-medium" : ""
              }`}
            >
              {isActive("/about-us") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
              )}
              About Us
            </Link>

            

            {user ? (
              <div className="relative group">
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-all cursor-pointer">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-primary">
                    {user.name}
                  </span>
                </div>

                {/* User dropdown menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-100 rounded-lg shadow-lg overflow-hidden transform scale-0 group-hover:scale-100 transition-transform origin-top-right">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors"
                  >
                    My Profile
                  </Link>
                  
                  
                  <div className="border-t dark:border-gray-700"></div>
                  
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark hover:text-zinc-800 transition-colors shadow-md hover:shadow-lg"
              >
                Login
              </Link>
            )}

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <FaSun className="text-yellow-500 animate-spin-slow" />
              ) : (
                <FaMoon className="text-gray-700 hover:rotate-12 transition-transform" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Active Booking Notification */}
      {activeBooking && showBookingNotification && (
        <div
          className={`fixed top-16 md:top-[4.5rem] left-0 right-0 bg-gradient-to-r from-primary to-primary-dark text-white p-4 z-30 shadow-lg animate-slideDown`}
        >
          <div className="container mx-auto flex justify-between items-center px-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <FaClock className="text-xl" />
              </div>
              <div>
                <div className="font-semibold flex items-center gap-2">
                  <FaParking className="text-sm" /> {activeBooking.location} -
                  Spot {activeBooking.spot}
                </div>
                <div className="text-sm opacity-90">
                  <span className="animate-pulse inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  Active Time: {formatTime(timer)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowBookingNotification(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Hide notification"
              >
                <FaTimes size={16} />
              </button>
              <button
                onClick={finishBooking}
                className="bg-white text-primary px-4 py-2 rounded-lg hover:bg-gray-100 transition-all shadow-md flex items-center gap-2"
              >
                Finish Booking
                <FaChevronUp className="text-xs" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navbar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-dark shadow-lg border-t dark:border-gray-800 z-40 transition-colors duration-300">
        <div className="flex justify-around items-center p-2">
          <Link
            to="/"
            className={`flex flex-col items-center p-2 rounded-lg relative ${
              isActive("/")
                ? "text-primary"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {isActive("/") && (
              <span className="absolute inset-0 bg-primary/10 rounded-lg animate-pulse-slow"></span>
            )}
            <FaHome
              className={`text-xl ${
                isActive("/") ? "animate-bounce-subtle" : ""
              }`}
            />
            <span className="text-xs mt-1 font-medium">Home</span>
          </Link>
          <Link
            to="/find-parking"
            className={`flex flex-col items-center p-2 rounded-lg relative ${
              isActive("/find-parking")
                ? "text-primary"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {isActive("/find-parking") && (
              <span className="absolute inset-0 bg-primary/10 rounded-lg animate-pulse-slow"></span>
            )}
            <FaParking
              className={`text-xl ${
                isActive("/find-parking") ? "animate-bounce-subtle" : ""
              }`}
            />
            <span className="text-xs mt-1 font-medium">Park</span>
          </Link>

          {/* Center button for active booking */}
          {activeBooking ? (
            <button
              onClick={() =>
                setShowBookingNotification(!showBookingNotification)
              }
              className="relative flex flex-col items-center justify-center"
            >
              <div className="w-14 h-14 bg-primary rounded-full -mt-5 flex items-center justify-center shadow-lg">
                <FaClock className="text-white text-xl" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              </div>
              <span className="text-xs mt-1 text-primary font-medium">
                Active
              </span>
            </button>
          ) : (
            <Link
              to="/about-us"
              className={`flex flex-col items-center p-2 rounded-lg relative ${
                isActive("/about-us")
                  ? "text-primary"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {isActive("/about-us") && (
                <span className="absolute inset-0 bg-primary/10 rounded-lg animate-pulse-slow"></span>
              )}
              <FaBell
                className={`text-xl ${
                  isActive("/about-us") ? "animate-bounce-subtle" : ""
                }`}
              />
              <span className="text-xs mt-1 font-medium">About</span>
            </Link>
          )}

          <Link
            to={user ? "/profile" : "/login"}
            className={`flex flex-col items-center p-2 rounded-lg relative ${
              isActive("/profile") || isActive("/login")
                ? "text-primary"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {(isActive("/profile") || isActive("/login")) && (
              <span className="absolute inset-0 bg-primary/10 rounded-lg animate-pulse-slow"></span>
            )}
            <FaUser
              className={`text-xl ${
                isActive("/profile") || isActive("/login")
                  ? "animate-bounce-subtle"
                  : ""
              }`}
            />
            <span className="text-xs mt-1 font-medium">
              {user ? "Profile" : "Login"}
            </span>
          </Link>

          <button
            onClick={toggleDarkMode}
            className="flex flex-col items-center p-2 rounded-lg text-gray-600 dark:text-gray-400"
          >
            {darkMode ? (
              <>
                <FaSun className="text-xl text-yellow-500" />
                <span className="text-xs mt-1 font-medium">Light</span>
              </>
            ) : (
              <>
                <FaMoon className="text-xl" />
                <span className="text-xs mt-1 font-medium">Dark</span>
              </>
            )}
          </button>
        </div>
      </nav>
    </>
  );
}
