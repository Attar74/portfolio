import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import Projects from './pages/Projects';
function App() {
  return (
    <div
      className="min-h-screen bg-contain bg-center"
      style={{
        backgroundImage: "url('/src/assets/dark-bg.jpeg')",
      }}
    >
      <Navbar />
      <Sidebar />
      <main className="md:max-w-5xl mx-auto">
        <div className="flex flex-col items-center justify-center h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
