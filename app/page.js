'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { FiGlobe, FiSmartphone, FiServer, FiUploadCloud } from 'react-icons/fi';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'project', label: 'Project' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
  { id: 'thamodharan', label: 'Thamodharan.' }
];

const EMAIL = 'thamodharangp@gmail.com';
// next/image skips basePath for unoptimized static exports — prefix asset URLs manually.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

function SectionTitle({ title, titleStyle }) {
  return (
    <div
      className="section-title-wrap"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px',
        width: '100%',
        maxWidth: '100%'
      }}
    >
      <h1
        className="content-title"
        style={{
          margin: 0,
          whiteSpace: 'normal',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          maxWidth: '100%',
          ...titleStyle
        }}
      >
        {title}
      </h1>
      <div
        aria-hidden="true"
        style={{
          width: '60px',
          height: '3px',
          backgroundColor: 'var(--text-primary)',
          opacity: 1,
          marginTop: '12px'
        }}
      />
    </div>
  );
}

function StoreButton({ href, label, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href || '#'}
      target={href && !href.startsWith('mailto:') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="store-button"
      onClick={onClick ? e => { e.preventDefault(); onClick(); } : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '12px 28px',
        border: '2px solid var(--text-primary)',
        background: hover ? 'var(--text-primary)' : 'transparent',
        color: hover ? 'var(--bg-secondary)' : 'var(--text-primary)',
        textDecoration: 'none',
        textTransform: 'uppercase',
        fontSize: '14px',
        fontWeight: 700,
        letterSpacing: '0.05em',
        transition: 'all 0.2s'
      }}
    >
      <span style={{ color: 'inherit' }}>{label}</span>
    </a>
  );
}

function HomePage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        textAlign: 'center'
      }}
    >
      <h1
        className="content-title"
        style={{ fontSize: 'clamp(34px, 11.5vw, 64px)', marginBottom: '24px', fontWeight: 400 }}
      >
        I Build
        <br />
        Websites &amp; Apps
      </h1>
      <p
        className="content-subtitle"
        style={{
          fontSize: '18px',
          fontWeight: 300,
          marginBottom: '40px',
          lineHeight: 1.6,
          maxWidth: '600px'
        }}
      >
        I build products and ship pragmatic software—web, mobile, and everything in between.
      </p>
      <div style={{ textAlign: 'right', width: '100%', maxWidth: '600px' }}>
        <p
          className="team-signature"
          style={{
            fontSize: '24px',
            fontFamily: "'Corinthia', cursive",
            fontWeight: 400,
            color: '#666666',
            margin: 0,
            textAlign: 'right'
          }}
        >
          Thamodharan.
        </p>
      </div>
    </div>
  );
}

const DEMO_PROJECTS = [
  {
    name: 'Catchify',
    desc: 'Music App',
    url: 'https://thamodharangm.github.io/catchify/',
    logo: '/images/logos/catchify.svg',
    group: 'Own Projects'
  },
  {
    name: 'Textmate AI',
    desc: 'AI Writing Assistant',
    url: 'https://textmateai.online',
    logo: '/images/logos/textmate.svg',
    group: 'Own Projects'
  },
  {
    name: 'AMR Battery Shop',
    desc: 'POS & Billing',
    url: 'https://billing.hazzino.com/index',
    logo: '/images/logos/amr.svg',
    group: 'Professional Projects'
  },
  {
    name: 'Rentaround US',
    desc: 'Car Rental Platform',
    url: 'https://rentaround.hazzino.com/',
    logo: '/images/logos/rentaround.svg',
    group: 'Professional Projects'
  }
];

function DemoCard({ project }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3px',
        border: '1.5px solid var(--text-primary)',
        borderRadius: '14px',
        padding: '10px 16px',
        width: '100%',
        maxWidth: '280px',
        margin: '0 auto',
        background: 'var(--bg-secondary)',
        textDecoration: 'none',
        textAlign: 'center',
        boxShadow: hover ? '4px 4px #000c' : 'none',
        transform: hover ? 'translate(-2px, -2px)' : 'none',
        transition: 'all 0.15s ease'
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Image
          src={`${BASE}${project.logo}`}
          alt={`${project.name} logo`}
          width={26}
          height={26}
          style={{ flexShrink: 0 }}
        />
        <span style={{ fontWeight: 700, fontSize: '14px' }}>{project.name}</span>
      </span>
      <span style={{ fontWeight: 300, fontSize: '11.5px', color: 'var(--text-secondary)' }}>
        {project.desc}
      </span>
    </a>
  );
}

