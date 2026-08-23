'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiGlobe, FiSmartphone, FiServer, FiUploadCloud, FiPlay, FiSend, FiMail, FiPhone, FiGithub, FiCheckCircle } from 'react-icons/fi';

// ── Constants ──────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'home',         label: 'Home' },
  { id: 'project',      label: 'Project' },
  { id: 'about',        label: 'About' },
  { id: 'contact',      label: 'Contact' },
  { id: 'thamodharan',  label: 'Thamodharan.' },
];

const EMAIL = 'thamodharangp@gmail.com';
const BASE  = process.env.NEXT_PUBLIC_BASE_PATH || '';

// ── Section Title (Henry's exact structure) ────────────────────────────────
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
        maxWidth: '100%',
      }}
    >
      <h2
        className="content-title"
        style={{
          margin: 0,
          whiteSpace: 'normal',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          maxWidth: '100%',
          ...titleStyle,
        }}
      >
        {title}
      </h2>
      <div
        aria-hidden="true"
        style={{
          width: '60px',
          height: '3px',
          backgroundColor: 'var(--text-primary)',
          opacity: 1,
          marginTop: '12px',
        }}
      />
    </div>
  );
}

// ── Store Button ───────────────────────────────────────────────────────────
function StoreButton({ href, label, onClick, icon: Icon }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href || '#'}
      target={href && !href.startsWith('mailto:') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="store-button"
      onClick={onClick ? (e) => { e.preventDefault(); onClick(); } : undefined}
      onMouseEnter={() => { if (typeof window !== 'undefined' && window.innerWidth > 768) setHover(true); }}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '13px 28px',
        border: '2px solid #000',
        background: '#fff',
        color: '#000',
        textDecoration: 'none',
        textTransform: 'uppercase',
        fontSize: '13px',
        fontWeight: 700,
        letterSpacing: '0.1em',
        boxShadow: hover ? '6px 6px 0 #000' : '4px 4px 0 #000',
        transform: hover ? 'translate(-2px, -2px)' : 'translate(0, 0)',
        transition: 'box-shadow 0.15s ease, transform 0.15s ease',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {Icon && <Icon size={15} style={{ color: '#000', flexShrink: 0 }} />}
      <span style={{ color: '#000' }}>{label}</span>
    </a>
  );
}

