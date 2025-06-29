import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createInquiryDraft, deleteInquiryDraft, fetchUserInquiryDrafts, updateInquiryDraftQuantity } from '../../features/userInquiryDrafts/userInquiryDraftThunks';
import { selectUserInquiryDrafts } from '../../features/userInquiryDrafts/userInquiryDraftSlice';
import { selectIsAuthenticated, selectUser } from '../../features/auth/authSlice';

const AddToInquiry = ({ product }) => {
  const dispatch = useDispatch();
  const userDraftInquiries = useSelector(selectUserInquiryDrafts);
  const authUser = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const draft = userDraftInquiries?.find((d) => d.productId === product.id);
  const isInInquiry = Boolean(draft);
  const [quantity, setQuantity] = useState(draft?.quantity);

  const handleAddToInquiry = () => {
    dispatch(createInquiryDraft({
      userId: authUser.id,
      inquiryDraft: { productId: product.id },
      quantity,
    }));
    setQuantity(1);
    toast.success('Added to inquiry');
  };

  const handleRemoveFromInquiry = () => {
    dispatch(deleteInquiryDraft({ userId: authUser.id, inquiryDraftId: draft.id }));
    setQuantity(0);
  };

  const handleIncrement = () => {
    dispatch(updateInquiryDraftQuantity(
        {
            userId: authUser.id,
            inquiryDraftId: draft.id,
            quantity: draft.quantity + 1
          }
          
    ))

    setQuantity(draft.quantity + 1)
  };

  const handleDecrement = () => {
    if (quantity === 1) {
        dispatch(deleteInquiryDraft({ userId: authUser.id, inquiryDraftId: draft.id }));
        
    } else {
       dispatch(updateInquiryDraftQuantity(
        {
            userId: authUser.id,
            inquiryDraftId: draft.id,
            quantity: draft.quantity - 1
          }
       ))

       setQuantity(draft.quantity - 1);
    }
  };


  useEffect(() => {
    if(authUser && isAuthenticated){
        dispatch(fetchUserInquiryDrafts(authUser.id));
        setQuantity(draft?.quantity);
    }

  },[dispatch,quantity])
  

  return (
    <div className="mt-6 space-y-4">
      {isInInquiry ? (
        <div className="flex items-center gap-4">
          <button
            onClick={handleDecrement}
            className="bg-gray-200 px-3 py-1 rounded text-lg font-semibold hover:bg-gray-300"
          >
            −
          </button>
          <span className="text-lg font-medium">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="bg-gray-200 px-3 py-1 rounded text-lg font-semibold hover:bg-gray-300"
          >
            +
          </button>
          <button
            onClick={handleRemoveFromInquiry}
            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition ml-2"
          >
            Remove
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToInquiry}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Add to Inquiry
        </button>
      )}

      <Link
        to="/inquiry"
        className="text-sm text-blue-600 hover:underline flex justify-center"
      >
        View in Inquiry
      </Link>
    </div>
  );
};

export default AddToInquiry;
