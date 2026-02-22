import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter, FiPhone } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mt-12 mx-auto px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
        {/* Newsletter */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-sm text-gray-400 mb-5">
            Subscribe to get updates on new arrivals and exclusive deals!
          </p>
          <div className="flex w-full md:justify-start justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full max-w-xs px-4 py-2 text-sm rounded-l-md bg-gray-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            <button className="bg-teal-600 px-5 py-2 text-sm text-white font-medium rounded-r-md hover:bg-teal-500 transition">
              Join
            </button>
          </div>
        </div>

        {/* Shop Links - FIX: corrected routes */}
        <div>
          <h3 className="text-white font-semibold mb-4">Shop</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>
              <Link to="/collections/men" className="hover:text-teal-500">
                Men
              </Link>
            </li>
            <li>
              <Link to="/collections/women" className="hover:text-teal-500">
                Women
              </Link>
            </li>
            <li>
              <Link to="/collections/kids" className="hover:text-teal-500">
                Kids
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-teal-500">
                New Arrivals
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Customer Support</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>
              <Link to="/contact" className="hover:text-teal-500">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/returns" className="hover:text-teal-500">
                Returns and Refunds
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:text-teal-500">
                Shipping Info
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-teal-500">
                Terms and Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Social + Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start items-center space-x-4 text-xl mb-5">
            <a href="#" className="hover:text-teal-500 transition">
              <FiFacebook />
            </a>
            <a href="#" className="hover:text-teal-500 transition">
              <FiInstagram />
            </a>
            <a href="#" className="hover:text-teal-500 transition">
              <FiTwitter />
            </a>
          </div>
          <p className="text-sm text-gray-400 mb-2">Call Us:</p>
          <a
            href="tel:+923001234567"
            className="flex items-center justify-center md:justify-start gap-2 hover:text-teal-500 transition text-sm font-medium"
          >
            <FiPhone />
            <span>+92 300 1234567</span>
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center">
        <p className="text-xs text-gray-500">
          &copy; {currentYear} ShopSwift. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
