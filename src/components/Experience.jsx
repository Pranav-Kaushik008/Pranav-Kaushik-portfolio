import { useEffect } from 'react';
import { experiences } from '../data/experience';
import './Experience.css';

export default function Experience() {
  // Re-observe any new .reveal elements after this section mounts
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('#experience .reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="experience section" id="experience" aria-label="Experience">
      <div className="container">
        <div className="experience__header reveal">
          <span className="eyebrow">Experience</span>
          <h2 className="section-heading">Professional Journey</h2>
        </div>

        <div className="timeline">
          {experiences.map((exp, i) => (
            <article
              key={exp.id}
              className="timeline__item reveal"
              style={{ transitionDelay: `${i * 0.12}s` }}
              aria-label={`${exp.role} at ${exp.company}`}
            >
              {/* Timeline dot */}
              <div className="timeline__dot" aria-hidden="true">
                <span className="timeline__dot-inner" />
              </div>

              {/* Card */}
              <div className="timeline__card">
                <div className="timeline__card-header">
                  <div>
                    <div className="timeline__role">{exp.role}</div>
                    <div className="timeline__company">{exp.company}</div>
                  </div>
                  <div className="timeline__meta">
                    <span className="chip chip-neutral timeline__type">{exp.type}</span>
                    <span className="timeline__period">{exp.period}</span>
                  </div>
                </div>

                <p className="timeline__description">{exp.description}</p>

                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="timeline__list" aria-label="Responsibilities">
                    {exp.responsibilities.map((r) => (
                      <li key={r} className="timeline__list-item">
                        <span className="timeline__list-dot" />
                        {r}
                      </li>
                    ))}
                  </ul>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="timeline__tech">
                    {exp.technologies.map((t) => (
                      <span key={t} className="chip chip-neutral">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}

          {/* Timeline line */}
          <div className="timeline__line" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
