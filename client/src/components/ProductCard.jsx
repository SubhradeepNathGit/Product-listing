import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const imageUrl = product.image
    ? `http://localhost:3006/uploads/${product.image}`
    : 'https://via.placeholder.com/300x300?text=No+Image';

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {/* Image */}
      <div className="relative w-full h-48 sm:h-56 bg-gray-200 overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
          }}
        />
        
        {/* Stock Badge */}
        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              product.inStock
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Category Badge */}
        {product.category && (
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
              {product.category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Product Name */}
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-2">
          {product.description}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Price</span>
            <span className="font-bold text-xl text-blue-600">
              Rs.{Number(product.price).toFixed(2)}
            </span>
          </div>
          
          <Link
            to={`/product/${product._id}`}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;