import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import GitHub from './components/GitHub';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useScrollReveal, useActiveSection } from './hooks/useScrollReveal';
import './App.css';

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'experience', 'certifications', 'github', 'contact'];

export default function App() {
  // Initialize scroll reveal
  useScrollReveal();

  // Track active section for navbar
  useActiveSection(SECTION_IDS);

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
        <Certifications />
        <GitHub />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
