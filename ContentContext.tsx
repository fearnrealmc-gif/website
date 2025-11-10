import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import type { SiteContent, GlobalContent } from '../types';
import { api } from '../api/wordpress';

interface ContentContextType {
  content: SiteContent;
  loading: boolean;
  error: Error | null;
  // FIX: Add setContent to the context type to allow updating content from AdminPage.
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// A placeholder for the initial state, so components don't crash on first render before data is fetched.
const initialEmptyContent: SiteContent = {
    global: {
        companyLogoUrl: '', companyProfilePdfUrl: '', mapCoordinates: { lat: 0, lng: 0 }, 
        socialMediaLinks: { whatsapp: '#', instagram: '#', facebook: '#' },
        galleryProjects: [], teamMembers: [], teamPhotos: [], services: [], coreValues: []
    },
    en: { general: {} as any, services: [], coreValues: [], teamMembers: [], workingHours: [] },
    ar: { general: {} as any, services: [], coreValues: [], teamMembers: [], workingHours: [] },
};

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(initialEmptyContent);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const [globalRes, enRes, arRes] = await Promise.all([
          api.getGlobalContent(),
          api.getLangSpecificContent('en'),
          api.getLangSpecificContent('ar')
        ]);
        
        const combinedContent: SiteContent = {
            global: globalRes as GlobalContent,
            en: enRes,
            ar: arRes,
        };

        setContent(combinedContent);
      } catch (err) {
        setError(err as Error);
        console.error("Failed to fetch site content from WordPress API", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []); // Fetch content once on initial load.

  const contextValue: ContentContextType = {
      content,
      loading,
      error,
      // FIX: Pass setContent through the context provider.
      setContent,
  };

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};