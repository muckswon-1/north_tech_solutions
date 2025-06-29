import { Check, Pencil, Trash2, X } from 'lucide-react';
import React, {  useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteInquiryDraft, fetchUserInquiryDrafts, updateInquiryDraftQuantity } from '../../features/userInquiryDrafts/userInquiryDraftThunks';
import { selectIsAuthenticated, selectUser } from '../../features/auth/authSlice';
import { selectUserInquiryDrafts, setUserInquiryDrafts } from '../../features/userInquiryDrafts/userInquiryDraftSlice';



const InquiryDraft = ({productId}) => {

    const dispatch = useDispatch();
 
    const authUser = useSelector(selectUser);
    const inquiryDrafts = useSelector(selectUserInquiryDrafts);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const draft = inquiryDrafts?.find((d) => d.productId === productId);

    const [isEditing, setIsEditing] = useState(false);
    const [originalQuantity, setOriginalQuantity] = useState(draft?.quantity);
    const [quantity, setQuantity] = useState(originalQuantity);
   

    
   
  
    const handleDeleteDraft = () => {
        dispatch(deleteInquiryDraft({userId:authUser.id ,inquiryDraftId: draft.id}));
        
      };

    const handleEditClick = () => {
      setIsEditing(true);
    };

    const handleCancel = () => {
      setIsEditing(false);
      setQuantity(originalQuantity)
    };

    const handleSave = () => {
        dispatch(updateInquiryDraftQuantity({userId:authUser.id ,inquiryDraftId: draft.id, quantity}));
      setOriginalQuantity(quantity);
      setIsEditing(false);
    };

    useEffect(() => {
      if(authUser && isAuthenticated){
        dispatch(fetchUserInquiryDrafts(authUser.id));
      }
    
    }, [dispatch,quantity])
  
    
    return (
        <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white">
        <div className="flex items-center gap-4">
          {draft?.product?.imageUrl && (
            <img
              src={draft.product.imageUrl}
              alt={draft.product.name}
              className="w-16 h-16 object-cover rounded border"
            />
          )}
          <div>
            <p className="font-semibold text-lg">{draft?.product?.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-600">Quantity:</span>
              {isEditing ? (
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-20 border rounded px-2 py-1 text-sm"
                />
              ) : (
                <span className="text-sm font-medium">{originalQuantity}</span>
              )}
            </div>
          </div>
        </div>
  
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <>
              <button
                onClick={handleEditClick}
                className="text-blue-600 hover:text-blue-800 p-1 transition"
                title="Edit Quantity"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={handleDeleteDraft}
                className="text-red-600 hover:text-red-800 p-1 transition"
                title="Remove"
              >
                <Trash2 size={18} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                disabled={quantity < 1}
                className={`p-1 transition ${
                  quantity < 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-green-600 hover:text-green-800'
                }`}
                title="Save"
              >
                <Check size={18} />
              </button>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700 p-1 transition"
                title="Cancel"
              >
                <X size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    );
}

export default InquiryDraft;
