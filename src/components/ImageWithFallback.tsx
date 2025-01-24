import { ImageOff } from 'lucide-react';
import { useState } from 'react';
interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageWithFallback = ({ src, alt, className = '' }: ImageWithFallbackProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative">
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}
      {hasError ? (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <ImageOff className="w-8 h-8 text-gray-600" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={className}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}
    </div>
  );
};

export default ImageWithFallback;