function ProjectPage() {
  const [showDemos, setShowDemos] = useState(false);
  const groups = [...new Set(DEMO_PROJECTS.map(p => p.group))];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        textAlign: 'center'
      }}
    >
      <SectionTitle title="Projects" />
      <p className="content-subtitle" style={{ maxWidth: '600px', marginBottom: '24px' }}>
        Selected work and experiments. If you want to see a specific portfolio piece, just email me.
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <StoreButton label="Get Demo" onClick={() => setShowDemos(s => !s)} />
        <StoreButton href={`mailto:${EMAIL}`} label="Email" />
      </div>
      {showDemos && createPortal(
        <div
          onClick={() => setShowDemos(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#00000080',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: '0.2s ease-out fadeIn'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--bg-secondary)',
              border: '2px solid var(--text-primary)',
              boxShadow: '4px 4px #000c',
              padding: '28px 24px',
              width: 'min(90vw, 440px)',
              maxHeight: '85vh',
              overflowY: 'auto',
              textAlign: 'left',
              animation: '0.3s ease-out zoomIn'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}
            >
              <span style={{ fontWeight: 700, fontSize: '14px', letterSpacing: '0.05em' }}>
                PROJECT DEMOS
              </span>
              <button
                onClick={() => setShowDemos(false)}
                aria-label="Close"
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '22px',
                  lineHeight: 1,
                  cursor: 'pointer',
                  padding: '2px 6px'
                }}
              >
                &times;
              </button>
            </div>
            {groups.map(group => (
              <div key={group} style={{ marginBottom: '14px' }}>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '8px',
                    borderBottom: '1px solid var(--border-color)',
                    paddingBottom: '6px'
                  }}
                >
                  {group}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {DEMO_PROJECTS.filter(p => p.group === group).map(p => (
                    <DemoCard key={p.name} project={p} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

const FOCUS_AREAS = [
  { icon: FiGlobe, label: 'Web', desc: 'React.js, Next.js, modern UI' },
  { icon: FiSmartphone, label: 'Mobile', desc: 'React Native (Expo & CLI)' },
  { icon: FiServer, label: 'Backend', desc: 'Node.js, Express.js, REST APIs' },
  { icon: FiUploadCloud, label: 'DevOps', desc: 'Render, Vercel, BigRock' }
];

function AboutPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        textAlign: 'center'
      }}
    >
      <SectionTitle title="About Thamodharan" />
      <div className="about-copy" style={{ marginBottom: '14px', maxWidth: '600px' }}>
        <p style={{ fontSize: '15px', lineHeight: 1.6, fontWeight: 300 }}>
          <strong style={{ fontWeight: 700 }}>Who I Am —</strong> I&rsquo;m Thamodharan. I build and
          ship full-stack software quickly, with a focus on clean UX and scalable engineering.
        </p>
      </div>
      <div className="about-copy" style={{ marginBottom: '18px', maxWidth: '600px' }}>
        <p style={{ fontSize: '15px', lineHeight: 1.6, fontWeight: 300 }}>
          <strong style={{ fontWeight: 700 }}>What I Do —</strong> I design, build, and iterate on
          web/mobile products with Java and the MERN stack—then help teams do the same.
        </p>
      </div>
      <p className="content-subtitle" style={{ marginBottom: '14px', fontWeight: 400 }}>
        Focus Areas
      </p>
      <div
        className="team-grid"
        style={{ display: 'grid', listStyle: 'none', gap: '12px', width: '100%', maxWidth: '460px' }}
      >
        {FOCUS_AREAS.map(area => (
          <div
            key={area.label}
            className="focus-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              border: '1.5px solid var(--text-primary)',
              borderRadius: '16px',
              padding: '12px 16px',
              background: 'var(--bg-secondary)',
              width: '100%'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <area.icon size={20} />
              <span className="focus-name" style={{ fontWeight: 700, fontSize: '15px' }}>
                {area.label}
              </span>
            </div>
            <div
              className="focus-desc"
              style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 300 }}
            >
              {area.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactPage() {
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const inputStyle = {
    background: 'transparent',
    border: '1.5px solid var(--text-primary)',
    color: 'var(--text-primary)',
    fontFamily: 'inherit',
    fontSize: '14px',
    fontWeight: 300,
    padding: '10px 12px',
    outline: 'none',
    width: '100%'
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio contact from ${form.name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });
      if (!res.ok) throw new Error('send failed');
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        textAlign: 'center'
      }}
    >
      <SectionTitle title="Contact" />
      <div style={{ marginBottom: '14px', maxWidth: '600px' }}>
        <p style={{ fontSize: '15px', lineHeight: 1.6, fontWeight: 300 }}>
          Want to build something together? Email me and I&rsquo;ll reply as soon as possible.
        </p>
        <p style={{ fontSize: '14px', fontWeight: 300, marginTop: '8px' }}>
          Email:{' '}
          <a
            href={`mailto:${EMAIL}`}
            style={{ color: 'var(--text-primary)', textDecoration: 'underline' }}
          >
            {EMAIL}
          </a>
        </p>
        <p style={{ fontSize: '14px', fontWeight: 300, marginTop: '6px' }}>
          Phone:{' '}
          <a
            href="tel:+916381893190"
            style={{ color: 'var(--text-primary)', textDecoration: 'underline' }}
          >
            +91 63818 93190
          </a>
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          width: '100%',
          maxWidth: '480px'
        }}
      >
        <input
          type="text"
          placeholder="Your Name"
          required
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Your Email"
          required
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          style={inputStyle}
        />
        <textarea
          placeholder="Your Message"
          required
          rows={3}
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          style={{
            width: '100%',
            background: 'transparent',
            border: '2px solid var(--text-primary)',
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            padding: '10px 28px',
            cursor: status === 'sending' ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--text-primary)';
            e.currentTarget.style.color = 'var(--bg-secondary)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
        {status === 'success' && (
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 300 }}>
            Message sent successfully!
          </p>
        )}
        {status === 'error' && (
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 300 }}>
            Failed to send. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}

