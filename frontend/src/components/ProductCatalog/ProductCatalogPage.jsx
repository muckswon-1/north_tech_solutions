import { mockProducts } from "../../data/products"
import ProductGrid from "./ProductGrid"


const ProductCatalogPage = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Product Catalog</h1>
            <ProductGrid products={mockProducts} />

        </div>
    )
}

export default ProductCatalogPage;