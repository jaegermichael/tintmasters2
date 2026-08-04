import { Link } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import { images, values, tel } from '../data/constants';
import { ArrowIcon, PhoneIcon } from '../components/ui/Icon';
import ImageReveal from '../components/ui/ImageReveal';

export default function About() {
  return (
    <main id="content">
      <PageHero
        kicker="About Tint Masters"
        title="Work you can see. Standards you can trust."
        copy="We bring tinting, branding and security under one roof — with a practical approach and a careful finish built for Harare."
      />

      <section className="section">
        <div className="shell intro-grid">
          <Reveal className="about-collage">
            <ImageReveal src={images.team} alt="Tint Masters project work" />
            <ImageReveal src={images.founder} alt="Tint Masters team at work" delay={0.12} />
            <div className="about-stat">
              <div>
                <b>Local</b>
                <span>Harare based</span>
              </div>
              <div>
                <b>Full</b>
                <span>Service range</span>
              </div>
              <div>
                <b>Clear</b>
                <span>Quotes & installs</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05} className="intro-copy">
            <p className="eyebrow">Our approach</p>
            <h2>Solve the practical part. Then refine the visible part.</h2>
            <p>
              Tint Masters Zimbabwe works with vehicle owners, homeowners and businesses that want a
              better result from the surfaces they use every day.
            </p>
            <p>
              That could be cooler cabin temperatures, a private meeting room, a branded fleet or a
              more secure entrance. The material changes — the standard does not.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/contact">
                <span>Talk to our team</span>
                <span className="btn-icon">
                  <ArrowIcon />
                </span>
              </Link>
              <a className="button button-blue" href={`tel:${tel}`}>
                <span>Call us</span>
                <span className="btn-icon">
                  <PhoneIcon />
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell">
          <Reveal className="section-head center">
            <p className="eyebrow">What guides us</p>
            <h2>Clear recommendations. Careful execution.</h2>
          </Reveal>
          <div className="values">
            {values.map(({ num, label, title, desc }, i) => (
              <Reveal
                as="article"
                key={title}
                delay={Math.min(i * 0.08, 0.3)}
                y={16}
                className="value"
              >
                <div className="value-inner">
                  <b>
                    {num} / {label}
                  </b>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Reveal className="cta-panel">
            <div className="cta-panel-bg" aria-hidden="true">
              <img src={images.tint} alt="" />
            </div>
            <div className="cta-panel-veil" aria-hidden="true" />
            <div className="cta-panel-inner">
              <div>
                <h2>Ready to improve your space?</h2>
                <p>From first call to final edge — we keep the process simple and the finish sharp.</p>
              </div>
              <div className="cta-actions">
                <Link className="button button-primary" to="/contact">
                  <span>Request a quote</span>
                  <span className="btn-icon">
                    <ArrowIcon />
                  </span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
