import { clientCreateProduct, clientGetAllProducts, clientGetProductsById, clientGetRelatedProducts, clientGetUserProducts, clientUpdateProduct} from "../../api/products";
import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";

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

export const listProduct = createAsyncThunk(
    'products/listProduct',
    async(newProduct, thunkAPI) => {
        try {
            console.log(newProduct);

            const response = await clientCreateProduct(newProduct);
            if(response){
                toast.success('New product successfully listed');
                return response
            }
          
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.message)
        }
    }

)


export const fetchUserProducts = createAsyncThunk(
    'products/fetchUserProducts',
    async(userId, thunkAPI) => {
        try {
            const response = await clientGetUserProducts(userId);
            return response;
            
        }catch (error) {
            return thunkAPI.rejectWithValue(error?.message)
        }
    }
)


export const fetchRelatedProducts = createAsyncThunk(
    'products/fetchRelatedProducts',
    async(id, thunkAPI) => {
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

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async({userId, editedProduct}, thunkAPI) => {
        try {
           const response = await clientUpdateProduct(userId,editedProduct);

           return response;
        }catch(error){
            return thunkAPI.rejectWithValue(error?.message || 'Error updating product')
        }
    }
)
    