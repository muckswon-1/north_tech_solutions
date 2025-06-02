import React, { useContext, useState } from 'react';
import { useInquiry } from '../../context/InquiryContext';
import toast from 'react-hot-toast';

const AddToInquiry = ({ product }) => {
  const { addToInquiry, isInInquiry, removeFromInquiry } = useInquiry();
  const [quantity, setQuantity] = useState(1);

  const handleAddToInquiry = () => {
    addToInquiry({ ...product, quantity });
    toast.success(`${product.name} added to Inquiry.`);
  };

  const handleRemoveFromInquiry = () => {
    removeFromInquiry(product.id);
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

        {isInInquiry(product.id) && (
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
