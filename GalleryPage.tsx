
import React, { useState, useMemo, useEffect } from 'react';
import type { GalleryProject } from '../types';
import ImageModal from '../components/ImageModal';
import { useTranslation } from '../i18n';
import { useContent } from '../components/ContentContext';

type FilterType = 'All' | 'Buildings' | 'Villas';

const GalleryPage: React.FC = () => {
  const { t } = useTranslation();
  const { content } = useContent();
  const { galleryProjects: projects } = content.global;

  const [filter, setFilter] = useState<FilterType>('All');
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);

  useEffect(() => {
    document.title = t('title_gallery');
  }, [t]);

  const filteredProjects = useMemo(() => {
    if (filter === 'All') {
      return projects;
    }
    return projects.filter(p => p.category === filter);
  }, [projects, filter]);

  const filters: FilterType[] = ['All', 'Buildings', 'Villas'];
  
  const categoryMap: { [key in FilterType]: string } = {
    'All': t('gallery_filter_all'),
    'Buildings': t('gallery_filter_buildings'),
    'Villas': t('gallery_filter_villas'),
  };

  const getTranslatedCategory = (category: 'Buildings' | 'Villas') => {
    const key = `gallery_filter_${category.toLowerCase()}` as keyof typeof categoryMap;
    return t(key) || category;
  };


  return (
    <div className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-primary dark:text-white">{t('gallery_page_title')}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            {t('gallery_page_subtitle')}
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${filter === f ? 'bg-primary text-white shadow-md' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            >
              {categoryMap[f]}
            </button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer break-inside-avoid animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedProject(project)}
            >
              <img src={project.coverImageUrl} alt={project.title} className="w-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-lg font-bold">{project.title}</h3>
                <p className="text-sm opacity-90">{getTranslatedCategory(project.category)}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-gray-500 dark:text-gray-400">{t('gallery_no_projects')}</p>
          </div>
        )}
      </div>

      {selectedProject && (
        <ImageModal 
          images={selectedProject.imageUrls}
          title={selectedProject.title}
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
};

export default GalleryPage;