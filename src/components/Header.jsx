import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setBtnName] = useState("Logout");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { loggedInUser } = useContext(UserContext);
  const onlineStatus = useOnlineStatus();
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <header className="sticky top-0 z-50 bg-orange-500 shadow-md">
      <nav className="mx-auto flex items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={LOGO_URL}
            alt="Food Palace"
            className="w-16 sm:w-20 object-contain transition-transform hover:scale-105"
          />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-white"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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

        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-white">
          <li className="flex items-center gap-1">
            <span>Status:</span>
            <span>{onlineStatus ? "🟢" : "🔴"}</span>
          </li>

          <NavItem to="/">Home</NavItem>
          <NavItem to="/about">About</NavItem>
          <NavItem to="/contact">Contact</NavItem>

          {/* Cart */}
          <li className="relative">
            <Link
              to="/cart"
              className="rounded-md px-3 py-1 hover:bg-white hover:text-orange-500 transition"
            >
              Cart
              <span className="absolute -top-2 -right-2 rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-semibold text-white">
                {cartItems.length}
              </span>
            </Link>
          </li>

          <li>
            <button
              className="rounded-md bg-white px-4 py-1 text-orange-500 font-semibold hover:bg-orange-100 transition"
              onClick={() =>
                setBtnName(btnName === "Login" ? "Logout" : "Login")
              }
            >
              {btnName}
            </button>
          </li>
        </ul>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 text-white shadow-lg">
          <ul className="space-y-4 px-6 py-5 text-sm font-medium">
            <li className="flex items-center justify-between">
              <span>Status</span>
              <span className={onlineStatus ? "text-green-400" : "text-red-400"}>
                {onlineStatus ? "🟢 Online" : "🔴 Offline"}
              </span>
            </li>

            <MobileNavItem to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </MobileNavItem>
            <MobileNavItem to="/about" onClick={() => setIsMenuOpen(false)}>
              About
            </MobileNavItem>
            <MobileNavItem to="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </MobileNavItem>

            <MobileNavItem to="/cart" onClick={() => setIsMenuOpen(false)}>
              Cart ({cartItems.length})
            </MobileNavItem>

            {loggedInUser && (
              <li className="text-xs italic text-gray-400">
                Logged in as {loggedInUser}
              </li>
            )}

            <li>
              <button
                className="w-full rounded-md bg-white py-2 text-orange-600 font-semibold hover:bg-orange-100 transition"
                onClick={() =>
                  setBtnName(btnName === "Login" ? "Logout" : "Login")
                }
              >
                {btnName}
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

/* ---------- Reusable Components ---------- */

const NavItem = ({ to, children }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded-md px-3 py-1 transition
        ${
          isActive
            ? "bg-white text-orange-500 font-semibold shadow-sm"
            : "text-white hover:bg-white hover:text-orange-500"
        }`
      }
    >
      {children}
    </NavLink>
  </li>
);
const MobileNavItem = ({ to, children, onClick }) => (
  <li>
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block rounded-md px-3 py-2 transition
        ${
          isActive
            ? "bg-orange-500 text-white font-semibold"
            : "text-white hover:text-orange-400"
        }`
      }
    >
      {children}
    </NavLink>
  </li>
);


export default Header;