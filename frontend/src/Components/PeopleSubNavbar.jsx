import React, { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Navbar, MobileNav, IconButton, Button } from "@material-tailwind/react";
import { CalendarDaysIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { moduleConfigs } from "../routeConfig";
import { useTimeLog } from "../Pages/People/TimeLogContext";
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from "react-toastify";

const SubNavbar = () => {
  const [openNav, setOpenNav] = useState(false);
 const { start, checkIn, checkOut,loading,error } = useTimeLog();
  const checkedIn = Boolean(start);
  const { pathname } = useLocation();
  const moduleKey = pathname.split("/")[1];
  // console.log(moduleConfigs)
  const config = moduleConfigs[moduleKey];
  const links = config?.links  || [];
//  console.log(links,"hello2")
useEffect(()=>{
  error&&
  toast.error(error?.message);

},[error])

  // console.log(data,"wowsdfsd")

 


  useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setOpenNav(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = (
    <ul className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-6 text-sm font-medium">
     {links.map((link) => (
  <li key={link.name}>
    <NavLink
      to={link.path}
      // end={link.path === `/${moduleKey}`} // Apply 'end' only on base route
      className={({ isActive }) =>
        `px-3 py-2 rounded-md transition-colors duration-100 ${
          isActive ? "bg-primary text-white" : "text-text hover:text-text"
        }`
      }
    >
      {link.name}
    </NavLink>
  </li>
))}

    </ul>
  );

  if (!links.length) return null;

  return (
    <Navbar className="fixed top-12 z-10 max-w-full rounded-nonemy-2 px-4 my-4 py-2 lg:px-8 lg:py-4 bg-background shadow-none border-none">
      <div className="flex items-center justify-between text-blue-gray-900">
        {/* Check In/Out Button */}
         <Button
          size="large"
          className={`w-32 text-center font-semibold shadow transition px-5 py-3 ${
            checkedIn
              ? "bg-red-400 text-red-800"
              : "bg-green-400 text-green-800"
          }`}
          onClick={checkedIn ? checkOut : checkIn}
        >
          {loading?<CircularProgress size={15} color="primary" />:checkedIn ? "Check Out" : "Check In"}

        </Button>

        {/* Nav Links Center */}
        <div className="hidden lg:block">{navLinks}</div>

        {/* Contact Icons Right */}
        <div className="hidden lg:flex items-center space-x-4">
          <PhoneIcon className="w-5 h-5 text-text hover:text-teal-700 cursor-pointer" />
          <CalendarDaysIcon className="w-5 h-5 text-text hover:text-teal-700 cursor-pointer" />
        </div>

        {/* Mobile toggle */}
         <IconButton
          variant="text"
          className="ml-auto h-6 w-6 lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>

      <MobileNav open={openNav}>
        <div className="flex flex-col gap-4 mt-5">
          {navLinks}
          <div className="flex items-center space-x-4">
            <PhoneIcon className="w-5 h-5 text-gray-600 hover:text-blue-500 cursor-pointer" />
            <CalendarDaysIcon className="w-5 h-5 text-gray-600 hover:text-blue-500 cursor-pointer" />
          </div>
        </div>
      </MobileNav>
    </Navbar>
  );
};

export default SubNavbar;
