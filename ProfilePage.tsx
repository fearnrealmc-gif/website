
import React, { useEffect } from 'react';
import { useTranslation } from '../i18n';
import { useContent } from '../components/ContentContext';

const ProfilePage: React.FC = () => {
  const { t, language } = useTranslation();
  const { content } = useContent();
  const pageContent = content[language];
  const pdfUrl = content.global.companyProfilePdfUrl;

  useEffect(() => {
    document.title = t('title_profile');
  }, [t]);

  return (
    <div className="bg-neutral-light dark:bg-gray-900 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-primary dark:text-white">{pageContent.general.profilePageTitle}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            {pageContent.general.profilePageSubtitle}
          </p>
        </div>

        <div className="aspect-[8.5/11] max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              title={pageContent.general.profilePageTitle}
              className="w-full h-full border-0"
              allow="fullscreen"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg text-gray-600 dark:text-gray-400">{t('profile_pdf_not_found')}</p> 
            </div>
          )}
        </div>
        
        {pdfUrl && (
            <div className="text-center mt-8">
                <a 
                    href={pdfUrl} 
                    download 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 bg-secondary text-white font-bold rounded-md hover:bg-blue-500 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                    {t('profile_download_button')}
                </a>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
