import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetCurrentProductDraft, selectAdditionalImagesUrls, selectCurrentProductDraft, selectMainImageUrl,  selectSpecifications,  updateCurrentProductDraftField} from '../../../features/products/productSlice';
import ProductSpecs from './ProductSpecs';
import MainImageUploader from './MainImageUploader';
import toast from 'react-hot-toast';
import { selectUser } from '../../../features/auth/authSlice';
import AdditionalImageUploader from './AdditionalImageUploader';
import { Plus, X } from "lucide-react";
import { fetchUserProducts, listProduct } from '../../../features/products/productThunks';


const NewProductForm = ({setErrorMsg, setShowForm}) => {
    const dispatch = useDispatch();
   
    const user = useSelector(selectUser);
     const product = useSelector(selectCurrentProductDraft);
     const specs = useSelector(selectSpecifications);


     console.log(product);
      
    const handleProductChange = (e) => {
        const {name, value} = e.target;
        dispatch(updateCurrentProductDraftField({field: name, value}))
      
      };
    
     

    const handleProductSubmit = async (e) => {
        e.preventDefault();
    
        if(!product.name || !product.description || !product.price || !product.imageUrl || specs.length === 0){
        
           setErrorMsg("Please fill in all fields")
            setTimeout(() => {
                setErrorMsg("")
            },[1500])
          return;
        }
    
        const specsObj = {};
        specs.forEach(({ key, value }) => {
          if (key) specsObj[key] = value;
        });
    
        try {
        
          await dispatch(listProduct({ ...product, userId: user.id, specs: specsObj })).unwrap();
        
        
          dispatch(resetCurrentProductDraft());
          dispatch(fetchUserProducts(user.id));
          setShowForm(false);
          toast.success("Product listed!");
        } catch (err) {
          console.log(err);
          toast.error("Failed to list product");
        }
      };


    const mainImageUploaderDialogueHandler = ({onclick}) => {
       return (
           <div
          onClick={onclick}
          className="h-32 w-32 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 rounded cursor-pointer hover:bg-gray-100 transition"
        >
           <Plus size={22} />
          <span className="text-xs">Add</span> 
        </div>
       )
    }


    useEffect(() => {
      
    },[])

    
    return (
        <form onSubmit={handleProductSubmit} className="space-y-4">
        <input
          name="name"
          value={product.name}
          onChange={handleProductChange}
          placeholder="Product Name"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleProductChange}
          placeholder="Product Description"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleProductChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
        />


        {/* Specs section */}
        <ProductSpecs />
        <div className="mb-6">
        <MainImageUploader dialogHandler={mainImageUploaderDialogueHandler}  />
        <AdditionalImageUploader  />
        </div>
        

        

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Submit Product
        </button>
      </form>
    );
}

export default NewProductForm;
