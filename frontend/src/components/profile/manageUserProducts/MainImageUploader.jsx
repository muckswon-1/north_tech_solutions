import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { Plus, X } from "lucide-react";
import { resetUploadState, selectUploadsIsLoading, uploadImage } from "../../../features/upload/uploadSlice";
import { removeMainImageUrl, selectMainImageUrl, setMainImageUrl } from "../../../features/products/productSlice";
import { fetchUserProducts } from "../../../features/products/productThunks";

export default function MainImageUploader({dialogHandler}) {
  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const isLoading = useSelector(selectUploadsIsLoading);
  const mainImageUrl = useSelector(selectMainImageUrl);
  

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if(!imageFile) return;
    
    try {
      console.log(imageFile);
     const response = await dispatch(uploadImage(imageFile)).unwrap();
     dispatch(setMainImageUrl(response));


    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed");

    }
  };


  const openFileDialog = () => fileInputRef.current.click();

  const handleRemoveMainImage = () => {
    dispatch(removeMainImageUrl());
    dispatch(resetUploadState());
  };



  return (
    <>
      <label className="block font-semibold text-gray-700 mb-2">Main Image</label>
      <p className="text-green-500 mb-2 text-sm">Please upload a main image for your listing</p>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Upload UI */}
      {mainImageUrl ? (
        <div className="relative group w-fit">
          <img
            src={mainImageUrl}
            alt="Main"
            className="h-32 w-32 object-cover rounded border"
          />
          
          {/* Remove Icon */}
          <button
            type="button"
            onClick={handleRemoveMainImage}
            className="absolute -top-2 -right-2 bg-white border rounded-full p-1 shadow hover:bg-red-100 text-red-600 transition"
            title="Remove image"
          >
            <X size={16} />
          </button>

          {/* Change Button */}
          <button
            type="button"
            onClick={openFileDialog}
            className="absolute bottom-1 right-1 bg-white text-xs text-blue-500 rounded px-2 py-0.5 border hover:bg-blue-50 transition hidden group-hover:block"
          >
           {isLoading ? "Uploading..." : "Change"}
          </button>
        </div>
      ) : (
        dialogHandler && dialogHandler({onclick: openFileDialog})
       
      )}

    
     
    </>
  );
}
