import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router";
import {
  Save,
  X,
  ArrowLeft,
  Upload,
  Trash2,
  Plus,
  Minus,
  Info,
} from "lucide-react";
import apiService from "../../apis/fetchApis.js";

const ProductForm = () => {
  const { createProduct } = apiService;
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    image: [],
  });

  const onSubmit = (data) => {
    console.log("Prodcut submit Data is:", data);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center">
          <Link
            to="/cms/products"
            className="mr-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isEditMode ? "Edit Product" : "Add New Product"}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isEditMode
                ? "Update product information"
                : "Create a new product listing"}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </button>
          <button
            type="button"
            // disabled={!isDirty || loading}
            className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none cursor-pointer`}
          >
            <Save className="w-4 h-4 mr-2" />
            {/* {loading ? "Saving..." : "Save Product"} */}Save Product
          </button>
        </div>
      </div>

      {/* {formError && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800/30 rounded-md text-red-600 dark:text-red-400 text-sm">
          <div className="flex items-center">
            <Info className="h-4 w-4 mr-2" />
            {formError}
          </div>
        </div>
      )} */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main product info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Product Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    // value={formData.name}
                    // onChange={handleChange}
                    className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    // value={formData.description}
                    // onChange={handleChange}
                    rows={4}
                    className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                    placeholder="Enter product description"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    // value={formData.category}
                    // onChange={handleChange}
                    className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select a category</option>
                    {/* {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))} */}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Pricing & Inventory
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                        $
                      </span>
                    </div>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      // value={formData.price}
                      // onChange={handleChange}
                      className="block w-full pl-7 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Quantity
                  </label>
                  <div className="flex">
                    <button
                      type="button"
                      className="inline-flex items-center p-2 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-md bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-650"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      // value={formData.stock}
                      // onChange={handleChange}
                      className="block w-full md:w-24 border border-gray-300 dark:border-gray-600 py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center dark:bg-gray-700 dark:text-white"
                      min="0"
                    />
                    <button
                      type="button"
                      className="inline-flex items-center p-2 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-650"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Tags
              </h2>

              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Product Tags
                </label>
                <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md">
                  {/* {formData.tags.map((tag) => (
                    <div
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400"
                    >
                      {tag}
                      <button
                        type="button"
                        className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-indigo-400 hover:text-indigo-600 dark:text-indigo-300 dark:hover:text-indigo-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))} */}
                  <input
                    type="text"
                    id="tags"
                    className="flex-1 min-w-[120px] border-0 p-0 focus:ring-0 text-sm dark:bg-gray-800 dark:text-white"
                    placeholder="Add a tag and press Enter"
                    // onKeyDown={handleTagInput}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Press Enter to add a tag
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar for Image */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Product Image
              </h2>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-6 flex flex-col items-center justify-center">
                  {/* {imagePreview ? (
                    <div className="relative w-full">
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className="mx-auto h-48 w-auto object-contain"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 p-1 bg-white dark:bg-gray-800 rounded-full shadow"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Drag and drop an image or click to upload
                      </p>
                    </>
                  )} */}

                  <input
                    type="file"
                    id="productImage"
                    accept="image/*"
                    // onChange={handleImageUpload}
                    className={`mt-4 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 dark:file:bg-indigo-900/30 dark:file:text-indigo-400 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900/40
                      
                      imagePreview ? "hidden" : ""
                    
                    `}
                  />
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Supported formats: JPG, PNG, GIF. Maximum file size: 5MB.
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
