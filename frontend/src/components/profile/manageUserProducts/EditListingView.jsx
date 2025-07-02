import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetCurrentProductDraft, selectAdditionalImagesUrls, selectCurrentProductDraft, setCurrentProductDraft, updateCurrentProductDraftField } from '../../../features/products/productSlice';
import { selectUser } from '../../../features/auth/authSlice';
import toast from 'react-hot-toast';
import { uploadImage } from '../../../features/upload/uploadSlice';
import { fetchUserProducts, updateProduct } from '../../../features/products/productThunks';
import MainImageUploader from './MainImageUploader';
import ProductSpecs from './ProductSpecs';
import { Plus } from 'lucide-react';
import AdditionalImageUploader from './AdditionalImageUploader';


const EditListingView = ({setEditIndex}) => {
    const dispatch  = useDispatch();
    const fileInputRef = useRef();
    const currentUser = useSelector(selectUser);
   const draft = useSelector(selectCurrentProductDraft);


  const handleChange = (e) => {
    const {name, value} = e.target;
    dispatch(updateCurrentProductDraftField({field: name, value}))
 };


 const handleSave = async () => {
        try {
          console.log(draft);
          console.log(currentUser);
          
          await dispatch(updateProduct({userId: currentUser.id, editedProduct: draft})).unwrap();
          //dispatch(fetchUserProducts(currentUser.id));

          setEditIndex(null);
          toast.success("Product updated!");
        } catch (error) {
          toast.error("Failed to update product");
        }
      };

      const handleCancel = () => {
        setEditIndex(null);
        dispatch(resetCurrentProductDraft());
      };

      const editMainImageUpdateDialogueHandler = ({onclick}) => {
        return (
            <div
          onClick={onclick} 
          className="h-32 w-32 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 rounded cursor-pointer hover:bg-gray-100 transition"
        >
          <Plus size={22} />
          <span className="text-xs">Update main image</span> 
          </div>
        )
      }
    
  

    return (
        <>
        <input
          type="text"
          name="name"
          value={draft.name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          name="description"
          value={draft.description}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          name="price"
          value={draft.price}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <ProductSpecs />

        <MainImageUploader dialogHandler={editMainImageUpdateDialogueHandler} />
        <AdditionalImageUploader />

        <div className="flex gap-3 mt-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div> 
      </>
    );
}

export default EditListingView;
