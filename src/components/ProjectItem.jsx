import React from 'react';
import { FaBootstrap, FaJs, FaReact, FaVuejs } from 'react-icons/fa';
import {
  SiNextdotjs,
  SiNuxtdotjs,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';

const ProjectItem = ({ project }) => {
  const {
    title,
    description,
    technologies,
    imageUrl,
    link,
    companyLink,
    companyLogo,
  } = project;

  const getIcon = (tech) => {
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
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {title.charAt(0)}
            </span>
          </div>
        )}

        {/* Technology badge - show first technology */}
        {technologies && technologies.length > 0 && (
          <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white text-xs font-medium px-2 py-1 rounded">
            {technologies[0]}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between gap-4 p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h3>

          {companyLink && (
            <span className="flex items-center gap-1 hover:scale-105 transition-all duration-300 cursor-pointer">
              <a href={companyLink} target="_blank" rel="noopener noreferrer">
                <img
                  src={companyLogo}
                  alt="Velents Logo"
                  className=" hover:scale-105 transition-all duration-300 w-8 h-8"
                />
              </a>
            </span>
          )}
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          {technologies && technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="flex items-center gap-1 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white text-xs px-2 py-1 rounded-full"
                >
                  {getIcon(tech)} {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          {/* <Link
            to={link}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-md text-sm font-medium transition-colors"
          >
            View Details
          </Link> */}

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white text-center py-2 px-4 rounded-md text-sm font-medium transition-colors"
            >
              Check it out
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
