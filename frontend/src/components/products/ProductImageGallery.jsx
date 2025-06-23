import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import logo from '../../assets/logo.png';
import { useEffect } from 'react';

const ProductImageGallery = ({ product }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const images = [product.image_url, ...(product.additional_images || [])];

  const [sliderRef] = useKeenSlider({
    mode: 'free',
    slides: {
      perView: 1,
      spacing: 10,
    },
  });

  const nextImage = () =>
    setSelectedIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const [isTouch, setIsTouch] = React.useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Main Image */}
      <img
        src={images[selectedIndex]}
        alt={`Product image ${selectedIndex + 1}`}
        className="rounded-lg w-full h-[400px] object-cover shadow-md"
      />

      {/* Navigation Buttons - shown only on desktop */}
      {!isTouch && images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black p-2 rounded-full shadow-md"
          >
            ◀
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black p-2 rounded-full shadow-md"
          >
            ▶
          </button>
        </>
      )}

      {/* Thumbnails (Optional) */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setSelectedIndex(index)}
            className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
              index === selectedIndex
                ? 'border-blue-500 ring-2 ring-blue-400'
                : 'border-transparent'
            } hover:border-blue-300 transition`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
