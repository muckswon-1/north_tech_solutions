import React from 'react';

const RelatedProductsCarousel = () => {

    const relatedProducts = [
        {
            id: 7,
            name: "Heavy Duty Impact Drill",
            image: "https://cdn.pixabay.com/photo/2016/03/31/20/59/drill-1296016_1280.png",
            price: 189.99
        },
        {
            id: 8,
            name: "Cordless Hammer Drill",
            image: "https://cdn.pixabay.com/photo/2013/07/12/19/30/power-drill-154903_1280.png",
            price: 149.50
        },
        {
            id: 9,
            name: "Rotary Hammer Drill",
            image: "https://cdn.pixabay.com/photo/2022/08/21/19/22/electric-drill-7401885_1280.png",
            price: 245.00
        },
        {
            id: 10,
            name: "Magnetic Drill Press",
            image: "https://cdn.pixabay.com/photo/2017/07/05/14/03/drill-2474327_1280.jpg",
            price: 599.00
        }
    ]
    return (
        <div className="mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Products</h2>
      <div className="flex space-x-4 overflow-x-auto">
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="flex-none w-48 bg-white border border-gray-300 rounded p-2"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover rounded"
            />
            <h3 className="text-sm font-medium mt-2">{product.name}</h3>
            <p className="text-blue-600 font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
    );
}

export default RelatedProductsCarousel;
