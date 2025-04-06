import axios from 'axios';
import { useAuth } from '../contextApi/context.jsx';

const API_BASE_URL = 'http://localhost:3000/api/v1';


// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for handling cookies (refresh tokens)
});

// Add interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and not already retrying
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        await refreshAccessToken();
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Redirect to login if refresh fails
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// User Authentication APIs
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/register', userData);
    useAuth().register(response.data); // Store user data in context
    console.log('Registered User data:', response);
    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (credentials, login) => {
  try {
    const response = await api.post('/users/login', credentials);
    login(response.data); // Call the login function from context
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const getCurrentUser = async () => {
  try {
    const response = await api.get('/users/current-user');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post('/users/logout');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const refreshAccessToken = async (accessToken, refreshToken) => {
  try {
    const response = await api.post('/users/refresh-access-token', refreshToken);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const verifyEmail = async (verificationData) => {
  try {
    const response = await api.post('/users/verify-email', verificationData);
    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateUserAvatar = async (avatarData) => {
  try {
    const response = await api.put('/users/update-current-user-avatar', avatarData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateUserPassword = async (passwordData) => {
  try {
    const response = await api.put('/users/update-current-user-password', passwordData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Cart APIs
export const addToCart = async (cartItemData) => {
  try {
    const response = await api.post('/cart/add-to-cart', cartItemData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCartItems = async () => {
  try {
    const response = await api.get('/cart/cart-items');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCartTotalPrice = async () => {
  try {
    const response = await api.get('/cart/cart-total-price');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateCartItemQuantity = async (quantityData) => {
  try {
    const response = await api.put('/cart/update-cart-item-quantity', quantityData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const removeCartItem = async (itemId) => {
  try {
    const response = await api.delete(`/cart/remove-cart-item/${itemId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const clearCart = async () => {
  try {
    const response = await api.delete('/cart/clear-cart');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Product APIs
export const createProduct = async (productData) => {
  try {
    const response = await api.post('/products/create-product', productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getProducts = async (queryParams = {}) => {
  try {
    const response = await api.get('/products', { params: queryParams });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await api.put(`/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Review APIs
export const createReview = async (reviewData) => {
  try {
    const response = await api.post('/reviews/create-review', reviewData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getReviews = async (queryParams = {}) => {
  try {
    const response = await api.get('/reviews', { params: queryParams });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Export all functions as a single object
const apiService = {
  // User Authentication
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  refreshAccessToken,
  verifyEmail,
  updateUserAvatar,
  updateUserPassword,

  // Cart
  addToCart,
  getCartItems,
  getCartTotalPrice,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,

  // Products
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,

  // Reviews
  createReview,
  getReviews,
  deleteReview
};

export default apiService;