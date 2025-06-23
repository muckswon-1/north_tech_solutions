import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  removeAdditionalImageUrl, selectAdditionalImagesUrls, setAdditionalImagesUrls } from "../../../features/products/productSlice";
import toast from "react-hot-toast";
import { Plus } from "lucide-react"; // or any icon library
import { resetUploadState, selectUploadsIsLoading, uploadImage } from "../../../features/upload/uploadSlice";

const AdditionalImageUploader = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const additionalImagesUrls = useSelector(selectAdditionalImagesUrls);
  const isLoading = useSelector(selectUploadsIsLoading);

 

  const handleAdditionalImagesUpload = async (e) => {
    const files = e.target.files;

    for (let file of files) {
     
      try {
      const response = await dispatch(uploadImage(file)).unwrap();
     
      dispatch(setAdditionalImagesUrls(response));
      //dispatch(resetUploadState());
      console.log('after additional images url')
    
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Failed to upload one or more images");
        
      }
    }


  };


  const removeImage = (urlToRemove) => {
    dispatch(removeAdditionalImageUrl(urlToRemove))
    dispatch(resetUploadState());
  };

  const openFileDialog = () => fileInputRef.current.click();

  console.log(additionalImagesUrls);



  return (
    <div>
      <label className="block font-semibold text-gray-700 mt-6 mb-2">Additional Images</label>

      <input
        type="file"
        multiple
        onChange={handleAdditionalImagesUpload}
        className="hidden"
        ref={fileInputRef}
      />

      <div className="flex flex-wrap gap-2 mt-2">
        {additionalImagesUrls?.map((url, i) => (
          <div key={i} className="relative group">
            <img
              src={url}
              alt={`Additional ${i + 1}`}
              className="h-20 w-20 object-cover rounded border"
            />
            <button
              type="button"
              onClick={() => removeImage(url)}
              className="absolute top-0 right-0 bg-white text-red-600 rounded-full px-1 text-xs hidden group-hover:block"
            >
              ✕
            </button>
          </div>
        ))}

        {/* Add new image */}
        <div
          onClick={openFileDialog}
          className="h-20 w-20 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 rounded cursor-pointer hover:bg-gray-100 transition"
        >
          <Plus size={18} />
          <span className="text-xs">{isLoading ? "Uploading..." : "Add"}</span>
        </div>
      </div>
    </div>
  );
};

export default AdditionalImageUploader;
