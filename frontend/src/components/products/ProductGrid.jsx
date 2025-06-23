import { useSelector } from 'react-redux';
import ProductCard from '../products/ProductCard';
import { selectProducts } from '../../features/products/productSlice';

const ProductGrid = () => {
  const products = useSelector(selectProducts);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.length === 0 && <p>No products found.</p>}

      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
