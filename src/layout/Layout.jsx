import React from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router";
import { useLocation } from "react-router";

const Layout = () => {
  const location = useLocation();
  const isDashboard = location.pathname.includes("/dashboard");
  const isAuthPage = location.pathname.includes("/signin") || location.pathname.includes("/signup");
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-grow ${isDashboard ? 'pt-16' : 'pt-16'}`}>
        <Outlet />
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
};

export default Layout;
