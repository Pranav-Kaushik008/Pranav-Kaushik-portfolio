import { Award, ExternalLink } from 'lucide-react';
import { certifications } from '../data/certifications';
import './Certifications.css';

const PROVIDER_STYLES = {
  Oracle: {
    bg: 'rgba(239, 68, 68, 0.08)',
    border: 'rgba(239, 68, 68, 0.2)',
    text: '#f87171',
  },
  Cisco: {
    bg: 'rgba(6, 182, 212, 0.08)',
    border: 'rgba(6, 182, 212, 0.2)',
    text: '#38bdf8',
  },
  default: {
    bg: 'rgba(99, 102, 241, 0.08)',
    border: 'rgba(99, 102, 241, 0.2)',
    text: '#a5b4fc',
  },
};

export default function Certifications() {
  return (
    <section className="certifications section-sm" id="certifications" aria-label="Certifications">
      <div className="container">
        <div className="certifications__header reveal">
          <span className="eyebrow">Credentials</span>
          <h2 className="section-heading">Certifications</h2>
          <p className="section-subheading">
            Professional certifications in cloud AI, data science, and enterprise software.
          </p>
        </div>

        <div className="certifications__grid">
          {certifications.map((cert, i) => {
            const styles = PROVIDER_STYLES[cert.provider] || PROVIDER_STYLES.default;
            return (
              <article
                key={cert.id}
                className="cert-card reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
                aria-label={cert.title}
              >
                <div className="cert-card__top">
                  <div
                    className="cert-card__icon"
                    style={{ background: styles.bg, borderColor: styles.border }}
                  >
                    <Award size={18} style={{ color: styles.text }} />
                  </div>
                  <span
                    className="cert-card__provider"
                    style={{ color: styles.text, background: styles.bg, borderColor: styles.border }}
                  >
                    {cert.providerShort}
                  </span>
                </div>

                <h3 className="cert-card__title">{cert.title}</h3>
                <p className="cert-card__description">{cert.description}</p>

                <div className="cert-card__footer">
                  {cert.credential && cert.credential !== 'TODO: Add credential ID' && (
                    <span className="cert-card__credential">
                      ID: {cert.credential}
                    </span>
                  )}
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-card__verify arrow-link"
                      aria-label={`Verify ${cert.title} credential`}
                    >
                      Verify <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
