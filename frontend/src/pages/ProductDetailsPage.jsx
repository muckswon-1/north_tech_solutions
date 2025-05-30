import {useParams} from "react-router-dom"
import Breadcrumbs from "../components/ProductDetailsPage/Breadcrumbs";
import ProductImageGallery from "../components/ProductDetailsPage/ProductImageGallery";
import ProductInfo from "../components/ProductDetailsPage/ProductInfo";
import AddToInquiry from "../components/ProductDetailsPage/AddToInquiry";
import ProductsSpecs from "../components/ProductDetailsPage/ProductsSpecs";
import RelatedProductsCarousel from "../components/ProductDetailsPage/RelatedProductsCarousel";
import { useProduct } from "../hooks/useProducts";
const ProductDetailsPage = () => {
    const {id} = useParams();

    const {product, loading, error} = useProduct(id);
   
 
    if(loading) {
        return <div>Loading...</div>;
    }
    
    if(!error && !product) {
      console.error("An error occurred while fetching the product.") //TODO - send error to server logs
        return <div className="text-center mt-10 text-red-600">We ran into an issue while fetching the product.</div>;
    }
  
    return (
        <div className="container mx-auto p-6">
          <Breadcrumbs />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProductImageGallery image={product.image} additionalImages={["https://cdn.pixabay.com/photo/2013/07/12/19/30/power-drill-154903_1280.png", "https://cdn.pixabay.com/photo/2022/08/21/19/22/electric-drill-7401885_1280.png" ]} />
            <div>
              <ProductInfo product={product} />
              <AddToInquiry product={product} />
            </div>
          </div>
          <ProductsSpecs specs={product.specs} />
          <RelatedProductsCarousel />
        </div>
      );
    };
    
    export default ProductDetailsPage;
    