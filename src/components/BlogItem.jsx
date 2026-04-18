import { Link } from 'react-router-dom';

const BlogItem = ({ blog }) => {
  return (
    <Link
      to={`/blog/${blog.id}`}
      className="group block bg-gray-800/30 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-800/50 transition-all duration-300 border border-gray-700/50 hover:border-gray-600"
    >
      {blog.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
          {blog.date && (
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {new Date(blog.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          )}
          {blog.readTime && (
            <>
              <span>•</span>
              <span>{blog.readTime}</span>
            </>
          )}
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
          {blog.title}
        </h3>

        <p className="text-gray-300 mb-4 line-clamp-3">{blog.description}</p>

        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs bg-blue-600/20 text-blue-400 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center text-blue-400 group-hover:text-blue-300">
          <span className="text-sm font-medium">Read More</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default BlogItem;
