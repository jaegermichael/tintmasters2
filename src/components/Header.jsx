import { Link, useLocation, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { navItems, phone, tel, email } from '../data/constants';
import { ArrowIcon, PhoneIcon } from './ui/Icon';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div className="topbar">
        <div className="shell">
          <div className="topbar-left">
            <a href={`tel:${tel}`}>{phone}</a>
            <span className="topbar-dot">•</span>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
          <div className="topbar-right">
            <span>Sunningdale 2, Harare</span>
            <span className="topbar-dot">•</span>
            <span>Mon–Sat · Quotes same day</span>
          </div>
        </div>
      </div>

      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="nav-island">
          <div className="nav">
            <Link className="brand" to="/" aria-label="Tint Masters home">
              <span className="brand-mark" aria-hidden="true">
                TM
              </span>
              <span>
                Tint<span>Masters</span>
                <small>Zimbabwe</small>
              </span>
            </Link>

            <nav className={`nav-links ${isOpen ? 'open' : ''}`} id="main-nav" aria-label="Primary navigation">
              {navItems.map(({ label, to, id }) => (
                <NavLink
                  key={id}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  aria-current={location.pathname === to ? 'page' : undefined}
                >
                  {label}
                </NavLink>
              ))}
              <div className="nav-mobile-meta">
                <Link className="button button-primary" to="/contact" onClick={() => setIsOpen(false)}>
                  <span>Request a quote</span>
                  <span className="btn-icon">
                    <ArrowIcon />
                  </span>
                </Link>
                <a className="button button-blue" href={`tel:${tel}`}>
                  <span>Call {phone}</span>
                  <span className="btn-icon">
                    <PhoneIcon />
                  </span>
                </a>
              </div>
            </nav>

            <Link className="nav-cta button button-primary button-sm" to="/contact">
              <span>Get a quote</span>
              <span className="btn-icon">
                <ArrowIcon />
              </span>
            </Link>

            <button
              className="menu-toggle"
              aria-expanded={isOpen}
              aria-controls="main-nav"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
