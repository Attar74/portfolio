import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Sidebar from './components/Sidebar';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import Projects from './pages/Projects';
function App() {
  return (
    <div
      className="min-h-screen bg-contain bg-center"
      style={{
        backgroundImage: "url('/dark-bg.jpeg')",
      }}
    >
      <Navbar />
      <Sidebar />
      <main className="md:max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
        </Routes>
      </main>
      <ScrollToTop />
    </div>
  );
}

export default App;
