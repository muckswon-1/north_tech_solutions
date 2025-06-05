import React, {  useState } from 'react';

import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addToInquiry, removeFromInquiry, selectIsInInquiry } from '../../features/inquiry/inquirySlice';

const AddToInquiry = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch()
  const isInInquiry = useSelector(state => selectIsInInquiry(state, product.id))

  const handleAddToInquiry = () => {
    dispatch(addToInquiry({ ...product, quantity }));
    toast.success(`${product.name} added to Inquiry.`);
  };

  const handleRemoveFromInquiry = () => {
    dispatch(removeFromInquiry(product.id));
    toast.error(`${product.name} removed from Inquiry.`);
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
          Quantity:
        </label>
        <input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-20 border border-gray-300 rounded p-1 text-center"
        />
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
        <button
          onClick={handleAddToInquiry}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Add to Inquiry
        </button>

        {isInInquiry && (
          <button
            onClick={handleRemoveFromInquiry}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
          >
            Remove Inquiry
          </button>
        )}
      </div>
    </div>
  );
};

export default AddToInquiry;
