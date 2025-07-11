import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

export const Header = () => {
  const [btnName, setbtnName] = useState(["Logout"]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { loggedInUser } = useContext(UserContext);
  const onlineStatus = useOnlineStatus();

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <nav className="bg-orange-500 shadow-md px-6 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <Link to="/">
          <img
            src={LOGO_URL}
            alt="Logo"
            className="h-auto object-contain transition-all duration-300 w-18 sm:w-20 md:w-26"
          />
        </Link>
        <button
          className="text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-4 text-white font-medium">
          <li>Online Status: {onlineStatus ? "🟢" : "🔴"}</li>
          <li>
            <Link
              to="/"
              className="px-3 py-1 rounded-md hover:bg-white hover:text-orange-500 transition duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="px-3 py-1 rounded-md hover:bg-white hover:text-orange-500 transition duration-200"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="px-3 py-1 rounded-md hover:bg-white hover:text-orange-500 transition duration-200"
            >
              Contact Us
            </Link>
          </li>
          {/* <li><Link to="/grocery">Grocery</Link></li> */}
          <li className="relative">
            <Link
              to="/cart"
              className="px-3 py-1 rounded-md hover:bg-white hover:text-orange-500 transition duration-200"
            >
              Cart
              {/* Badge */}
              <span className="absolute -top-2 -right-1  z-1 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            </Link>
          </li>

          {/* <li>{loggedInUser}</li> */}
          <li>
            <button
              className="bg-white text-orange-500 px-4 py-1 rounded-md hover:bg-orange-100 transition"
              onClick={() =>
                setbtnName(btnName === "Login" ? "Logout" : "Login")
              }
            >
              {btnName}
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden mt-4 mb-4 space-y-3 bg-gray-800 rounded-lg p-4 text-white font-medium shadow-lg z-50">
          <li className="flex items-center justify-between">
            <span>Online Status:</span>
            <span className={onlineStatus ? "text-green-400" : "text-red-400"}>
              {onlineStatus ? "🟢 Online" : "🔴 Offline"}
            </span>
          </li>

          <li>
            <Link to="/" className="block hover:text-orange-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="block hover:text-orange-400 transition"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block hover:text-orange-400 transition"
            >
              Contact Us
            </Link>
          </li>
          <li>
            {/* <Link to="/grocery" className="block hover:text-orange-400 transition">
        Grocery
      </Link> */}
          </li>
          <li>
            <Link to="/cart" className="block hover:text-orange-400 transition">
              Cart <span className="text-sm">({cartItems.length} items)</span>
            </Link>
          </li>
          <li className="text-sm italic text-gray-300">{loggedInUser}</li>

          <li>
            <button
              className="w-full bg-white text-orange-600 font-semibold px-4 py-2 rounded-md hover:bg-orange-100 transition"
              onClick={() =>
                setbtnName(btnName === "Login" ? "Logout" : "Login")
              }
            >
              {btnName}
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Header;
