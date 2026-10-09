import { useState, useEffect } from 'react';
import {
  Lock, KeyRound, CheckCircle, AlertCircle, Save, ArrowLeft, RefreshCw,
  FolderOpen, Briefcase, GraduationCap, Award, Wrench, User, FileUp, Plus, Trash2, ExternalLink
} from 'lucide-react';

import initialProfile from '../../data/profile';
import { projects as initialProjects } from '../../data/projects';
import { experiences as initialExperiences } from '../../data/experience';
import { education as initialEducation } from '../../data/education';
import { certifications as initialCertifications } from '../../data/certifications';
import { skillCategories as initialSkillCategories } from '../../data/skills';

import { commitFileToGitHub, testGitHubAuth } from '../../services/githubSync';
import './AdminPortal.css';

const DEFAULT_PIN = '202608'; // Default Master PIN

export default function AdminPortal({ onBackToSite }) {
  // Authentication states
  const [pin, setPin] = useState('');
  const [isPinUnlocked, setIsPinUnlocked] = useState(
    () => sessionStorage.getItem('admin_pin_unlocked') === 'true'
  );
  const [pinError, setPinError] = useState(false);
  const [masterPin, setMasterPin] = useState(
    () => localStorage.getItem('portfolio_master_pin') || DEFAULT_PIN
  );

  // GitHub token state
  const [githubToken, setGithubToken] = useState(
    () => localStorage.getItem('portfolio_github_token') || ''
  );
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const [authTesting, setAuthTesting] = useState(false);
  const [tokenError, setTokenError] = useState('');

  // Active section tab
  const [activeTab, setActiveTab] = useState('profile');

  // Editable data states
  const [profile, setProfile] = useState(initialProfile);
  const [projectsList, setProjectsList] = useState(initialProjects);
  const [experiencesList, setExperiencesList] = useState(initialExperiences);
  const [educationList, setEducationList] = useState(initialEducation);
  const [certificationsList, setCertificationsList] = useState(initialCertifications);
  const [skillsList, setSkillsList] = useState(initialSkillCategories);

  // Resume upload state
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeBase64, setResumeBase64] = useState(null);

  // Save / Publish status
  const [publishing, setPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState({ type: '', message: '' });

  // New PIN input state
  const [newPin, setNewPin] = useState('');
  const [pinSuccessMsg, setPinSuccessMsg] = useState('');

  // Auto test token if present
  useEffect(() => {
    if (githubToken && isPinUnlocked) {
      handleTestToken(githubToken);
    }
  }, [isPinUnlocked]);

  // Handle PIN Unlock
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === masterPin) {
      setIsPinUnlocked(true);
      sessionStorage.setItem('admin_pin_unlocked', 'true');
      setPinError(false);
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 2000);
    }
  };

  // Handle PIN Change
  const handleChangePin = (e) => {
    e.preventDefault();
    if (newPin.length >= 4) {
      setMasterPin(newPin);
      localStorage.setItem('portfolio_master_pin', newPin);
      setPinSuccessMsg('Master PIN updated successfully!');
      setNewPin('');
      setTimeout(() => setPinSuccessMsg(''), 3000);
    }
  };

  // Test GitHub Token
  const handleTestToken = async (tokenToTest = githubToken) => {
    setAuthTesting(true);
    setTokenError('');
    try {
      await testGitHubAuth(tokenToTest);
      setIsTokenVerified(true);
      localStorage.setItem('portfolio_github_token', tokenToTest.trim());
    } catch (err) {
      setIsTokenVerified(false);
      setTokenError(err.message || 'GitHub Authentication failed');
    } finally {
      setAuthTesting(false);
    }
  };

  // Handle Resume File Selection
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        // Base64 without data URI prefix for GitHub API
        const base64String = reader.result.split(',')[1];
        setResumeBase64(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Publish all changes to GitHub
  const handlePublishAll = async () => {
    if (!githubToken || !isTokenVerified) {
      setPublishStatus({ type: 'error', message: 'Please connect a valid GitHub Access Token first.' });
      return;
    }

    setPublishing(true);
    setPublishStatus({ type: 'info', message: 'Committing changes to GitHub repository...' });

    try {
      // 1. Commit profile.js
      const profileCode = `// Central profile configuration — updated via Admin Dashboard\nconst profile = ${JSON.stringify(profile, null, 2)};\n\nexport default profile;\n`;
      await commitFileToGitHub({
        filePath: 'src/data/profile.js',
        content: profileCode,
        commitMessage: 'Update profile data via Admin Dashboard',
        token: githubToken,
      });

      // 2. Commit projects.js
      const projectsCode = `export const projects = ${JSON.stringify(projectsList, null, 2)};\n`;
      await commitFileToGitHub({
        filePath: 'src/data/projects.js',
        content: projectsCode,
        commitMessage: 'Update projects data via Admin Dashboard',
        token: githubToken,
      });

      // 3. Commit experience.js
      const experienceCode = `export const experiences = ${JSON.stringify(experiencesList, null, 2)};\n`;
      await commitFileToGitHub({
        filePath: 'src/data/experience.js',
        content: experienceCode,
        commitMessage: 'Update experience data via Admin Dashboard',
        token: githubToken,
      });

      // 4. Commit education.js
      const educationCode = `export const education = ${JSON.stringify(educationList, null, 2)};\n`;
      await commitFileToGitHub({
        filePath: 'src/data/education.js',
        content: educationCode,
        commitMessage: 'Update education data via Admin Dashboard',
        token: githubToken,
      });

      // 5. Commit certifications.js
      const certificationsCode = `export const certifications = ${JSON.stringify(certificationsList, null, 2)};\n`;
      await commitFileToGitHub({
        filePath: 'src/data/certifications.js',
        content: certificationsCode,
        commitMessage: 'Update certifications data via Admin Dashboard',
        token: githubToken,
      });

      // 6. Commit skills.js
      const skillsCode = `export const skillCategories = ${JSON.stringify(skillsList, null, 2)};\n`;
      await commitFileToGitHub({
        filePath: 'src/data/skills.js',
        content: skillsCode,
        commitMessage: 'Update skills data via Admin Dashboard',
        token: githubToken,
      });

      // 7. Commit new resume PDF if uploaded
      if (resumeBase64) {
        await commitFileToGitHub({
          filePath: 'public/resume/Pranav_Kaushik_Resume.pdf',
          content: resumeBase64,
          isBinary: true,
          commitMessage: 'Update resume PDF via Admin Dashboard',
          token: githubToken,
        });
        setResumeFile(null);
        setResumeBase64(null);
      }

      setPublishStatus({
        type: 'success',
        message: '🎉 Successfully published! Your live site is building and will update automatically in ~30 seconds.',
      });
    } catch (err) {
      console.error(err);
      setPublishStatus({
        type: 'error',
        message: `Failed to publish: ${err.message}`,
      });
    } finally {
      setPublishing(false);
    }
  };

  const handleLogout = () => {
    setIsPinUnlocked(false);
    sessionStorage.removeItem('admin_pin_unlocked');
  };

  // ==========================================
  // VIEW 1: MASTER PIN LOCK SCREEN
  // ==========================================
  if (!isPinUnlocked) {
    return (
      <div className="admin-lock">
        <div className="admin-lock__card">
          <div className="admin-lock__icon">
            <Lock size={32} />
          </div>
          <h1 className="admin-lock__title">Portfolio Admin Portal</h1>
          <p className="admin-lock__subtitle">Enter your private master PIN to access the editor</p>

          <form onSubmit={handlePinSubmit} className="admin-lock__form">
            <div className={`admin-lock__input-wrap ${pinError ? 'admin-lock__input-wrap--error' : ''}`}>
              <KeyRound size={18} className="admin-lock__key-icon" />
              <input
                type="password"
                placeholder="Enter 6-digit PIN (default: 202608)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={10}
                className="admin-lock__input"
                autoFocus
              />
            </div>
            {pinError && <p className="admin-lock__error-msg">Incorrect PIN. Please try again.</p>}

            <button type="submit" className="btn btn-primary admin-lock__submit">
              Unlock Dashboard
            </button>
          </form>

          <div className="admin-lock__footer">
            <button onClick={onBackToSite} className="admin-lock__back-btn">
              <ArrowLeft size={14} /> Back to Public Portfolio
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: FULL ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="admin-dashboard">
      {/* Top Bar */}
      <header className="admin-header">
        <div className="admin-header__left">
          <button onClick={onBackToSite} className="admin-header__back-btn" title="Return to site">
            <ArrowLeft size={16} />
            <span>Public Site</span>
          </button>
          <div className="admin-header__brand">
            <span className="navbar__logo-mark">PK</span>
            <span className="admin-header__title">Portfolio Management Dashboard</span>
          </div>
        </div>

        <div className="admin-header__actions">
          {/* GitHub Connection Status Badge */}
          <div className={`admin-status-badge ${isTokenVerified ? 'admin-status-badge--connected' : 'admin-status-badge--disconnected'}`}>
            <span className="admin-status-badge__dot" />
            <span>{isTokenVerified ? 'GitHub Connected' : 'GitHub Not Connected'}</span>
          </div>

          <button
            onClick={handlePublishAll}
            disabled={publishing}
            className="btn btn-primary admin-header__publish-btn"
          >
            {publishing ? (
              <>
                <RefreshCw size={16} className="spin-icon" />
                <span>Publishing to Live Site...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Publish to Live Site</span>
              </>
            )}
          </button>

          <button onClick={handleLogout} className="btn btn-secondary admin-header__lock-btn" title="Lock Dashboard">
            <Lock size={14} />
          </button>
        </div>
      </header>

      {/* Publish Toast Message */}
      {publishStatus.message && (
        <div className={`admin-toast admin-toast--${publishStatus.type}`}>
          {publishStatus.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span>{publishStatus.message}</span>
          <button onClick={() => setPublishStatus({ type: '', message: '' })} className="admin-toast__close">×</button>
        </div>
      )}

      {/* Main Body with Sidebar & Content */}
      <div className="admin-body">
        {/* Sidebar Nav */}
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            <button
              onClick={() => setActiveTab('profile')}
              className={`admin-nav__item ${activeTab === 'profile' ? 'admin-nav__item--active' : ''}`}
            >
              <User size={18} />
              <span>Profile & Bio</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`admin-nav__item ${activeTab === 'projects' ? 'admin-nav__item--active' : ''}`}
            >
              <FolderOpen size={18} />
              <span>Projects ({projectsList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('experience')}
              className={`admin-nav__item ${activeTab === 'experience' ? 'admin-nav__item--active' : ''}`}
            >
              <Briefcase size={18} />
              <span>Experience</span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`admin-nav__item ${activeTab === 'skills' ? 'admin-nav__item--active' : ''}`}
            >
              <Wrench size={18} />
              <span>Skills</span>
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`admin-nav__item ${activeTab === 'education' ? 'admin-nav__item--active' : ''}`}
            >
              <GraduationCap size={18} />
              <span>Education</span>
            </button>

            <button
              onClick={() => setActiveTab('certifications')}
              className={`admin-nav__item ${activeTab === 'certifications' ? 'admin-nav__item--active' : ''}`}
            >
              <Award size={18} />
              <span>Certifications</span>
            </button>

            <button
              onClick={() => setActiveTab('resume')}
              className={`admin-nav__item ${activeTab === 'resume' ? 'admin-nav__item--active' : ''}`}
            >
              <FileUp size={18} />
              <span>Upload Resume</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`admin-nav__item ${activeTab === 'settings' ? 'admin-nav__item--active' : ''}`}
            >
              <KeyRound size={18} />
              <span>Security & GitHub</span>
            </button>
          </nav>
        </aside>

        {/* Tab Content Pane */}
        <main className="admin-main">
          {/* ================= TAB 1: PROFILE ================= */}
          {activeTab === 'profile' && (
            <div className="admin-pane">
              <div className="admin-pane__header">
                <h2>Profile & Contact Details</h2>
                <p>Edit your core identity, headline bio, and direct social links.</p>
              </div>

              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Professional Title</label>
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  />
                </div>

                <div className="admin-form-group admin-form-group--full">
                  <label>Hero Tagline</label>
                  <textarea
                    rows={3}
                    value={profile.tagline}
                    onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={profile.linkedin}
                    onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>GitHub Profile URL</label>
                  <input
                    type="url"
                    value={profile.github}
                    onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: PROJECTS ================= */}
          {activeTab === 'projects' && (
            <div className="admin-pane">
              <div className="admin-pane__header admin-pane__header--split">
                <div>
                  <h2>Projects Management</h2>
                  <p>Add, edit, or remove featured projects and case studies.</p>
                </div>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    const newProj = {
                      id: `project-${Date.now()}`,
                      number: `0${projectsList.length + 1}`,
                      featured: false,
                      label: 'PROJECT',
                      title: 'New Intelligent Application',
                      subtitle: 'AI/ML System',
                      description: 'Project description here...',
                      longDescription: 'Extended overview of what this project achieves...',
                      tags: ['Python', 'FastAPI', 'React'],
                      github: 'https://github.com/Pranav-Kaushik008',
                      demo: null,
                      caseStudy: true,
                      problem: 'Problem statement...',
                      solution: 'Solution approach...',
                      keyFeatures: ['Feature 1', 'Feature 2'],
                      architecture: 'Frontend → Backend API → AI Service',
                      aiComponents: ['LLM Pipeline', 'Model Serving'],
                      techStack: [{ category: 'Backend', items: ['Python'] }],
                    };
                    setProjectsList([...projectsList, newProj]);
                  }}
                >
                  <Plus size={16} /> Add New Project
                </button>
              </div>

              <div className="admin-cards-list">
                {projectsList.map((proj, idx) => (
                  <div key={proj.id} className="admin-card">
                    <div className="admin-card__header">
                      <div className="admin-card__title-row">
                        <span className="chip chip-neutral">{proj.number || `0${idx + 1}`}</span>
                        <h3>{proj.title}</h3>
                        {proj.featured && <span className="chip chip-primary">Featured</span>}
                      </div>
                      <button
                        onClick={() => setProjectsList(projectsList.filter((_, i) => i !== idx))}
                        className="admin-card__delete-btn"
                        title="Delete Project"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => {
                            const updated = [...projectsList];
                            updated[idx].title = e.target.value;
                            setProjectsList(updated);
                          }}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Subtitle</label>
                        <input
                          type="text"
                          value={proj.subtitle}
                          onChange={(e) => {
                            const updated = [...projectsList];
                            updated[idx].subtitle = e.target.value;
                            setProjectsList(updated);
                          }}
                        />
                      </div>

                      <div className="admin-form-group admin-form-group--full">
                        <label>Short Description</label>
                        <textarea
                          rows={2}
                          value={proj.description}
                          onChange={(e) => {
                            const updated = [...projectsList];
                            updated[idx].description = e.target.value;
                            setProjectsList(updated);
                          }}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>GitHub Repository URL</label>
                        <input
                          type="url"
                          value={proj.github || ''}
                          onChange={(e) => {
                            const updated = [...projectsList];
                            updated[idx].github = e.target.value;
                            setProjectsList(updated);
                          }}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Live Demo URL (Optional)</label>
                        <input
                          type="url"
                          value={proj.demo || ''}
                          placeholder="https://..."
                          onChange={(e) => {
                            const updated = [...projectsList];
                            updated[idx].demo = e.target.value || null;
                            setProjectsList(updated);
                          }}
                        />
                      </div>

                      <div className="admin-form-group admin-form-group--full">
                        <label>Tags (Comma separated)</label>
                        <input
                          type="text"
                          value={proj.tags ? proj.tags.join(', ') : ''}
                          onChange={(e) => {
                            const updated = [...projectsList];
                            updated[idx].tags = e.target.value.split(',').map((t) => t.trim()).filter(Boolean);
                            setProjectsList(updated);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 3: EXPERIENCE ================= */}
          {activeTab === 'experience' && (
            <div className="admin-pane">
              <div className="admin-pane__header">
                <h2>Work Experience</h2>
                <p>Manage your professional timeline and internships.</p>
              </div>

              <div className="admin-cards-list">
                {experiencesList.map((exp, idx) => (
                  <div key={exp.id} className="admin-card">
                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label>Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const updated = [...experiencesList];
                            updated[idx].company = e.target.value;
                            setExperiencesList(updated);
                          }}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Role</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => {
                            const updated = [...experiencesList];
                            updated[idx].role = e.target.value;
                            setExperiencesList(updated);
                          }}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Period</label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) => {
                            const updated = [...experiencesList];
                            updated[idx].period = e.target.value;
                            setExperiencesList(updated);
                          }}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Type</label>
                        <input
                          type="text"
                          value={exp.type}
                          onChange={(e) => {
                            const updated = [...experiencesList];
                            updated[idx].type = e.target.value;
                            setExperiencesList(updated);
                          }}
                        />
                      </div>

                      <div className="admin-form-group admin-form-group--full">
                        <label>Description</label>
                        <textarea
                          rows={2}
                          value={exp.description}
                          onChange={(e) => {
                            const updated = [...experiencesList];
                            updated[idx].description = e.target.value;
                            setExperiencesList(updated);
                          }}
                        />
                      </div>

                      <div className="admin-form-group admin-form-group--full">
                        <label>Key Responsibilities (One per line)</label>
                        <textarea
                          rows={4}
                          value={exp.responsibilities ? exp.responsibilities.join('\n') : ''}
                          onChange={(e) => {
                            const updated = [...experiencesList];
                            updated[idx].responsibilities = e.target.value.split('\n').filter((l) => l.trim().length > 0);
                            setExperiencesList(updated);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 4: SKILLS ================= */}
          {activeTab === 'skills' && (
            <div className="admin-pane">
              <div className="admin-pane__header">
                <h2>Technical Skills</h2>
                <p>Edit skill categories and proficiency tags.</p>
              </div>

              <div className="admin-cards-list">
                {skillsList.map((cat, idx) => (
                  <div key={cat.id} className="admin-card">
                    <h3 className="admin-card__category-title">{cat.label}</h3>
                    <div className="admin-form-group admin-form-group--full">
                      <label>Skills list (Comma separated)</label>
                      <input
                        type="text"
                        value={cat.skills.map((s) => (typeof s === 'string' ? s : s.name)).join(', ')}
                        onChange={(e) => {
                          const updated = [...skillsList];
                          const names = e.target.value.split(',').map((n) => n.trim()).filter(Boolean);
                          updated[idx].skills = names.map((name) => ({ name, level: 'proficient' }));
                          setSkillsList(updated);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 5: EDUCATION ================= */}
          {activeTab === 'education' && (
            <div className="admin-pane">
              <div className="admin-pane__header">
                <h2>Education</h2>
                <p>Manage degree, university, and academic grades.</p>
              </div>

              {educationList.map((edu, idx) => (
                <div key={edu.id} className="admin-card">
                  <div className="admin-form-grid">
                    <div className="admin-form-group">
                      <label>Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[idx].degree = e.target.value;
                          setEducationList(updated);
                        }}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Field of Study</label>
                      <input
                        type="text"
                        value={edu.field}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[idx].field = e.target.value;
                          setEducationList(updated);
                        }}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[idx].institution = e.target.value;
                          setEducationList(updated);
                        }}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>CGPA / Grade</label>
                      <input
                        type="text"
                        value={edu.cgpa}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[idx].cgpa = e.target.value;
                          setEducationList(updated);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ================= TAB 6: CERTIFICATIONS ================= */}
          {activeTab === 'certifications' && (
            <div className="admin-pane">
              <div className="admin-pane__header">
                <h2>Certifications</h2>
                <p>Manage professional credentials and verification links.</p>
              </div>

              <div className="admin-cards-list">
                {certificationsList.map((cert, idx) => (
                  <div key={cert.id} className="admin-card">
                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label>Certification Title</label>
                        <input
                          type="text"
                          value={cert.title}
                          onChange={(e) => {
                            const updated = [...certificationsList];
                            updated[idx].title = e.target.value;
                            setCertificationsList(updated);
                          }}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Provider</label>
                        <input
                          type="text"
                          value={cert.provider}
                          onChange={(e) => {
                            const updated = [...certificationsList];
                            updated[idx].provider = e.target.value;
                            updated[idx].providerShort = e.target.value;
                            setCertificationsList(updated);
                          }}
                        />
                      </div>

                      <div className="admin-form-group admin-form-group--full">
                        <label>Description</label>
                        <textarea
                          rows={2}
                          value={cert.description}
                          onChange={(e) => {
                            const updated = [...certificationsList];
                            updated[idx].description = e.target.value;
                            setCertificationsList(updated);
                          }}
                        />
                      </div>

                      <div className="admin-form-group admin-form-group--full">
                        <label>Verification URL</label>
                        <input
                          type="url"
                          value={cert.verifyUrl || ''}
                          onChange={(e) => {
                            const updated = [...certificationsList];
                            updated[idx].verifyUrl = e.target.value;
                            setCertificationsList(updated);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 7: RESUME UPLOAD ================= */}
          {activeTab === 'resume' && (
            <div className="admin-pane">
              <div className="admin-pane__header">
                <h2>Upload New Resume PDF</h2>
                <p>Upload a new PDF to update your resume across the entire website in 1 click.</p>
              </div>

              <div className="admin-resume-box">
                <FileUp size={44} className="admin-resume-box__icon" />
                <h3>Select Resume PDF File</h3>
                <p>File will automatically be placed at <code>public/resume/Pranav_Kaushik_Resume.pdf</code></p>
                
                <input
                  type="file"
                  id="resume-file-input"
                  accept="application/pdf"
                  onChange={handleResumeChange}
                  className="admin-resume-box__input"
                />
                <label htmlFor="resume-file-input" className="btn btn-primary">
                  Choose PDF File
                </label>

                {resumeFile && (
                  <div className="admin-resume-box__selected">
                    <CheckCircle size={16} />
                    <span>Selected: <strong>{resumeFile.name}</strong> ({(resumeFile.size / 1024).toFixed(1)} KB)</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= TAB 8: SETTINGS & SECURITY ================= */}
          {activeTab === 'settings' && (
            <div className="admin-pane">
              <div className="admin-pane__header">
                <h2>Security & GitHub Connection</h2>
                <p>Configure your Master PIN and GitHub Personal Access Token for one-click publishing.</p>
              </div>

              {/* GitHub Token Config */}
              <div className="admin-card">
                <h3>GitHub Access Token</h3>
                <p className="admin-card__desc">
                  This token allows the dashboard to commit your portfolio changes directly to <code>Pranav-Kaushik008/Pranav-Kaushik-portfolio</code>.
                </p>

                <div className="admin-form-group admin-form-group--full">
                  <label>GitHub Personal Access Token (PAT)</label>
                  <div className="admin-input-btn-row">
                    <input
                      type="password"
                      placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                      value={githubToken}
                      onChange={(e) => setGithubToken(e.target.value)}
                    />
                    <button
                      onClick={() => handleTestToken(githubToken)}
                      disabled={authTesting}
                      className="btn btn-secondary"
                    >
                      {authTesting ? 'Verifying...' : 'Test Connection'}
                    </button>
                  </div>
                  {tokenError && <p className="admin-form-error">{tokenError}</p>}
                  {isTokenVerified && <p className="admin-form-success">✓ Connected with write permissions to Pranav-Kaushik-portfolio!</p>}
                </div>

                <div className="admin-help-box">
                  <strong>How to create a free GitHub Token in 1 minute:</strong>
                  <ol>
                    <li>Go to <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer">GitHub Token Settings <ExternalLink size={12} /></a></li>
                    <li>Click <strong>"Generate new token (classic)"</strong></li>
                    <li>Select the <strong>`repo`</strong> scope checkmark</li>
                    <li>Copy and paste your token above!</li>
                  </ol>
                </div>
              </div>

              {/* Change Master PIN */}
              <div className="admin-card" style={{ marginTop: '24px' }}>
                <h3>Change Master Admin PIN</h3>
                <form onSubmit={handleChangePin} className="admin-form-grid" style={{ marginTop: '16px' }}>
                  <div className="admin-form-group">
                    <label>New Master PIN (at least 4 digits)</label>
                    <input
                      type="password"
                      placeholder="e.g. 849201"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                    />
                  </div>
                  <div className="admin-form-group" style={{ alignSelf: 'flex-end' }}>
                    <button type="submit" className="btn btn-secondary">
                      Update PIN
                    </button>
                  </div>
                </form>
                {pinSuccessMsg && <p className="admin-form-success">{pinSuccessMsg}</p>}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
