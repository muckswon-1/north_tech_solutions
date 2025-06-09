import { useEffect, useState } from 'react';
import ProductGrid from '../components/ProductCatalog/ProductGrid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectProducts, selectProductsIsLoading } from '../features/products/productSlice';

const ProductCatalogPage = () => {
  const products = useSelector(selectProducts)
  const  loading  = useSelector(selectProductsIsLoading);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchProducts());
  },[dispatch])

  if (loading) return <p>Loading...</p>;
  if (!products) return <p>No products found </p>;

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
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <ProductGrid products={productsToDisplay} />
    </div>
  );
};

export default ProductCatalogPage;
