
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n';
import { useContent } from '../components/ContentContext';
import Counter from '../components/Counter';
import { ICONS } from '../constants';
import type { GalleryProject, TeamMember } from '../types';

const ServiceCard: React.FC<{ service: { key: string; iconKey: string; title: string; description: string; } }> = ({ service }) => {
    const Icon = ICONS[service.iconKey];
    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center">
            {Icon && <div className="bg-secondary bg-opacity-10 p-4 rounded-full mb-6"><Icon /></div>}
            <h3 className="text-xl font-bold text-primary dark:text-white mb-2">{service.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 flex-grow">{service.description}</p>
        </div>
    );
};

const ProjectPreviewCard: React.FC<{ project: GalleryProject }> = ({ project }) => (
    <div className="relative overflow-hidden rounded-lg group shadow-lg">
        <img src={project.coverImageUrl} alt={project.title} className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p className="text-sm">{project.location}</p>
        </div>
    </div>
);

const ValueCard: React.FC<{ value: { key: string; iconKey: string; title: string; description: string; } }> = ({ value }) => {
    const Icon = ICONS[value.iconKey];
    return (
        <div className="flex items-start space-x-4 rtl:space-x-reverse">
            {Icon && <div className="flex-shrink-0 bg-secondary bg-opacity-10 p-3 rounded-full"><Icon /></div>}
            <div>
                <h4 className="text-lg font-bold text-primary dark:text-white">{value.title}</h4>
                <p className="mt-1 text-gray-600 dark:text-gray-400">{value.description}</p>
            </div>
        </div>
    );
};

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
    return (
        <div className="text-center group">
            <div className="relative inline-block">
                <img className="mx-auto h-32 w-32 rounded-full object-cover shadow-lg transform group-hover:scale-105 transition-transform duration-300" src={member.imageUrl} alt={member.name} />
            </div>
            <h3 className="mt-6 text-lg font-semibold leading-7 tracking-tight text-primary dark:text-white">{member.name}</h3>
            <p className="text-sm leading-6 text-secondary">{member.title}</p>
        </div>
    );
};

const HomePage: React.FC = () => {
    const { t, language } = useTranslation();
    const { content } = useContent();
    const pageContent = content[language];
    const { global } = content;

    const teamMembersWithDetails = global.teamMembers.map(globalMember => {
        const langMember = pageContent.teamMembers.find(tm => tm.id === globalMember.id);
        return { ...globalMember, ...langMember };
    });

    useEffect(() => {
        document.title = t('title_home');
    }, [t]);

    return (
        <div className="space-y-16 md:space-y-24 pb-16">
            {/* 1. Hero Section */}
            <section 
                className="relative h-[80vh] md:h-screen bg-cover bg-center text-white flex items-center" 
                style={{ backgroundImage: "url('https://picsum.photos/1600/900?random=101')" }}
                role="img"
                aria-label={t('hero_aria_label')}
            >
                <div className="absolute inset-0 bg-primary bg-opacity-60"></div>
                <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl animate-fade-in-down" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.6)'}}>{pageContent.general.heroTitle}</h1>
                    <p className="mt-6 max-w-3xl text-lg md:text-xl text-gray-200 animate-fade-in-up animation-delay-300" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.6)'}}>{pageContent.general.heroSubtitle}</p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-500">
                        <Link to="/profile" className="px-8 py-3 bg-secondary text-white font-bold rounded-md hover:bg-blue-500 transition-colors text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1">{t('hero_cta_profile')}</Link>
                        <Link to="/gallery" className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-md hover:bg-white hover:text-primary transition-colors text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1">{t('hero_cta_projects')}</Link>
                    </div>
                </div>
            </section>
            
            {/* 2. About Us & Counters Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-extrabold text-primary dark:text-white mb-4">{pageContent.general.homeAboutTitle}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                          {pageContent.general.homeAboutDesc}
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-8 text-center">
                        <div className="p-4 rounded-lg">
                            <h3 className="text-4xl lg:text-5xl font-bold text-secondary">+<Counter target={10} /></h3>
                            <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">{pageContent.general.counterProjects}</p>
                        </div>
                        <div className="p-4 rounded-lg">
                            <h3 className="text-4xl lg:text-5xl font-bold text-secondary">+<Counter target={50} /></h3>
                            <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">{pageContent.general.counterClients}</p>
                        </div>
                         <div className="p-4 rounded-lg">
                            <h3 className="text-4xl lg:text-5xl font-bold text-secondary">+<Counter target={20} /></h3>
                            <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">{pageContent.general.counterExperience}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Services Section */}
            <section className="bg-neutral-light dark:bg-neutral-dark py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-primary dark:text-white">{pageContent.general.homeServicesTitle}</h2>
                        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{pageContent.general.homeServicesSubtitle}</p>
                    </div>
                    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {pageContent.services.slice(0,3).map((service) => {
                             const globalService = global.services.find(s => s.key === service.key);
                             return <ServiceCard key={service.key} service={{ ...service, iconKey: globalService?.iconKey || '' }} />
                        })}
                    </div>
                </div>
            </section>
            
            {/* 4. Projects Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-3">
                    {global.galleryProjects.slice(0, 3).map(project => <ProjectPreviewCard key={project.id} project={project} />)}
                </div>
                <div className="mt-12 text-center">
                    <Link to="/gallery" className="px-8 py-3 bg-primary text-white font-bold rounded-md hover:bg-opacity-80 transition-colors">{pageContent.general.homeProjectsCta}</Link>
                </div>
            </section>

            {/* 5. Vision & Core Values Section */}
            <section className="bg-neutral-light dark:bg-neutral-dark py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-primary dark:text-white">{pageContent.general.homeValuesTitle}</h2>
                        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{pageContent.general.homeValuesSubtitle}</p>
                    </div>
                    <div className="mt-16 max-w-4xl mx-auto grid md:grid-cols-2 gap-x-12 gap-y-10">
                        {pageContent.coreValues.slice(0, 4).map((value) => {
                             const globalValue = global.coreValues.find(v => v.key === value.key);
                            return <ValueCard key={value.key} value={{...value, iconKey: globalValue?.iconKey || ''}} />
                        })}
                    </div>
                </div>
            </section>
            
            {/* 7. Executive Team Section */}
            <section className="bg-white dark:bg-neutral-dark py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-primary dark:text-white">{pageContent.general.homeTeamTitle}</h2>
                        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">{pageContent.general.homeTeamSubtitle}</p>
                    </div>
                    <ul role="list" className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-16 text-center sm:grid-cols-2 lg:grid-cols-3">
                        {teamMembersWithDetails.map((member) => (
                            <li key={member.id}><TeamMemberCard member={member as TeamMember} /></li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* 8. Final CTA Section */}
            <section className="bg-secondary">
                <div className="max-w-4xl mx-auto text-center py-20 px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white">{pageContent.general.homeCtaTitle}</h2>
                    <p className="mt-4 text-lg text-blue-100">{pageContent.general.homeCtaSubtitle}</p>
                    <div className="mt-8">
                        <Link to="/contact" className="inline-block px-10 py-4 bg-white text-primary font-bold rounded-md shadow-lg hover:bg-neutral-light transition-colors transform hover:scale-105">{pageContent.general.homeCtaButton}</Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HomePage;