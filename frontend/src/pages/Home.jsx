import React from "react";
import SideBar from "../components/Home/SideBar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex lg:flex-row h-screen lg:h-[94vh] lg:gap-3 sm:gap-1">
      <div className="bg-custom-gradient1 p-2 lg:p-4 w-2/12 md:w-2/12 lg:w-3/12 rounded-md z-50 flex flex-col justify-between">
        <SideBar />
      </div>
      <div className="bg-custom-gradient1 w-full lg:w-5/6 lg:p-4 md:p-4 p-1 rounded-md overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
