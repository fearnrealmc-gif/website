
import React, { useEffect } from 'react';
import { useTranslation } from '../i18n';
import { useContent } from '../components/ContentContext';
import { ICONS } from '../constants';

const ServiceDetailCard: React.FC<{ service: { key: string; iconKey: string; title: string; description: string; }, index: number }> = ({ service, index }) => {
    const Icon = ICONS[service.iconKey];
    return (
        <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="md:w-1/3 flex justify-center p-8 bg-secondary bg-opacity-5">
                 {Icon && <div className="bg-white dark:bg-gray-700 p-6 rounded-full shadow-inner">
                    <Icon />
                 </div>}
            </div>
            <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold text-primary dark:text-white mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{service.description}</p>
            </div>
        </div>
    );
};

const ServicesPage: React.FC = () => {
    const { t, language } = useTranslation();
    const { content } = useContent();
    const pageContent = content[language];
    const { global } = content;

    useEffect(() => {
        document.title = t('title_services');
    }, [t]);

    const servicesWithIcons = pageContent.services.map(service => {
        const globalService = global.services.find(s => s.key === service.key);
        return { ...service, iconKey: globalService?.iconKey || '' };
    });

    return (
        <div className="py-24 bg-neutral-light dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-primary dark:text-white">{t('services_page_title')}</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
                        {t('services_page_subtitle')}
                    </p>
                </div>

                <div className="space-y-16">
                    {servicesWithIcons.map((service, index) => (
                        <ServiceDetailCard key={service.key} service={service} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
