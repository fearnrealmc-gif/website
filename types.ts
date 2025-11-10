
export interface WorkingHour {
  id: number;
  day: string;
  time: string;
}

export interface GalleryProject {
  id: number;
  title: string;
  category: 'Buildings' | 'Villas';
  location: string;
  coverImageUrl: string;
  imageUrls: string[];
}

export interface TeamMember {
  id: number;
  imageUrl: string;
  name: string;
  title: string;
  bio: string;
}

export interface TeamPhoto {
    id: number;
    imageUrl: string;
    title: string;
}

// Represents non-language-specific data
export interface GlobalContent {
    companyLogoUrl: string;
    companyProfilePdfUrl: string;
    mapCoordinates: {
        lat: number;
        lng: number;
    };
    socialMediaLinks: {
        whatsapp: string;
        instagram: string;
        facebook: string;
    };
    galleryProjects: GalleryProject[];
    teamMembers: { id: number; imageUrl: string }[];
    teamPhotos: TeamPhoto[];
    services: { key: string; iconKey: string; }[];
    coreValues: { key: string; iconKey: string; }[];
}

// Represents all text content for a single language
export interface LangSpecificContent {
    general: {
        heroTitle: string;
        heroSubtitle: string;
        homeAboutTitle: string;
        homeAboutDesc: string;
        counterProjects: string;
        counterClients: string;
        counterExperience: string;
        homeServicesTitle: string;
        homeServicesSubtitle: string;
        homeProjectsCta: string;
        homeValuesTitle: string;
        homeValuesSubtitle: string;
        homeTeamTitle: string;
        homeTeamSubtitle: string;
        homeCtaTitle: string;
        homeCtaSubtitle: string;
        homeCtaButton: string;
        footerTagline: string;
        footerAddress: string;
        aboutPageTitle: string;
        aboutPageSubtitle: string;
        aboutIntroTitle: string;
        aboutIntroDesc: string;
        aboutVisionTitle: string;
        aboutVisionDesc: string;
        aboutMissionTitle: string;
        aboutMission1: string;
        aboutMission2: string;
        aboutMission3: string;
        aboutChairmanTitle: string;
        aboutChairmanName: string;
        aboutChairmanPosition: string;
        aboutChairmanMessage: string;
        aboutTeamTitle: string;
        aboutTeamSubtitle: string;
        aboutQhseTitle: string;
        aboutQhseSubtitle: string;
        aboutQhseHealthTitle: string;
        aboutQhseHealthDesc: string;
        aboutQhseEnvTitle: string;
        aboutQhseEnvDesc: string;
        aboutQhseQualityTitle: string;
        aboutQhseQualityDesc: string;
        contactPageTitle: string;
        contactPageSubtitle: string;
        contactInfoTitle: string;
        contactWorkingHoursTitle: string;
        contactPhone1: string;
        contactPhone2: string;
        contactEmail: string;
        profilePageTitle: string;
        profilePageSubtitle: string;
    };
    services: {
        key: string;
        title: string;
        description: string;
    }[];
    coreValues: {
        key: string;
        title: string;
        description: string;
    }[];
    teamMembers: Omit<TeamMember, 'imageUrl'>[];
    workingHours: WorkingHour[];
}

// The complete content structure for the entire site
export interface SiteContent {
    global: GlobalContent;
    en: LangSpecificContent;
    ar: LangSpecificContent;
}