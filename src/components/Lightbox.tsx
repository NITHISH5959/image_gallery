
import React, { useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Image {
  id: number;
  src: string;
  alt: string;
  category: string;
  title: string;
}

interface LightboxProps {
  image: Image;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  currentIndex: number;
  totalImages: number;
}

export const Lightbox: React.FC<LightboxProps> = ({
  image,
  onClose,
  onNavigate,
  currentIndex,
  totalImages
}) => {
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        onNavigate('prev');
        break;
      case 'ArrowRight':
        onNavigate('next');
        break;
    }
  }, [onClose, onNavigate]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyPress]);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {/* Navigation Buttons */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('prev');
          }}
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 z-10",
            "w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full",
            "flex items-center justify-center transition-all duration-200",
            "hover:scale-110 backdrop-blur-sm"
          )}
          disabled={totalImages <= 1}
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('next');
          }}
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 z-10",
            "w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full",
            "flex items-center justify-center transition-all duration-200",
            "hover:scale-110 backdrop-blur-sm"
          )}
          disabled={totalImages <= 1}
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Container */}
        <div 
          className="relative max-w-7xl max-h-full animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={image.src.replace('w=800&h=600', 'w=1200&h=900')}
            alt={image.alt}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
          
          {/* Image Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
            <h2 className="text-2xl font-bold text-white mb-2">{image.title}</h2>
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium text-white backdrop-blur-sm">
                {image.category}
              </span>
              <span className="text-white/80 text-sm">
                {currentIndex + 1} of {totalImages}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      {totalImages > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {Array.from({ length: totalImages }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex ? "bg-white" : "bg-white/40"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};