export default function Home() {
  const [route, setRoute] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const lastTrailPos = useRef({ x: 0, y: 0 });

  const navigate = id => {
    setRoute(id === 'thamodharan' ? 'home' : id);
    setMobileOpen(false);
  };

  // Starfield
  useEffect(() => {
    const starfield = document.getElementById('starfield');
    if (!starfield || starfield.childElementCount > 0) return;
    const sizes = ['small', 'medium', 'large'];
    for (let i = 0; i < 150; i++) {
      const star = document.createElement('div');
      star.className = `star ${sizes[Math.floor(Math.random() * sizes.length)]}`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      starfield.appendChild(star);
    }
  }, []);

  // Cursor follower + floating code character trail
  useEffect(() => {
    const chars = ['{', '}', '<', '>', '/', ';', '(', ')', '=', '*'];
    const onMove = e => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      const dx = e.clientX - lastTrailPos.current.x;
      const dy = e.clientY - lastTrailPos.current.y;
      if (dx * dx + dy * dy < 3600) return;
      lastTrailPos.current = { x: e.clientX, y: e.clientY };

      const el = document.createElement('div');
      el.textContent = chars[Math.floor(Math.random() * chars.length)];
      Object.assign(el.style, {
        position: 'fixed',
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        pointerEvents: 'none',
        zIndex: 9997,
        color: 'var(--text-primary)',
        fontFamily: 'monospace',
        fontSize: '14px',
        opacity: '0.7',
        transform: 'translate(-50%, -50%)',
        transition: 'all 0.8s ease-out'
      });
      document.body.appendChild(el);
      requestAnimationFrame(() => {
        el.style.transform = 'translate(-50%, -50%) translateY(-20px) scale(0.5)';
        el.style.opacity = '0';
      });
      setTimeout(() => el.remove(), 800);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <main className="main-container">
      <div
        style={{
          position: 'fixed',
          left: cursorPos.x,
          top: cursorPos.y,
          width: '40px',
          height: '40px',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          opacity: 0.3,
          transition: 'opacity 0.2s'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '2px solid var(--text-primary)',
            background: 'transparent',
            filter: 'blur(2px)'
          }}
        />
      </div>

      <nav className="navbar">
        <div className="navbar-logo" style={{ cursor: 'pointer' }} onClick={() => navigate('home')}>
          Thamodharan.
        </div>
        <button
          className="mobile-menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(o => !o)}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
        <ul className="nav-links">
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <a
                href="#"
                className={item.id !== 'thamodharan' && route === item.id ? 'active' : ''}
                onClick={e => {
                  e.preventDefault();
                  navigate(item.id);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileOpen(false)}>
          <div className="mobile-menu-box" onClick={e => e.stopPropagation()}>
            <ul className="mobile-nav-links">
              {NAV_ITEMS.filter(item => item.id !== 'thamodharan').map(item => (
                <li key={item.id}>
                  <a
                    href="#"
                    className={route === item.id ? 'active' : ''}
                    onClick={e => {
                      e.preventDefault();
                      navigate(item.id);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="main-layout">
        <div className={`content-section page-${route}`} key={route}>
          {route === 'home' && <HomePage />}
          {route === 'project' && <ProjectPage />}
          {route === 'about' && <AboutPage />}
          {route === 'contact' && <ContactPage />}
        </div>
        <div className="rocket-section">
          <Image
            alt="Banner"
            src={`${BASE}/images/banner/${route}.jpg`}
            width={0}
            height={0}
            sizes="50vw"
            style={{ color: 'transparent', width: '100%', height: 'auto' }}
          />
        </div>
      </div>
    </main>
  );
}
