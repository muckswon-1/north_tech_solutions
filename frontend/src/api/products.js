import sokoniApi from './axiosInstance'; // Import the configured Axios instance

// Define path relative to sokoniApi's baseURL
const productsBasePath = '/products';

export const clientGetAllProducts = async () => {
  try {
    const response = await sokoniApi.get(productsBasePath);
    return response.data;
  } catch (error) {
    //TODO - send front end errors to the server and handle errors
  
     throw error
  }
};

//fetch by id
export const clientGetProductsById = async (id) => {
  try {
    const response = await sokoniApi.get(`${productsBasePath}/${id}`);
    return response.data;
  } catch (error) {
    throw error
    
  }
};

export const clientCreateProduct = async (product) => {
  try {
    const response = await sokoniApi.post(productsBasePath,product);
    if(response.status === 201){
      return response.data
    }
  } catch (error) {
    throw error;
  }
}


export const clientGetUserProducts = async (userId) => {
  try {
    const response = await sokoniApi.get(`${productsBasePath}/user/${userId}`);
    if(response.status === 200){
      return response.data
    }

  } catch (error) {
    throw error;
  }
}

export const clientUpdateProduct = async (userId, editedProduct) => {
  try {
   
    const response = await sokoniApi.patch(`${productsBasePath}/user/${userId}`,editedProduct);
    if(response.status === 200){
      return response.data
   }
  } catch (error) {
    throw error
  }
}


export const clientDeleteProduct = async (id) => {
  try {} catch (error) {}
}

//fetch related products
export const clientGetRelatedProducts = async (id) => {

  
  return []
    
  
}
