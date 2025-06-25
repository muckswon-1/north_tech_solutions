import React, {  useEffect, useState } from "react";
import {   useDispatch, useSelector } from "react-redux";
import {  selectUserProducts, setCurrentProductDraft } from "../../../features/products/productSlice";
import MyListingView from "./MyListingView";
import EditListView from "./EditListingView";


const MyListings = () => {
  const selectedProducts = useSelector(selectUserProducts);
  const dispatch = useDispatch();
  
  const [editIndex, setEditIndex] = useState(null);
  
 

  const handleEditClick = (index, product) => {
    dispatch(setCurrentProductDraft(product));
    setEditIndex(index);
    
  };

 

  return (
    <div id="listings" className="mt-8">
      <h2 className="text-lg font-semibold mb-4">My Listings</h2>
      {selectedProducts.length === 0 ? (
        <p className="text-gray-500">You haven't listed any products yet.</p>
      ) : (
        <ul className="space-y-6">
          {selectedProducts.map((prod, index) => (
            <li key={prod.id} className="border p-4 rounded shadow-sm bg-white">
              {editIndex === index ? <EditListView  setEditIndex={setEditIndex} /> : (
                
                <MyListingView  index={index}  prod={prod} handleEditClick={handleEditClick}/>
                
        
                )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyListings;
