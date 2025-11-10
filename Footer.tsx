
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n';
import { useContent } from './ContentContext';

const Logo = () => {
    const { t } = useTranslation();
    const { content } = useContent();
    const logoUrl = content.global.companyLogoUrl;

    return (
        <Link to="/" className="flex items-center" aria-label="Model House Home">
             {logoUrl ? (
                <img src={logoUrl} alt={t('logo_text_part1') + ' ' + t('logo_text_part2')} className="h-12 w-auto" />
             ) : (
                <span className="text-2xl font-bold text-white tracking-wider rtl:tracking-normal">
                    {t('logo_text_part1')} <span className="text-secondary">{t('logo_text_part2')}</span>
                </span>
             )}
        </Link>
    );
};

const Footer: React.FC = () => {
    const { t, language } = useTranslation();
    const { content } = useContent();
    const pageContent = content[language];
    const { socialMediaLinks } = content.global;
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-neutral-dark text-gray-400">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    <div className="lg:col-span-4 space-y-4">
                        <Logo />
                        <p className="text-sm">{pageContent.general.footerTagline}</p>
                    </div>
                    
                    <div className="lg:col-span-4">
                        <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-300">{t('footer_contact_us')}</h3>
                        <ul className="mt-4 space-y-3">
                            <li className="flex items-start"><span className="ms-2 mt-1">&#9993;</span> {pageContent.general.contactEmail}</li>
                            <li className="flex items-start"><span className="ms-2 mt-1">&#9742;</span> {pageContent.general.contactPhone1}</li>
                             <li className="flex items-start"><span className="ms-2 mt-1">&#9742;</span> {pageContent.general.contactPhone2}</li>
                            <li className="flex items-start"><span className="ms-2 mt-1">&#127968;</span> {pageContent.general.footerAddress}</li>
                        </ul>
                    </div>

                    <div className="lg:col-span-4">
                        <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-300">{t('footer_follow_us')}</h3>
                        <div className="flex mt-4 space-x-6 rtl:space-x-reverse">
                           <a href={socialMediaLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-colors" aria-label={t('whatsapp_aria')}>
                                <span className="sr-only">WhatsApp</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.46 3.48 1.32 4.95L2 22l5.25-1.38c1.41.79 3.02 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.04 20.15h-.01c-1.54 0-3.02-.42-4.32-1.18l-.31-.18-3.21.84.86-3.13-.2-.32c-.84-1.35-1.29-2.9-1.29-4.52 0-4.54 3.69-8.23 8.24-8.23 2.22 0 4.23.86 5.82 2.45s2.45 3.6 2.45 5.82c-.01 4.55-3.69 8.24-8.23 8.24zm4.52-6.13c-.25-.12-1.47-.72-1.7-.81-.23-.09-.39-.12-.56.12-.17.25-.64.81-.79.97-.15.17-.29.19-.54.06-.25-.12-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.09-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.88 2.4 1 2.56.12.17 1.75 2.67 4.24 3.75 2.49 1.08 2.49.72 2.94.69.45-.03 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.07-.1-.23-.16-.48-.28z"/></svg>
                           </a>
                            <a href={socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-colors" aria-label={t('instagram_aria')}><span className="sr-only">Instagram</span><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6zm-2-6a2 2 0 114 0 2 2 0 01-4 0zm8-3a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg></a>
                            <a href={socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-colors" aria-label={t('facebook_aria')}><span className="sr-only">Facebook</span><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg></a>

                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-700 pt-8 text-center">
                    <p className="text-base text-gray-500">&copy; {currentYear} {t('footer_copyright')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
