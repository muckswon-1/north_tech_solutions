import {useParams} from "react-router-dom"
import { mockProducts } from "../../data/products";
const ProductDetailsPage = () => {
    const {id} = useParams();

    const product = mockProducts.filter(mockProduct => mockProduct.id === parseInt(id))[0];

    console.log(product);
 
    
    if(!product) {
        return <div className="text-center mt-10 text-red-600">Product not found.</div>;
    }

  
    return (
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md mx-auto rounded-lg"
          />
          <p className="text-lg text-gray-700 mt-4">{product.description}</p>
          <p className="text-2xl text-blue-600 font-semibold mt-4">${product.price}</p>
        </div>
      );
    };
    
    export default ProductDetailsPage;
    