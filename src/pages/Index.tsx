
import React, { useState, useCallback } from 'react';
import { ImageGallery } from '../components/ImageGallery';
import { FilterTabs } from '../components/FilterTabs';
import { Lightbox } from '../components/Lightbox';

// Sample images with categories
const images = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop',
    alt: 'Woman using laptop',
    category: 'technology',
    title: 'Remote Work'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
    alt: 'Gray laptop computer',
    category: 'technology',
    title: 'Modern Computing'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
    alt: 'Circuit board macro',
    category: 'technology',
    title: 'Circuit Board'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
    alt: 'Foggy mountain summit',
    category: 'nature',
    title: 'Mountain Peak'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=600&fit=crop',
    alt: 'Ocean wave at beach',
    category: 'nature',
    title: 'Ocean Waves'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=600&fit=crop',
    alt: 'Rocky mountain landscape',
    category: 'nature',
    title: 'Mountain Landscape'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop',
    alt: 'White concrete building',
    category: 'architecture',
    title: 'Modern Architecture'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1551038247-3d9af20df552?w=800&h=600&fit=crop',
    alt: 'Blue and white building',
    category: 'architecture',
    title: 'Urban Design'
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&h=600&fit=crop',
    alt: 'Orange tabby cat',
    category: 'animals',
    title: 'Tabby Cat'
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800&h=600&fit=crop',
    alt: 'Grey tabby kitten',
    category: 'animals',
    title: 'Kitten'
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&h=600&fit=crop',
    alt: 'Humpback whale jumping',
    category: 'animals',
    title: 'Whale Jump'
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=800&h=600&fit=crop',
    alt: 'Two penguins on rock',
    category: 'animals',
    title: 'Penguin Pair'
  }
];

const categories = ['all', 'technology', 'nature', 'architecture', 'animals'];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<typeof images[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const openLightbox = useCallback((image: typeof images[0]) => {
    const index = filteredImages.findIndex(img => img.id === image.id);
    setCurrentImageIndex(index);
    setLightboxImage(image);
  }, [filteredImages]);

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
  }, []);

  const navigateLightbox = useCallback((direction: 'prev' | 'next') => {
    if (!lightboxImage) return;
    
    let newIndex = currentImageIndex;
    if (direction === 'next') {
      newIndex = (currentImageIndex + 1) % filteredImages.length;
    } else {
      newIndex = currentImageIndex === 0 ? filteredImages.length - 1 : currentImageIndex - 1;
    }
    
    setCurrentImageIndex(newIndex);
    setLightboxImage(filteredImages[newIndex]);
  }, [currentImageIndex, filteredImages, lightboxImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Image Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of beautiful images across different categories
          </p>
        </header>

        <FilterTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <ImageGallery
          images={filteredImages}
          onImageClick={openLightbox}
        />

        {lightboxImage && (
          <Lightbox
            image={lightboxImage}
            onClose={closeLightbox}
            onNavigate={navigateLightbox}
            currentIndex={currentImageIndex}
            totalImages={filteredImages.length}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
