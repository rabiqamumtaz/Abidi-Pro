import { Outlet } from "react-router-dom";
import Navbar from "../Components/navbar";
import SubNavbar from "../Components/PeopleSubNavbar";

const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <SubNavbar />
      <div className="pt-[8.5rem]">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
