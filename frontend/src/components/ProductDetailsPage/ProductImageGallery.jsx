import React from 'react';

const ProductImageGallery = ({image, additionalImages=[]}) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    
    return (
        <div className="w-full">
      {/* Main product image */}
      <img
        src={image}
        alt={`Product image ${selectedIndex + 1}`}
        className="w-full max-w-md rounded-lg shadow-md object-cover mx-auto transition-transform duration-300"
        onError={(e) => (e.target.src = '/fallback.jpg')} // Fallback
      />

      {/* Thumbnails */}
      <div className="flex gap-2 mt-4 justify-center flex-wrap">
        {additionalImages.map((thumb, index) => (
          <img
            key={index}
            src={thumb}
            alt={`Thumbnail ${index + 1}`}
            className={`w-16 h-16 rounded-md cursor-pointer border-2 ${
              index === selectedIndex ? 'border-blue-500 ring-2 ring-blue-400' : 'border-transparent'
            } hover:border-blue-300 transition-all`}
            onClick={() => setSelectedIndex(index)}
            onError={(e) => (e.target.src = '/fallback-thumb.jpg')} // Fallback
          />
        ))}
</div>

        </div>
    );
}

export default ProductImageGallery;
