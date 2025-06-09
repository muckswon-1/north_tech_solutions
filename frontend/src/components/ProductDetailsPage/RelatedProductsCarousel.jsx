import React, { useEffect } from 'react';
import ProductCard from '../ProductCatalog/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRelatedProducts, selectRelatedProducts } from '../../features/products/productSlice';
import { useParams } from 'react-router-dom';

const RelatedProductsCarousel = () => {

  const dispatch = useDispatch();
  const {id} = useParams();
  const relatedProducts = useSelector(selectRelatedProducts);

  console.log(id)

  useEffect(() => {
    dispatch(fetchRelatedProducts(id));
  }, [id]);


  

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Related Products
      </h2>
      <div className="flex space-x-4 overflow-x-auto">
        {relatedProducts.length > 0 &&
          relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProductsCarousel;
