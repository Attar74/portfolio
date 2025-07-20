import AvaLogo from '../assets/avatar.png';
import HectarLogo from '../assets/hectar-logo.png';
import VelentsLogo from '../assets/velents-logo.png';

const projects = [
  {
    id: 'next-blog-2024',
    title: 'Next.js Blog App',
    description:
      'A modern blog application built with Next.js featuring dynamic routing, server-side rendering, and a clean responsive design',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'typescript'],
    imageUrl: '/images/next-blog-app.png',
    githubUrl: null,
    featured: true,
    link: 'https://next-blog-app-seven-teal.vercel.app/',
    companyLink: 'https://www.linkedin.com/in/attar74',
    companyLogo: AvaLogo,
  },
  {
    id: 'velents-voice-ai',
    title: 'Ai Voice assistant',
    description:
      'A cutting-edge AI-powered Store-to-Shopper (S2S) automation platform tailored for Shopify and Salla merchants. I built the interactive dashboard enabling businesses to initiate automated voice and WhatsApp follow-ups right after a purchase. The system confirms orders, collects customer feedback, and displays insights in real-time.',
    technologies: [
      'Vue.js',
      'Pinia',
      'Tailwind CSS',
      'WebSockets',
      'REST APIs',
    ],
    imageUrl: '/images/s2s.png',
    githubUrl: null,
    featured: true,
    link: 'https://agent.velents.ai/velents/s2s/',
    companyLink: 'https://www.linkedin.com/company/velents',
    companyLogo: VelentsLogo,
  },
  {
    id: 'faltah-jobs',
    title: 'Faltah',
    description:
      'Faltah.ai is an AI-driven mock interview simulator and evaluator. Users can conduct interviews, receive instant feedback on personality traits, competency alignment, and CV optimization.',
    technologies: ['Vue.js', 'Nuxt', 'Tailwind CSS', 'webpack'],
    imageUrl: '/images/Faltah.png',
    githubUrl: null,
    featured: true,
    link: 'https://faltah.ai/apply',
    companyLink: 'https://www.linkedin.com/company/faltah',
    companyLogo: VelentsLogo,
  },
  {
    id: 'velents-talent-ai',
    title: 'Velents AI',
    description: 'AI-powered talent acquisition platform',
    technologies: [
      'WordPress',
      'Leadfeeder',
      'Microsoft Clarity',
      'Google Tag Manager',
    ],
    imageUrl: '/images/velentsAI.png',
    githubUrl: null,
    featured: true,
    link: 'https://velents.ai/',
    companyLink: 'https://www.linkedin.com/company/velents',
    companyLogo: VelentsLogo,
  },
  {
    id: 'velents-crm-sales',
    title: 'Velents CRM',
    description:
      'Developed and maintained a full-featured ATS used by HR teams to streamline hiring pipelines. The platform supports candidate management, resume screening, automated evaluations, and collaborative decision-making.',
    technologies: ['Vue.js', 'Vuex', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
    imageUrl: '/images/ATS.png',
    githubUrl: null,
    featured: true,
    link: 'https://crm.velents.com/',
    companyLink: 'https://www.linkedin.com/company/velents',
    companyLogo: VelentsLogo,
  },
  {
    id: 'hectar-real-estate',
    title: 'Hecater',
    description:
      'Search, sell, and rent. Start now — there are plenty of great options waiting for you.',
    technologies: ['Vue.js', 'Tailwind CSS', 'Vuex', 'webpack'],
    imageUrl: '/images/Hectar.png',
    githubUrl: null,
    featured: true,
    link: 'https://hectar.io/',
    companyLink: 'https://www.linkedin.com/company/hectarapp',
    companyLogo: HectarLogo,
  },
  {
    id: 'hectar-plus-sa',
    title: 'Hecater Plus',
    description:
      'HectarPlus.io is a comprehensive digital platform designed to streamline real estate operations, particularly in the Saudi Arabian market.',
    technologies: ['Vue.js', 'Tailwind CSS', 'Vuex', 'webpack'],
    imageUrl: '/images/HPlus.png',
    githubUrl: null,
    featured: true,
    link: 'https://hectarplus.io/',
    companyLink: 'https://www.linkedin.com/company/hectarapp',
    companyLogo: HectarLogo,
  },
  {
    id: 'memory-game',
    title: 'Memory Game',
    description: 'A simple memory game built with React and Tailwind CSS',
    technologies: ['React', 'Tailwind CSS'],
    imageUrl: '/images/memory-game.png',
    githubUrl: null,
    featured: true,
    link: 'https://onwmemorygame.netlify.app/',
    companyLink: 'https://www.linkedin.com/in/attar74',
    companyLogo: AvaLogo,
  },
];

export default projects;
