import { useMemo } from 'react';
import {
  FaBook,
  FaBootstrap,
  FaDatabase,
  FaGraduationCap,
  FaJs,
  FaLaptop,
  FaMicrosoft,
  FaNode,
  FaPalette,
  FaReact,
  FaServer,
  FaVuejs,
} from 'react-icons/fa';
import {
  SiGoogletagmanager,
  SiNextdotjs,
  SiNuxtdotjs,
  SiTailwindcss,
  SiTypescript,
  SiWebrtc,
  SiWordpress,
} from 'react-icons/si';

export const useIcons = () => {
  const getIcon = useMemo(() => {
    return (tech) => {
      switch (tech.toLowerCase()) {
        case 'next.js':
          return <SiNextdotjs />;
        case 'react':
          return <FaReact />;
        case 'tailwind css':
          return <SiTailwindcss />;
        case 'javascript':
          return <FaJs />;
        case 'typescript':
          return <SiTypescript />;
        case 'vuex':
        case 'vue.js':
        case 'vue':
          return <FaVuejs />;
        case 'bootstrap':
          return <FaBootstrap />;
        case 'nuxt':
          return <SiNuxtdotjs />;
        case 'webpack':
          return <FaReact />;
        case 'pinia':
          return <FaDatabase />;
        case 'websockets':
        case 'websocket':
          return <SiWebrtc />;
        case 'rest apis':
        case 'rest api':
        case 'rest':
          return <FaServer />;
        case 'wordpress':
        case 'cms':
          return <SiWordpress />;
        case 'leadfeeder':
          return <FaMicrosoft />;
        case 'google tag manager':
        case 'gtm':
          return <SiGoogletagmanager />;
        case 'microsoft clarity':
        case 'clarity':
          return <FaMicrosoft />;
        case 'bsc':
        case 'bachelor':
        case 'degree':
          return <FaGraduationCap />;
        case 'books':
        case 'book':
        case 'reading':
          return <FaBook />;
        case 'laptop':
        case 'computer':
        case 'development':
          return <FaLaptop />;
        case 'design':
        case 'ui/ux':
        case 'ui':
        case 'ux':
          return <FaPalette />;
        case 'mongodb':
          return <FaDatabase />;
        case 'node.js':
        case 'nodejs':
          return <FaNode />;
        case 'netherlands':
          return <span className="text-lg">🇳🇱</span>;
        default:
          return null;
      }
    };
  }, []);

  return { getIcon };
};
