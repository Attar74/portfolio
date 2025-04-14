import React from 'react';
import { Link } from 'react-router-dom';

const ProjectItem = ({ project }) => {
  const { id, title, description, technologies, imageUrl, demoUrl } = project;

  return (
    <div className="grid grid-cols-2 gap-6 bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
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
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h3>

          {/* Project logo/icon */}
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
            <span className="text-sm font-bold">{title.charAt(0)}</span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Action buttons */}
        <div className="flex space-x-2">
          <Link
            to={`/projects/${id}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-md text-sm font-medium transition-colors"
          >
            View Details
          </Link>

          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white text-center py-2 px-4 rounded-md text-sm font-medium transition-colors"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
