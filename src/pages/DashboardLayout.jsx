import React from "react";
import { Outlet } from "react-router";
import AdminAside from "../components/Aside/Aside";

const DashboardLayout = () => {
  return (
   <div className="flex gap-3">
    
    
        <AdminAside/>
  
    <Outlet/>
   </div>
  );
};

export default DashboardLayout;
