import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
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

// CMS Components
import CMSLayout from './components/cms/CMSLayout';
import CMSDashboard from './components/cms/Dashboard';
import CMSProducts from './components/cms/Products';
import ProductForm from './components/cms/ProductForm';
import CMSOrders from './components/cms/Orders';

// Client Routes (currently using placeholders)
const HomePage = () => <div className="container mx-auto px-4 py-8">Home Page</div>;
const ProductsPage = () => <div className="container mx-auto px-4 py-8">Products Page</div>;
const ProductPage = () => <div className="container mx-auto px-4 py-8">Product Details Page</div>;
const CartPage = () => <div className="container mx-auto px-4 py-8">Cart Page</div>;
const CheckoutPage = () => <div className="container mx-auto px-4 py-8">Checkout Page</div>;

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
        element: <Checkout />,
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
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "order-history",
            element: <Orders />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "wishlist",
            element: <div>Wishlist Page</div>,
          },
          {
            path: "support",
            element: <div>Support Page</div>,
          },
          {
            path: "settings",
            element: <div>Settings Page</div>,
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
    ]
  },
  {
    path: "/cms",
    element: <CMSLayout />,
    children: [
      {
        index: true,
        element: <CMSDashboard />
      },
      {
        path: "dashboard",
        element: <CMSDashboard />
      },
      {
        path: "products",
        element: <CMSProducts />
      },
      {
        path: "products/new",
        element: <ProductForm />
      },
      {
        path: "products/edit/:id",
        element: <ProductForm />
      },
      {
        path: "orders",
        element: <CMSOrders />
      },
      {
        path: "orders/:id",
        element: <div>Order Details (To be implemented)</div>
      },
      {
        path: "customers",
        element: <div>Customers (To be implemented)</div>
      },
      {
        path: "analytics",
        element: <div>Analytics (To be implemented)</div>
      },
      {
        path: "support",
        element: <div>Support (To be implemented)</div>
      },
      {
        path: "settings",
        element: <div>Settings (To be implemented)</div>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
