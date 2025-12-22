import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignout = () => {
    signOutUser();
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 shadow-lg border-b border-red-100 transition">
      <nav className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        
        <Link
          to="/"
          className="text-3xl font-extrabold bg-linear-to-r from-red-600 to-rose-500 bg-clip-text text-transparent tracking-wide"
        >
          BloodCare
        </Link>

        
        <ul className="hidden lg:flex items-center gap-8 text-lg font-medium text-gray-700 mx-auto">

          <NavLink
            to="/donationRequests"
            className={({ isActive }) =>
              `hover:text-red-600 transition ${
                isActive && "text-red-600 font-semibold"
              }`
            }
          >
            Donation Requests
          </NavLink>

          {user && (
            <NavLink
              to="/funding"
              className={({ isActive }) =>
                `hover:text-red-600 transition ${
                  isActive && "text-red-600 font-semibold"
                }`
              }
            >
              Funding
            </NavLink>
          )}
        </ul>

       
        <div className="flex items-center gap-3">

          
          {!user && (
            <NavLink
              to="/login"
              className="px-5 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md transition-all"
            >
              Login
            </NavLink>
          )}

        
          {user && (
            <>
              <img
                src={
                  user?.photoURL || "https://i.ibb.co/4fV83K7/profile.png"
                }
                alt="avatar"
                className="w-11 h-11 rounded-full border-2 border-red-400 shadow-md cursor-pointer hover:scale-105 transition"
              />

              <NavLink
                to="/dashboard"
                className="hidden lg:inline-block px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm transition"
              >
                Dashboard
              </NavLink>

              <button
                onClick={handleSignout}
                className="hidden lg:inline-block px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md transition"
              >
                Logout
              </button>
            </>
          )}

          
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden hover:scale-110 transition"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 py-4 px-6 animate-slide-down">

          <NavLink
            to="/donation-requests"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-lg font-medium hover:text-red-600 transition"
          >
            Donation Requests
          </NavLink>

          {user && (
            <NavLink
              to="/funding"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-lg font-medium hover:text-red-600 transition"
            >
              Funding
            </NavLink>
          )}

          {!user && (
            <NavLink
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="block py-2 mt-2 text-lg font-semibold bg-red-500 hover:bg-red-600 text-white text-center rounded-xl shadow"
            >
              Login
            </NavLink>
          )}

          {user && (
            <div className="mt-4 border-t pt-4">
              <NavLink
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-lg font-medium hover:text-red-600 transition"
              >
                Dashboard
              </NavLink>

              <button
                onClick={() => {
                  handleSignout();
                  setMobileOpen(false);
                }}
                className="block py-2 text-lg font-semibold text-red-600 hover:text-red-800 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
