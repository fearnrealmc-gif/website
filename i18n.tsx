
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Titles
    'title_home': 'Home | Model House Contracting',
    'title_services': 'Services | Model House Contracting',
    'title_about': 'About Us | Model House Contracting',
    'title_gallery': 'Project Gallery | Model House Contracting',
    'title_team': 'Our Team | Model House Contracting',
    'title_contact': 'Contact Us | Model House Contracting',
    'title_profile': 'Company Profile | Model House Contracting',

    // Header & Nav
    'nav_home': 'Home',
    'nav_services': 'Services',
    'nav_about': 'About Us',
    'nav_team': 'Our Team',
    'nav_gallery': 'Projects Gallery',
    'nav_contact': 'Contact Us',
    'toggle_language_aria': 'Toggle language',
    'open_main_menu': 'Open main menu',
    'logo_text_part1': 'Model House',
    'logo_text_part2': 'Contracting',
    
    // Hero Section
    'hero_cta_profile': 'Company Profile',
    'hero_cta_projects': 'View Our Projects',
    'hero_aria_label': 'Modern construction site in the UAE with cranes at sunset',

    // Services Page
    'services_page_title': 'Our Services',
    'services_page_subtitle': 'We offer a wide range of services to meet the diverse needs of our clients, ensuring quality and precision at every stage.',

    // About Page
    'about_hero_aria': 'A team of engineers reviewing blueprints at a construction site',

    // Gallery Page
    'gallery_page_title': 'Our Projects',
    'gallery_page_subtitle': 'A collection of our finest works, highlighting our commitment to quality and excellence across various sectors.',
    'gallery_filter_all': 'All',
    'gallery_filter_buildings': 'Buildings',
    'gallery_filter_villas': 'Villas',
    'gallery_no_projects': 'No projects found in this category.',
    'close_image_viewer': 'Close image viewer',

    // Team Page
    'team_page_title': 'Our On-Site Team',
    'team_page_subtitle': 'Meet the dedicated professionals making it happen.',
    'team_no_photos': 'No team photos available at the moment.',

    // Contact Page
    'contact_form_title': 'Send Us a Message',
    'contact_form_name': 'Full Name',
    'contact_form_email': 'Email Address',
    'contact_form_subject': 'Subject',
    'contact_form_message': 'Message',
    'contact_form_submit': 'Send',
    'contact_form_alert': 'Thank you for your message! We will get back to you as soon as possible.',

    // Profile Page
    'profile_pdf_not_found': 'PDF not available. Please contact administration.',
    'profile_download_button': 'Download PDF',

    // Footer
    'footer_contact_us': 'Contact Us',
    'footer_follow_us': 'Follow Us',
    'footer_copyright': 'Model House Building Contracting LLC. All rights reserved.',
    'whatsapp_aria': 'Contact us on WhatsApp',
    'instagram_aria': 'Follow us on Instagram',
    'facebook_aria': 'Follow us on Facebook',
  },
  ar: {
    // Titles
    'title_home': 'الرئيسية | موديل هاوس للمقاولات',
    'title_services': 'خدماتنا | موديل هاوس للمقاولات',
    'title_about': 'من نحن | موديل هاوس للمقاولات',
    'title_gallery': 'معرض المشاريع | موديل هاوس للمقاولات',
    'title_team': 'فريقنا | موديل هاوس للمقاولات',
    'title_contact': 'اتصل بنا | موديل هاوس للمقاولات',
    'title_profile': 'ملف الشركة | موديل هاوس للمقاولات',

    // Header & Nav
    'nav_home': 'الرئيسية',
    'nav_services': 'خدماتنا',
    'nav_about': 'من نحن',
    'nav_team': 'فريقنا',
    'nav_gallery': 'معرض المشاريع',
    'nav_contact': 'اتصل بنا',
    'toggle_language_aria': 'تغيير اللغة',
    'open_main_menu': 'فتح القائمة الرئيسية',
    'logo_text_part1': 'موديل هاوس',
    'logo_text_part2': 'للمقاولات',
    
    // Hero Section
    'hero_cta_profile': 'بروفايل الشركة',
    'hero_cta_projects': 'شاهد مشاريعنا',
    'hero_aria_label': 'موقع بناء حديث في الإمارات مع رافعات عند الغروب',

    // Services Page
    'services_page_title': 'خدماتنا',
    'services_page_subtitle': 'نقدم مجموعة واسعة من الخدمات لتلبية الاحتياجات المتنوعة لعملائنا، مع ضمان الجودة والدقة في كل مرحلة.',

    // About Page
    'about_hero_aria': 'فريق من المهندسين يراجعون المخططات في موقع بناء',
    
    // Gallery Page
    'gallery_page_title': 'مشاريعنا',
    'gallery_page_subtitle': 'مجموعة من أرقى أعمالنا، التي تبرز التزامنا بالجودة والتميز في مختلف القطاعات.',
    'gallery_filter_all': 'الكل',
    'gallery_filter_buildings': 'بنايات',
    'gallery_filter_villas': 'فلل',
    'gallery_no_projects': 'لم يتم العثور على مشاريع في هذه الفئة.',
    'close_image_viewer': 'إغلاق عارض الصور',

    // Team Page
    'team_page_title': 'فريقنا في الموقع',
    'team_page_subtitle': 'تعرف على المحترفين المتفانين الذين يحققون النجاح.',
    'team_no_photos': 'لا توجد صور للفريق متاحة حاليًا.',

    // Contact Page
    'contact_form_title': 'أرسل لنا رسالة',
    'contact_form_name': 'الاسم الكامل',
    'contact_form_email': 'البريد الإلكتروني',
    'contact_form_subject': 'الموضوع',
    'contact_form_message': 'الرسالة',
    'contact_form_submit': 'إرسال',
    'contact_form_alert': 'شكراً لرسالتك! سوف نرد عليك في أقرب وقت ممكن.',

    // Profile Page
    'profile_pdf_not_found': 'ملف PDF غير متوفر. يرجى التواصل مع الإدارة.',
    'profile_download_button': 'تحميل الملف',

    // Footer
    'footer_contact_us': 'تواصل معنا',
    'footer_follow_us': 'تابعنا',
    'footer_copyright': 'Model House Building Contracting LLC. جميع الحقوق محفوظة.',
    'whatsapp_aria': 'تواصل معنا عبر واتساب',
    'instagram_aria': 'تابعنا على انستغرام',
    'facebook_aria': 'تابعنا على فيسبوك',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const storedLang = window.localStorage.getItem('language') as Language;
        if (storedLang && ['en', 'ar'].includes(storedLang)) {
            return storedLang;
        }
        const browserLang = navigator.language.split('-')[0];
        return browserLang === 'ar' ? 'ar' : 'en';
    }
    return 'ar';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
