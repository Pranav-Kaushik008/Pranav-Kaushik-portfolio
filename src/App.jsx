import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import GitHub from './components/GitHub';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPortal from './components/Admin/AdminPortal';
import { useScrollReveal, useActiveSection } from './hooks/useScrollReveal';
import './App.css';

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'certifications', 'github', 'contact'];

export default function App() {
  // Check if current route is admin portal
  const [isAdminRoute, setIsAdminRoute] = useState(() => {
    return (
      window.location.pathname === '/admin' ||
      window.location.pathname === '/admin/' ||
      window.location.hash === '#/admin' ||
      window.location.hash === '#admin'
    );
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const isAdmin =
        window.location.pathname === '/admin' ||
        window.location.pathname === '/admin/' ||
        window.location.hash === '#/admin' ||
        window.location.hash === '#admin';
      setIsAdminRoute(isAdmin);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleBackToSite = () => {
    window.history.pushState(null, '', '/');
    setIsAdminRoute(false);
  };

  // Initialize scroll reveal
  useScrollReveal();

  // Track active section for navbar
  useActiveSection(SECTION_IDS);

  // Render Admin Portal if on /admin route
  if (isAdminRoute) {
    return <AdminPortal onBackToSite={handleBackToSite} />;
  }

  // Render Public Portfolio
  return (
    <div className="app">
      {/* Subtle grid background */}
      <div className="grid-bg" aria-hidden="true" />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <GitHub />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
