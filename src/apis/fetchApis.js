import { useAuth } from '../contextApi/Context.jsx';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1';


// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for handling cookies (refresh tokens)
});

api.interceptors.response.use((response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and not already retrying
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await refreshAccessToken(refreshToken);
        console.log("response in apis.js:", response);
        localStorage.setItem("accessToken", response.data?.accessToken); // Update access token in local storage
        originalRequest.headers['Authorization'] = `Bearer ${response.data?.accessToken}`;
        return api(originalRequest); // Retry the original request
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

// Make sure this matches the server's expected format
export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await api.post('/users/refresh-access-token', { refreshToken });
    return response; // Return the entire response for consistent handling
  } catch (error) {
    console.error("Refresh token error:", error);
    throw error;
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
export const addToCartItem = async (cartItemData) => {
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
    console.log("Product data:", productData);
    const response = await axios.post(`http://localhost:3000/api/v1/products/create-product`, productData); 
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/products`);
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
    const response = await axios.delete(`http://localhost:3000/api/v1/products/${productId}`);
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
  addToCartItem,
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



// fetchApis.js - Improved version

// import axios from 'axios';

// // Create API instance with base URL
// const api = axios.create({
//   baseURL: API_BASE_URL || '/api',
//   withCredentials: true, // Important for cookie handling
//   headers: {
//     'Content-Type': 'application/json',
//   }
// });

// // Add request interceptor to attach the Authorization header
// api.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem('accessToken');
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Add response interceptor to handle token refresh
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
    
//     // Only retry once to prevent infinite loops
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       try {
//         // Get the refresh token
//         const refreshToken = localStorage.getItem("refreshToken");
        
//         if (!refreshToken) {
//           // No refresh token available, can't retry
//           throw new Error("No refresh token available");
//         }
        
//         // Call refresh token endpoint
//         const refreshResponse = await apiService.refreshAccessToken(refreshToken);
        
//         if (!refreshResponse?.data?.data?.accessToken) {
//           throw new Error("Failed to refresh token");
//         }
        
//         // Extract the new access token
//         const newAccessToken = refreshResponse.data.data.accessToken;
        
//         // Update localStorage
//         localStorage.setItem("accessToken", newAccessToken);
        
//         // Update the Authorization header and retry the request
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error("Token refresh failed:", refreshError);
        
//         // Clear tokens and redirect to login
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
        
//         return Promise.reject(refreshError);
//       }
//     }
    
//     return Promise.reject(error);
//   }
// );

// // API service methods
// const apiService = {
//   // User authentication
//   login: async (credentials) => {
//     try {
//       const response = await api.post('/users/login', credentials);
//       return response;
//     } catch (error) {
//       console.error("Login error:", error);
//       throw error;
//     }
//   },
  
//   // Get current user profile
//   getCurrentUser: async () => {
//     try {
//       const response = await api.get('/users/current-user');
//       return response;
//     } catch (error) {
//       console.error("Get current user error:", error);
//       throw error;
//     }
//   },
  
//   // Refresh access token
//   refreshAccessToken: async (refreshToken) => {
//     try {
//       // Make sure we're sending the refresh token in the expected format
//       const response = await api.post('/users/refresh-access-token', { refreshToken });
//       return response;
//     } catch (error) {
//       console.error("Refresh token error:", error);
//       throw error;
//     }
//   },
  
//   // Other API methods...
// };

// export default apiService;