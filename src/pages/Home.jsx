import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  images,
  serviceCards,
  phone,
  tel,
  features,
  processSteps,
  ribbonItems,
  serviceData
} from '../data/constants';
import Reveal from '../components/ui/Reveal';
import Loader from '../components/ui/Loader';

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};

export default function Home() {
  const [reveal, setReveal] = useState(55);
  const tintStageRef = useRef(null);
  const [ready, setReady] = useState(false);
  const mountTimeRef = useRef(Date.now());
  const [quoteService, setQuoteService] = useState('');

  const MIN_LOADER_MS = 900;
  const revealPage = () => {
    const remaining = MIN_LOADER_MS - (Date.now() - mountTimeRef.current);
    if (remaining > 0) setTimeout(() => setReady(true), remaining);
    else setReady(true);
  };

  useEffect(() => {
    if (tintStageRef.current) tintStageRef.current.style.setProperty('--reveal', `${reveal}%`);
  }, [reveal]);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 2200);
    // open quickly — layout is light, no video dependency for first paint
    revealPage();
    return () => clearTimeout(t);
  }, []);

  const ribbon = [...ribbonItems, ...ribbonItems];

  const handleQuickQuote = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const service = data.get('service') || 'General';
    const name = data.get('name') || '';
    const phoneVal = data.get('phone') || '';
    const params = new URLSearchParams({ service, name, phone: phoneVal });
    window.location.href = `/contact?${params.toString()}`;
  };

  return (
    <main id="content">
      <AnimatePresence>{!ready && <Loader key="loader" />}</AnimatePresence>

      {/* HERO — Gainlove-style map + Logiko bold type */}
      <section className="hero">
        <div className="shell hero-grid">
          <motion.div
            className="hero-copy"
            initial="hidden"
            animate={ready ? 'show' : 'hidden'}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.div className="hero-badge" variants={fadeUp}>
              <i />
              Harare · Trusted local installers
            </motion.div>
            <motion.h1 variants={fadeUp}>
              Protect the view. <em>Own</em> the finish.
            </motion.h1>
            <motion.p variants={fadeUp}>
              Automotive & building tinting, vehicle branding, signage, CCTV and electric gates —
              built for Zimbabwe heat, glare and daily use.
            </motion.p>
            <motion.div className="hero-actions" variants={fadeUp}>
              <Link className="button button-primary" to="/contact">
                Get a free quote
              </Link>
              <Link className="button button-outline" to="/services">
                Explore services
              </Link>
            </motion.div>
            <motion.div className="hero-phone" variants={fadeUp}>
              <div className="hero-phone-icon" aria-hidden="true">
                ☎
              </div>
              <div>
                <b>Call or WhatsApp</b>
                <a href={`tel:${tel}`}>{phone}</a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={ready ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div className="hero-map-wrap">
              <img
                className="hero-map-photo"
                src={images.tint}
                alt="Tint Masters work shaped as the map of Zimbabwe"
              />
              <div className="hero-map-outline" aria-hidden="true">
                <img src={images.map} alt="" />
              </div>
              <span className="hero-dot hero-dot-1" aria-hidden="true" />
              <span className="hero-dot hero-dot-2" aria-hidden="true" />
              <span className="hero-dot hero-dot-3" aria-hidden="true" />
            </div>

            <div className="hero-float hero-float-a">
              <div>
                <b>Harare HQ</b>
                <span>Sunningdale 2 base</span>
              </div>
            </div>
            <div className="hero-float hero-float-b">
              <div>
                <b>6 services</b>
                <span>Tint · brand · secure</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="hero-ribbon" aria-hidden="true">
          <div className="hero-ribbon-track">
            {ribbon.map((item, i) => (
              <span key={`${item}-${i}`}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Feature cards overlapping ribbon — Logiko style */}
      <section className="feature-strip">
        <div className="shell feature-grid">
          {features.map(([num, title, text], i) => (
            <Reveal key={title} delay={Math.min(i * 0.06, 0.24)} className="feature-card">
              <div className="feature-icon">{num}</div>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* About split */}
      <section className="section">
        <div className="shell intro-grid">
          <Reveal className="about-collage">
            <img src={images.team} alt="Tint Masters commercial install" />
            <img src={images.founder} alt="Automotive tint finishing" />
            <div className="about-stat">
              <div>
                <b>UV</b>
                <span>Heat & glare options</span>
              </div>
              <div>
                <b>6</b>
                <span>Core services</span>
              </div>
              <div>
                <b>24h</b>
                <span>Quote goal</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="intro-copy">
            <p className="eyebrow">Why Tint Masters</p>
            <h2>We provide a full range of tint, brand & security services</h2>
            <p>
              From ceramic film on daily drivers to frosted office glass and gated premises — one
              Harare team, clear communication, and a finish you can see.
            </p>
            <ul className="intro-points">
              <li>
                <i>✓</i>
                <span>Mobile-friendly quotes with photo-ready guidance</span>
              </li>
              <li>
                <i>✓</i>
                <span>Automotive, property and fleet work under one roof</span>
              </li>
              <li>
                <i>✓</i>
                <span>Practical installs built for local heat and glare</span>
              </li>
            </ul>
            <div className="hero-actions">
              <Link className="button button-primary" to="/about">
                About the team
              </Link>
              <a className="button button-outline" href={`tel:${tel}`}>
                Call now
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="section section-soft">
        <div className="shell">
          <Reveal className="section-head center">
            <p className="eyebrow">What we do</p>
            <h2>Specialist services for vehicles, glass & premises</h2>
            <p>Pick the outcome you need — we’ll recommend the right materials and install path.</p>
          </Reveal>
          <div className="services-grid">
            {serviceCards.map(([title, text, image], i) => (
              <Reveal
                as={Link}
                key={title}
                to="/services"
                delay={Math.min(i * 0.05, 0.25)}
                className="service-card"
              >
                <img src={image} alt={title} loading="lazy" />
                <div className="service-card-body">
                  <b>{String(i + 1).padStart(2, '0')}</b>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span className="link">View service →</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="shell">
          <Reveal className="section-head center">
            <p className="eyebrow">Simple process</p>
            <h2>3 easy steps to a better finish</h2>
          </Reveal>
          <div className="process-grid">
            {processSteps.map(([num, title, text], i) => (
              <Reveal key={title} delay={Math.min(i * 0.08, 0.24)} className="process-step">
                <div className="process-num">{num}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tint compare */}
      <section className="section section-soft">
        <div className="shell tint-grid">
          <Reveal className="intro-copy">
            <p className="eyebrow">Visualise the difference</p>
            <h2>See the tint before you commit</h2>
            <p>
              Drag the control and preview a darker, more private finish. Final film is chosen
              around your vehicle, building and goals.
            </p>
            <Link className="button button-primary" to="/contact">
              Ask about ceramic options
            </Link>
          </Reveal>
          <Reveal
            className="tint-stage"
            ref={tintStageRef}
            style={{ '--reveal': `${reveal}%` }}
          >
            <img src={images.tint} alt="Vehicle window tinting example" />
            <div className="tint-treated">
              <img src={images.tint} alt="" />
            </div>
            <div className="tint-divider" aria-hidden="true">
              <i />
            </div>
            <input
              className="tint-control"
              type="range"
              min="10"
              max="90"
              value={reveal}
              onChange={(e) => setReveal(Number(e.target.value))}
              aria-label="Adjust tint comparison"
            />
          </Reveal>
        </div>
      </section>

      {/* Quick quote band — Logiko track order style */}
      <section className="quote-band">
        <div className="shell">
          <Reveal className="quote-panel">
            <div>
              <p className="eyebrow">Fast enquiry</p>
              <h3>Request your quote</h3>
              <p className="muted" style={{ margin: '0.5rem 0 0', color: 'var(--muted)' }}>
                Share a few details and we’ll follow up with a clear recommendation.
              </p>
            </div>
            <form className="quote-form" onSubmit={handleQuickQuote}>
              <div className="row">
                <input name="name" placeholder="Your name" required />
                <input name="phone" placeholder="Phone number" required inputMode="tel" />
              </div>
              <div className="row">
                <select
                  name="service"
                  value={quoteService}
                  onChange={(e) => setQuoteService(e.target.value)}
                >
                  <option value="">Select a service</option>
                  {serviceData.map(([title]) => (
                    <option key={title} value={title}>
                      {title}
                    </option>
                  ))}
                </select>
                <button className="button button-primary" type="submit">
                  Continue →
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Dark CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Reveal className="cta-panel">
            <div>
              <p className="eyebrow">Ready when you are</p>
              <h2>Looking for the best tint & branding finish?</h2>
              <p>Tell us the vehicle, building or brand outcome. We’ll recommend the right path.</p>
            </div>
            <div className="cta-actions">
              <Link className="button button-primary" to="/contact">
                Request a quote
              </Link>
              <a className="button button-outline-light" href={`tel:${tel}`}>
                Call {phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
