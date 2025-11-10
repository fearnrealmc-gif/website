
import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n';
import { useContent } from '../components/ContentContext';
import type { SiteContent, LangSpecificContent, GalleryProject, TeamMember, WorkingHour, TeamPhoto } from '../types';

const AdminPage: React.FC = () => {
  const { t } = useTranslation();
  const { content, setContent } = useContent();
  const [localContent, setLocalContent] = useState<SiteContent>(JSON.parse(JSON.stringify(content)));
  const [feedback, setFeedback] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [activeTab, setActiveTab] = useState('general');
  
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [tempProjectData, setTempProjectData] = useState<GalleryProject | null>(null);
  const [editingImageUrls, setEditingImageUrls] = useState('');

  const [editingPhotoId, setEditingPhotoId] = useState<number | null>(null);
  const [tempPhotoData, setTempPhotoData] = useState<TeamPhoto | null>(null);

  useEffect(() => {
    document.title = t('title_admin');
  }, [t]);

  const handleSave = () => {
    setContent(localContent);
    setFeedback({ type: 'success', message: t('admin_feedback_success_save') });
    window.scrollTo(0, 0);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleGlobalChange = (field: 'companyLogoUrl' | 'companyProfilePdfUrl', value: string) => {
    setLocalContent(prev => ({
      ...prev,
      global: { ...prev.global, [field]: value }
    }));
  };
  
  const handleCoordinatesChange = (coord: 'lat' | 'lng', value: string) => {
    const numValue = parseFloat(value) || 0;
    setLocalContent(prev => ({
        ...prev,
        global: {
            ...prev.global,
            mapCoordinates: {
                ...prev.global.mapCoordinates,
                [coord]: numValue
            }
        }
    }));
  };

  const handleSocialMediaChange = (platform: 'whatsapp' | 'instagram' | 'facebook', value: string) => {
    setLocalContent(prev => ({
      ...prev,
      global: {
          ...prev.global,
          socialMediaLinks: {
              ...prev.global.socialMediaLinks,
              [platform]: value
          }
      }
    }));
  };


  const handleGeneralChange = (lang: 'en' | 'ar', field: keyof LangSpecificContent['general'], value: string) => {
    setLocalContent(prev => ({
      ...prev,
      [lang]: { ...prev[lang], general: { ...prev[lang].general, [field]: value } }
    }));
  };

  const handleServiceChange = (lang: 'en' | 'ar', index: number, field: 'title' | 'description', value: string) => {
      setLocalContent(prev => {
          const newLangContent = { ...prev[lang] };
          newLangContent.services[index] = { ...newLangContent.services[index], [field]: value };
          return { ...prev, [lang]: newLangContent };
      });
  };
  
  const handleWorkingHoursChange = (lang: 'en' | 'ar', index: number, field: 'day' | 'time', value: string) => {
    setLocalContent(prev => {
        const newLangContent = { ...prev[lang] };
        newLangContent.workingHours[index] = { ...newLangContent.workingHours[index], [field]: value };
        return { ...prev, [lang]: newLangContent };
    });
  };

  const handleTeamChange = (lang: 'en' | 'ar', index: number, field: 'name' | 'title' | 'bio', value: string) => {
      setLocalContent(prev => {
          const newLangContent = { ...prev[lang] };
          newLangContent.teamMembers[index] = { ...newLangContent.teamMembers[index], [field]: value };
          return { ...prev, [lang]: newLangContent };
      });
  };
  
  const handleGlobalTeamChange = (index: number, field: 'imageUrl', value: string) => {
      setLocalContent(prev => {
          const newGlobalContent = { ...prev.global };
          newGlobalContent.teamMembers[index] = { ...newGlobalContent.teamMembers[index], [field]: value };
          return { ...prev, global: newGlobalContent };
      });
  };

  const addTeamMember = () => {
    const newId = Date.now();
    setLocalContent(prev => ({
        ...prev,
        global: {
            ...prev.global,
            teamMembers: [...prev.global.teamMembers, { id: newId, imageUrl: 'https://picsum.photos/400/400?random=' + newId }]
        },
        en: {
            ...prev.en,
            teamMembers: [...prev.en.teamMembers, { id: newId, name: 'New Member', title: 'Title', bio: 'Bio' }]
        },
        ar: {
            ...prev.ar,
            teamMembers: [...prev.ar.teamMembers, { id: newId, name: 'عضو جديد', title: 'المنصب', bio: 'السيرة الذاتية' }]
        }
    }));
  };

  const deleteTeamMember = (id: number) => {
    if(window.confirm(t('admin_confirm_delete'))) {
        setLocalContent(prev => ({
            ...prev,
            global: {
                ...prev.global,
                teamMembers: prev.global.teamMembers.filter(m => m.id !== id)
            },
            en: {
                ...prev.en,
                teamMembers: prev.en.teamMembers.filter(m => m.id !== id)
            },
            ar: {
                ...prev.ar,
                teamMembers: prev.ar.teamMembers.filter(m => m.id !== id)
            }
        }));
    }
  };


  const [newProject, setNewProject] = useState({
    title: '', category: 'Buildings' as 'Buildings' | 'Villas', location: '', coverImageUrl: ''
  });
  const [newProjectImageUrls, setNewProjectImageUrls] = useState('');

  const addProject = () => {
     const imageUrls = newProjectImageUrls.split(',').map(url => url.trim()).filter(Boolean);
     if (newProject.title && newProject.location && newProject.coverImageUrl && imageUrls.length > 0) {
        setLocalContent(prev => ({
            ...prev,
            global: {
                ...prev.global,
                galleryProjects: [...prev.global.galleryProjects, { ...newProject, imageUrls, id: Date.now() }]
            }
        }));
        setNewProject({ title: '', category: 'Buildings', location: '', coverImageUrl: '' });
        setNewProjectImageUrls('');
     } else {
        setFeedback({ type: 'error', message: t('admin_feedback_error') });
        setTimeout(() => setFeedback(null), 3000);
     }
  };

  const deleteProject = (id: number) => {
    if(window.confirm(t('admin_confirm_delete'))) {
        setLocalContent(prev => ({
            ...prev,
            global: {
                ...prev.global,
                galleryProjects: prev.global.galleryProjects.filter(p => p.id !== id)
            }
        }));
    }
  };

  const handleEditProject = (project: GalleryProject) => {
      setEditingProjectId(project.id);
      setTempProjectData(project);
      setEditingImageUrls(project.imageUrls.join(', '));
  };

  const handleCancelEdit = () => {
      setEditingProjectId(null);
      setTempProjectData(null);
      setEditingImageUrls('');
  };

  const handleUpdateProject = () => {
      if (!tempProjectData) return;
      const imageUrls = editingImageUrls.split(',').map(url => url.trim()).filter(Boolean);
      if (imageUrls.length === 0) {
        setFeedback({ type: 'error', message: t('admin_feedback_error') });
        setTimeout(() => setFeedback(null), 3000);
        return;
      }
      setLocalContent(prev => ({
          ...prev,
          global: {
              ...prev.global,
              galleryProjects: prev.global.galleryProjects.map(p =>
                  p.id === tempProjectData.id ? { ...tempProjectData, imageUrls } : p
              )
          }
      }));
      handleCancelEdit();
  };
  
  const handleTempProjectChange = (field: keyof Omit<GalleryProject, 'id' | 'imageUrls'>, value: string) => {
    if (tempProjectData) {
        setTempProjectData({ ...tempProjectData, [field]: value as 'Buildings' | 'Villas' });
    }
  };

  // Team Photos Management
  const [newTeamPhoto, setNewTeamPhoto] = useState({ title: '', imageUrl: '' });

  const addTeamPhoto = () => {
    if (newTeamPhoto.title && newTeamPhoto.imageUrl) {
        setLocalContent(prev => ({
            ...prev,
            global: {
                ...prev.global,
                teamPhotos: [...prev.global.teamPhotos, { ...newTeamPhoto, id: Date.now() }]
            }
        }));
        setNewTeamPhoto({ title: '', imageUrl: '' });
    } else {
        setFeedback({ type: 'error', message: t('admin_feedback_error') });
        setTimeout(() => setFeedback(null), 3000);
    }
  };

  const deleteTeamPhoto = (id: number) => {
    if (window.confirm(t('admin_confirm_delete'))) {
        setLocalContent(prev => ({
            ...prev,
            global: {
                ...prev.global,
                teamPhotos: prev.global.teamPhotos.filter(p => p.id !== id)
            }
        }));
    }
  };
  
  const handleEditTeamPhoto = (photo: TeamPhoto) => {
    setEditingPhotoId(photo.id);
    setTempPhotoData(photo);
  };
  
  const handleCancelEditTeamPhoto = () => {
    setEditingPhotoId(null);
    setTempPhotoData(null);
  };
  
  const handleUpdateTeamPhoto = () => {
    if (!tempPhotoData) return;
    setLocalContent(prev => ({
        ...prev,
        global: {
            ...prev.global,
            teamPhotos: prev.global.teamPhotos.map(p =>
                p.id === tempPhotoData.id ? tempPhotoData : p
            )
        }
    }));
    handleCancelEditTeamPhoto();
  };

  const handleTempPhotoChange = (field: keyof Omit<TeamPhoto, 'id'>, value: string) => {
    if (tempPhotoData) {
        setTempPhotoData({ ...tempPhotoData, [field]: value });
    }
  };


  const tabs = [
    { key: 'general', label: t('admin_tab_general') },
    { key: 'services', label: t('admin_tab_services') },
    { key: 'working_hours', label: t('admin_tab_working_hours') },
    { key: 'team', label: t('admin_tab_team') },
    { key: 'our_team', label: t('admin_tab_our_team') },
    { key: 'gallery', label: t('admin_tab_gallery') },
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-primary dark:text-white">{t('admin_page_title')}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            {t('admin_page_subtitle')}
          </p>
        </div>

        {feedback && (
          <div className={`mb-6 p-4 rounded-md text-center font-semibold ${feedback.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
            {feedback.message}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 p-2 sm:p-4 rounded-lg shadow-lg">
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex flex-wrap gap-2 sm:gap-4" aria-label="Tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`${
                            activeTab === tab.key
                            ? 'border-secondary text-primary dark:text-secondary'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm sm:text-base flex-grow sm:flex-grow-0`}
                    >
                        {tab.label}
                    </button>
                ))}
                </nav>
            </div>
            <div className="py-8">
            {/* General Settings */}
            {activeTab === 'general' && (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border-b pb-8 dark:border-gray-700">
                        <label className="md:col-span-2 text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">{t('admin_logo_url')}</label>
                        <div className="md:col-span-10">
                            <input 
                                type="text" 
                                value={localContent.global.companyLogoUrl} 
                                onChange={e => handleGlobalChange('companyLogoUrl', e.target.value)} 
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm" 
                            />
                            <small className="text-gray-400">{t('admin_logo_url_helper')}</small>
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border-b pb-8 dark:border-gray-700">
                        <label className="md:col-span-2 text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">{t('admin_profile_pdf_url')}</label>
                        <div className="md:col-span-10">
                            <input 
                                type="text" 
                                value={localContent.global.companyProfilePdfUrl} 
                                onChange={e => handleGlobalChange('companyProfilePdfUrl', e.target.value)} 
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm" 
                            />
                            <small className="text-gray-400">{t('admin_profile_pdf_url_helper')}</small>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border-b pb-8 dark:border-gray-700">
                        <label className="md:col-span-2 text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">{t('admin_map_coordinates')}</label>
                        <div className="md:col-span-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="map-lat" className="text-xs text-gray-500">{t('admin_map_lat')}</label>
                                <input 
                                    id="map-lat"
                                    type="number"
                                    step="any"
                                    value={localContent.global.mapCoordinates.lat} 
                                    onChange={e => handleCoordinatesChange('lat', e.target.value)} 
                                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm" 
                                />
                            </div>
                            <div>
                                <label htmlFor="map-lng" className="text-xs text-gray-500">{t('admin_map_lng')}</label>
                                <input 
                                    id="map-lng"
                                    type="number"
                                    step="any"
                                    value={localContent.global.mapCoordinates.lng} 
                                    onChange={e => handleCoordinatesChange('lng', e.target.value)} 
                                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm" 
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <small className="text-gray-400">{t('admin_map_helper')}</small>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border-b pb-8 dark:border-gray-700">
                        <label className="md:col-span-2 text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">{t('admin_social_media_title')}</label>
                        <div className="md:col-span-10 space-y-4">
                            <div>
                                <label htmlFor="social-whatsapp" className="text-xs text-gray-500">{t('admin_social_whatsapp')}</label>
                                <input 
                                    id="social-whatsapp"
                                    type="text"
                                    value={localContent.global.socialMediaLinks.whatsapp} 
                                    onChange={e => handleSocialMediaChange('whatsapp', e.target.value)} 
                                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm" 
                                />
                            </div>
                            <div>
                                <label htmlFor="social-instagram" className="text-xs text-gray-500">{t('admin_social_instagram')}</label>
                                <input 
                                    id="social-instagram"
                                    type="text"
                                    value={localContent.global.socialMediaLinks.instagram} 
                                    onChange={e => handleSocialMediaChange('instagram', e.target.value)} 
                                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm" 
                                />
                            </div>
                            <div>
                                <label htmlFor="social-facebook" className="text-xs text-gray-500">{t('admin_social_facebook')}</label>
                                <input 
                                    id="social-facebook"
                                    type="text"
                                    value={localContent.global.socialMediaLinks.facebook} 
                                    onChange={e => handleSocialMediaChange('facebook', e.target.value)} 
                                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm" 
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <small className="text-gray-400">{t('admin_social_helper')}</small>
                            </div>
                        </div>
                    </div>
                    {Object.keys(localContent.en.general).map(key => {
                        const fieldKey = key as keyof LangSpecificContent['general'];
                        const isTextArea = fieldKey.toLowerCase().includes('desc') || fieldKey.toLowerCase().includes('message') || fieldKey.toLowerCase().includes('tagline');
                        return (
                        <div key={key} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                            <label className="md:col-span-2 text-sm font-medium text-gray-700 dark:text-gray-300 capitalize pt-2">{key.replace(/([A-Z])/g, ' $1')}</label>
                            <div className="md:col-span-5">
                                {isTextArea ? 
                                <textarea value={localContent.en.general[fieldKey]} onChange={e => handleGeneralChange('en', fieldKey, e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm" />
                                : <input type="text" value={localContent.en.general[fieldKey]} onChange={e => handleGeneralChange('en', fieldKey, e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm" />
                                }
                                <small className="text-gray-400">English</small>
                            </div>
                            <div className="md:col-span-5">
                                {isTextArea ?
                                <textarea value={localContent.ar.general[fieldKey]} onChange={e => handleGeneralChange('ar', fieldKey, e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm rtl" />
                                : <input type="text" value={localContent.ar.general[fieldKey]} onChange={e => handleGeneralChange('ar', fieldKey, e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm rtl" />
                                }
                                <small className="text-gray-400">العربية</small>
                            </div>
                        </div>
                    )})}
                </div>
            )}
            {/* Services */}
            {activeTab === 'services' && (
                <div className="space-y-6">
                    {localContent.en.services.map((service, index) => (
                        <div key={service.key} className="p-4 border rounded-md dark:border-gray-700">
                             <h4 className="font-bold text-lg mb-4 text-primary dark:text-white">{service.title} / {localContent.ar.services[index].title}</h4>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title (EN)</label>
                                    <input type="text" value={service.title} onChange={e => handleServiceChange('en', index, 'title', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Description (EN)</label>
                                    <textarea value={service.description} onChange={e => handleServiceChange('en', index, 'description', e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title (AR)</label>
                                    <input type="text" value={localContent.ar.services[index].title} onChange={e => handleServiceChange('ar', index, 'title', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm rtl" />
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Description (AR)</label>
                                    <textarea value={localContent.ar.services[index].description} onChange={e => handleServiceChange('ar', index, 'description', e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm rtl" />
                                </div>
                             </div>
                        </div>
                    ))}
                </div>
            )}
            {/* Working Hours */}
            {activeTab === 'working_hours' && (
                <div className="space-y-6">
                    {localContent.en.workingHours.map((item, index) => (
                        <div key={item.id} className="p-4 border rounded-md dark:border-gray-700">
                            <h4 className="font-bold text-lg mb-4 text-primary dark:text-white">{item.day} / {localContent.ar.workingHours[index].day}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Day (EN)</label>
                                    <input type="text" value={item.day} onChange={e => handleWorkingHoursChange('en', index, 'day', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Time (EN)</label>
                                    <input type="text" value={item.time} onChange={e => handleWorkingHoursChange('en', index, 'time', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">اليوم (AR)</label>
                                    <input type="text" value={localContent.ar.workingHours[index].day} onChange={e => handleWorkingHoursChange('ar', index, 'day', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm rtl" />
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">الوقت (AR)</label>
                                    <input type="text" value={localContent.ar.workingHours[index].time} onChange={e => handleWorkingHoursChange('ar', index, 'time', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm rtl" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* Team */}
            {activeTab === 'team' && (
                <div className="space-y-6">
                     {localContent.global.teamMembers.map((member, index) => (
                        <div key={member.id} className="p-4 border rounded-md dark:border-gray-700 relative">
                             <h4 className="font-bold text-lg mb-4 text-primary dark:text-white">{localContent.en.teamMembers[index].name} / {localContent.ar.teamMembers[index].name}</h4>
                              <button onClick={() => deleteTeamMember(member.id)} className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-red-500 hover:text-red-700 p-1 rounded-full text-2xl leading-none">&times;</button>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
                                    <input type="text" value={member.imageUrl} onChange={e => handleGlobalTeamChange(index, 'imageUrl', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                                </div>
                                <div/>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name (EN)</label>
                                    <input type="text" value={localContent.en.teamMembers[index].name} onChange={e => handleTeamChange('en', index, 'name', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Title (EN)</label>
                                    <input type="text" value={localContent.en.teamMembers[index].title} onChange={e => handleTeamChange('en', index, 'title', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Bio (EN)</label>
                                    <textarea value={localContent.en.teamMembers[index].bio} onChange={e => handleTeamChange('en', index, 'bio', e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name (AR)</label>
                                    <input type="text" value={localContent.ar.teamMembers[index].name} onChange={e => handleTeamChange('ar', index, 'name', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm rtl" />
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Title (AR)</label>
                                    <input type="text" value={localContent.ar.teamMembers[index].title} onChange={e => handleTeamChange('ar', index, 'title', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm rtl" />
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Bio (AR)</label>
                                    <textarea value={localContent.ar.teamMembers[index].bio} onChange={e => handleTeamChange('ar', index, 'bio', e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm rtl" />
                                </div>
                             </div>
                        </div>
                    ))}
                    <button onClick={addTeamMember} className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">{t('admin_button_add_team')}</button>
                </div>
            )}
             {/* Our Team Photos */}
             {activeTab === 'our_team' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-1 h-fit p-4 border rounded-md dark:border-gray-700">
                        <h3 className="text-xl font-bold text-primary dark:text-white mb-4">{t('admin_team_photo_add')}</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin_team_photo_title')}</label>
                                <input type="text" value={newTeamPhoto.title} onChange={e => setNewTeamPhoto({ ...newTeamPhoto, title: e.target.value })} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin_team_photo_url')}</label>
                                <input type="text" value={newTeamPhoto.imageUrl} placeholder="https://picsum.photos/600/400" onChange={e => setNewTeamPhoto({ ...newTeamPhoto, imageUrl: e.target.value })} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                            </div>
                            <button onClick={addTeamPhoto} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90">{t('admin_team_photo_button_add')}</button>
                        </div>
                    </div>
                    <div className="lg:col-span-2 space-y-4 max-h-[60vh] overflow-y-auto pr-4 -mr-4">
                        <h3 className="text-xl font-bold text-primary dark:text-white mb-4">{t('admin_team_photo_current')}</h3>
                        {localContent.global.teamPhotos.map(photo => (
                            <div key={photo.id}>
                                {editingPhotoId === photo.id && tempPhotoData ? (
                                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md shadow-sm space-y-4 border-2 border-secondary">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin_team_photo_title')}</label>
                                            <input type="text" value={tempPhotoData.title} onChange={e => handleTempPhotoChange('title', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin_team_photo_url')}</label>
                                            <input type="text" value={tempPhotoData.imageUrl} onChange={e => handleTempPhotoChange('imageUrl', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                                        </div>
                                        <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                                            <button onClick={handleCancelEditTeamPhoto} className="px-4 py-2 bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-gray-200 text-sm font-medium rounded-md hover:bg-gray-400 dark:hover:bg-gray-500">{t('admin_button_cancel')}</button>
                                            <button onClick={handleUpdateTeamPhoto} className="px-4 py-2 bg-secondary text-white text-sm font-medium rounded-md hover:bg-blue-500">{t('admin_button_update')}</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-sm">
                                        <div className="flex items-center space-x-4 rtl:space-x-reverse overflow-hidden">
                                            <img src={photo.imageUrl} alt={photo.title} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                                            <div className="overflow-hidden">
                                                <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">{photo.title}</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2 rtl:space-x-reverse flex-shrink-0">
                                            <button onClick={() => handleEditTeamPhoto(photo)} className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">{t('admin_button_edit')}</button>
                                            <button onClick={() => deleteTeamPhoto(photo.id)} className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700">{t('admin_button_delete')}</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* Gallery */}
            {activeTab === 'gallery' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-1 h-fit p-4 border rounded-md dark:border-gray-700">
                        <h3 className="text-xl font-bold text-primary dark:text-white mb-4">{t('admin_form_title')}</h3>
                        <div className="space-y-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin_form_label_title')}</label>
                                <input type="text" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin_form_label_location')}</label>
                                <input type="text" value={newProject.location} onChange={e => setNewProject({...newProject, location: e.target.value})} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin_form_label_cover_image')}</label>
                                <input type="text" value={newProject.coverImageUrl} placeholder="https://picsum.photos/600/400" onChange={e => setNewProject({...newProject, coverImageUrl: e.target.value})} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin_form_label_detail_images')}</label>
                                <textarea value={newProjectImageUrls} rows={3} placeholder="https://..., https://..." onChange={e => setNewProjectImageUrls(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin_form_label_category')}</label>
                                <select value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value as 'Buildings' | 'Villas'})} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md">
                                  <option value="Buildings">{t('gallery_filter_buildings')}</option>
                                  <option value="Villas">{t('gallery_filter_villas')}</option>
                                </select>
                            </div>
                            <button onClick={addProject} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90">{t('admin_form_button_add')}</button>
                        </div>
                    </div>
                     <div className="lg:col-span-2 space-y-4 max-h-[60vh] overflow-y-auto pr-4 -mr-4">
                        <h3 className="text-xl font-bold text-primary dark:text-white mb-4">{t('admin_current_projects')}</h3>
                        {localContent.global.galleryProjects.map(project => (
                             <div key={project.id}>
                                {editingProjectId === project.id && tempProjectData ? (
                                    // Edit Form
                                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md shadow-sm space-y-4 border-2 border-secondary">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin_form_label_title')}</label>
                                                <input type="text" value={tempProjectData.title} onChange={e => handleTempProjectChange('title', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin_form_label_location')}</label>
                                                <input type="text" value={tempProjectData.location} onChange={e => handleTempProjectChange('location', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin_form_label_cover_image')}</label>
                                            <input type="text" value={tempProjectData.coverImageUrl} onChange={e => handleTempProjectChange('coverImageUrl', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin_form_label_detail_images')}</label>
                                            <textarea value={editingImageUrls} rows={3} onChange={e => setEditingImageUrls(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin_form_label_category')}</label>
                                            <select value={tempProjectData.category} onChange={e => handleTempProjectChange('category', e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:bg-gray-800 dark:border-gray-600 rounded-md">
                                                <option value="Buildings">{t('gallery_filter_buildings')}</option>
                                                <option value="Villas">{t('gallery_filter_villas')}</option>
                                            </select>
                                        </div>
                                        <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                                            <button onClick={handleCancelEdit} className="px-4 py-2 bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-gray-200 text-sm font-medium rounded-md hover:bg-gray-400 dark:hover:bg-gray-500">{t('admin_button_cancel')}</button>
                                            <button onClick={handleUpdateProject} className="px-4 py-2 bg-secondary text-white text-sm font-medium rounded-md hover:bg-blue-500">{t('admin_button_update')}</button>
                                        </div>
                                    </div>
                                ) : (
                                    // Display View
                                    <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-sm">
                                        <div className="flex items-center space-x-4 rtl:space-x-reverse overflow-hidden">
                                            <img src={project.coverImageUrl} alt={project.title} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                                            <div className="overflow-hidden">
                                                <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">{project.title}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{project.category}</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2 rtl:space-x-reverse flex-shrink-0">
                                            <button onClick={() => handleEditProject(project)} className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">{t('admin_button_edit')}</button>
                                            <button onClick={() => deleteProject(project.id)} className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700">{t('admin_button_delete')}</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                     </div>
                </div>
            )}
            </div>
        </div>

        <div className="mt-8 flex justify-end">
            <button onClick={handleSave} className="px-8 py-3 bg-secondary text-white font-bold rounded-md hover:bg-blue-500 transition-colors shadow-lg">
                {t('admin_button_save')}
            </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;