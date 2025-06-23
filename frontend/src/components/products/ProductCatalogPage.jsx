import { useEffect, useState } from 'react';
import ProductGrid from './ProductGrid';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, selectProductsIsLoading } from '../../features/products/productSlice';
import { fetchProducts, fetchUserProducts } from '../../features/products/productThunks';
import { selectUser } from '../../features/auth/authSlice';

const ProductCatalogPage = () => {
  const products = useSelector(selectProducts)
  const  loading  = useSelector(selectProductsIsLoading);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();





  useEffect(() => {
    dispatch(fetchProducts());
  },[dispatch])

  let productsToDisplay = [...products];

  let filteredProducts = [];

  if (searchQuery !== '') {
    filteredProducts = products.filter((product) => {
      const titleMatch = (product.name || '')
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const descriptionMatch = (product.description || '')
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return titleMatch || descriptionMatch;
    });

    productsToDisplay = filteredProducts;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Product Catalog</h1>
      {loading  && (<p>Loading...</p>)}
     
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <ProductGrid />
    </div>
  );
};

export default ProductCatalogPage;
