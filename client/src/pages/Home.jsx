import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productApi from '../api/productApi';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = { 
        page, 
        limit: 12 
      };
      
      if (searchTerm.trim()) params.search = searchTerm.trim();
      if (category) params.category = category;

      const response = await productApi.getAllProducts(params);
      
      setProducts(response.data || []);
      setTotalPages(response.totalPages || 1);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.response?.data?.message || 'Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when filters or page changes
  useEffect(() => {
    fetchProducts();
  }, [page, searchTerm, category]);

  // Reset to page 1 when search/filter changes
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [searchTerm, category]);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Handle category filter
  const handleCategoryChange = (cat) => {
    setCategory(cat);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setCategory('');
    setPage(1);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <Sidebar 
        selectedCategory={category} 
        onCategoryChange={handleCategoryChange} 
      />

      {/* Main Content Area with left margin for sidebar */}
      <div className="ml-64 flex-1">
        <div className="container mx-auto px-4 py-6 md:py-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl text-center md:text-4xl font-bold text-gray-800 mb-2">
              Product Catalog
            </h1>
            <p className="text-gray-600 text-center text-sm md:text-base">
              Browse our collection of products
            </p>
          </div>

          {/* Search and Actions Section */}
          <div className="bg-transparent rounded-lg p-4 md:p-6 mb-6">
            <div className="flex flex-col space-y-4">
              {/* Search Bar */}
              <SearchBar 
                searchTerm={searchTerm} 
                setSearchTerm={handleSearch} 
              />
              
              {/* Actions */}
              <div className="flex gap-2 justify-end">
                {(searchTerm || category) && (
                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm md:text-base"
                  >
                    Clear Filters
                  </button>
                )}
                
               
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || category) && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Active Filters:</p>
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      Search: "{searchTerm}"
                    </span>
                  )}
                  {category && (
                    <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      Category: {category}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 text-center">{error}</p>
              <button
                onClick={fetchProducts}
                className="mt-3 mx-auto block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && (
            <>
              {products.length > 0 ? (
                <>
                  <ProductList products={products} />
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination 
                      page={page} 
                      setPage={setPage} 
                      totalPages={totalPages} 
                    />
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <div className="mb-4">
                    <svg
                      className="mx-auto h-24 w-24 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {searchTerm || category
                      ? 'Try adjusting your filters'
                      : 'Start by adding your first product'}
                  </p>
                  {!searchTerm && !category && (
                    <button
                      onClick={() => navigate('/add-product')}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add Your First Product
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;