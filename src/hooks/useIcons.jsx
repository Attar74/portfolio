import { useMemo } from 'react';
import {
  FaBootstrap,
  FaDatabase,
  FaJs,
  FaMicrosoft,
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
        default:
          return null;
      }
    };
  }, []);

  return { getIcon };
};
