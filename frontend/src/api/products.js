import axios from 'axios';

const productsEndpoint = `${import.meta.env.VITE_BACKEND_URL}/sokoni-api/products`;

export const fetchProducts = async () => {
  try {
    const response = await axios.get(productsEndpoint);
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
    const response = await axios.get(`${productsEndpoint}/${id}`);

    return response.data[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};
