
import React, { useState, useEffect } from 'react';
import type { TeamPhoto } from '../types';
import ImageModal from '../components/ImageModal';
import { useTranslation } from '../i18n';
import { useContent } from '../components/ContentContext';

const TeamPage: React.FC = () => {
  const { t } = useTranslation();
  const { content } = useContent();
  const { teamPhotos } = content.global;

  const [selectedImage, setSelectedImage] = useState<{ images: string[]; title: string } | null>(null);

  useEffect(() => {
    document.title = t('title_team');
  }, [t]);

  const handleImageClick = (photo: TeamPhoto) => {
    setSelectedImage({
      images: [photo.imageUrl], // ImageModal expects an array
      title: photo.title
    });
  };

  return (
    <div className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-primary dark:text-white">{t('team_page_title')}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            {t('team_page_subtitle')}
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {teamPhotos.map((photo, index) => (
            <div 
              key={photo.id} 
              className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer break-inside-avoid animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => handleImageClick(photo)}
            >
              <img src={photo.imageUrl} alt={photo.title} className="w-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-lg font-bold">{photo.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {teamPhotos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-gray-500 dark:text-gray-400">{t('team_no_photos')}</p>
          </div>
        )}
      </div>

      {selectedImage && (
        <ImageModal 
          images={selectedImage.images}
          title={selectedImage.title}
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </div>
  );
};

export default TeamPage;