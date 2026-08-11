import { ArrowRight, GitBranch, Star, FolderOpen } from 'lucide-react';
import profile from '../data/profile';
import { projects } from '../data/projects';
import './GitHub.css';

export default function GitHub() {
  return (
    <section className="github section-sm" id="github" aria-label="GitHub activity">
      <div className="container">
        <div className="github__grid">
          {/* Left */}
          <div className="github__content reveal">
            <span className="eyebrow">Building & Learning</span>
            <h2 className="section-heading github__heading">
              Exploring ideas
              <br />
              <span className="text-gradient">on GitHub.</span>
            </h2>
            <p className="github__description">
              Building projects, experimenting with AI/ML techniques, and contributing to open source.
              All my work is available on GitHub.
            </p>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary github__cta"
              aria-label="View GitHub profile"
            >
              View GitHub Profile
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Right — Stats/Repos */}
          <div className="github__right">
            {/* Placeholder stats — replace with real GitHub API data */}
            <div className="github__stats-note reveal">
              <span className="label">Live data</span>
              <p>Connect the GitHub API to display live repository stats here.</p>
            </div>

            {/* Project repo cards */}
            <div className="github__repos">
              {projects.slice(0, 3).map((project, i) => (
                <a
                  key={project.id}
                  href={project.github || profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-card reveal"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                  aria-label={`GitHub repository: ${project.title}`}
                >
                  <div className="repo-card__header">
                    <FolderOpen size={14} className="repo-card__icon" />
                    <span className="repo-card__name">{project.title}</span>
                    <ArrowRight size={12} className="repo-card__arrow" />
                  </div>
                  <p className="repo-card__description">{project.description.slice(0, 90)}...</p>
                  <div className="repo-card__meta">
                    <span className="repo-card__lang">
                      <span className="repo-card__lang-dot" />
                      Python
                    </span>
                    <span className="repo-card__stars">
                      <Star size={11} />
                      —
                    </span>
                    <span className="repo-card__forks">
                      <GitBranch size={11} />
                      —
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
