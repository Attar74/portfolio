import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useIcons } from '../hooks/useIcons.jsx';
const ProjectItem = ({ project }) => {
  const { getIcon } = useIcons();
  const navigate = useNavigate();
  const {
    title,
    description,
    technologies,
    imageUrl,
    link,
    companyLink,
    companyLogo,
    id,
  } = project;

  return (
    <button onClick={() => navigate(`/projects/${id}`)}>
      <div className="relative group overflow-hidden rounded-xl transition-all duration-300 hover:shadow-xl cursor-pointer">
        {/* Project Image - Always visible */}
        <div className="relative w-full min-h-96 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full min-h-96 object-cover transition-transform duration-500 group-hover:scale-110"
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
              {technologies[0].title}
            </div>
          )}

          {/* Overlay with details - always visible on small screens, hover on larger screens */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/80 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 md:p-5">
            <div className="flex flex-col justify-end gap-4 h-full md:h-3/4">
              {/* Header */}
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-white">{title}</h3>

                {companyLink && (
                  <span className="flex items-center gap-1 hover:scale-105 transition-all duration-300 cursor-pointer rounded-full bg-black/25 p-2">
                    <a
                      href={companyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        src={companyLogo}
                        alt="Company Logo"
                        className="hover:scale-105 transition-all duration-300 w-8 h-8 rounded-full"
                      />
                    </a>
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-200 text-sm line-clamp-2">
                {description}
              </p>

              {/* Technologies */}
              <div className="flex flex-col space-y-2">
                <div className="flex flex-wrap gap-2">
                  {technologies &&
                    technologies.length > 0 &&
                    technologies.map((tech) => (
                      <span
                        key={tech}
                        className="flex items-center gap-1 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white text-xs px-2 py-1 rounded-full"
                      >
                        {getIcon(tech)} {tech}
                      </span>
                    ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col md:flex-row gap-2">
                <Link
                  to={`/projects/${id}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-md text-sm font-medium transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Details
                </Link>

                {link && (
                  <Link
                    to={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white text-center py-2 px-4 rounded-md text-sm font-medium transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Check it out
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ProjectItem;
