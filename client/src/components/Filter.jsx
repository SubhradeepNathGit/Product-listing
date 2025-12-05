import React from 'react';

const Filter = ({ category, setCategory }) => {
  return (
    <div className="flex items-center gap-2 w-full sm:w-auto">
      <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
        Category:
      </label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="flex-1 sm:flex-none sm:w-48 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="books">Books</option>
        <option value="home">Home & Garden</option>
        <option value="sports">Sports</option>
        <option value="toys">Toys</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
};

export default Filter;