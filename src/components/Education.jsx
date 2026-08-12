import { motion } from 'framer-motion';
import './Education.css';
import { education } from '../data/education';

const Education = () => {
  return (
    <section id="education" className="education-section">
      <div className="education-container">

        {/* Section Heading */}
        <motion.div
          className="education-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <span className="education-eyebrow">EDUCATION</span>

          <h2>
            Academic <span>Foundation</span>
          </h2>

          <p>
            Building a strong foundation in Information Science and Engineering.
          </p>
        </motion.div>

        {/* Education Card */}
        <div className="education-grid">
          {education.map((item, index) => (
            <motion.article
              key={item.id}
              className="education-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
            >
              {/* Decorative glow */}
              <div className="education-card-glow" />

              <div className="education-card-inner">

                {/* Left */}
                <div className="education-info">
                  <div className="education-badge">
                    {item.abbreviation}
                  </div>

                  <div className="education-details">
                    <span className="education-status">
                      {item.status}
                    </span>

                    <h3>{item.degree}</h3>

                    <h4>{item.field}</h4>

                    <p className="education-institution">
                      {item.institution}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="education-metric">
                  <span className="metric-label">CGPA</span>

                  <strong>{item.cgpa}</strong>

                  <span className="metric-caption">
                    Academic Performance
                  </span>
                </div>

              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;