import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { clientCreateInquiry } from '../api/inquiry';

// create context
export const InquiryContext = createContext();

// provider component
export const InquiryProvider = ({ children }) => {
  const [inquiryItems, setInquiryItems] = useState(() => {
    // load from local storage if available
    const storedItems = localStorage.getItem('inquiryItems');
    return storedItems ? JSON.parse(storedItems) : [];
  });

  const addToInquiry = (product) => {
    const productExists = inquiryItems.filter(
      (item) => item.id === product.id,
    )[0];

    if (productExists) {
      const newInquiryItems = inquiryItems.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + product.quantity };
        }
        return item;
      });
      setInquiryItems(newInquiryItems);
    } else {
      setInquiryItems((prev) => [...prev, product]);
    }
  };

  // remove from inquiry
  const removeFromInquiry = (productId) => {
    setInquiryItems((prev) => prev.filter((item) => item.id !== productId));
  };

  //clear inquiry
  const clearInquiry = () => {
    setInquiryItems([]);
    localStorage.removeItem('inquiryItems');
  };

  const isInInquiry = (productId) => {
    return inquiryItems.some((item) => item.id === productId);
  };

  //submit inquiry
  const submitInquiry = async (userInfo) => {
    try {
      const response = await clientCreateInquiry(userInfo);

      if (!response.inquiryId) {
        throw new Error('Inquiry submission failed');
      }

      clearInquiry();
      toast.success('Inquiry submitted successfully');
      return true;
    } catch (error) {
      console.log(error);
      toast.error('Inquiry submission failed');
      return false;
    }
  };

  //persist to localstorage
  useEffect(() => {
    localStorage.setItem('inquiryItems', JSON.stringify(inquiryItems));
  }, [inquiryItems]);

  return (
    <InquiryContext.Provider
      value={{
        inquiryItems,
        addToInquiry,
        isInInquiry,
        removeFromInquiry,
        clearInquiry,
        submitInquiry,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
};

// export context
export const useInquiry = () => useContext(InquiryContext);
