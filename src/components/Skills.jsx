import { useState } from 'react';
import { Code2, Brain, Layers, Database, Wrench } from 'lucide-react';
import { skillCategories } from '../data/skills';
import './Skills.css';

const ICON_MAP = {
  Code2,
  Brain,
  Layers,
  Database,
  Wrench,
};

const LEVEL_COLORS = {
  expert: { bg: 'rgba(99, 102, 241, 0.12)', border: 'rgba(99, 102, 241, 0.3)', text: '#a5b4fc' },
  proficient: { bg: 'rgba(16, 185, 129, 0.08)', border: 'rgba(16, 185, 129, 0.2)', text: '#6ee7b7' },
  familiar: { bg: 'rgba(245, 158, 11, 0.08)', border: 'rgba(245, 158, 11, 0.2)', text: '#fcd34d' },
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);

  const activeSkills = skillCategories.find((c) => c.id === activeCategory)?.skills || [];

  return (
    <section className="skills section" id="skills" aria-label="Skills">
      <div className="container">
        <div className="skills__header reveal">
          <span className="eyebrow">What I Work With</span>
          <h2 className="section-heading">Technical Skills</h2>
          <p className="section-subheading">
            A curated set of technologies I use to build AI applications and software systems.
          </p>
        </div>

        <div className="skills__layout">
          {/* Category Tabs */}
          <nav className="skills__tabs" role="tablist" aria-label="Skill categories">
            {skillCategories.map((category) => {
              const Icon = ICON_MAP[category.icon];
              return (
                <button
                  key={category.id}
                  role="tab"
                  aria-selected={activeCategory === category.id}
                  aria-controls={`skills-panel-${category.id}`}
                  className={`skills__tab ${activeCategory === category.id ? 'skills__tab--active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {Icon && <Icon size={16} />}
                  <span>{category.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Skills Panel */}
          <div
            id={`skills-panel-${activeCategory}`}
            role="tabpanel"
            aria-label={`${skillCategories.find((c) => c.id === activeCategory)?.label} skills`}
            className="skills__panel"
          >
            <div className="skills__chips">
              {activeSkills.map((skill, i) => {
                const colors = LEVEL_COLORS[skill.level] || LEVEL_COLORS.familiar;
                return (
                  <div
                    key={skill.name}
                    className="skill-chip"
                    style={{
                      '--chip-bg': colors.bg,
                      '--chip-border': colors.border,
                      '--chip-text': colors.text,
                      animationDelay: `${i * 0.04}s`,
                    }}
                    title={`${skill.name} — ${skill.level}`}
                  >
                    <span className="skill-chip__dot" />
                    <span className="skill-chip__name">{skill.name}</span>
                    <span className="skill-chip__level">{skill.level}</span>
                  </div>
                );
              })}
            </div>

            {/* Level Legend */}
            <div className="skills__legend">
              <span className="skills__legend-label">Proficiency:</span>
              {Object.entries(LEVEL_COLORS).map(([level, colors]) => (
                <span
                  key={level}
                  className="skills__legend-item"
                  style={{ color: colors.text }}
                >
                  <span
                    className="skills__legend-dot"
                    style={{ background: colors.text }}
                  />
                  {level}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
