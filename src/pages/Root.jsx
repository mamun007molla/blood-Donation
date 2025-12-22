import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Header/Navbar";

const Root = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Root;
