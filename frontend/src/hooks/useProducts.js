import React, { useEffect, useState } from 'react';
import { fetchProductById, fetchProducts } from '../api/products';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);
  return { products, loading };
};

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductById(id)
      .then((data) => {
        console.log(data);
        setProduct(data);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [id]);

  return { product, loading, error };
};
