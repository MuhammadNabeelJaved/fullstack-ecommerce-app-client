import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { selectSearchQuery, closeSearch } from '../redux/features/searchSlice';
import { RiSearchLine, RiCloseLine, RiShoppingBag2Line, RiArrowRightLine } from 'react-icons/ri';
import products from '../data/products.data.js';

const SearchResults = ({ isVisible }) => {
  const searchQuery = useSelector(selectSearchQuery);
  const dispatch = useDispatch();

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleCloseSearch = () => {
    dispatch(closeSearch());
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute top-16 right-0 w-full md:w-96 bg-white rounded-xl shadow-xl z-50 overflow-hidden"
        >
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center text-gray-500">
              <RiSearchLine className="mr-2" />
              <span>Results for "{searchQuery}"</span>
            </div>
            <button 
              onClick={handleCloseSearch} 
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <RiCloseLine className="text-gray-500" />
            </button>
          </div>

          <div className="max-h-[80vh] overflow-y-auto">
            {filteredProducts.length > 0 ? (
              <motion.div 
                className="p-3 divide-y divide-gray-100"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.07
                    }
                  }
                }}
              >
                {filteredProducts.map(product => (
                  <motion.div 
                    key={product.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Link 
                      to={`/product/view/${product.id}`} 
                      className="flex items-center gap-4"
                      onClick={handleCloseSearch}
                    >
                      <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </h4>
                        <div className="flex items-center mt-1">
                          <span className="text-sm font-bold text-gray-900">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.tag && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-indigo-100 text-indigo-800 rounded-full">
                              {product.tag}
                            </span>
                          )}
                        </div>
                      </div>
                      <RiArrowRightLine className="text-gray-400" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="py-12 px-4 text-center"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <RiShoppingBag2Line className="text-3xl text-gray-400" />
                </motion.div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try a different search term or browse our categories</p>
                <Link
                  to="/products"
                  onClick={handleCloseSearch}
                  className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <span>Browse products</span>
                  <RiArrowRightLine className="ml-1" />
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchResults; 