import React from 'react';  
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { id, image, name, description, price } = product;

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 p-4 flex flex-col justify-between">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="mt-4 flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      </div>
      <div className="mt-2">
        <span className="text-xl font-bold text-blue-600">${price}</span>
      </div>
      <Link
        to={`/products/${id}`}
        className="mt-4 block text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
