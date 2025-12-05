import React from 'react';
import { ShoppingBag, Laptop, Smartphone, Shirt, BookOpen, Home, Trophy, Gamepad2, Package } from 'lucide-react';

const Sidebar = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: '', name: 'All Categories', icon: Package },
    { id: 'electronics', name: 'Electronics', icon: Laptop },
    { id: 'mobile', name: 'Mobile & Tablets', icon: Smartphone },
    { id: 'fashion', name: 'Fashion', icon: Shirt },
    { id: 'books', name: 'Books', icon: BookOpen },
    { id: 'home', name: 'Home & Garden', icon: Home },
    { id: 'sports', name: 'Sports', icon: Trophy },
    { id: 'toys', name: 'Toys', icon: Gamepad2 },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-blue-600" />
          CRUD Store
        </h2>
      </div>
      
      {/* Categories Navigation */}
      <nav className="p-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
          Categories
        </h3>
        <ul className="space-y-1">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <li key={category.id}>
                <button
                  onClick={() => onCategoryChange(category.id)}
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
      
     
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-500 text-center">
          Subhradeep Nath &copy; 2025
        </p>
      </div>
    </div>
  );
};

export default Sidebar;