import React, { useState } from 'react';
import { ShoppingBag, Laptop, Smartphone, Shirt, BookOpen, Home, Trophy, Gamepad2, Package, Menu, X } from 'lucide-react';

const Sidebar = ({ selectedCategory, onCategoryChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    { id: '', name: 'All Categories', icon: Package },
    { id: 'electronics', name: 'Electronics', icon: Laptop }, 
    { id: 'fashion', name: 'Fashion', icon: Shirt },
    { id: 'books', name: 'Books', icon: BookOpen },
    { id: 'home', name: 'Home & Garden', icon: Home },
    { id: 'sports', name: 'Sports', icon: Trophy },
    { id: 'toys', name: 'Toys', icon: Gamepad2 },
  ];

  const handleCategoryClick = (categoryId) => {
    onCategoryChange(categoryId);
    setIsMobileMenuOpen(false); 
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-blue-600" />
            My Store
          </h2>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm bg-opacity-0 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:w-64 lg:shadow-sm lg:border-r lg:border-gray-200
          w-64
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Desktop Header */}
        <div className="hidden lg:block p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 flex items-center -mb-3 gap-2">
            <ShoppingBag className="w-6 h-6 text-blue-600" />
            My Store
          </h2>
        </div>

        {/* Mobile Header Inside Sidebar */}
        <div className="lg:hidden p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-blue-600" />
            My Store
          </h2>
        </div>

        {/* Categories Navigation */}
        <nav className="p-4 mt-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
            Categories
          </h3>
          <ul className="space-y-1">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <li key={category.id}>
                  <button
                    onClick={() => handleCategoryClick(category.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 text-blue-600 shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="truncate">{category.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            Subhradeep Nath &copy; 2025
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;