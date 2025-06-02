import axios from 'axios';

const inquiriesEndpoint = `${import.meta.env.VITE_BACKEND_URL}/sokoni-api/inquiry`;

// create inquiry
export const clientCreateInquiry = async (userInfo) => {
  try {
    const inquiryProducts = JSON.parse(localStorage.getItem('inquiryItems'));

    //get an array of product ids and quantity
    const productsInfo = inquiryProducts.map((product) => {
      return {
        productId: product.id,
        quantity: product.quantity,
      };
    });

    const inquiryData = {
      userInfo,
      productsInfo,
    };

    const response = await axios.post(inquiriesEndpoint, inquiryData);
    return response.data;
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return null;
  }
};
