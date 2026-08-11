import { useEffect } from 'react';
import { X, Github, ExternalLink, ArrowRight, Layers, Cpu, CheckCircle2, AlertCircle, Lightbulb, TrendingUp } from 'lucide-react';
import './ProjectCaseStudy.css';

export default function ProjectCaseStudy({ project, onClose }) {
  // Trap focus and handle escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <div className="modal-content case-study">
        {/* Header */}
        <div className="case-study__header">
          <div className="case-study__header-content">
            <div className="case-study__label">
              <span className="badge">{project.label}</span>
              <span className="project-number">{project.number}</span>
            </div>
            <h2 className="case-study__title">{project.title}</h2>
            <p className="case-study__subtitle">{project.subtitle}</p>
          </div>
          <button
            className="case-study__close"
            onClick={onClose}
            aria-label="Close case study"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tags */}
        <div className="case-study__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="chip chip-neutral">{tag}</span>
          ))}
        </div>

        {/* Links */}
        <div className="case-study__links">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary case-study__link"
              aria-label={`View ${project.title} on GitHub`}
            >
              <GithubIcon />
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary case-study__link"
              aria-label={`View ${project.title} live demo`}
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
        </div>

        <div className="case-study__divider" />

        {/* Body */}
        <div className="case-study__body">
          {/* Overview */}
          <section className="case-study__section">
            <h3 className="case-study__section-title">
              <Layers size={16} />
              Overview
            </h3>
            <p>{project.longDescription}</p>
          </section>

          {/* Problem & Solution */}
          <div className="case-study__two-col">
            <section className="case-study__section case-study__problem">
              <h3 className="case-study__section-title">
                <AlertCircle size={16} className="icon-problem" />
                The Problem
              </h3>
              <p>{project.problem}</p>
            </section>
            <section className="case-study__section case-study__solution">
              <h3 className="case-study__section-title">
                <CheckCircle2 size={16} className="icon-solution" />
                The Solution
              </h3>
              <p>{project.solution}</p>
            </section>
          </div>

          {/* Key Features */}
          <section className="case-study__section">
            <h3 className="case-study__section-title">
              <ArrowRight size={16} />
              Key Features
            </h3>
            <ul className="case-study__list">
              {project.keyFeatures.map((f) => (
                <li key={f} className="case-study__list-item">
                  <span className="case-study__list-dot" />
                  {f}
                </li>
              ))}
            </ul>
          </section>

          {/* Architecture */}
          <section className="case-study__section">
            <h3 className="case-study__section-title">
              <Cpu size={16} />
              Architecture
            </h3>
            <div className="case-study__arch">
              <code>{project.architecture}</code>
            </div>
          </section>

          {/* AI/ML Components */}
          <section className="case-study__section">
            <h3 className="case-study__section-title">
              <span>🧠</span>
              AI / ML Components
            </h3>
            <ul className="case-study__list">
              {project.aiComponents.map((c) => (
                <li key={c} className="case-study__list-item case-study__list-item--ai">
                  <span className="case-study__list-dot case-study__list-dot--ai" />
                  {c}
                </li>
              ))}
            </ul>
          </section>

          {/* Tech Stack */}
          <section className="case-study__section">
            <h3 className="case-study__section-title">
              <Layers size={16} />
              Technology Stack
            </h3>
            <div className="case-study__tech-grid">
              {project.techStack.map((cat) => (
                <div key={cat.category} className="case-study__tech-category">
                  <span className="case-study__tech-label">{cat.category}</span>
                  <div className="case-study__tech-chips">
                    {cat.items.map((item) => (
                      <span key={item} className="chip">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Challenges & Learnings */}
          <div className="case-study__two-col">
            <section className="case-study__section">
              <h3 className="case-study__section-title">
                <AlertCircle size={16} />
                Challenges
              </h3>
              <ul className="case-study__list">
                {project.challenges.map((c) => (
                  <li key={c} className="case-study__list-item">
                    <span className="case-study__list-dot" />
                    {c}
                  </li>
                ))}
              </ul>
            </section>

            <section className="case-study__section">
              <h3 className="case-study__section-title">
                <Lightbulb size={16} />
                What I Learned
              </h3>
              <ul className="case-study__list">
                {project.learnings.map((l) => (
                  <li key={l} className="case-study__list-item">
                    <span className="case-study__list-dot" />
                    {l}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Future Improvements */}
          <section className="case-study__section">
            <h3 className="case-study__section-title">
              <TrendingUp size={16} />
              Future Improvements
            </h3>
            <ul className="case-study__list">
              {project.futureImprovements.map((f) => (
                <li key={f} className="case-study__list-item">
                  <span className="case-study__list-dot" />
                  {f}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
