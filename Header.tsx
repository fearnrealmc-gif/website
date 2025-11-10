
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../i18n';
import { useContent } from './ContentContext';

interface HeaderProps {
    theme: string;
    toggleTheme: () => void;
}

const ThemeToggleButton: React.FC<HeaderProps> = ({ theme, toggleTheme }) => (
    <button
        onClick={toggleTheme}
        className="p-2 rounded-full text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
        {theme === 'light' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        )}
    </button>
);


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

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const { t, language, setLanguage } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
        
    const navLinks = [
        { path: '/', name: t('nav_home') },
        { path: '/services', name: t('nav_services') },
        { path: '/about', name: t('nav_about') },
        { path: '/team', name: t('nav_team') },
        { path: '/gallery', name: t('nav_gallery') },
        { path: '/contact', name: t('nav_contact') },
    ];
    
    const navLinkClasses = `relative px-3 py-2 text-sm font-medium text-white transition-colors after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-0.5 after:w-0 after:bg-secondary after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full`;
    const activeNavLinkClasses = "after:w-full";

    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => 
        isActive ? `${navLinkClasses} ${activeNavLinkClasses}` : navLinkClasses;

    const headerClass = `sticky top-0 z-50 transition-all duration-300 ${
      (isScrolled || !isHomePage) ? 'bg-primary shadow-lg' : 'bg-transparent'
    }`;

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'ar' : 'en';
        setLanguage(newLang);
    };

    return (
        <header className={headerClass}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <Logo />
                    </div>
                    <div className="hidden md:flex items-center">
                        <nav className="me-6 flex items-baseline space-x-4">
                            {navLinks.map(link => (
                                <NavLink key={link.path} to={link.path} className={getNavLinkClass}>
                                    {link.name}
                                </NavLink>
                            ))}
                        </nav>
                         <button
                            onClick={toggleLanguage}
                            className="p-2 rounded-md text-white hover:bg-white/10 text-sm font-semibold transition-colors"
                            aria-label={t('toggle_language_aria')}
                        >
                            {language === 'en' ? 'العربية' : 'English'}
                        </button>
                        <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
                    </div>
                    <div className="-me-2 flex md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} type="button" className="bg-primary inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">{t('open_main_menu')}</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-primary" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map(link => (
                             <NavLink key={link.path} to={link.path} className={({ isActive }) => 
                                `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
                            } onClick={() => setIsOpen(false)}>
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                    <div className="border-t border-gray-700 px-4 py-3 flex items-center justify-between">
                         <button
                            onClick={toggleLanguage}
                            className="p-2 rounded-md text-white hover:bg-white/10 text-sm font-semibold transition-colors"
                             aria-label={t('toggle_language_aria')}
                        >
                            {language === 'en' ? 'العربية' : 'English'}
                        </button>
                        <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;