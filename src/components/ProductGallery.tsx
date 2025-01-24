import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ProductGalleryProps {
  productId: number;
  mainImage: string;
  productName: string;
  additionalImages?: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
  productId,
  mainImage,
  productName,
  additionalImages = []
}) => {
  const [allImages, setAllImages] = useState<string[]>([mainImage, ...additionalImages]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        const response = await fetch(`/api/products/${productId}/images`);
        if (!response.ok) throw new Error('Failed to fetch product images');
        const data = await response.json();
        setAllImages([mainImage, ...data]);
      } catch (error) {
        console.error('Error loading product images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductImages();
  }, [productId, mainImage]);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % allImages.length);
  };

  const previousImage = () => {
    setSelectedImage((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
        <img
          src={allImages[selectedImage]}
          alt={`${productName} - View ${selectedImage + 1}`}
          className="w-full h-full object-cover"
        />
        
        {allImages.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square rounded-lg overflow-hidden ${
                selectedImage === index
                  ? 'ring-2 ring-[#FFD513]'
                  : 'opacity-50 hover:opacity-100'
              } transition-all`}
            >
              <img
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;