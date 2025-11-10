
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../i18n';
import { useContent } from '../components/ContentContext';

interface MapProps {
    coordinates: {
        lat: number;
        lng: number;
    };
}

const MapComponent: React.FC<MapProps> = ({ coordinates }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerInstanceRef = useRef<any>(null);

  useEffect(() => {
    const L = (window as any).L;
    if (!L || !mapContainerRef.current) {
      return;
    }
    
    const position: [number, number] = [coordinates.lat, coordinates.lng];

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView(position, 16);
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      markerInstanceRef.current = L.marker(position).addTo(map)
        .bindPopup('<b>Model House Contracting</b><br>Flower of Garhoud Building, Garhoud, Dubai.')
        .openPopup();
    } else {
        mapInstanceRef.current.setView(position, 16);
        if (markerInstanceRef.current) {
            markerInstanceRef.current.setLatLng(position);
        }
    }

    return () => {
      if (mapInstanceRef.current && mapContainerRef.current && !document.body.contains(mapContainerRef.current)) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [coordinates]);

  return <div ref={mapContainerRef} className="w-full h-64 md:h-full rounded-lg shadow-md" style={{ minHeight: '300px' }} />;
};


const ContactPage: React.FC = () => {
  const { t, language } = useTranslation();
  const { content } = useContent();
  const pageContent = content[language];
  const { global } = content;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    document.title = t('title_contact');
  }, [t]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(t('contact_form_alert'));
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-white dark:bg-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-primary dark:text-white">{pageContent.general.contactPageTitle}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            {pageContent.general.contactPageSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">{t('contact_form_title')}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('contact_form_name')}</label>
                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary focus:border-secondary" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('contact_form_email')}</label>
                <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary focus:border-secondary" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('contact_form_subject')}</label>
                <input type="text" name="subject" id="subject" required value={formData.subject} onChange={handleChange} className="mt-1 block w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary focus:border-secondary" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('contact_form_message')}</label>
                <textarea id="message" name="message" rows={5} required value={formData.message} onChange={handleChange} className="mt-1 block w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary focus:border-secondary"></textarea>
              </div>
              <div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                  {t('contact_form_submit')}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-12">
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-primary dark:text-white mb-4">{pageContent.general.contactInfoTitle}</h3>
              
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-primary dark:text-white mb-4">{pageContent.general.contactWorkingHoursTitle}</h3>
                <div className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                    {pageContent.workingHours.map(wh => (
                        <div key={wh.id} className="flex justify-between items-center text-base">
                            <span className="font-medium">{wh.day}</span>
                            <span className="text-gray-500 dark:text-gray-400">{wh.time}</span>
                        </div>
                    ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="mt-4 space-y-4 text-gray-600 dark:text-gray-300 text-lg">
                  <p className="flex items-center"><svg className="w-6 h-6 ms-4 rtl:ms-0 rtl:me-4 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>{pageContent.general.footerAddress}</p>
                  <p className="flex items-center"><svg className="w-6 h-6 ms-4 rtl:ms-0 rtl:me-4 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>{pageContent.general.contactPhone1}</p>
                  <p className="flex items-center"><svg className="w-6 h-6 ms-4 rtl:ms-0 rtl:me-4 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>{pageContent.general.contactPhone2}</p>
                  <p className="flex items-center"><svg className="w-6 h-6 ms-4 rtl:ms-0 rtl:me-4 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>{pageContent.general.contactEmail}</p>
                </div>
              </div>

            </div>
            <div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <MapComponent coordinates={global.mapCoordinates} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;