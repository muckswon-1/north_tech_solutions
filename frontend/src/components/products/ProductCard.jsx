import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, CheckCheck, AlertTriangle, Minus, Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { selectUser } from '../../features/auth/authSlice';
import { createInquiryDraft } from '../../features/userInquiryDrafts/userInquiryDraftThunks';
import { selectCompanyVerifiedEmail } from '../../features/company/companySlice';
import { selectUserInquiryDrafts } from '../../features/userInquiryDrafts/userInquiryDraftSlice';
import InquiryDraftQuantity from '../inquiryDrafts/InquiryDraftQuantity';
import { setCurrentProductDraft } from '../../features/products/productSlice';

const ProductCard = ({ product }) => {
  const authUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const userDraftInquiries = useSelector(selectUserInquiryDrafts);
  const navigate = useNavigate();
  const isInInquiryDraft = userDraftInquiries?.some((draft) => draft.productId === product.id);
  const productInquiryDraft = userDraftInquiries?.find(draft => draft.productId === product.id);
  

  const { id, imageUrl, name, description, price } = product;
  

  const isOwner = product?.userId === authUser?.id;
  const isVerified = useSelector(selectCompanyVerifiedEmail);

  const handleAddToInquiry = () => {
    try {
      dispatch(createInquiryDraft({
        userId: authUser.id,
        inquiryDraft: { productId: id },
        quantity: 1
      }));
      toast.success('Added to inquiry');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add product to inquiry');
    }
  };


  const handleViewDetails = () => {
    dispatch(setCurrentProductDraft(product));
    navigate(`/products/${id}`);
  };




  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 p-4 flex flex-col justify-between group relative">
      {/* Image */}
      <div className="relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-48 object-cover rounded-md"
        />
        {/* Company hover badge */}
        <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded hidden group-hover:block">
          {product.User.Company?.name || 'Unknown Company'}
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-3 flex-1">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{name}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
      </div>

      {/* Price */}
      <div className="mt-2 text-blue-600 text-lg font-bold">${price}</div>

      {/* Company Info */}
      <div className="mt-2 flex items-center gap-2 text-sm text-gray-700">
        <Building2 size={16} />
        <span className="font-medium">{product.User.Company?.name || 'No Company'}</span>
        {isVerified ? (
          <CheckCheck
            size={16}
            className="text-yellow-500"
            title="Verified Company"
          />
        ) : (
          !isOwner && (
            <span
              className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded"
              title="This company is not verified"
            >
              Unverified Seller
            </span>
          )
        )}
      </div>

      {/* Warning for unverified owner */}
      {isOwner && !isVerified && (
        <div className="mt-2 flex items-start gap-2 bg-yellow-100 border border-yellow-300 text-yellow-800 text-xs p-2 rounded-md">
          <AlertTriangle size={16} />
          <div>
            <strong>Your company is not verified.</strong> Buyers may not trust your listings.
            <Link
              to="/dashboard/profile#company"
              className="block text-blue-600 underline mt-1"
            >
              Complete your company profile
            </Link>
          </div>
        </div>
      )}

      {/* CTA Buttons */}
      <div className="mt-4 flex flex-col gap-2">
      {isOwner ? (
  <Link
    to={{ pathname: `/${authUser.id}/profile`, hash: '#listings' }}
    className="w-full text-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md transition"
  >
    View in My Listings
  </Link>

) : isInInquiryDraft ? (
  <InquiryDraftQuantity productInquiryDraft={productInquiryDraft} />
) : (
  <button
    onClick={handleAddToInquiry}
    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition"
  >
    Add to Inquiry
  </button>
)}

      </div>

      {/* Links */}
      <div className="mt-3 flex justify-between text-sm text-blue-600">
        <button onClick={handleViewDetails} className="hover:underline">View Details</button>
        {!isOwner &&  authUser && (
          <Link to={`/${authUser.id}/my-inquiries`} className="hover:underline">View in Inquiries</Link>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
