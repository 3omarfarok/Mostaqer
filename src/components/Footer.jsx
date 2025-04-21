import { Link } from "react-router-dom";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white dark:bg-dark-100 rounded-t-3xl mt-20">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* Brand and About */}
          <div className="text-center md:text-left max-w-md">
            <h2 className="text-2xl font-bold mb-3 dark:text-light">Mostqer</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Making parking easier and more convenient for everyone.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold mb-3 dark:text-light">
              Contact Us
            </h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-400">
              <p className="flex items-center justify-center md:justify-end gap-2">
                <FaPhone /> +20 114 782 5907
              </p>
              <p className="flex items-center justify-center md:justify-end gap-2">
                <FaEnvelope /> info@mostqer.com
              </p>
              <p className="flex items-center justify-center md:justify-end gap-2">
                <FaMapMarkerAlt /> 123 Om Ali Street
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <a href="https://github.com/3omarfarok" target="blank" className="text-gray-600 dark:text-gray-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} Mostqer. All rights reserved.
          </a>

          <div className="flex mt-4 md:mt-0 space-x-6">
            <Link
              to="/find-parking"
              className="text-gray-600 dark:text-gray-400 hover:text-primary"
            >
              Find Parking
            </Link>
            <Link
              to="/about-us"
              className="text-gray-600 dark:text-gray-400 hover:text-primary"
            >
              About us
            </Link>
            <Link
              to="https://github.com/3omarfarok/Mostaqer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary"
            >
              Github
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;