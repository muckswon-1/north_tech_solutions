import { createSlice } from "@reduxjs/toolkit";
import { fetchProductById, fetchProducts, fetchRelatedProducts, fetchUserProducts, listProduct, updateProduct } from "./productThunks";
import { act } from "react";


const initialState = {
    products: [],
    userProducts:[],
    currentProductDraft: {
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        additionalImagesUrls: [],
        specs: [{key: '', value: ''}]
    },
    relatedProducts: [],
    isLoading: false,
    error: null
}


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

        setCurrentProductDraft: (state, action) => {
            const draft ={...action.payload}
            if(draft.specs && !Array.isArray(draft.specs)){
                draft.specs = Object.entries(draft.specs).map(([key, value]) => ({key, value}))
            }

            state.currentProductDraft = draft;
           
        },

        updateCurrentProductDraftField: (state, action) => {
            const {field, value} = action.payload;
            state.currentProductDraft[field] = value;
        },

        resetCurrentProductDraft: (state) => {
            state.currentProductDraft = {
                name: '',
                description: '',
                price: '',
                imageUrl: '',
                additionalImageUrls: [],
                specs: [{key: '', value: ''}]
            }
         },
        
      
        removeAdditionalImageUrl: (state, action) => {
            state.currentProductDraft.additionalImagesUrls = state.currentProductDraft.additionalImagesUrls.filter(url => url !== action.payload)
        },
        setMainImageUrl: (state, action) => {
            state.currentProductDraft.imageUrl = action.payload;
        },
        setAdditionalImagesUrls: (state, action) => {
            console.log('next irl',action.payload)
            console.log(state.currentProductDraft.additionalImagesUrls)
            if(!Array.isArray(state.currentProductDraft.additionalImagesUrls)){
                state.currentProductDraft.additionalImagesUrls = [];
            }
            state.currentProductDraft.additionalImagesUrls = [...state.currentProductDraft.additionalImagesUrls, action.payload];
        },
        removeMainImageUrl: (state) => {
            state.currentProductDraft.imageUrl = '';
        },
        setSpecifications: (state, action) => {
            state.currentProductDraft.specs.push(action.payload);
              
        
        },
        removeSpecifications: (state, action) => {
            state.currentProductDraft.specs = state.currentProductDraft.specs.filter((_, index) => index !== action.payload);
       
        },
        updateSpecifications: (state, action) => {
            console.log(action.payload);

            const {index, field, value} = action.payload;
           

            if(!Array.isArray(state.currentProductDraft.specs)){
                state.currentProductDraft.specs = [];
            }

            if(!state.currentProductDraft.specs[index]){
                state.currentProductDraft.specs.push({key: '', value: ''});
            }

            const currentSpecs = [...state.currentProductDraft.specs];

            currentSpecs[index] = {
                ...currentSpecs[index],
                [field]: value
            
            }
                
            
            state.currentProductDraft.specs = state.currentProductDraft.specs.map((spec, i) =>
                i === index ? { ...spec, [field]: value } : spec
              );
            
        }
    
       
    },
    extraReducers: builder => {
        builder
        //create product
        .addCase(listProduct.pending,(state, action) => {
            state.isLoading = true;
            const optimisticListing = action.meta.arg

            state.products.push(optimisticListing);
        })
        .addCase(listProduct.fulfilled,(state,action) => {
            state.isLoading = false;
            state.products.push(action.payload);
           
        })
        .addCase(listProduct.rejected,(state, action) => {
            state.isLoading = false;
            state.error = action.payload
        })

        // fetch all products builder
        .addCase(fetchProducts.pending,state => {
            state.isLoading = true;
        
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload,
            state.isLoading = false
            
    })
    .addCase(fetchProducts.rejected, (state, action) => {
        state.products = []
        state.error = action.payload
    })

    //fetch product by id builder
    .addCase(fetchProductById.pending, state => {
        state.isLoading = true;
    })
    .addCase(fetchProductById.fulfilled, (state,action) => {
        state.currentProduct = action.payload;
        state.isLoading = false;
    })
    .addCase(fetchProductById.rejected, (state, action) => {
        state.error = action.payload;
    })

    .addCase(fetchRelatedProducts.pending,state => {
        state.isLoading = true;
    })
    .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.relatedProducts = action.payload;
    })
    .addCase(fetchRelatedProducts.rejected, (state, action) => {
        state.error = action.payload
    })

    .addCase(fetchUserProducts.pending,(state) => {
        state.isLoading = true;
    })
    .addCase(fetchUserProducts.fulfilled,(state,action) => {
        state.isLoading = false;
        state.userProducts = action.payload;
    })
    .addCase(fetchUserProducts.rejected,(state,action) => {
        state.isLoading = false;
        state.error = action.payload
    })

    .addCase(updateProduct.pending,(state, action) => {
        state.isLoading = true;
        const optimisticUpdate = action.meta.arg;

        state.userProducts = state.userProducts.map(product => {
            if(product.id === optimisticUpdate.id){
                return optimisticUpdate
            }
            return product
        })

    })
    .addCase(updateProduct.fulfilled,(state,action) => {
        state.isLoading = false;
       state.userProducts = state.userProducts.map(product => {
            if(product.id === action.payload.id){
                return action.payload
            }
            return product
        })
        
    })
    .addCase(updateProduct.rejected,(state,action) => {
        state.isLoading = false;
        state.error = action.payload
    })

    }
    
});


//export actions
export const {removeAdditionalImageUrl, removeMainImageUrl, setAdditionalImagesUrls, setMainImageUrl, setSpecifications, removeSpecifications, updateSpecifications, updateCurrentProductDraftField, setCurrentProductDraft, resetCurrentProductDraft} = productsSlice.actions;



//export selectors
export const selectProducts = state => state.products.products;
export const selectUserProducts = state => state.products.userProducts;
export const selectRelatedProducts = state => state.products.relatedProducts;
export const selectProductsError = state => state.products.error;
export const selectProductsIsLoading = state => state.products.isLoading;
export const selectMainImageUrl = state => state.products.currentProductDraft.imageUrl;
export const selectAdditionalImagesUrls = state => state.products.currentProductDraft.additionalImagesUrls;
export const selectSpecifications = state => state.products.currentProductDraft.specs;
export const selectCurrentProductDraft = state => state.products.currentProductDraft;





export default productsSlice.reducer;