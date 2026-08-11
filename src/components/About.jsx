import { Brain, Cpu, BarChart3, Code2 } from 'lucide-react';
import profile from '../data/profile';
import './About.css';

const PROFILE_CARDS = [
  {
    icon: Brain,
    title: 'AI / ML',
    description: 'Machine learning, deep learning, LLMs, and generative AI systems',
    accent: '#6366F1',
  },
  {
    icon: Cpu,
    title: 'Generative AI',
    description: 'LLM integration, RAG pipelines, AI agents, and prompt engineering',
    accent: '#8B5CF6',
  },
  {
    icon: Code2,
    title: 'Software Engineering',
    description: 'Full-stack development with Python, React, FastAPI, and REST APIs',
    accent: '#06b6d4',
  },
  {
    icon: BarChart3,
    title: 'Data & Analytics',
    description: 'Data processing, ML pipelines, MLflow, and model explainability',
    accent: '#10b981',
  },
];

export default function About() {
  return (
    <section className="about section" id="about" aria-label={`About ${profile.name}`}>
      <div className="container">
        <div className="about__grid">
          {/* Left */}
          <div className="about__content">
            <span className="eyebrow">About Me</span>
            <h2 className="section-heading about__heading">
              Engineer at the intersection of
              <span className="text-gradient"> AI and Software.</span>
            </h2>

            <div className="about__bio">
              <p>
                I&apos;m {profile.name} — an AI/ML Engineer and Software Developer passionate about
                building intelligent applications that solve real-world problems. My work spans
                machine learning, generative AI, and full-stack software engineering.
              </p>
              <p>
                I specialize in designing and building end-to-end AI systems — from training
                and fine-tuning models to deploying them in production-ready applications.
                I&apos;m particularly focused on the emerging space of Generative AI, LLMs,
                and AI agents.
              </p>
              <p>
                Beyond the models, I care deeply about software quality — clean architecture,
                scalable APIs, and products that users actually want to use.
              </p>
            </div>

            <div className="about__focus">
              <span className="label">Current Focus</span>
              <div className="about__focus-chips">
                {['Generative AI', 'LLMs & RAG', 'AI Agents', 'MLOps'].map((f) => (
                  <span key={f} className="chip">{f}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Profile Cards */}
          <div className="about__visual">
            <div className="about__cards-grid">
              {PROFILE_CARDS.map((card, i) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="about__card reveal"
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  >
                    <div
                      className="about__card-icon"
                      style={{ background: card.accent + '15', borderColor: card.accent + '30', color: card.accent }}
                    >
                      <Icon size={18} />
                    </div>
                    <h3 className="about__card-title">{card.title}</h3>
                    <p className="about__card-description">{card.description}</p>
                    <div
                      className="about__card-accent"
                      style={{ background: card.accent }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
