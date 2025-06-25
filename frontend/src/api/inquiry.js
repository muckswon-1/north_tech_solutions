import axios from 'axios';
import sokoniApi from './axiosInstance';

const inquiriesEndpoint = `/inquiry`;

// create inquiry
export const clientCreateInquiry = async (payload) => {
  try {
    console.log(payload);
    //get an array of product ids and quantity
    // const productsInfo = inquiryProducts.map((product) => {
    //   return {
    //     productId: product.id,
    //     quantity: product.quantity,
    //   };
    // });



    // const inquiryData = {
    //   userInfo,
    //   productsInfo,
    // };
    //TODO : check here when you come back
    const response = await sokoniApi.post(`${inquiriesEndpoint}/${payload.userId}`, payload);
     return  response;
  } catch (error) {
    console.error('Error creating inquiry:', error);
    throw error;
  }
};
