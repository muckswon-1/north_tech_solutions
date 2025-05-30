import React from 'react';

const ProductInfo = ({product}) => {
    return (
        <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-lg text-gray-600">{product.description}</p>
        <p className="text-2xl font-semibold text-blue-600">${product.price}</p>
        {/* You can add SKU, brand, availability info here */}
        <p className="text-sm text-gray-500">SKU: {product.sku || 'N/A'}</p>
        <p className="text-sm text-green-600">In Stock</p>
      </div>
    );
}

export default ProductInfo;
