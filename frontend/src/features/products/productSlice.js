import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { clientGetAllProducts, clientGetProductsById, clientGetRelatedProducts } from "../../api/products";

export const fetchProducts =  createAsyncThunk(
    'products/fetchProducts',
    async(_, thunkAPI) => {
       try {
        const response = await  clientGetAllProducts();
        return response

       } catch (error) {
        return thunkAPI.rejectWithValue(error?.message || 'Error fetching products')
       }

    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductsById',
    async (id, thunkAPI) => {
        try {
            
            const response = await clientGetProductsById(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.message || 'Error fetching product by id')
        }
    }
);

export const fetchRelatedProducts = createAsyncThunk(
    'products/fetchRelatedProducts',
    async(id, thunkAPI) => {
        console.log(id);
        try {
            const response = await clientGetRelatedProducts(id);
            if(response.status === 200){
                return response.data
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.message || 'Error returning related products')
        }
    }
);


const initialState = {
    products: [],
    currentProduct: null,
    relatedProducts: [],
    isLoading: false,
    error: null
}


const productsSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: builder => {
        builder

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
    }
});


export const selectProducts = state => state.products.products


export const selectCurrentProduct = state => state.products.currentProduct;
export const selectRelatedProducts = state => state.products.relatedProducts;
export const selectProductsError = state => state.products.error;
export const selectProductsIsLoading = state => state.products.isLoading;


export default productsSlice.reducer;