import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../products/ProductCard';
import { selectProducts } from '../../features/products/productSlice';
import { useEffect } from 'react';
import { selectUserInquiryDrafts, setUserInquiryDrafts } from '../../features/userInquiryDrafts/userInquiryDraftSlice';
import { fetchUserInquiryDrafts } from '../../features/userInquiryDrafts/userInquiryDraftThunks';
import { selectUser } from '../../features/auth/authSlice';

const ProductGrid = () => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const authUser = useSelector(selectUser);
  const userInquiryDrafts = useSelector(selectUserInquiryDrafts);

  

  useEffect(() => {
   if(authUser) {
    dispatch(fetchUserInquiryDrafts(authUser?.id));
    dispatch(setUserInquiryDrafts(userInquiryDrafts));
   }

  },[authUser, dispatch])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products?.length === 0 && <p>No products found.</p>}

      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
