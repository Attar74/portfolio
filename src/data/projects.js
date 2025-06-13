import HectarLogo from '../assets/hectar-logo.png';
import VelentsLogo from '../assets/velents-logo.png';
const projects = [
  {
    id: 5,
    title: 'Ai Voice assistant',
    description:
      'A voice assistant that can be used to create and manage voice prompts',
    technologies: ['Vue.js', 'Bootstrap', 'Vite'],
    imageUrl: '/images/s2s.png',
    githubUrl: null, // Private repository
    featured: true,
    link: 'https://agent.velents.ai/velents/s2s/',
    companyLink: 'https://www.linkedin.com/company/velents',
    companyLogo: VelentsLogo,
  },
  {
    id: 4,
    title: 'Faltah',
    description: 'A platform for applying to jobs',
    technologies: ['Vue.js', 'Nuxt', 'Tailwind CSS', 'webpack'],
    imageUrl: '/images/Faltah.png',
    githubUrl: null, // Private repository
    featured: true,
    link: 'https://faltah.ai/apply',
    companyLink: 'https://www.linkedin.com/company/faltah',
    companyLogo: VelentsLogo,
  },
  {
    id: 2,
    title: 'Velents AI',
    description: 'AI-powered talent acquisition platform',
    technologies: ['Vue.js', 'Nuxt', 'Tailwind CSS', 'webpack'],
    imageUrl: '/images/velentsAI.png',
    githubUrl: null, // Private repository
    featured: true,
    link: 'https://velents.ai/',
    companyLink: 'https://www.linkedin.com/company/velents',
    companyLogo: VelentsLogo,
  },
  {
    id: 3,
    title: 'Velents CRM',
    description: 'A CRM for managing customer relationships and sales',
    technologies: ['Vue.js', 'Nuxt', 'Tailwind CSS', 'webpack'],
    imageUrl: '/images/ATS.png',
    githubUrl: null, // Private repository
    featured: true,
    link: 'https://crm.velents.com/',
    companyLink: 'https://www.linkedin.com/company/velents',
    companyLogo: VelentsLogo,
  },
  {
    id: 6,
    title: 'Hecater',
    description:
      'Search, sell, and rent. Start now — there are plenty of great options waiting for you.',
    technologies: ['Vue.js', 'Tailwind CSS', 'Vuex', 'webpack'],
    imageUrl: '/images/Hectar.png',
    githubUrl: null, // Private repository
    featured: true,
    link: 'https://hectar.io/',
    companyLink: 'https://www.linkedin.com/company/hectarapp',
    companyLogo: HectarLogo,
  },
  {
    id: 7,
    title: 'Hecater Plus',
    description:
      'HectarPlus.io is a comprehensive digital platform designed to streamline real estate operations, particularly in the Saudi Arabian market.',
    technologies: ['Vue.js', 'Tailwind CSS', 'Vuex', 'webpack'],
    imageUrl: '/images/HPlus.png',
    githubUrl: null, // Private repository
    featured: true,
    link: 'https://hectarplus.io/',
    companyLink: 'https://www.linkedin.com/company/hectarapp',
    companyLogo: HectarLogo,
  },
];

export default projects;
