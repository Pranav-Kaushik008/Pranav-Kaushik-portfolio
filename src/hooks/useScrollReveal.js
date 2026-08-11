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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection.current = entry.target.id;
            window.dispatchEvent(
              new CustomEvent('sectionchange', { detail: entry.target.id })
            );
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -30% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}
