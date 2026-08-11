import { useEffect, useRef, useState } from 'react';
import { Mail, ArrowDown, ChevronRight } from 'lucide-react';
import profile from '../data/profile';
import './Hero.css';

// Animated AI network canvas
function AINetworkCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Nodes
    const NODE_COUNT = 28;
    const nodes = [];

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Initialize nodes
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0004,
        vy: (Math.random() - 0.5) * 0.0004,
        radius: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
        layer: Math.floor(Math.random() * 3),
      });
    }

    const LAYERS = [
      { x: 0.15, color: '#6366F1' },
      { x: 0.5, color: '#8B5CF6' },
      { x: 0.85, color: '#06b6d4' },
    ];

    const LAYER_NODES = LAYERS.map((layer) =>
      Array.from({ length: 4 }, (_, i) => ({
        lx: layer.x + (Math.random() - 0.5) * 0.1,
        ly: 0.15 + i * 0.2 + (Math.random() - 0.5) * 0.05,
        color: layer.color,
        phase: Math.random() * Math.PI * 2,
      }))
    );

    let t = 0;

    function draw() {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      if (prefersReducedMotion) {
        // Static render
        drawStatic(ctx, W, H, LAYER_NODES, LAYERS);
        return;
      }

      t += 0.008;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Draw connections between layer nodes
      for (let li = 0; li < LAYER_NODES.length - 1; li++) {
        const layerA = LAYER_NODES[li];
        const layerB = LAYER_NODES[li + 1];
        for (const nodeA of layerA) {
          for (const nodeB of layerB) {
            const ax = nodeA.lx * W;
            const ay = nodeA.ly * H;
            const bx = nodeB.lx * W;
            const by = nodeB.ly * H;
            const grad = ctx.createLinearGradient(ax, ay, bx, by);
            grad.addColorStop(0, LAYERS[li].color + '30');
            grad.addColorStop(1, LAYERS[li + 1].color + '30');
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            // Animated data packet along connection
            const progress = ((t * 0.4 + nodeA.phase * 0.3) % 1);
            const px = ax + (bx - ax) * progress;
            const py = ay + (by - ay) * progress;
            ctx.beginPath();
            ctx.arc(px, py, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = LAYERS[li].color + '80';
            ctx.fill();
          }
        }
      }

      // Draw layer nodes
      for (let li = 0; li < LAYER_NODES.length; li++) {
        for (const node of LAYER_NODES[li]) {
          const nx = node.lx * W + Math.sin(t + node.phase) * 3;
          const ny = node.ly * H + Math.cos(t * 0.7 + node.phase) * 3;

          // Mouse influence
          const dx = mx * W - nx;
          const dy = my * H - ny;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 200);

          // Glow
          const pulse = 0.7 + 0.3 * Math.sin(t * 1.5 + node.phase);
          const r = 4 + influence * 4;
          const grd = ctx.createRadialGradient(nx, ny, 0, nx, ny, r * 3);
          grd.addColorStop(0, node.color + 'CC');
          grd.addColorStop(1, node.color + '00');
          ctx.beginPath();
          ctx.arc(nx, ny, r * 3, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          // Core dot
          ctx.beginPath();
          ctx.arc(nx, ny, r, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.globalAlpha = pulse * 0.9 + 0.1;
          ctx.fill();
          ctx.globalAlpha = 1;

          // Ring
          ctx.beginPath();
          ctx.arc(nx, ny, r + 3, 0, Math.PI * 2);
          ctx.strokeStyle = node.color + '40';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Floating ambient particles
      for (const node of nodes) {
        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          // Mouse repulsion
          const dx = mouseRef.current.x - node.x;
          const dy = mouseRef.current.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 0.12) {
            node.x -= dx * 0.003;
            node.y -= dy * 0.003;
          }

          // Wrap
          if (node.x < 0) node.x = 1;
          if (node.x > 1) node.x = 0;
          if (node.y < 0) node.y = 1;
          if (node.y > 1) node.y = 0;
        }

        node.pulsePhase += node.pulseSpeed;
        const pulse = 0.5 + 0.5 * Math.sin(node.pulsePhase);

        ctx.beginPath();
        ctx.arc(node.x * W, node.y * H, node.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${node.opacity * 0.4})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    function drawStatic(ctx, W, H, layerNodes, layers) {
      for (let li = 0; li < layerNodes.length - 1; li++) {
        for (const nodeA of layerNodes[li]) {
          for (const nodeB of layerNodes[li + 1]) {
            ctx.beginPath();
            ctx.moveTo(nodeA.lx * W, nodeA.ly * H);
            ctx.lineTo(nodeB.lx * W, nodeB.ly * H);
            ctx.strokeStyle = layers[li].color + '25';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      for (let li = 0; li < layerNodes.length; li++) {
        for (const node of layerNodes[li]) {
          ctx.beginPath();
          ctx.arc(node.lx * W, node.ly * H, 5, 0, Math.PI * 2);
          ctx.fillStyle = layers[li].color;
          ctx.fill();
        }
      }
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className="hero__canvas"
      onMouseMove={handleMouseMove}
      aria-hidden="true"
    />
  );
}

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const words = ['AI Applications', 'ML Systems', 'Generative AI', 'Intelligent Agents'];
  const wordIdx = useRef(0);
  const charIdx = useRef(0);
  const isDeleting = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setTypedText(words[0]);
      return;
    }

    function type() {
      const currentWord = words[wordIdx.current];
      if (!isDeleting.current) {
        setTypedText(currentWord.slice(0, charIdx.current + 1));
        charIdx.current++;
        if (charIdx.current === currentWord.length) {
          isDeleting.current = true;
          setTimeout(type, 1600);
          return;
        }
      } else {
        setTypedText(currentWord.slice(0, charIdx.current - 1));
        charIdx.current--;
        if (charIdx.current === 0) {
          isDeleting.current = false;
          wordIdx.current = (wordIdx.current + 1) % words.length;
        }
      }
      setTimeout(type, isDeleting.current ? 50 : 80);
    }

    const timer = setTimeout(type, 600);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="home" aria-label="Hero — introduction">
      {/* Background */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__gradient-1" />
        <div className="hero__gradient-2" />
      </div>

      <div className="container hero__container">
        {/* Left Content */}
        <div className="hero__content">
          {/* Eyebrow */}
          <div className="hero__eyebrow">
            <span className="badge">
              <span className="badge-dot" />
              Open to Opportunities
            </span>
          </div>

          {/* Role Tags */}
          <div className="hero__roles">
            <span className="label">AI / ML Engineer</span>
            <span className="hero__role-sep">•</span>
            <span className="label">Software Developer</span>
          </div>

          {/* Main Heading */}
          <h1 className="hero__title">
            Hi, I&apos;m
            <br />
            <span className="hero__name">{profile.name}.</span>
          </h1>

          {/* Dynamic subtitle */}
          <p className="hero__subtitle">
            I build{' '}
            <span className="hero__typed" aria-live="polite" aria-atomic="true">
              {typedText}
              <span className="hero__cursor" aria-hidden="true" />
            </span>
          </p>

          {/* Description */}
          <p className="hero__description">
            Building intelligent applications with Artificial Intelligence, Machine Learning,
            Generative AI, and modern software technologies.
          </p>

          {/* CTA Buttons */}
          <div className="hero__actions">
            <button
              className="btn btn-primary hero__cta-primary"
              onClick={scrollToProjects}
              aria-label="View my projects"
            >
              View Projects
              <ChevronRight size={16} />
            </button>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              aria-label={`View ${profile.name}'s resume`}
            >
              View Resume
            </a>
          </div>

          {/* Social Links */}
          <div className="hero__socials">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub profile"
            >
              <GithubIcon />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="social-link"
              aria-label="Send email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        {/* Right Visual */}
        <div className="hero__visual" aria-hidden="true">
          <div className="hero__canvas-wrapper">
            <AINetworkCanvas />
            {/* Layer labels */}
            <div className="hero__nn-labels">
              <span className="hero__nn-label">Input</span>
              <span className="hero__nn-label">Hidden</span>
              <span className="hero__nn-label">Output</span>
            </div>
            {/* Corner decorations */}
            <div className="hero__canvas-corner hero__canvas-corner--tl" />
            <div className="hero__canvas-corner hero__canvas-corner--br" />
          </div>

          {/* Floating info chips */}
          <div className="hero__float hero__float--1">
            <span className="hero__float-icon">🧠</span>
            <span>Generative AI</span>
          </div>
          <div className="hero__float hero__float--2">
            <span className="hero__float-icon">⚡</span>
            <span>LLMs & RAG</span>
          </div>
          <div className="hero__float hero__float--3">
            <span className="hero__float-icon">🔬</span>
            <span>ML Engineering</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <ArrowDown size={12} className="hero__scroll-arrow" />
      </div>
    </section>
  );
}

// Icon components
function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
