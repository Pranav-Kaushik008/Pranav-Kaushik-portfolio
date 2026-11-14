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

    // Initial scan and observation
    const scan = () => {
      const elements = document.querySelectorAll('.reveal:not(.visible)');
      const windowHeight = window.innerHeight;
      elements.forEach((el) => {
        observer.observe(el);
        // Instant check if already in viewport
        const rect = el.getBoundingClientRect();
        if (rect.top <= windowHeight + 100 && rect.bottom >= -50) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      });
    };

    scan();

    // Re-scan on scroll and resize as a robust fallback
    const handleScrollOrResize = () => {
      const elements = document.querySelectorAll('.reveal:not(.visible)');
      const windowHeight = window.innerHeight;
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= windowHeight + 100 && rect.bottom >= -50) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      });
    };

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    // Periodic scans for late-rendered items
    const t1 = setTimeout(scan, 200);
    const t2 = setTimeout(scan, 600);
    const t3 = setTimeout(scan, 1200);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
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
