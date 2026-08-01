import { Link, useLocation, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { navItems, phone, tel } from '../data/constants';

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
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="shell nav">
        <Link className="brand" to="/" aria-label="Tint Masters home">
          Tint<span>Masters</span>
          <small>Zimbabwe</small>
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
              Request a quote
            </Link>
            <p>
              Call <a href={`tel:${tel}`}>{phone}</a>
            </p>
          </div>
        </nav>

        <Link className="nav-cta" to="/contact">
          Request a quote
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
    </header>
  );
}
