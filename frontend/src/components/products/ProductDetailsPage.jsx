import { useParams } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';
import AddToInquiry from './AddToInquiry';
import ProductsSpecs from './ProductsSpecs';
import RelatedProductsCarousel from './RelatedProductsCarousel';

import { useDispatch, useSelector } from 'react-redux';
import {   selectProductsError, selectProductsIsLoading } from '../../features/products/productSlice';
import { useEffect } from 'react';
import { fetchProductById } from '../../features/products/productThunks';
const ProductDetailsPage = () => {
  const { id } = useParams();

  const loading = useSelector(selectProductsIsLoading);
  const error = useSelector(selectProductsError);
  const product = {}
  const dispatch = useDispatch();


//croll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);


  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  if (loading && !product && !error)  {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('An error occurred while fetching the product.'); //TODO - send error to server logs
    return (
      <div className="text-center mt-10 text-red-600">
        We ran into an issue while fetching the product.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Breadcrumbs />
      {product &&(
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductImageGallery product={product} />
        <div>
          <ProductInfo product={product} />
          <AddToInquiry product={product} />
        </div>
      </div>
       <ProductsSpecs specs={product.specs} />
        </>
      )} 
      <RelatedProductsCarousel />
    </div>
  );
};

export default ProductDetailsPage;
