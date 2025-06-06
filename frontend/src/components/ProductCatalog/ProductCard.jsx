import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  addToInquiry,
  removeFromInquiry,
  selectIsInInquiry,
} from '../../features/inquiry/inquirySlice';

const ProductCard = ({ product }) => {
  const { id, image_url, name, description, price } = product;
  const quantity = 1;
  const dispatch = useDispatch();
  const isInInquiry = useSelector((state) =>
    selectIsInInquiry(state, product.id),
  );

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 p-4 flex flex-col justify-between">
      <img
        src={image_url}
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

      <div className="mt-2 flex flex-col gap-2 justify-between">
        <button
          onClick={() => dispatch(addToInquiry({ ...product, quantity }))}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Add to Inquiry
        </button>
        {isInInquiry && (
          <button
            onClick={() => dispatch(removeFromInquiry(id))}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Remove from Inquiry
          </button>
        )}
      </div>
      <div className="mt-2 flex justify-between">
        <Link
          to={`/products/${id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          {' '}
          View Details{' '}
        </Link>
        <Link to={`/inquiry`} className="text-sm text-blue-600 hover:underline">
          {' '}
          View in Inquiries{' '}
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
