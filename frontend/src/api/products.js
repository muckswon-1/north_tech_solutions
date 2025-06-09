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

    return response.data[0];
  } catch (error) {
    throw error
    
  }
};

//fetch related products
export const clientGetRelatedProducts = async (id) => {
  try {
    const response = sokoniApi.get(`${productsBasePath}/${id}/related`);
    return response;
  } catch (error) {
    throw error
  }
}
