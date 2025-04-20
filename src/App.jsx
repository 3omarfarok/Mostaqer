import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs.jsx"
import FindParking from "./pages/FindParking";
import Footer from "./components/Footer.jsx"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import { BookingProvider } from "./contexts/BookingContext";

function App() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <BrowserRouter basename="/Mostaqer">
      <AuthProvider>
        <BookingProvider>
          <div
            className={`min-h-screen bg-gray-50 dark:bg-dark text-gray-900 dark:text-light`}
          >
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <div className="container mx-auto px-4 pt-16 pb-20 md:pb-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/find-parking" element={<FindParking />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
            <Toaster position="top-center" />
            {/* <Footer/> */}
            <Footer/>
          </div>
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
