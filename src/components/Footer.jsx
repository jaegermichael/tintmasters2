import { Link } from 'react-router-dom';
import { navItems, phone, tel, email, address, facebook } from '../data/constants';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="site-footer">
        <div className="shell footer-grid">
          <section className="footer-brand">
            <Link className="brand" to="/">
              <span className="brand-mark" aria-hidden="true">
                TM
              </span>
              <span>
                Tint<span>Masters</span>
                <small>Zimbabwe</small>
              </span>
            </Link>
            <p>
              Tinting, vehicle branding and practical security installs for homes, businesses and the
              road across Harare.
            </p>
          </section>
          <section>
            <p className="footer-title">Explore</p>
            <nav className="footer-links" aria-label="Footer navigation">
              {navItems.map(({ label, to }) => (
                <Link key={to} to={to}>
                  {label}
                </Link>
              ))}
            </nav>
          </section>
          <section>
            <p className="footer-title">Contact</p>
            <div className="footer-links">
              <a href={`tel:${tel}`}>{phone}</a>
              <a href={`mailto:${email}`}>{email}</a>
              <span>{address}</span>
              <a href={facebook} target="_blank" rel="noreferrer">
                Facebook
              </a>
            </div>
          </section>
        </div>
        <div className="shell footer-bottom">
          <span>Copyright © {year} Tint Masters Zimbabwe</span>
          <span>Privacy, protection and presentation — professionally handled.</span>
        </div>
      </footer>

      <div className="mobile-cta" aria-label="Quick actions">
        <a className="call" href={`tel:${tel}`}>
          Call now
        </a>
        <Link className="quote" to="/contact">
          Free quote
        </Link>
      </div>
    </>
  );
}
