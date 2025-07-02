import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeSpecifications, selectSpecifications, setSpecifications, updateSpecifications } from '../../../features/products/productSlice';



const ProductSpecs = () => {

  const specs = useSelector(selectSpecifications);
  

  const dispatch = useDispatch();


    const handleSpecChange = (index, field, value) => {
      dispatch(updateSpecifications({ index, field, value }))
          
      };
    
      const addSpecField = () => {
         dispatch(setSpecifications({ key: "", value: "" }));

      };

      const removeSpecField = (index) => {
        dispatch(removeSpecifications(index))
        
      };


    return (
         <div>
                    <label className="block font-semibold text-gray-700 mb-2">Product Specifications</label>
                    {specs.map((spec, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Key (e.g., RAM)"
                          value={spec.key}
                          onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                          className="flex-1 p-2 border rounded"
                        />
                        <input
                          type="text"
                          placeholder="Value (e.g., 8GB)"
                          value={spec.value}
                          onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                          className="flex-1 p-2 border rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeSpecField(index)}
                          className="text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addSpecField}
                      className="text-blue-600 font-medium hover:underline mt-1"
                    >
                      + Add Spec
                    </button>
                  </div>
    );
}

export default ProductSpecs;
