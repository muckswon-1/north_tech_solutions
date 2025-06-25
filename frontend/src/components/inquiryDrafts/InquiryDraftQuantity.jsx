import React, { useEffect, useState } from 'react';
import { Building2, CheckCheck, AlertTriangle, Minus, Plus, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { deleteInquiryDraft, fetchUserInquiryDrafts, updateInquiryDraftQuantity } from '../../features/userInquiryDrafts/userInquiryDraftThunks';
import toast from 'react-hot-toast';



const InquiryDraftQuantity = ({productInquiryDraft}) => {
    const authUser = useSelector(selectUser);
    const dispatch = useDispatch();
    
    const [quantity, setQuantity] = useState(productInquiryDraft?.quantity);

    useEffect(() => {
        dispatch(fetchUserInquiryDrafts(authUser.id))
    }, [dispatch, quantity, productInquiryDraft?.quantity]);

    return (
        <div className="flex items-center justify-between w-full bg-gray-100 px-3 py-2 rounded-md border">
    <button
      onClick={() => {
        if (productInquiryDraft?.quantity === 1) {
          dispatch(deleteInquiryDraft({
            userId: authUser.id,
            inquiryDraftId: productInquiryDraft.id
          }));
          setQuantity(0);

          toast.success('Removed from inquiry');
        } else {
          
          dispatch(updateInquiryDraftQuantity({
            userId: authUser.id,
            inquiryDraftId: productInquiryDraft.id,
            quantity: productInquiryDraft.quantity - 1
          }));
          setQuantity(productInquiryDraft.quantity - 1);
        }
      }}
      className="text-gray-600 hover:text-red-600 transition"
      title={productInquiryDraft.quantity === 1 ? 'Remove from Inquiry' : 'Decrease Quantity'}
    >
      

      {productInquiryDraft.quantity === 1 ? (
        <Trash2 size={20} className='hover:bg-red-100 cursor-pointer' />
      ) : (
        <Minus size={20} className='hover:bg-green-100 cursir-pointer'/>
      )}
    </button>

    <span className="font-semibold text-gray-800">{quantity}</span>

    <button
      onClick={() => {
        dispatch(updateInquiryDraftQuantity({
          userId: authUser.id,
          inquiryDraftId: productInquiryDraft.id,
          quantity: productInquiryDraft.quantity + 1
        }))

        setQuantity(productInquiryDraft.quantity + 1)
    }
      }
      className="text-gray-600 hover:text-green-600 transition"
      title="Increase Quantity"
    >
      <Plus size={20} />
    </button>
   
  </div>
    ); 
    
}

export default InquiryDraftQuantity;
