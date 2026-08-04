import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  images,
  serviceCards,
  phone,
  tel,
  features,
  ribbonItems,
  serviceData,
  stats,
  guarantees,
  handledItems,
  projects
} from '../data/constants';
import Reveal from '../components/ui/Reveal';
import Loader from '../components/ui/Loader';
import { ArrowIcon, PhoneIcon, CheckIcon } from '../components/ui/Icon';

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};

export default function Home() {
  const [reveal, setReveal] = useState(55);
  const tintStageRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [quoteService, setQuoteService] = useState('');
  const [projectIdx, setProjectIdx] = useState(0);

  useEffect(() => {
    if (tintStageRef.current) tintStageRef.current.style.setProperty('--reveal', `${reveal}%`);
  }, [reveal]);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 650);
    return () => clearTimeout(t);
  }, []);

  const ribbon = [...ribbonItems, ...ribbonItems];
  const project = projects[projectIdx];

  const stepProject = (dir) => {
    setProjectIdx((i) => (i + dir + projects.length) % projects.length);
  };

  const handleQuickQuote = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const params = new URLSearchParams({
      service: data.get('service') || 'General',
      name: data.get('name') || '',
      phone: data.get('phone') || ''
    });
    window.location.href = `/contact?${params.toString()}`;
  };

  return (
    <main id="content">
      <AnimatePresence>{!ready && <Loader key="loader" />}</AnimatePresence>

      {/* ---------- HERO: photo background, flat dark panel on the text side ---------- */}
      <section className="hero">
        <div className="hero-frame">
          <div className="hero-bg" aria-hidden="true">
            <img src={images.heroPoster} alt="" />
          </div>
          <div className="hero-panel" aria-hidden="true" />

          <div className="hero-inner">
            <motion.div
              className="hero-copy"
              initial="hidden"
              animate={ready ? 'show' : 'hidden'}
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            >
              <motion.div className="hero-badge" variants={fadeUp}>
                <i />
                Tinting · Branding · Security · Harare
              </motion.div>
              <motion.h1 variants={fadeUp}>
                Protect the view.{' '}
                <span className="accent-serif">own</span> the finish.
              </motion.h1>
              <motion.p variants={fadeUp}>
                Automotive and building tinting, vehicle branding, signage, CCTV and electric gates —
                installed for Zimbabwe heat, glare and daily use.
              </motion.p>
              <motion.div className="hero-actions" variants={fadeUp}>
                <Link className="button button-primary" to="/contact">
                  <span>Get a free quote</span>
                  <span className="btn-icon">
                    <ArrowIcon />
                  </span>
                </Link>
                <Link className="button button-outline-light" to="/services">
                  <span>Explore services</span>
                  <span className="btn-icon">
                    <ArrowIcon />
                  </span>
                </Link>
              </motion.div>

              <motion.div className="hero-card" variants={fadeUp}>
                <div className="hero-card-thumb">
                  <img src={images.wrap} alt="" />
                </div>
                <div className="hero-card-body">
                  <div className="hero-card-top">
                    <div className="hero-card-avatars" aria-hidden="true">
                      <span>TM</span>
                      <span>ZW</span>
                      <span>+</span>
                    </div>
                    <b>1,200+ jobs</b>
                  </div>
                  <p>Completed across Harare. Yours is next.</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="hero-guarantees">
            {guarantees.map((item) => (
              <div className="hero-guarantee" key={item}>
                <CheckIcon />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="hero-ribbon" aria-hidden="true">
        <div className="hero-ribbon-track">
          {ribbon.map((item, i) => (
            <span key={`${item}-${i}`}>{item}</span>
          ))}
        </div>
      </div>

      {/* ---------- quick feature row ---------- */}
      <section className="feature-strip">
        <div className="shell feature-grid">
          {features.map(([num, title, text], i) => (
            <Reveal key={title} delay={Math.min(i * 0.06, 0.24)} className="feature-card">
              <div className="feature-card-inner">
                <div className="feature-icon">{num}</div>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- SECTION A: horizontal scroll cards ---------- */}
      <section className="section">
        <div className="shell">
          <span className="section-label">Services</span>
          <Reveal className="section-head center">
            <h2>
              Complete tint, brand & security work{' '}
              <span className="accent-serif">done properly</span>
            </h2>
          </Reveal>

          <div className="scroll-row">
            <Reveal className="scroll-card scroll-card-feature">
              <div className="scroll-card-media">
                <img src={images.tint} alt="Automotive ceramic tinting" />
              </div>
              <div className="scroll-card-body">
                <h3>Work out your tint</h3>
                <p>
                  Tell us the vehicle or glass and how you use it — we recommend the film grade,
                  shade and finish that actually suits it.
                </p>
                <div className="scroll-card-actions">
                  <Link className="pill" to="/contact?service=Automotive%20window%20tinting">
                    Fast turnaround <ArrowIcon />
                  </Link>
                  <Link className="pill" to="/services">
                    Budget options <ArrowIcon />
                  </Link>
                </div>
              </div>
            </Reveal>

            {serviceCards.slice(1, 5).map(([title, , image], i) => (
              <Reveal
                as={Link}
                to="/services"
                key={title}
                delay={Math.min(i * 0.05, 0.2)}
                className="scroll-card"
              >
                <img src={image} alt={title} loading="lazy" />
                <span className="scroll-card-veil" aria-hidden="true" />
                <span className="circle-btn" aria-hidden="true">
                  <ArrowIcon />
                </span>
                <div className="scroll-card-body">
                  <h3>{title}</h3>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="scroll-hint">
            <ArrowIcon />
            <span>Swipe for more services</span>
          </div>
        </div>
      </section>

      {/* ---------- SECTION B: pill-label flip cards + band photo ---------- */}
      <section className="section section-soft">
        <div className="shell">
          <span className="section-label">What we handle</span>
          <Reveal className="section-head center">
            <h2>
              One team for the glass, the branding{' '}
              <span className="accent-serif">and the gate</span>
            </h2>
            <p>Every job type we cover — glass, branding and site security.</p>
          </Reveal>

          <div className="pill-grid">
            {handledItems.slice(0, 3).map(({ label, title, text }, i) => (
              <Reveal key={title} delay={Math.min(i * 0.06, 0.2)} className="pill-flip">
                <div className="flip-scene flip-scene-sm">
                  <div className="flip-card-inner">
                    <div className="flip-face flip-front">
                      <div className="pill-card-top">
                        <span className="pill">{label}</span>
                        <span className="circle-btn" aria-hidden="true">
                          <ArrowIcon />
                        </span>
                      </div>
                      <h3 style={{ margin: 0, fontSize: '1.15rem' }}>{title}</h3>
                      <p style={{ margin: 0, color: 'var(--muted)', fontSize: '.89rem' }}>{text}</p>
                    </div>
                    <div className="flip-face flip-back">
                      <b>{label}</b>
                      <h3>{title}</h3>
                      <p>{text}</p>
                      <Link className="link" to="/services">
                        See the service <ArrowIcon />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="band-media">
            <img src={images.building} alt="Commercial building window film" loading="lazy" />
          </Reveal>

          <div className="pill-grid">
            {handledItems.slice(3).map(({ label, title, text, image }, i) => (
              <Reveal key={title} delay={Math.min(i * 0.06, 0.2)} className="pill-card">
                <div className="pill-card-top">
                  <span className="pill">{label}</span>
                  <span className="circle-btn" aria-hidden="true">
                    <ArrowIcon />
                  </span>
                </div>
                <p>{text}</p>
                <div className="pill-card-media">
                  <img src={image} alt={title} loading="lazy" />
                </div>
              </Reveal>
            ))}
          </div>

          <div className="band-actions">
            <Link className="button button-blue" to="/contact">
              <span>Talk to an installer</span>
              <span className="btn-icon">
                <ArrowIcon />
              </span>
            </Link>
            <Link className="button button-white" to="/gallery">
              <span>See finished work</span>
              <span className="btn-icon">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- SECTION C: stats flanking a centre image ---------- */}
      <section className="section">
        <div className="shell">
          <span className="section-label">Why us</span>
          <Reveal className="section-head center">
            <h2>
              The advantages that <span className="accent-serif">show up</span> in the finish
            </h2>
          </Reveal>

          <div className="stats-flank">
            <div className="stats-col">
              {stats.slice(0, 2).map(({ value, label }, i) => (
                <Reveal key={label} delay={i * 0.08} className="stat-block">
                  <b>{value}</b>
                  <span>{label}</span>
                </Reveal>
              ))}
            </div>

            <Reveal className="stats-center">
              <img src={images.team} alt="Tint Masters team on site" loading="lazy" />
            </Reveal>

            <div className="stats-col">
              {stats.slice(2).map(({ value, label }, i) => (
                <Reveal key={label} delay={i * 0.08} className="stat-block">
                  <b>{value}</b>
                  <span>{label}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- SECTION D: project showcase with carousel ---------- */}
      <section className="section section-soft">
        <div className="shell">
          <span className="section-label">Our work</span>
          <Reveal className="section-head center">
            <h2>Take a look at what we have finished</h2>
            <span className="pill pill-outline-serif">for Harare drivers & businesses</span>
          </Reveal>

          <div className="showcase">
            <div className="showcase-media">
              <motion.img
                key={project.image}
                src={project.image}
                alt={project.title}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="showcase-nav">
                <button
                  className="circle-btn"
                  onClick={() => stepProject(-1)}
                  aria-label="Previous project"
                  style={{ transform: 'rotate(180deg)' }}
                >
                  <ArrowIcon />
                </button>
                <button className="circle-btn" onClick={() => stepProject(1)} aria-label="Next project">
                  <ArrowIcon />
                </button>
              </div>
            </div>

            <motion.div
              className="showcase-copy"
              key={project.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="showcase-meta">
                <span className="pill">{project.location}</span>
                <span className="pill pill-solid">{project.duration}</span>
              </div>
              <h2>{project.title}</h2>
              <p style={{ margin: 0, color: 'var(--muted)' }}>{project.description}</p>
              <div className="spec-pills">
                {project.specs.map((spec) => (
                  <span className="spec-pill" key={spec}>
                    {spec}
                  </span>
                ))}
              </div>
              <div className="showcase-thumbs">
                {projects.map((p, i) => (
                  <button
                    key={p.title}
                    className={i === projectIdx ? 'active' : ''}
                    onClick={() => setProjectIdx(i)}
                    aria-label={`Show ${p.title}`}
                  >
                    <img src={p.image} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- tint compare ---------- */}
      <section className="section">
        <div className="shell tint-grid">
          <Reveal className="intro-copy">
            <p className="eyebrow">Visualise the difference</p>
            <h2>See the tint before you commit</h2>
            <p>
              Drag the control and preview a darker, more private finish. Final film is chosen
              around your vehicle, building and goals.
            </p>
            <Link className="button button-primary" to="/contact" style={{ justifySelf: 'start' }}>
              <span>Ask about ceramic options</span>
              <span className="btn-icon">
                <ArrowIcon />
              </span>
            </Link>
          </Reveal>
          <Reveal className="tint-stage" ref={tintStageRef} style={{ '--reveal': `${reveal}%` }}>
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

      {/* ---------- quick quote ---------- */}
      <section className="quote-band">
        <div className="shell">
          <Reveal className="quote-panel">
            <div className="quote-panel-inner">
              <div>
                <p className="eyebrow">Fast enquiry</p>
                <h3>Request your quote</h3>
                <p style={{ margin: '.5rem 0 0', color: 'var(--muted)' }}>
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
                  <button className="button button-blue" type="submit">
                    <span>Continue</span>
                    <span className="btn-icon">
                      <ArrowIcon />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Reveal className="cta-panel">
            <div className="cta-panel-bg" aria-hidden="true">
              <img src={images.heroPoster} alt="" />
            </div>
            <div className="cta-panel-veil" aria-hidden="true" />
            <div className="cta-panel-inner">
              <div>
                <p className="eyebrow">Ready when you are</p>
                <h2>Looking for the best tint & branding finish?</h2>
                <p>Tell us the vehicle, building or brand outcome. We’ll recommend the right path.</p>
              </div>
              <div className="cta-actions">
                <Link className="button button-primary" to="/contact">
                  <span>Request a quote</span>
                  <span className="btn-icon">
                    <ArrowIcon />
                  </span>
                </Link>
                <a className="button button-outline-light" href={`tel:${tel}`}>
                  <span>Call {phone}</span>
                  <span className="btn-icon">
                    <PhoneIcon />
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
