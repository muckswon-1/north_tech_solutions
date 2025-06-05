import sokoniApi from './axiosInstance'; // Import the configured Axios instance

// Define path relative to sokoniApi's baseURL
const productsBasePath = '/products';

export const fetchProducts = async () => {
  try {
    const response = await sokoniApi.get(productsBasePath);
    return response.data;
  } catch (error) {
    //TODO - send front end errors to the server and handle errors
    console.log(error);
    return [];
  }
};

//fetch by id
export const fetchProductById = async (id) => {
  try {
    const response = await sokoniApi.get(`${productsBasePath}/${id}`);

    return response.data[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};
