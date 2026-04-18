import BlogItem from '../components/BlogItem';
import blogs from '../data/blogs';

const Blog = () => {
  return (
    <div className="mt-24 py-12 px-6 md:px-12 xl:px-0 w-full min-h-screen">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">Blog</h1>
        <div className="w-20 h-1 bg-blue-600 mb-4"></div>
        <p className="text-gray-300 text-lg max-w-2xl">
          Thoughts, tutorials, and insights on web development, programming, and
          technology.
        </p>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-semibold text-gray-400 mb-2">
            No blog posts yet
          </h2>
          <p className="text-gray-500">Check back soon for new content!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogItem key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
