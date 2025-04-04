import React from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router";
import { useLocation } from "react-router";
const Layout = () => {
  const location = useLocation();
  const isDashboard = location.pathname.includes("/dashboard");
  return (
    <>
      <Navbar />
      <Outlet />
      {!isDashboard && <Footer />}
    </>
  );
};

export default Layout;