// ── Home Page (Upgraded Minimalist Hero) ───────────────────────────────────
function HomePage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        textAlign: 'center',
        maxWidth: '600px',
        width: '100%',
        margin: '0 auto',
      }}
    >
      {/* Subtle Live Availability Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '5px 12px',
          background: '#ffffff',
          border: '1.4px solid #000000',
          boxShadow: '2px 2px 0 #000000',
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: '20px',
          borderRadius: '4px',
        }}
      >
        <span
          style={{
            width: '7px',
            height: '7px',
            backgroundColor: '#22c55e',
            borderRadius: '50%',
            display: 'inline-block',
            boxShadow: '0 0 0 2px rgba(34, 197, 94, 0.25)',
          }}
        />
        <span>Available for Projects</span>
      </div>

      <h1
        className="content-title"
        style={{
          fontSize: 'clamp(38px, 6vw, 64px)',
          marginBottom: '18px',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          color: '#000000',
        }}
      >
        I Build Apps. Period.
      </h1>

      <p
        className="content-subtitle"
        style={{
          fontSize: '16.5px',
          fontWeight: 400,
          marginBottom: '32px',
          lineHeight: 1.6,
          color: '#555555',
          maxWidth: '540px',
        }}
      >
        I build products and ship pragmatic software—web, mobile, and everything in between.
      </p>

      <div style={{ textAlign: 'right', width: '100%', maxWidth: '540px' }}>
        <p
          className="team-signature"
          style={{
            fontSize: '28px',
            fontFamily: "'Corinthia', cursive",
            fontWeight: 700,
            color: '#444444',
            margin: 0,
            textAlign: 'right',
          }}
        >
          Thamodharan.
        </p>
      </div>
    </div>
  );
}

// ── Projects (Enhanced Modal Design) ───────────────────────────────────────
const DEMO_PROJECTS = [
  {
    name: 'Catchify',
    desc: 'Music App',
    url:  'https://thamodharangm.github.io/catchify/',
    logo: '/images/logos/catchify.svg',
    group: 'Own Projects',
    accentBg: '#EFF6FF',
    tag: 'Web App',
  },
  {
    name: 'Textmate AI',
    desc: 'AI Writing Assistant',
    url:  'https://textmateai.online',
    logo: '/images/logos/textmate.svg',
    group: 'Own Projects',
    accentBg: '#F3E8FF',
    tag: 'AI / SaaS',
  },
  {
    name: 'AMR Battery Shop',
    desc: 'POS & Billing System',
    url:  'https://billing.hazzino.com/index',
    logo: '/images/logos/amr.svg',
    group: 'Professional Projects',
    accentBg: '#FEF3C7',
    tag: 'Commercial',
  },
  {
    name: 'Rentaround US',
    desc: 'Car Rental Platform',
    url:  'https://rentaround.hazzino.com/',
    logo: '/images/logos/rentaround.svg',
    group: 'Professional Projects',
    accentBg: '#DCFCE7',
    tag: 'Commercial',
  },
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
        flexDirection: 'row',
        alignItems: 'center',
        gap: '12px',
        border: '1.8px solid #000000',
        borderRadius: '12px',
        padding: '12px 14px',
        width: '100%',
        background: '#ffffff',
        textDecoration: 'none',
        textAlign: 'left',
        boxShadow: hover ? '4px 4px 0 #000000' : '2px 2px 0 #000000',
        transform: hover ? 'translate(-2px, -2px)' : 'translate(0, 0)',
        transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {/* Stylized Logo Icon Badge */}
      <div
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '8px',
          border: '1.5px solid #000000',
          backgroundColor: project.accentBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '1px 1px 0 #000000',
          transition: 'transform 0.2s ease',
          transform: hover ? 'scale(1.06) rotate(-3deg)' : 'none',
        }}
      >
        <Image
          src={`${BASE}${project.logo}`}
          alt={`${project.name} logo`}
          width={22}
          height={22}
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* Name + Description + Tag */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontWeight: 800, fontSize: '14px', color: '#000000', letterSpacing: '-0.01em' }}>
            {project.name}
          </span>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              background: '#f4f4f5',
              color: '#52525b',
              padding: '2px 6px',
              border: '1px solid #e4e4e7',
              borderRadius: '4px',
            }}
          >
            {project.tag}
          </span>
        </div>
        <span style={{ fontWeight: 400, fontSize: '12px', color: '#666666' }}>
          {project.desc}
        </span>
      </div>

      {/* Action Launch Icon */}
      <div
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '6px',
          border: '1.2px solid #000000',
          background: hover ? '#000000' : '#fbfbfb',
          color: hover ? '#ffffff' : '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginLeft: 'auto',
          transition: 'all 0.15s ease',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>
    </a>
  );
}

