import React from 'react';

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

  return (
    <div className="grid grid-cols-2 gap-6 bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer">
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

          <span className="flex items-center gap-1 hover:scale-105 transition-all duration-300 cursor-pointer">
            <a href={companyLink} target="_blank" rel="noopener noreferrer">
              <img
                src={companyLogo}
                alt="Velents Logo"
                className=" hover:scale-105 transition-all duration-300 w-8 h-8"
              />
            </a>
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {description}
        </p>

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
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
