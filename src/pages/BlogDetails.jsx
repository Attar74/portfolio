import { Link, useParams } from 'react-router-dom';
import MarkdownRenderer from '../components/MarkdownRenderer';
import blogs from '../data/blogs';

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="py-12 px-6 md:px-12 xl:px-0 w-full min-h-screen">
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-white mb-4">
            Blog Post Not Found
          </h1>
          <Link
            to="/blog"
            className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-[5rem] py-12 px-6 md:px-12 xl:px-0 w-full max-w-4xl mx-auto min-h-screen">
      {/* Back button */}
      <Link
        to="/blog"
        className="text-gray-400 hover:text-white inline-flex items-center gap-2 mb-8 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Blog
      </Link>

      {/* Blog header */}
      <article className="bg-gray-800/30 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700/50 p-8 md:p-12">
        {blog.imageUrl && (
          <div className="relative h-64 md:h-96 -mx-8 md:-mx-12 -mt-8 md:-mt-12 mb-8">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
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
                month: 'long',
                day: 'numeric',
              })}
            </span>
          )}
          {blog.author && (
            <>
              <span>•</span>
              <span>By {blog.author}</span>
            </>
          )}
          {blog.readTime && (
            <>
              <span>•</span>
              <span>{blog.readTime}</span>
            </>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {blog.title}
        </h1>

        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-blue-600/20 text-blue-400 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="prose prose-invert prose-lg max-w-none">
          <MarkdownRenderer content={blog.content || blog.description} />
        </div>
      </article>
    </div>
  );
};

export default BlogDetails;