function ProjectPage() {
  const [showDemos, setShowDemos] = useState(false);
  const groups = [...new Set(DEMO_PROJECTS.map((p) => p.group))];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        textAlign: 'center',
        maxWidth: '560px',
        width: '100%',
        margin: '0 auto',
      }}
    >
      <SectionTitle title="Projects" />
      <p className="content-subtitle" style={{ maxWidth: '540px', marginBottom: '28px', fontSize: '15.5px', color: '#555555', lineHeight: 1.55 }}>
        Selected work and experiments. Launch the live demo hub below or reach out via email.
      </p>

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        <StoreButton label="Website" icon={FiPlay} onClick={() => setShowDemos((s) => !s)} />
        <StoreButton href={`mailto:${EMAIL}`} label="Email" icon={FiSend} />
      </div>

      {showDemos &&
        createPortal(
          <div
            onClick={() => setShowDemos(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.55)',
              backdropFilter: 'blur(3px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: '0.2s ease-out fadeIn',
              padding: '16px',
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="demo-modal"
              style={{
                background: '#ffffff',
                border: '2px solid #000000',
                boxShadow: '6px 6px 0 #000000',
                padding: '24px 22px',
                width: 'min(92vw, 400px)',
                maxHeight: '85vh',
                overflowY: 'auto',
                textAlign: 'left',
                animation: '0.25s cubic-bezier(0.34, 1.56, 0.64, 1) zoomIn',
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '18px',
                  paddingBottom: '12px',
                  borderBottom: '1.5px solid #f0f0f0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 900, fontSize: '15px', letterSpacing: '0.04em', textTransform: 'uppercase', color: '#000' }}>
                    Project Demos
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      background: '#000000',
                      color: '#ffffff',
                      padding: '2px 7px',
                      borderRadius: '10px',
                    }}
                  >
                    4
                  </span>
                </div>

                <button
                  onClick={() => setShowDemos(false)}
                  aria-label="Close"
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #000000',
                    boxShadow: '1.5px 1.5px 0 #000000',
                    width: '26px',
                    height: '26px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    lineHeight: 1,
                    cursor: 'pointer',
                    padding: 0,
                    fontWeight: 700,
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translate(-1px, -1px)';
                    e.currentTarget.style.boxShadow = '2.5px 2.5px 0 #000000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '1.5px 1.5px 0 #000000';
                  }}
                >
                  &times;
                </button>
              </div>

              {/* Groups */}
              {groups.map((group) => (
                <div key={group} style={{ marginBottom: '18px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '10px',
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: '#444444',
                      }}
                    >
                      {group}
                    </span>
                    <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {DEMO_PROJECTS.filter((p) => p.group === group).map((p) => (
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


// ── About (Upgraded Neo-Brutalist Layout) ───────────────────────────────────
const FOCUS_AREAS = [
  {
    icon: FiGlobe,
    label: 'Web',
    desc: 'React.js, Next.js, Modern UI',
    accentBg: '#EFF6FF',
    accentColor: '#1D4ED8',
  },
  {
    icon: FiSmartphone,
    label: 'Mobile',
    desc: 'React Native (Expo & CLI)',
    accentBg: '#F3E8FF',
    accentColor: '#7E22CE',
  },
  {
    icon: FiServer,
    label: 'Backend',
    desc: 'Node.js, Express, Java, REST',
    accentBg: '#FEF3C7',
    accentColor: '#B45309',
  },
  {
    icon: FiUploadCloud,
    label: 'DevOps',
    desc: 'Vercel, Render, Git, Cloud',
    accentBg: '#DCFCE7',
    accentColor: '#15803D',
  },
];

function AboutPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        textAlign: 'center',
        maxWidth: '580px',
        width: '100%',
        margin: '0 auto',
      }}
    >
      <SectionTitle title="About" />

      {/* Bio Card */}
      <div
        style={{
          border: '1.8px solid #000000',
          borderRadius: '12px',
          padding: '16px 20px',
          background: '#ffffff',
          boxShadow: '3px 3px 0 #000000',
          marginBottom: '20px',
          width: '100%',
          textAlign: 'left',
        }}
      >
        <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#333333', marginBottom: '8px' }}>
          <strong style={{ fontWeight: 800, color: '#000000' }}>Who I Am — </strong>
          I&rsquo;m Thamodharan. A full-stack engineer passionate about shipping clean, pragmatic apps with intuitive user experiences and rock-solid architecture.
        </p>
        <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#333333', margin: 0 }}>
          <strong style={{ fontWeight: 800, color: '#000000' }}>What I Do — </strong>
          I architect, build, and deploy web and mobile products using Java, the MERN/Next.js stack, and modern cloud platforms.
        </p>
      </div>

      {/* Focus Areas Section */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          width: '100%',
          marginBottom: '14px',
        }}
      >
        <span
          style={{
            fontSize: '12px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: '#000000',
          }}
        >
          Core Focus Areas
        </span>
        <div style={{ flex: 1, height: '1.5px', background: '#e5e7eb' }} />
      </div>

      {/* 2x2 Focus Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px',
          width: '100%',
        }}
      >
        {FOCUS_AREAS.map((area) => (
          <div
            key={area.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: '1.5px solid #000000',
              borderRadius: '10px',
              padding: '12px 14px',
              background: '#ffffff',
              boxShadow: '2.5px 2.5px 0 #000000',
              textAlign: 'left',
              transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-2px, -2px)';
              e.currentTarget.style.boxShadow = '4px 4px 0 #000000';
              e.currentTarget.style.backgroundColor = '#fafafa';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '2.5px 2.5px 0 #000000';
              e.currentTarget.style.backgroundColor = '#ffffff';
            }}
          >
            {/* Pastel Icon Box */}
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                border: '1.2px solid #000000',
                backgroundColor: area.accentBg,
                color: area.accentColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '1px 1px 0 #000000',
              }}
            >
              <area.icon size={18} />
            </div>

            {/* Content */}
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
              <span style={{ fontWeight: 800, fontSize: '13.5px', color: '#000000' }}>
                {area.label}
              </span>
              <span style={{ fontSize: '11px', color: '#666666', lineHeight: 1.35 }}>
                {area.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Contact (Upgraded Neo-Brutalist Layout) ───────────────────────────────────
function ContactPage() {
  const [status, setStatus] = useState('idle');
  const [form, setForm]     = useState({ name: '', email: '', message: '' });

  const inputStyle = {
    background: '#ffffff',
    border: '1.6px solid #000000',
    borderRadius: '8px',
    color: '#000000',
    fontFamily: 'inherit',
    fontSize: '14px',
    fontWeight: 500,
    padding: '11px 14px',
    outline: 'none',
    width: '100%',
    boxShadow: '2px 2px 0 #000000',
    transition: 'box-shadow 0.15s ease, transform 0.15s ease',
  };

  const contactChannels = [
    {
      label: 'Email',
      icon: FiMail,
      value: EMAIL,
      href: `mailto:${EMAIL}`,
      accentBg: '#E0F2FE',
      accentColor: '#0369A1',
    },
    {
      label: 'Phone',
      icon: FiPhone,
      value: '+91 63818 93190',
      href: 'tel:+916381893190',
      accentBg: '#DCFCE7',
      accentColor: '#15803D',
    },
    {
      label: 'GitHub',
      icon: FiGithub,
      value: 'thamodharangm',
      href: 'https://github.com/thamodharangm',
      accentBg: '#F3E8FF',
      accentColor: '#6B21A8',
    },
  ];

  const handleSubmit = async (e) => {
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
          _captcha: 'false',
        }),
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
        minHeight: '100%',
        textAlign: 'center',
        maxWidth: '540px',
        width: '100%',
        margin: '0 auto',
      }}
    >
      <SectionTitle title="Contact" />
      
      <p
        className="content-subtitle"
        style={{
          maxWidth: '500px',
          marginBottom: '18px',
          fontSize: '15px',
          color: '#555555',
          lineHeight: 1.5,
        }}
      >
        Have a project, idea, or role? Drop a message below or reach out directly.
      </p>

      {/* Direct Contact Channels Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '22px',
          width: '100%',
        }}
      >
        {contactChannels.map((channel) => {
          const Icon = channel.icon;
          return (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.href.startsWith('http') ? '_blank' : undefined}
              rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                background: '#ffffff',
                border: '1.4px solid #000000',
                borderRadius: '6px',
                boxShadow: '2px 2px 0 #000000',
                textDecoration: 'none',
                color: '#000000',
                fontSize: '12px',
                fontWeight: 700,
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-1px, -1px)';
                e.currentTarget.style.boxShadow = '3px 3px 0 #000000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '2px 2px 0 #000000';
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20px',
                  height: '20px',
                  borderRadius: '4px',
                  backgroundColor: channel.accentBg,
                  color: channel.accentColor,
                }}
              >
                <Icon size={12} />
              </span>
              <span>{channel.label}</span>
            </a>
          );
        })}
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '100%',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }} className="contact-inputs-grid">
          <input
            type="text"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = '3px 3px 0 #000000';
              e.currentTarget.style.borderColor = '#000000';
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = '2px 2px 0 #000000';
            }}
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={inputStyle}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = '3px 3px 0 #000000';
              e.currentTarget.style.borderColor = '#000000';
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = '2px 2px 0 #000000';
            }}
          />
        </div>

        <textarea
          placeholder="Tell me about your project or inquiry..."
          required
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
          onFocus={(e) => {
            e.currentTarget.style.boxShadow = '3px 3px 0 #000000';
            e.currentTarget.style.borderColor = '#000000';
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = '2px 2px 0 #000000';
          }}
        />

        <button
          type="submit"
          disabled={status === 'sending'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            background: '#ffffff',
            border: '2px solid #000000',
            color: '#000000',
            textTransform: 'uppercase',
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            padding: '12px 24px',
            cursor: status === 'sending' ? 'not-allowed' : 'pointer',
            boxShadow: '3.5px 3.5px 0 #000000',
            transition: 'all 0.15s ease',
            borderRadius: '8px',
            marginTop: '4px',
          }}
          onMouseEnter={(e) => {
            if (status !== 'sending') {
              e.currentTarget.style.transform = 'translate(-2px, -2px)';
              e.currentTarget.style.boxShadow = '5.5px 5.5px 0 #000000';
              e.currentTarget.style.backgroundColor = '#fafafa';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '3.5px 3.5px 0 #000000';
            e.currentTarget.style.backgroundColor = '#ffffff';
          }}
        >
          <FiSend size={14} />
          <span>{status === 'sending' ? 'Sending Message...' : 'Send Message'}</span>
        </button>

        {status === 'success' && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px 12px',
              background: '#f0fdf4',
              border: '1.5px solid #16a34a',
              borderRadius: '6px',
              color: '#15803d',
              fontSize: '13px',
              fontWeight: 600,
              marginTop: '6px',
            }}
          >
            <FiCheckCircle size={15} />
            <span>Message sent successfully! I will reply soon.</span>
          </div>
        )}

        {status === 'error' && (
          <div
            style={{
              padding: '8px 12px',
              background: '#fef2f2',
              border: '1.5px solid #dc2626',
              borderRadius: '6px',
              color: '#b91c1c',
              fontSize: '13px',
              fontWeight: 600,
              marginTop: '6px',
            }}
          >
            Failed to send message. Please email directly to {EMAIL}
          </div>
        )}
      </form>
    </div>
  );
}

// ── Root Component ─────────────────────────────────────────────────────────
export default function Home() {
  const [route,      setRoute]      = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cursorPos,  setCursorPos]  = useState({ x: -100, y: -100 });
  const lastTrailPos = useRef({ x: 0, y: 0 });

  const router = useRouter();

  const navigate = (id) => {
    if (id === 'thamodharan') {
      router.push('/thamodharan');
      return;
    }
    setRoute(id);
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
      star.style.left  = `${Math.random() * 100}%`;
      star.style.top   = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      starfield.appendChild(star);
    }
  }, []);

  // Cursor ring + floating code-char trail
  useEffect(() => {
    const chars = ['{', '}', '<', '>', '/', ';', '(', ')', '=', '*'];
    const onMove = (e) => {
      if (typeof window !== 'undefined' && window.innerWidth <= 768) return;
      setCursorPos({ x: e.clientX, y: e.clientY });

      const dx = e.clientX - lastTrailPos.current.x;
      const dy = e.clientY - lastTrailPos.current.y;
      if (dx * dx + dy * dy < 3600) return;
      lastTrailPos.current = { x: e.clientX, y: e.clientY };

      const el = document.createElement('div');
      el.textContent = chars[Math.floor(Math.random() * chars.length)];
      Object.assign(el.style, {
        position:     'fixed',
        left:         `${e.clientX}px`,
        top:          `${e.clientY}px`,
        pointerEvents:'none',
        zIndex:       '9997',
        color:        'var(--text-primary)',
        fontFamily:   'monospace',
        fontSize:     '14px',
        opacity:      '0.7',
        transform:    'translate(-50%, -50%)',
        transition:   'all 0.8s ease-out',
      });
      document.body.appendChild(el);
      requestAnimationFrame(() => {
        el.style.transform = 'translate(-50%, -50%) translateY(-20px) scale(0.5)';
        el.style.opacity   = '0';
      });
      setTimeout(() => el.remove(), 800);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <main className="main-container">
      {/* Custom cursor ring (exact Henry implementation) */}
      <div
        style={{
          position:      'fixed',
          left:          cursorPos.x,
          top:           cursorPos.y,
          width:         '40px',
          height:        '40px',
          pointerEvents: 'none',
          zIndex:        9998,
          transform:     'translate(-50%, -50%)',
          opacity:       0.3,
          transition:    'opacity 0.2s',
        }}
      >
        <div
          style={{
            width:        '100%',
            height:       '100%',
            borderRadius: '50%',
            border:       '2px solid var(--text-primary)',
            background:   'transparent',
            filter:       'blur(2px)',
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div
          className="navbar-logo"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('home')}
        >
          Thamodharan.
        </div>

        <button
          className="mobile-menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </button>

        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href="#"
                className={item.id !== 'thamodharan' && route === item.id ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); navigate(item.id); }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile overlay (Henry's exact pattern) */}
      {mobileOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileOpen(false)}>
          <div className="mobile-menu-box" onClick={(e) => e.stopPropagation()}>
            <ul className="mobile-nav-links">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href="#"
                    className={route === item.id ? 'active' : ''}
                    onClick={(e) => { e.preventDefault(); navigate(item.id); }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 50/50 split layout */}
      <div className="main-layout">
        <div className={`content-section page-${route}`} key={route}>
          {route === 'home'    && <HomePage />}
          {route === 'project' && <ProjectPage />}
          {route === 'about'   && <AboutPage />}
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
