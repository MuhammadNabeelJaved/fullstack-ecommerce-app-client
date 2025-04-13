import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Bounce, ToastContainer, toast } from "react-toastify";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  ArrowUpDown,
  Eye,
  Download,
  Boxes,
  Tag,
  Grid3X3,
  List,
  CheckCircle,
  XCircle,
} from "lucide-react";
import products from "../../data/products.data.js";
import apiService from "../../apis/fetchApis.js";

const Products = () => {
  const { getProducts, deleteProduct } = apiService;
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for storing fetched products
  const [products, setProducts] = useState([]);

  const images = products.map((product) => product.images);

  const imageUrl = images.map((image) =>
    image.map((image, index) => {
      console.log(" First image:", image.url);
    })
  );

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts();
      console.log("Fetched products:", response);

      // Assuming the API returns data in an object with a data property
      if (response && response.data) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "electronics",
    "fashion",
    "home",
    "sports",
    "books",
    "other",
  ];

  // Handle sort toggle
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle checkbox selection
  const handleSelectProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((product) => product._id));
    }
  };

  const handleDeleteProduct = (productId) => {
    console.log("Deleting product with ID:", productId);
    deleteProduct(productId)
      .then(() => {
        console.log("Product deleted successfully.");
        fetchProducts();
        toast.success("Product deleted successfully.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
    setSelectedProducts(selectedProducts.filter((id) => id !== productId));
  };

  // Filter and sort products
  let filteredProducts = [...products];

  console.log("Filtered products:", filteredProducts);

  // Apply search filter
  if (searchTerm) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply category filter
  if (categoryFilter !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === categoryFilter
    );
  }

  // Apply stock filter
  if (stockFilter === "in-stock") {
    filteredProducts = filteredProducts.filter((product) => product.stock > 0);
  } else if (stockFilter === "low-stock") {
    filteredProducts = filteredProducts.filter(
      (product) => product.stock > 0 && product.stock <= 5
    );
  } else if (stockFilter === "out-of-stock") {
    filteredProducts = filteredProducts.filter(
      (product) => product.stock === 0
    );
  }

  // Apply price filter
  filteredProducts = filteredProducts.filter(
    (product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  // Apply sorting
  filteredProducts.sort((a, b) => {
    let comparison = 0;
    if (sortField === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === "price") {
      comparison = a.price - b.price;
    } else if (sortField === "stock") {
      comparison = a.stock - b.stock;
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  return (
    <div className="space-y-6">
      <ToastContainer />
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Products
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your product catalog
          </p>
        </div>
        <Link
          to="/cms/products/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                placeholder="Search by name or SKU..."
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>

              <button
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {viewMode === "grid" ? (
                  <>
                    <List className="h-4 w-4 mr-2" />
                    List
                  </>
                ) : (
                  <>
                    <Grid3X3 className="h-4 w-4 mr-2" />
                    Grid
                  </>
                )}
              </button>

              <button
                onClick={() => {}}
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* Filters panel */}
          {filterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Stock Status
                </label>
                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Stock Status</option>
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock (≤ 5)</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price Range (${priceRange[0]} - ${priceRange[1]})
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([parseInt(e.target.value), priceRange[1]])
                    }
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    to
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Selection Bar */}
        {selectedProducts.length > 0 && (
          <div className="bg-indigo-50 dark:bg-indigo-900/30 border-t border-indigo-100 dark:border-indigo-800/30 p-2 flex items-center justify-between">
            <div className="text-sm text-indigo-700 dark:text-indigo-300 ml-2">
              <span className="font-medium">{selectedProducts.length}</span>{" "}
              products selected
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedProducts([])}
                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/50 hover:bg-indigo-200 dark:hover:bg-indigo-800/50 focus:outline-none"
              >
                Clear selection
              </button>
              <button
                onClick={() => {}}
                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Product List */}
        {viewMode === "list" ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-750">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={
                          selectedProducts.length === filteredProducts.length &&
                          filteredProducts.length > 0
                        }
                        onChange={handleSelectAll}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      Product
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    SKU
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => handleSort("price")}
                    >
                      Price
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => handleSort("stock")}
                    >
                      Stock
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded object-cover"
                            src={product.image}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {product.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <span
                        className={
                          product.stock === 0
                            ? "text-red-600 dark:text-red-400"
                            : product.stock <= 5
                            ? "text-amber-600 dark:text-amber-400"
                            : ""
                        }
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {product.status === "active" ? (
                          <>
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Active
                          </>
                        ) : (
                          <>
                            <XCircle className="mr-1 h-3 w-3" />
                            Out of Stock
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/cms/products/${product.id}`}
                          className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          to={`/cms/products/edit/${product.id}`}
                          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => {}}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={
                      // Check for various possible image field structures
                      Array.isArray(product.images) && product.images.length > 0
                        ? product.images[0].url || product.images[0] // If first element is an object with url or direct URL
                        : product.images?.url || // If images is an object with url property
                          product.image?.url || // If image is an object with url property
                          (Array.isArray(product.image) &&
                          product.image.length > 0
                            ? product.image[0].url || product.image[0] // If image is array
                            : product.image) || // If image is a direct URL
                          "https://via.placeholder.com/300" // Fallback
                    }
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        product.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/70 dark:text-green-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/70 dark:text-red-400"
                      }`}
                    >
                      {product.status === "active" ? "Active" : "Out of Stock"}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {product.name}
                    </h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <Tag className="h-3 w-3 mr-1" />
                    {product.category}
                    <span className="mx-1.5 text-gray-300 dark:text-gray-600">
                      •
                    </span>
                    <Boxes className="h-3 w-3 mr-1" />
                    <span
                      className={
                        product.stock === 0
                          ? "text-red-600 dark:text-red-400"
                          : product.stock <= 5
                          ? "text-amber-600 dark:text-amber-400"
                          : ""
                      }
                    >
                      {product.stock} in stock
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-4 space-x-2">
                    <Link
                      to={`/cms/products/view/${product.id}`}
                      className="inline-flex items-center px-2 py-1 border border-gray-300 dark:border-gray-600 shadow-sm text-xs font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Link>
                    <Link
                      to={`/cms/products/edit/${product.id}`}
                      className="inline-flex items-center px-2 py-1 border border-gray-300 dark:border-gray-600 shadow-sm text-xs font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{filteredProducts.length}</span>{" "}
                of{" "}
                <span className="font-medium">{filteredProducts.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
