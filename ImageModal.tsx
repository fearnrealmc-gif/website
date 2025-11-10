
import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n';

interface ImageModalProps {
  images: string[];
  title: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ images, title, onClose }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex]); // Re-add listener if currentIndex changes to get latest function in closure


  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative p-2 bg-white rounded-lg max-w-5xl w-[95%] max-h-[90vh] transition-transform duration-300 transform scale-95 animate-fade-in-up flex flex-col" 
        onClick={e => e.stopPropagation()}
        style={{ animation: 'scaleUp 0.3s ease-out forwards' }}
      >
        <div className="flex-grow relative flex justify-center items-center overflow-hidden">
          <img src={images[currentIndex]} alt={`${title} - ${currentIndex + 1}`} className="max-w-full max-h-[75vh] object-contain rounded" />
        </div>
        <div className="flex-shrink-0 pt-2 flex justify-between items-center text-black px-2">
           <p className="text-sm font-semibold">{title}</p>
           <p className="text-sm">{currentIndex + 1} / {images.length}</p>
        </div>

        <button 
          onClick={onClose}
          className="absolute -top-3 -right-3 rtl:-right-auto rtl:-left-3 text-white bg-primary rounded-full p-2 hover:bg-opacity-80 transition-colors z-20"
          aria-label={t('close_image_viewer')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {images.length > 1 && (
         <>
            <button 
                onClick={goToPrevious}
                className="absolute top-1/2 left-2 md:-left-5 transform -translate-y-1/2 text-white bg-primary bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition-colors z-10"
                aria-label="Previous image"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
                onClick={goToNext}
                className="absolute top-1/2 right-2 md:-right-5 transform -translate-y-1/2 text-white bg-primary bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition-colors z-10"
                aria-label="Next image"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
         </>
       )}

      </div>
      <style>{`
        @keyframes scaleUp {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ImageModal;