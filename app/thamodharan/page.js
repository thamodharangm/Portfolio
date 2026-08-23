'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FiArrowUpRight, FiArrowLeft, FiCopy, FiCheck } from 'react-icons/fi';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Custom Cartoon Icons with rich character
function DomainIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <line x1="2" y1="7" x2="22" y2="7" stroke="currentColor" strokeWidth="2" />
      <circle cx="5" cy="5" r="0.75" fill="currentColor" />
      <circle cx="8" cy="5" r="0.75" fill="currentColor" />
      <circle cx="11" cy="5" r="0.75" fill="currentColor" />
      <circle cx="12" cy="11.5" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.7 11.5c.5 2 2.8 2 3.3 0s-.5-2-3.3-2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 21h8" stroke="currentColor" strokeWidth="2" />
      <path d="M12 17v4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 18l5.5-5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 18l-5.5-5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="2" width="12" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
      <line x1="10" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
      <path d="M17 9c1.5 1 1.5 3 0 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19 7c2.5 2 2.5 6 0 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function ThamodharanPage() {
  const router = useRouter();
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [copiedId, setCopiedId] = useState(null);
  const lastTrailPos = useRef({ x: 0, y: 0 });

  // Floating code-char cursor effect
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
        position: 'fixed',
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        pointerEvents: 'none',
        zIndex: '9997',
        color: '#000000',
        fontFamily: 'monospace',
        fontSize: '14px',
        opacity: '0.7',
        transform: 'translate(-50%, -50%)',
        transition: 'all 0.8s ease-out',
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

  const handleCopy = (e, text, id) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const infoCards = [
    {
      id: 'domain',
      icon: DomainIcon,
      accentBg: '#FFF3D6',
      accentColor: '#B45309',
      label: 'Domain',
      value: 'thamodharangm.github.io/Portfolio',
      href: 'https://thamodharangm.github.io/Portfolio/',
      copyValue: 'https://thamodharangm.github.io/Portfolio/',
    },
    {
      id: 'email',
      icon: EmailIcon,
      accentBg: '#E0F2FE',
      accentColor: '#0369A1',
      label: 'Email',
      value: 'thamodharangp@gmail.com',
      href: 'mailto:thamodharangp@gmail.com',
      copyValue: 'thamodharangp@gmail.com',
    },
    {
      id: 'phone',
      icon: PhoneIcon,
      accentBg: '#DCFCE7',
      accentColor: '#15803D',
      label: 'Phone',
      value: '+91 63818 93190',
      href: 'tel:+916381893190',
      copyValue: '+916381893190',
    },
    {
      id: 'github',
      icon: GithubIcon,
      accentBg: '#F3E8FF',
      accentColor: '#6B21A8',
      label: 'GitHub',
      value: 'github.com/thamodharangm',
      href: 'https://github.com/thamodharangm',
      copyValue: 'https://github.com/thamodharangm',
    },
  ];

  return (
    <div className="thamo-root">
      {/* Custom cursor ring */}
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
          transition: 'opacity 0.2s',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '2px solid #000',
            background: 'transparent',
            filter: 'blur(2px)',
          }}
        />
      </div>

      {/* Top Navigation Bar */}
      <nav className="thamo-navbar">
        <button
          onClick={() => router.push('/')}
          className="thamo-back-btn"
          aria-label="Back to Portfolio"
        >
          <FiArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div className="thamo-nav-brand" onClick={() => router.push('/')}>
          Thamodharan.
        </div>
      </nav>

      {/* Main Split Section Frame */}
      <main className="thamo-main-frame">
        {/* Left: Content and Premium 2x2 Card Grid */}
        <section className="thamo-left-panel">
          <div className="thamo-badge">Identity & Channels</div>
          <h1 className="thamo-hero-title">Thamodharan.</h1>
          <p className="thamo-hero-desc">
            Personal page for building apps, shipping products, and direct contact channels.
          </p>

          <div className="thamo-grid">
            {infoCards.map((card) => {
              const Icon = card.icon;
              const isCopied = copiedId === card.id;
              return (
                <a
                  key={card.id}
                  href={card.href}
                  target={card.href.startsWith('http') ? '_blank' : undefined}
                  rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="thamo-card"
                  style={{ '--card-accent-bg': card.accentBg }}
                >
                  <div className="card-top-row">
                    {/* Stylized Icon Badge */}
                    <div
                      className="card-icon-container"
                      style={{
                        backgroundColor: card.accentBg,
                        color: card.accentColor,
                      }}
                    >
                      <Icon />
                    </div>

                    <div className="card-heading-wrap">
                      <span className="card-label-text">{card.label}</span>
                    </div>

                    {/* Quick action buttons */}
                    <div className="card-actions">
                      <button
                        type="button"
                        className={`copy-btn ${isCopied ? 'copied' : ''}`}
                        title="Copy to clipboard"
                        onClick={(e) => handleCopy(e, card.copyValue, card.id)}
                      >
                        {isCopied ? <FiCheck size={13} /> : <FiCopy size={13} />}
                      </button>
                      <span className="open-arrow">
                        <FiArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>

                  <div className="card-bottom-row">
                    <div className="card-value-text">{card.value}</div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* Right: Illustration Panel */}
        <section className="thamo-right-panel">
          <div className="graphic-container">
            <div className="graphic-glow-circle" />
            <Image
              src={`${BASE}/images/cartoon-launch-app.svg`}
              alt="Rocket App Launch Illustration"
              width={340}
              height={340}
              priority
              className="rocket-illustration"
            />
            <div className="status-pill">
              <span className="status-dot" />
              <span>Available for new projects</span>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .thamo-root {
          min-height: 100vh;
          height: 100vh;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #000000;
          overflow: hidden;
        }

        .thamo-navbar {
          height: 64px;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #f0f0f0;
          background: #ffffff;
          z-index: 10;
        }

        .thamo-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: #ffffff;
          border: 1.5px solid #000000;
          box-shadow: 2px 2px 0 #000000;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #000000;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .thamo-back-btn:hover {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 #000000;
          background: #fafafa;
        }

        .thamo-nav-brand {
          font-weight: 900;
          font-size: 16px;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          cursor: pointer;
          border: 1.5px solid #000000;
          padding: 4px 10px;
          box-shadow: 2px 2px 0 #000000;
          transition: transform 0.15s ease;
        }

        .thamo-nav-brand:hover {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 #000000;
        }

        .thamo-main-frame {
          flex: 1;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          height: calc(100vh - 64px);
          overflow: hidden;
        }

        .thamo-left-panel {
          padding: 40px 60px;
          display: flex;
          flex-direction: column;
          justifyContent: center;
          overflow-y: auto;
        }

        .thamo-badge {
          display: inline-block;
          align-self: flex-start;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          background: #000000;
          color: #ffffff;
          padding: 4px 10px;
          margin-bottom: 12px;
        }

        .thamo-hero-title {
          font-size: clamp(36px, 4vw, 56px);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.05;
          margin-bottom: 12px;
          color: #000000;
        }

        .thamo-hero-desc {
          font-size: 15px;
          font-weight: 400;
          color: #666666;
          line-height: 1.5;
          max-width: 500px;
          margin-bottom: 24px;
        }

        .thamo-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          max-width: 620px;
          width: 100%;
        }

        .thamo-card {
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          padding: 16px 18px;
          border: 1.8px solid #000000;
          background: #ffffff;
          box-shadow: 3px 3px 0 #000000;
          text-decoration: none;
          color: #000000;
          transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.18s ease, background-color 0.18s ease;
          cursor: pointer;
          position: relative;
          min-height: 102px;
        }

        .thamo-card:hover {
          transform: translate(-3px, -3px);
          box-shadow: 6px 6px 0 #000000;
          background: #ffffff;
        }

        .card-top-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        /* Stylized Icon Container */
        .card-icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1.5px solid #000000;
          box-shadow: 1.5px 1.5px 0 #000000;
          flex-shrink: 0;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .thamo-card:hover .card-icon-container {
          transform: scale(1.08) rotate(-4deg);
        }

        .card-heading-wrap {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
        }

        .card-label-text {
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #000000;
        }

        .card-actions {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }

        .copy-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border: 1px solid #d4d4d8;
          background: #fafafa;
          color: #52525b;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.15s ease;
          padding: 0;
        }

        .copy-btn:hover {
          border-color: #000000;
          color: #000000;
          background: #ffffff;
        }

        .copy-btn.copied {
          border-color: #16a34a;
          color: #16a34a;
          background: #f0fdf4;
        }

        .open-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a1a1aa;
          transition: transform 0.15s ease, color 0.15s ease;
        }

        .thamo-card:hover .open-arrow {
          color: #000000;
          transform: translate(2px, -2px);
        }

        .card-bottom-row {
          display: flex;
          align-items: center;
        }

        .card-value-text {
          font-size: 13.5px;
          font-weight: 500;
          color: #3f3f46;
          word-break: break-all;
          line-height: 1.35;
        }

        .thamo-card:hover .card-value-text {
          color: #000000;
        }

        .thamo-right-panel {
          background: #fafafa;
          border-left: 1px solid #eeeeee;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          position: relative;
          overflow: hidden;
        }

        .graphic-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          max-width: 320px;
          width: 100%;
        }

        .graphic-glow-circle {
          position: absolute;
          width: 240px;
          height: 240px;
          background: radial-gradient(circle, rgba(0, 0, 0, 0.04) 0%, rgba(255, 255, 255, 0) 70%);
          border-radius: 50%;
          z-index: 0;
        }

        .rocket-illustration {
          width: 100%;
          height: auto;
          max-height: 260px;
          object-fit: contain;
          position: relative;
          z-index: 1;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .graphic-container:hover .rocket-illustration {
          transform: translateY(-8px) scale(1.03);
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: #ffffff;
          border: 1.5px solid #000000;
          box-shadow: 2px 2px 0 #000000;
          font-size: 12px;
          font-weight: 600;
          margin-top: 20px;
          position: relative;
          z-index: 2;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background-color: #22c55e;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }

        /* Mobile & Tablet Styles */
        @media (max-width: 900px) {
          .thamo-root {
            height: auto;
            min-height: 100vh;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }

          .thamo-navbar {
            padding: 0 18px;
            height: 56px;
          }

          .thamo-main-frame {
            grid-template-columns: 1fr;
            height: auto;
            display: flex;
            flex-direction: column;
          }

          .thamo-left-panel {
            padding: 24px 18px 16px 18px;
          }

          .thamo-hero-title {
            font-size: 32px;
            margin-bottom: 8px;
          }

          .thamo-hero-desc {
            font-size: 14px;
            margin-bottom: 18px;
          }

          .thamo-grid {
            grid-template-columns: 1fr;
            max-width: 100%;
            gap: 10px;
          }

          .thamo-card {
            padding: 12px 14px;
            min-height: 80px;
          }

          .thamo-right-panel {
            border-left: none;
            border-top: 1.5px solid #eeeeee;
            padding: 24px 18px 40px 18px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .graphic-container {
            max-width: 220px;
          }

          .graphic-glow-circle {
            width: 180px;
            height: 180px;
          }

          .rocket-illustration {
            max-height: 180px;
            width: 100%;
            height: auto;
          }

          .status-pill {
            margin-top: 14px;
            font-size: 11px;
            padding: 5px 12px;
          }
        }
      `}</style>
    </div>
  );
}
