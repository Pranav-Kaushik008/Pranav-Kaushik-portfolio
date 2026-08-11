import { useState, useEffect } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import profile from '../data/profile';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleSectionChange = (e) => setActiveSection(e.detail);
    window.addEventListener('sectionchange', handleSectionChange);
    return () => window.removeEventListener('sectionchange', handleSectionChange);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container navbar__inner">
          {/* Logo */}
          <a
            href="#"
            className="navbar__logo"
            aria-label={`${profile.name} — Home`}
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <span className="navbar__logo-mark">PK</span>
            <span className="navbar__logo-text">{profile.name}</span>
          </a>

          {/* Desktop Nav */}
          <div className="navbar__links" role="menubar">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`navbar__link ${activeSection === link.href.slice(1) ? 'navbar__link--active' : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
                role="menuitem"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary navbar__resume"
            aria-label="View resume"
          >
            <FileText size={14} />
            Resume
          </a>

          {/* Mobile Toggle */}
          <button
            className="navbar__toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-menu__nav">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-menu__link"
              style={{ animationDelay: `${i * 0.06}s` }}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-menu__resume btn btn-primary"
            style={{ animationDelay: `${NAV_LINKS.length * 0.06}s` }}
          >
            <FileText size={14} />
            Download Resume
          </a>
        </nav>
      </div>
    </>
  );
}
