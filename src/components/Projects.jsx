import { useState } from 'react';
import { ArrowRight, ExternalLink, BookOpen } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectCaseStudy from './ProjectCaseStudy';
import './Projects.css';

// SVG preview illustrations for each project
function ProjectPreview({ id }) {
  if (id === 'intelliprocure-ai') {
    return (
      <svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" className="project-preview-svg" aria-hidden="true">
        <defs>
          <linearGradient id="proc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {/* Background */}
        <rect width="480" height="300" fill="url(#proc-grad)" rx="12" />
        {/* Sidebar */}
        <rect x="0" y="0" width="120" height="300" fill="rgba(13,17,23,0.8)" rx="12 0 0 12" />
        <rect x="12" y="20" width="96" height="8" rx="4" fill="#6366F1" opacity="0.6" />
        {[50,70,90,110,130].map((y, i) => (
          <rect key={y} x="12" y={y} width={60 + i * 8} height="6" rx="3" fill="rgba(255,255,255,0.1)" />
        ))}
        {/* Active item */}
        <rect x="8" y="156" width="104" height="28" rx="6" fill="rgba(99,102,241,0.15)" stroke="#6366F1" strokeWidth="0.5" />
        <rect x="20" y="166" width="80" height="6" rx="3" fill="#6366F1" opacity="0.7" />
        {/* Main content */}
        <rect x="140" y="20" width="320" height="260" rx="8" fill="rgba(13,17,23,0.6)" />
        {/* Header bar */}
        <rect x="140" y="20" width="320" height="40" rx="8" fill="rgba(17,24,39,0.8)" />
        <text x="160" y="44" fontFamily="Inter, sans-serif" fontSize="11" fill="rgba(248,250,252,0.8)" fontWeight="600">IntelliProcure AI — Procurement Assistant</text>
        {/* Chat messages */}
        <rect x="160" y="80" width="200" height="40" rx="8" fill="rgba(99,102,241,0.12)" stroke="rgba(99,102,241,0.2)" strokeWidth="0.5" />
        <text x="172" y="96" fontFamily="Inter, sans-serif" fontSize="9" fill="rgba(165,180,252,0.9)">Analyze Q3 procurement spend</text>
        <text x="172" y="110" fontFamily="Inter, sans-serif" fontSize="9" fill="rgba(165,180,252,0.7)">by vendor category</text>
        {/* AI response */}
        <rect x="160" y="136" width="260" height="60" rx="8" fill="rgba(17,24,39,0.9)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <rect x="172" y="148" width="120" height="5" rx="2.5" fill="rgba(255,255,255,0.15)" />
        <rect x="172" y="158" width="200" height="5" rx="2.5" fill="rgba(255,255,255,0.1)" />
        <rect x="172" y="168" width="160" height="5" rx="2.5" fill="rgba(255,255,255,0.08)" />
        <rect x="172" y="178" width="100" height="5" rx="2.5" fill="rgba(255,255,255,0.06)" />
        {/* Input bar */}
        <rect x="160" y="220" width="280" height="36" rx="8" fill="rgba(17,24,39,0.8)" stroke="rgba(99,102,241,0.2)" strokeWidth="1" />
        <text x="176" y="242" fontFamily="Inter, sans-serif" fontSize="10" fill="rgba(100,116,139,1)">Ask about procurement data...</text>
        <rect x="410" y="228" width="20" height="20" rx="5" fill="#6366F1" />
        {/* Agent badge */}
        <rect x="340" y="80" width="100" height="22" rx="11" fill="rgba(99,102,241,0.2)" stroke="rgba(99,102,241,0.4)" strokeWidth="0.5" />
        <text x="357" y="94" fontFamily="Inter, sans-serif" fontSize="9" fill="#a5b4fc" fontWeight="600">🤖 AI AGENT</text>
      </svg>
    );
  }

  if (id === 'smart-travel-planner') {
    return (
      <svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" className="project-preview-svg" aria-hidden="true">
        <defs>
          <linearGradient id="travel-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <rect width="480" height="300" fill="url(#travel-grad)" rx="12" />
        <rect x="20" y="20" width="160" height="260" rx="8" fill="rgba(13,17,23,0.8)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <text x="36" y="44" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" fill="#06b6d4">✈️ Trip Itinerary</text>
        <text x="36" y="60" fontFamily="Inter, sans-serif" fontSize="8" fill="rgba(148,163,184,0.8)">Tokyo, Japan • 5 Days</text>
        {[
          { day: 'Day 1', title: 'Shinjuku & Shibuya', time: '9:00 AM' },
          { day: 'Day 2', title: 'Asakusa & Akihabara', time: '10:00 AM' },
          { day: 'Day 3', title: 'Mount Fuji Day Tour', time: '7:30 AM' },
          { day: 'Day 4', title: 'Ginza & Roppongi', time: '10:30 AM' },
        ].map((item, idx) => (
          <g key={item.day}>
            <rect x="32" y={80 + idx * 46} width="136" height="38" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            <text x="42" y={95 + idx * 46} fontFamily="Inter, sans-serif" fontSize="8" fontWeight="700" fill="#6366F1">{item.day}</text>
            <text x="42" y={108 + idx * 46} fontFamily="Inter, sans-serif" fontSize="8" fill="rgba(248,250,252,0.85)">{item.title}</text>
          </g>
        ))}
        <rect x="196" y="20" width="264" height="260" rx="8" fill="rgba(13,17,23,0.7)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <text x="212" y="44" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="rgba(248,250,252,0.8)">Map & Route Optimizer</text>
        <circle cx="260" cy="110" r="18" fill="rgba(99,102,241,0.15)" stroke="#6366F1" strokeWidth="1" />
        <circle cx="380" cy="140" r="14" fill="rgba(6,182,212,0.15)" stroke="#06b6d4" strokeWidth="1" />
        <circle cx="310" cy="200" r="16" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6" strokeWidth="1" />
        <path d="M 260 110 Q 330 100 380 140 T 310 200" fill="none" stroke="rgba(99,102,241,0.4)" strokeWidth="1.5" strokeDasharray="4 3" />
        <rect x="212" y="240" width="120" height="22" rx="11" fill="rgba(6,182,212,0.15)" stroke="rgba(6,182,212,0.3)" strokeWidth="0.5" />
        <text x="226" y="254" fontFamily="Inter, sans-serif" fontSize="8" fill="#6ee7b7" fontWeight="600">🤖 AI Route Optimization</text>
      </svg>
    );
  }

  if (id === 'fraudshield-ai') {
    return (
      <svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" className="project-preview-svg" aria-hidden="true">
        <defs>
          <linearGradient id="fraud-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        <rect width="480" height="300" fill="url(#fraud-grad)" rx="12" />
        {/* Top metrics */}
        {[
          { x: 20, label: 'Transactions', val: '12,847', color: '#6366F1' },
          { x: 140, label: 'Flagged', val: '234', color: '#f87171' },
          { x: 260, label: 'Risk Score', val: '0.87', color: '#fbbf24' },
          { x: 380, label: 'Accuracy', val: '94.2%', color: '#34d399' },
        ].map((m) => (
          <g key={m.x}>
            <rect x={m.x} y="16" width="96" height="56" rx="8" fill="rgba(13,17,23,0.8)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            <text x={m.x + 10} y="36" fontFamily="Inter, sans-serif" fontSize="8" fill="rgba(148,163,184,0.8)">{m.label}</text>
            <text x={m.x + 10} y="56" fontFamily="Inter, sans-serif" fontSize="16" fontWeight="700" fill={m.color}>{m.val}</text>
          </g>
        ))}
        {/* Transaction table */}
        <rect x="20" y="88" width="280" height="192" rx="8" fill="rgba(13,17,23,0.8)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <text x="32" y="108" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" fill="rgba(248,250,252,0.8)">Recent Transactions</text>
        {[
          { y: 124, id: 'TXN-8821', amt: '$4,200', risk: 'LOW', color: '#34d399' },
          { y: 148, id: 'TXN-8822', amt: '$89,500', risk: 'HIGH', color: '#f87171' },
          { y: 172, id: 'TXN-8823', amt: '$1,050', risk: 'LOW', color: '#34d399' },
          { y: 196, id: 'TXN-8824', amt: '$12,000', risk: 'MED', color: '#fbbf24' },
          { y: 220, id: 'TXN-8825', amt: '$250', risk: 'LOW', color: '#34d399' },
          { y: 244, id: 'TXN-8826', amt: '$67,300', risk: 'HIGH', color: '#f87171' },
        ].map((tx) => (
          <g key={tx.id}>
            <text x="32" y={tx.y} fontFamily="monospace" fontSize="9" fill="rgba(148,163,184,0.7)">{tx.id}</text>
            <text x="130" y={tx.y} fontFamily="Inter, sans-serif" fontSize="9" fill="rgba(248,250,252,0.8)" fontWeight="500">{tx.amt}</text>
            <rect x="210" y={tx.y - 10} width="36" height="14" rx="7" fill={tx.color + '25'} />
            <text x="216" y={tx.y} fontFamily="Inter, sans-serif" fontSize="8" fontWeight="600" fill={tx.color}>{tx.risk}</text>
          </g>
        ))}
        {/* SHAP Chart */}
        <rect x="316" y="88" width="148" height="192" rx="8" fill="rgba(13,17,23,0.8)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <text x="328" y="108" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" fill="rgba(248,250,252,0.8)">SHAP Values</text>
        {[
          { label: 'Amount', val: 80, color: '#f87171' },
          { label: 'Location', val: 60, color: '#f87171' },
          { label: 'Merchant', val: 45, color: '#fbbf24' },
          { label: 'Hour', val: 30, color: '#34d399' },
          { label: 'Device', val: 20, color: '#34d399' },
        ].map((s, i) => (
          <g key={s.label}>
            <text x="328" y={130 + i * 28} fontFamily="Inter, sans-serif" fontSize="8" fill="rgba(148,163,184,0.8)">{s.label}</text>
            <rect x="328" y={135 + i * 28} width={s.val} height="8" rx="4" fill={s.color + '60'} />
            <rect x="328" y={135 + i * 28} width={s.val * 0.6} height="8" rx="4" fill={s.color} opacity="0.8" />
          </g>
        ))}
      </svg>
    );
  }

  if (id === 'ai-resume-screening') {
    return (
      <svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" className="project-preview-svg" aria-hidden="true">
        <defs>
          <linearGradient id="resume-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        <rect width="480" height="300" fill="url(#resume-grad)" rx="12" />
        {/* Left — Resume */}
        <rect x="20" y="20" width="180" height="260" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <rect x="32" y="32" width="60" height="60" rx="30" fill="rgba(99,102,241,0.15)" stroke="rgba(99,102,241,0.3)" strokeWidth="1" />
        <text x="62" y="66" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fill="#6366F1" fontWeight="700">PK</text>
        <rect x="100" y="40" width="88" height="7" rx="3.5" fill="rgba(248,250,252,0.7)" />
        <rect x="100" y="52" width="68" height="5" rx="2.5" fill="rgba(148,163,184,0.5)" />
        <rect x="100" y="62" width="78" height="5" rx="2.5" fill="rgba(99,102,241,0.5)" />
        {[100,112,124,136,148,160,172].map((y) => (
          <rect key={y} x="32" y={y} width={100 + Math.sin(y) * 40} height="5" rx="2.5" fill="rgba(255,255,255,0.08)" />
        ))}
        {/* Match score */}
        <rect x="32" y="196" width="156" height="32" rx="8" fill="rgba(99,102,241,0.15)" stroke="rgba(99,102,241,0.3)" strokeWidth="0.5" />
        <text x="40" y="212" fontFamily="Inter, sans-serif" fontSize="9" fill="#a5b4fc">Semantic Match</text>
        <text x="152" y="216" textAnchor="end" fontFamily="Inter, sans-serif" fontSize="16" fontWeight="700" fill="#6366F1">94%</text>
        {/* Skill tags */}
        {[
          { x: 32, y: 240, label: 'Python', color: '#6366F1' },
          { x: 84, y: 240, label: 'ML', color: '#8B5CF6' },
          { x: 116, y: 240, label: 'LLMs', color: '#06b6d4' },
        ].map((t) => (
          <g key={t.label}>
            <rect x={t.x} y={t.y - 12} width={t.label.length * 7 + 12} height="16" rx="8" fill={t.color + '20'} />
            <text x={t.x + 6} y={t.y} fontFamily="Inter, sans-serif" fontSize="8" fontWeight="600" fill={t.color}>{t.label}</text>
          </g>
        ))}
        {/* Right — Results */}
        <rect x="216" y="20" width="244" height="260" rx="8" fill="rgba(13,17,23,0.7)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <text x="228" y="44" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="rgba(248,250,252,0.8)">Candidate Rankings</text>
        {[
          { rank: '#1', name: 'Pranav K.', score: 94, color: '#34d399' },
          { rank: '#2', name: 'Candidate B', score: 87, color: '#6366F1' },
          { rank: '#3', name: 'Candidate C', score: 79, color: '#6366F1' },
          { rank: '#4', name: 'Candidate D', score: 71, color: '#fbbf24' },
          { rank: '#5', name: 'Candidate E', score: 58, color: '#f87171' },
        ].map((c, i) => (
          <g key={c.rank}>
            <rect x="228" y={56 + i * 38} width="220" height="30" rx="6" fill={i === 0 ? 'rgba(52,211,153,0.08)' : 'rgba(255,255,255,0.02)'} stroke={i === 0 ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.04)'} strokeWidth="0.5" />
            <text x="238" y={75 + i * 38} fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" fill="rgba(148,163,184,0.6)">{c.rank}</text>
            <text x="262" y={75 + i * 38} fontFamily="Inter, sans-serif" fontSize="9" fill="rgba(248,250,252,0.8)">{c.name}</text>
            <rect x="350" y={62 + i * 38} width="80" height="6" rx="3" fill="rgba(255,255,255,0.06)" />
            <rect x="350" y={62 + i * 38} width={c.score * 0.8} height="6" rx="3" fill={c.color + '80'} />
            <text x="436" y={74 + i * 38} fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" fill={c.color}>{c.score}%</text>
          </g>
        ))}
        {/* AI badge */}
        <rect x="228" y="254" width="100" height="18" rx="9" fill="rgba(99,102,241,0.15)" />
        <text x="236" y="266" fontFamily="Inter, sans-serif" fontSize="8" fill="#a5b4fc" fontWeight="600">🧠 Semantic Matching</text>
      </svg>
    );
  }

  return null;
}

function FeaturedProjectCard({ project, onCaseStudy, isReversed }) {
  return (
    <article
      className={`featured-project ${isReversed ? 'featured-project--reversed' : ''}`}
      aria-label={project.title}
    >
      {/* Content */}
      <div className="featured-project__content">
        <div className="featured-project__meta">
          <span className="project-number">{project.number}</span>
          <span className="badge">{project.label}</span>
        </div>
        <h3 className="featured-project__title">{project.title}</h3>
        <p className="featured-project__subtitle">{project.subtitle}</p>
        <p className="featured-project__description">{project.description}</p>

        <div className="featured-project__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="chip chip-neutral">{tag}</span>
          ))}
        </div>

        <div className="featured-project__actions">
          {project.caseStudy && (
            <button
              className="btn btn-primary"
              onClick={() => onCaseStudy(project)}
              aria-label={`View ${project.title} case study`}
            >
              <BookOpen size={14} />
              View Case Study
            </button>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              aria-label={`${project.title} GitHub repository`}
            >
              <GithubIconSmall />
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="arrow-link"
              aria-label={`${project.title} live demo`}
            >
              Live Demo <ArrowRight size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Preview */}
      <div className="featured-project__preview">
        <div className="featured-project__preview-inner">
          <ProjectPreview id={project.id} />
        </div>
        <div className="featured-project__preview-glow" aria-hidden="true" />
      </div>
    </article>
  );
}

function SmallProjectCard({ project, onCaseStudy }) {
  return (
    <article className="small-project card" aria-label={project.title}>
      <div className="small-project__header">
        <span className="project-number">{project.number}</span>
        <div className="small-project__links">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              aria-label={`GitHub: ${project.title}`}
              style={{ padding: '6px 8px' }}
            >
              <GithubIconSmall />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              aria-label={`Live demo: ${project.title}`}
              style={{ padding: '6px 8px' }}
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      <h3 className="small-project__title">{project.title}</h3>
      <p className="small-project__description">{project.description}</p>

      <div className="small-project__tags">
        {project.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="chip chip-neutral">{tag}</span>
        ))}
      </div>

      {project.caseStudy && (
        <button
          className="small-project__case-study arrow-link"
          onClick={() => onCaseStudy(project)}
          aria-label={`View ${project.title} case study`}
        >
          Case Study <ArrowRight size={12} />
        </button>
      )}
    </article>
  );
}

function GithubIconSmall() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function Projects() {
  const [caseStudyProject, setCaseStudyProject] = useState(null);

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <>
      <section className="projects section" id="projects" aria-label="Projects">
        <div className="container">
          <div className="projects__header reveal">
            <span className="eyebrow">Selected Work</span>
            <h2 className="section-heading">Building practical<br />intelligent systems.</h2>
            <p className="section-subheading">
              End-to-end AI applications — from research to production.
            </p>
          </div>

          {/* Featured Projects */}
          <div className="projects__featured">
            {featuredProjects.map((project, i) => (
              <FeaturedProjectCard
                key={project.id}
                project={project}
                onCaseStudy={setCaseStudyProject}
                isReversed={i % 2 !== 0}
              />
            ))}
          </div>

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <div className="projects__grid">
              {otherProjects.map((project) => (
                <SmallProjectCard
                  key={project.id}
                  project={project}
                  onCaseStudy={setCaseStudyProject}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Case Study Modal */}
      {caseStudyProject && (
        <ProjectCaseStudy
          project={caseStudyProject}
          onClose={() => setCaseStudyProject(null)}
        />
      )}
    </>
  );
}
