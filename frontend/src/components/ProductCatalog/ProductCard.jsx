import React from 'react';  

const ProductCard = ({ product }) => {
  const { image, name, description, price } = product;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        <div className="mt-2">
          <span className="text-xl font-bold text-blue-600">${price}</span>
        </div>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
