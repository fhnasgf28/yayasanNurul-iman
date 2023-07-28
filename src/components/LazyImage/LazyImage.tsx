import React, { useEffect, useRef, useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const image = entries[0];
      if (image.isIntersecting) {
        setIsLoaded(true);
        observer.unobserve(imgRef.current!);
      }
    });

    observer.observe(imgRef.current!);

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <img
      ref={imgRef}
      src={isLoaded ? src : ''}
      alt={alt}
      className={`${className} ${isLoaded ? '' : 'opacity-0'}`}
    />
  );
};

export default LazyImage;
