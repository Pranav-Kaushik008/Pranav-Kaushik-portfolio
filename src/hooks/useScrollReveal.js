import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — Intersection Observer hook for scroll-triggered animations.
 * Adds 'visible' class to elements with 'reveal' class when they enter the viewport.
 */
export function useScrollReveal(options = {}) {
  const defaultOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px 0px 0px',
    ...options,
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, defaultOptions);

    // Initial scan
    const scan = () => {
      const elements = document.querySelectorAll('.reveal:not(.visible)');
      elements.forEach((el) => observer.observe(el));
    };

    scan();

    // Re-scan after a short delay in case some components rendered late
    const t1 = setTimeout(scan, 300);
    const t2 = setTimeout(scan, 800);

    return () => {
      observer.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/**
 * useActiveSection — tracks which section is active based on scroll position.
 */
export function useActiveSection(sectionIds) {
  const activeSection = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140; // Navbar offset

      let currentSection = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            currentSection = id;
          }
        }
      }

      if (currentSection && activeSection.current !== currentSection) {
        activeSection.current = currentSection;
        window.dispatchEvent(
          new CustomEvent('sectionchange', { detail: currentSection })
        );
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return activeSection;
}
