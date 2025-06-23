import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentProductDraft } from '../../../features/products/productSlice';

const MyListingView = ({index, prod, handleEditClick}) => {


    return (
        <>
          <h3 className="text-lg font-bold">{prod.name}</h3>
                  <p>{prod.description}</p>
                  <p className="text-sm text-gray-500">${prod.price}</p>
                  {prod.imageUrl && (
                    <img src={prod.imageUrl} alt={prod.name} className="h-24 mt-2 rounded" />
                  )}
                  <button
                    className="mt-3 text-blue-600 hover:underline text-sm"
                    onClick={() => handleEditClick(index, prod)}
                  >
                    Edit Listing
                  </button>
        </>
    );
}

export default MyListingView;
