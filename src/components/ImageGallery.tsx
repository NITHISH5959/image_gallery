
import React from 'react';
import { cn } from '@/lib/utils';

interface Image {
  id: number;
  src: string;
  alt: string;
  category: string;
  title: string;
}

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
      {images.map((image, index) => (
        <div
          key={image.id}
          className={cn(
            "group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl",
            "transform transition-all duration-300 hover:scale-105 cursor-pointer",
            "animate-fade-in"
          )}
          style={{ animationDelay: `${index * 0.1}s` }}
          onClick={() => onImageClick(image)}
        >
          <div className="aspect-square overflow-hidden">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
              <span className="inline-block px-2 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
                {image.category}
              </span>
            </div>
          </div>

          {/* Click indicator */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};
