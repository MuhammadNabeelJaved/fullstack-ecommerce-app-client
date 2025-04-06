import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
import { useAuth, AuthProvider } from "./contextApi/context.jsx";
import ProtectedRoute from "./contextApi/ProtectedRoutes.jsx";
import App from "./App.jsx";
import Layout from "./layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Products from "./components/Products.jsx";
import Reviews from "./components/Reviews.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import Faqs from "./components/Faqs.jsx";
import Policy from "./components/Policy.jsx";
import TermsOfService from "./components/TermsOfService.jsx";
import CookiePolicy from "./components/CookiePolicy.jsx";
import DashboardLayout from "./components/dashboard/DashboardLayout.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Orders from "./components/dashboard/Orders.jsx";
import Profile from "./components/dashboard/Profile.jsx";
import ProductView from "./components/ProductView.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import OTPVerification from "./components/OTPVerification.jsx";

// CMS Components
import CMSLayout from "./components/cms/CMSLayout";
import CMSDashboard from "./components/cms/Dashboard";
import CMSProducts from "./components/cms/Products";
import ProductForm from "./components/cms/ProductForm";
import CMSOrders from "./components/cms/Orders";
import Customers from "./components/cms/Customers";
import Support from "./components/cms/Support";
import Analytics from "./components/cms/Analytics";
import Settings from "./components/cms/Settings";
import Promotions from "./components/cms/Promotions";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/reviews",
        element: <Reviews />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <ProtectedRoute element={<Checkout />} />,
      },
      {
        path: "/faq",
        element: <Faqs />,
      },
      {
        path: "/privacy",
        element: <Policy />,
      },
      {
        path: "/terms",
        element: <TermsOfService />,
      },
      {
        path: "/cookies",
        element: <CookiePolicy />,
      },
      {
        path: "/product/view/:id",
        element: <ProductView />,
      },
      {
        path: "dashboard",
        element: <ProtectedRoute element={<DashboardLayout />} />,
        children: [
          {
            index: true,
            element: <ProtectedRoute element={<Dashboard />} />,
          },
          {
            path: "orders",
            element: <ProtectedRoute element={<Orders />} />,
          },
          {
            path: "order-history",
            element: <ProtectedRoute element={<Orders />} />,
          },
          {
            path: "profile",
            element: <ProtectedRoute element={<Profile />} />,
          },
          {
            path: "wishlist",
            element: <ProtectedRoute element={<div>Wishlist Page</div>} />,
          },
          {
            path: "support",
            element: <ProtectedRoute element={<div>Support Page</div>} />,
          },
          {
            path: "settings",
            element: <ProtectedRoute element={<div>Settings Page</div>} />,
          },
        ],
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/verify-otp",
        element: <OTPVerification />,
      },
    ],
  },
  {
    path: "/cms",
    element: <ProtectedRoute element={<CMSLayout />} />,
    children: [
      {
        index: true,
        element: <ProtectedRoute element={<CMSDashboard />} />,
      },
      {
        path: "dashboard",
        element: <ProtectedRoute element={<CMSDashboard />} />,
      },
      {
        path: "products",
        element: <ProtectedRoute element={<CMSProducts />} />,
      },
      {
        path: "products/new",
        element: <ProtectedRoute element={<ProductForm />} />,
      },
      {
        path: "products/view/:id",
        element: <ProtectedRoute element={<ProductView />} />,
      },
      {
        path: "products/edit/:id",
        element: <ProtectedRoute element={<ProductForm />} />,
      },
      {
        path: "orders",
        element: <ProtectedRoute element={<CMSOrders />} />,
      },
      {
        path: "orders/:id",
        element: (
          <ProtectedRoute
            element={<div>Order Details (To be implemented)</div>}
          />
        ),
      },
      {
        path: "customers",
        element: <ProtectedRoute element={<Customers />} />,
      },
      {
        path: "analytics",
        element: <ProtectedRoute element={<Analytics />} />,
      },
      {
        path: "support",
        element: <ProtectedRoute element={<Support />} />,
      },
      {
        path: "settings",
        element: <ProtectedRoute element={<Settings />} />,
      },
      {
        path: "promotions",
        element: <ProtectedRoute element={<Promotions />} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
