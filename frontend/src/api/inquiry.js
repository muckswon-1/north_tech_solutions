import axios from 'axios';
import sokoniApi from './axiosInstance';

const inquiriesEndpoint = `/inquiry`;

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
    //TODO : check here when you come back
    const response = await sokoniApi.post(inquiriesEndpoint, inquiryData);
    return  response;
  } catch (error) {
    console.error('Error creating inquiry:', error);
    throw error;
  }
};
