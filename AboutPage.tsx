
import React, { useEffect } from 'react';
import { useTranslation } from '../i18n';
import { useContent } from '../components/ContentContext';
import type { TeamMember } from '../types';

// Icons for QHSE Section
const SafetyHealthIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286z" />
    </svg>
);
const EnvironmentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a5 5 0 0 0 5 -5a5 5 0 0 0 -10 0a5 5 0 0 0 5 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.333 1.333 -2 2.667 -2 4c0 1.333 .667 2.667 2 4s2 2.667 2 4c0-1.333 -.667 -2.667 -2 -4s-2-2.667 -2 -4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v7" />
    </svg>
);
const QualityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.31h5.418a.563.563 0 01.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 21.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988h5.418a.563.563 0 00.475-.31L11.48 3.5z" />
    </svg>
);


const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
    return (
        <div className="text-center">
            <img className="mx-auto h-40 w-40 rounded-full object-cover shadow-lg" src={member.imageUrl} alt={member.name} />
            <h3 className="mt-6 text-xl font-semibold leading-7 tracking-tight text-primary dark:text-white">{member.name}</h3>
            <p className="text-md leading-6 text-secondary">{member.title}</p>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs mx-auto">{member.bio}</p>
        </div>
    );
};

const AboutPage: React.FC = () => {
    const { t, language } = useTranslation();
    const { content } = useContent();
    const pageContent = content[language];
    const { global } = content;
    
    useEffect(() => {
        document.title = t('title_about');
    }, [t]);

    const teamMembersWithDetails = global.teamMembers.map(globalMember => {
        const langMember = pageContent.teamMembers.find(tm => tm.id === globalMember.id);
        return { ...globalMember, ...langMember };
    });


    return (
        <div className="bg-white dark:bg-gray-900">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden py-32 sm:py-48" role="img" aria-label={t('about_hero_aria')}>
                 <img src="https://picsum.photos/1920/1080?random=30" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                 <div className="absolute inset-0 bg-primary bg-opacity-70"></div>
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl animate-fade-in-down">{pageContent.general.aboutPageTitle}</h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300 animate-fade-in-up animation-delay-300">{pageContent.general.aboutPageSubtitle}</p>
                </div>
            </div>

            {/* Introduction Section */}
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl lg:mx-0 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">{pageContent.general.aboutIntroTitle}</h2>
                        <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                           {pageContent.general.aboutIntroDesc}
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission and Vision */}
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div className="bg-secondary bg-opacity-5 p-8 rounded-lg">
                            <h3 className="text-3xl font-bold text-primary dark:text-white">{pageContent.general.aboutVisionTitle}</h3>
                            <p className="mt-4 text-gray-600 dark:text-gray-400 text-xl leading-relaxed">
                                "{pageContent.general.aboutVisionDesc}"
                            </p>
                        </div>
                        <div className="bg-secondary bg-opacity-5 p-8 rounded-lg">
                            <h3 className="text-3xl font-bold text-primary dark:text-white">{pageContent.general.aboutMissionTitle}</h3>
                            <ul className="mt-4 space-y-3 text-gray-600 dark:text-gray-400 list-disc list-inside text-lg">
                                <li>{pageContent.general.aboutMission1}</li>
                                <li>{pageContent.general.aboutMission2}</li>
                                <li>{pageContent.general.aboutMission3}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Leadership Section */}
            <div className="bg-neutral-light dark:bg-neutral-dark py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">{pageContent.general.aboutTeamTitle}</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                           {pageContent.general.aboutTeamSubtitle}
                        </p>
                    </div>

                    {/* Chairman's Letter */}
                    <div className="mx-auto max-w-5xl mb-24 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 md:p-12">
                        <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-center">
                            <div className="md:col-span-1">
                                <img className="rounded-lg shadow-md w-full h-auto object-cover aspect-[4/5]" src="https://picsum.photos/400/500?random=10" alt={pageContent.general.aboutChairmanName} />
                            </div>
                            <div className="md:col-span-2 text-start">
                                <h3 className="text-base font-semibold leading-7 text-secondary tracking-widest">{pageContent.general.aboutChairmanTitle}</h3>
                                <blockquote className="mt-4 text-gray-700 dark:text-gray-300">
                                    <p className="leading-relaxed whitespace-pre-line">"{pageContent.general.aboutChairmanMessage}"</p>
                                </blockquote>
                                <figcaption className="mt-6">
                                    <div className="font-bold text-primary dark:text-white">{pageContent.general.aboutChairmanName}</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">{pageContent.general.aboutChairmanPosition}</div>
                                </figcaption>
                            </div>
                        </div>
                    </div>

                    {/* Team Members Grid */}
                    <ul role="list" className="mx-auto grid max-w-5xl grid-cols-1 gap-x-8 gap-y-16 text-center sm:grid-cols-2 lg:grid-cols-3">
                        {teamMembersWithDetails.map((member) => (
                            <li key={member.id}>
                                <TeamMemberCard member={member as TeamMember} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            {/* QHSE Management Section */}
            <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
                 <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl lg:mx-0 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">{pageContent.general.aboutQhseTitle}</h2>
                         <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                            {pageContent.general.aboutQhseSubtitle}
                        </p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                            <div className="bg-secondary bg-opacity-10 p-4 rounded-full"><SafetyHealthIcon /></div>
                            <h4 className="mt-4 text-xl font-bold text-primary dark:text-white">{pageContent.general.aboutQhseHealthTitle}</h4>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">{pageContent.general.aboutQhseHealthDesc}</p>
                        </div>
                        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                            <div className="bg-secondary bg-opacity-10 p-4 rounded-full"><EnvironmentIcon /></div>
                            <h4 className="mt-4 text-xl font-bold text-primary dark:text-white">{pageContent.general.aboutQhseEnvTitle}</h4>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">{pageContent.general.aboutQhseEnvDesc}</p>
                        </div>
                        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                            <div className="bg-secondary bg-opacity-10 p-4 rounded-full"><QualityIcon /></div>
                            <h4 className="mt-4 text-xl font-bold text-primary dark:text-white">{pageContent.general.aboutQhseQualityTitle}</h4>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">{pageContent.general.aboutQhseQualityDesc}</p>
                        </div>
                    </div>
                 </div>
            </div>

        </div>
    );
};

export default AboutPage;
