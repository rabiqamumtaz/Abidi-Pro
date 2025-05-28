import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import {
  BellIcon,
  Cog6ToothIcon,
  UsersIcon,
  FolderIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { IoHomeOutline } from "react-icons/io5";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlineTimer } from "react-icons/md";
import { TbBeach } from "react-icons/tb";
import { GrProjects } from "react-icons/gr";
import api from "../axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
 import { TbUserQuestion } from "react-icons/tb";
import { logoutUser } from "../Store/authSlice";

import { IconButton } from "@material-tailwind/react";
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [hasNotifications] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const profileDropdownRef = useRef(null);
  const dispatch = useDispatch();
    const [openNav, setOpenNav] = useState(false);
  

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    applyTheme(savedTheme);

    if (savedTheme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme("system");
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  const applyTheme = (selectedTheme) => {
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark");
    if (selectedTheme === "light") root.classList.add("theme-light");
    else if (selectedTheme === "dark") root.classList.add("theme-dark");
    else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      root.classList.add(prefersDark ? "theme-dark" : "theme-light");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
const handleLogout = async () => {
  try {
    await api.post("/auth/logout");
    dispatch(logoutUser());
    navigate("/auth/login");
    toast.success("Logged out successfully");
  } catch (err) {
    toast.error("Logout failed. Try again.");
  }
};

  const navLinks = [
    { name: "Home", to: "/people", icon: IoHomeOutline },
    { name: "Time ", to: "/time", icon: MdOutlineTimer },
    { name: "Leave ", to: "/leave", icon: TbBeach },
    { name: "Files", to: "/file", icon: FolderIcon },
    { name: "Tickets", to: "/tickets", icon: IoTicketOutline },
    { name: "Projects", to: "/project", icon: GrProjects },

    { name: "Admin ", to: "/admin", icon: UsersIcon },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 shadow-lg bg-primary text-text transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo (20%) */}
            <div className="w-1/5 flex items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt="Logo"
              />
            </div>

            {/* Center: Nav Links (60%) */}
            <div className="hidden sm:flex w-3/5 justify-center">
              <div className="flex space-x-4">
                {navLinks.map(({ name, to, icon: Icon }) => (
                  <NavLink
                    key={name}
                    to={to}
                    className={({ isActive }) =>
                      isActive
                        ? "relative group p-2 rounded-md bg-teal-700"
                        : "relative group p-2 rounded-md hover:bg-teal-700"
                    }
                  >
                    <Icon className="w-6 h-6 text-white" />
                    <span
                      className="absolute left-1/2 top-full mt-2 -translate-x-1/2 scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out rounded px-3 py-1 text-xs shadow-lg z-10"
                      style={{
                        backgroundColor: "var(--color-primary)",
                        color: "var(--color-text)",
                      }}
                    >
                      {name}
                    </span>
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Right: Notifications, Settings, Profile (20%) */}
            <div className="w-1/5 flex justify-end items-center space-x-4">
              {/* Notification
              <button className="relative p-1 text-white rounded-md hover:bg-secondary">
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" />
                <span className={`absolute -top-0 -right-0 h-2 w-2 rounded-full ${hasNotifications ? "bg-red-500" : "bg-green-500"
                  }`}></span>
              </button> */}
              {/* Mobile toggle */}
                      <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 sm:hidden text-description"
                        onClick={() => setOpenNav(!openNav)}
                      >
                        {openNav ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                        )}
                      </IconButton>

              {/* Settings */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  className="p-1 text-white rounded-md hover:bg-teal-700"
                >
                  <span className="sr-only">Open settings</span>
                  <Cog6ToothIcon className="w-6 h-6" />
                </button>
                {settingsOpen && (
                  <div className="absolute right-0 mt-2 w-48 z-50 rounded-md bg-white shadow-lg ring-1 ring-black/5 py-2">
                    <button
                      onClick={() => {
                        navigate("/theme-selector");
                        setSettingsOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Theme Selector
                    </button>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div ref={profileDropdownRef} className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                    alt="User"
                  />
                </button>
                {profileDropdownOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Your Profile
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>

                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
        <div className="sm:hidden">

        </div>

        {/* Mobile Menu */}
        {openNav && (
          <div className="sm:hidden px-2 pt-2 pb-3 space-y-1 bg-primary text-white">
            {navLinks.map(({ name, to, icon: Icon }) => (
              <Link
                key={name}
                to={to}
                onClick={() => setOpenNav(false)}
                className={`flex items-center space-x-2 rounded-md px-3 py-2 ${currentPath === to ? "hover:bg-[#99c7be]" : "hover:bg-[#99c7be] hover:text-black"
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span>{name}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

