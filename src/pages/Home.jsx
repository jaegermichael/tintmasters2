import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  images,
  serviceCards,
  phone,
  tel,
  trustPoints,
  marqueeItems
} from '../data/constants';
import Reveal from '../components/ui/Reveal';
import Loader from '../components/ui/Loader';

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } }
};

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function Home() {
  const [reveal, setReveal] = useState(57);
  const tintStageRef = useRef(null);
  const [showVideo, setShowVideo] = useState(true);
  const [ready, setReady] = useState(false);
  const mountTimeRef = useRef(Date.now());

  // Keep the loading curtain visible for at least this long so it reads as
  // an intentional effect, even when the video loads almost instantly on a
  // fast connection.
  const MIN_LOADER_MS = 1400;
  const revealPage = () => {
    const elapsed = Date.now() - mountTimeRef.current;
    const remaining = MIN_LOADER_MS - elapsed;
    if (remaining > 0) {
      setTimeout(() => setReady(true), remaining);
    } else {
      setReady(true);
    }
  };

  useEffect(() => {
    if (tintStageRef.current) {
      tintStageRef.current.style.setProperty('--reveal', `${reveal}%`);
    }
  }, [reveal]);

  useEffect(() => {
    // Safety net: reveal the page even if the video stalls, fails to load,
    // or the browser blocks autoplay (slow connection, data saver, etc.).
    const timeout = setTimeout(() => setReady(true), 3500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Respect the visitor's reduced-motion preference by keeping the
    // static poster image instead of autoplaying the background video.
    // With no video to wait for, the loading curtain can open sooner.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setShowVideo(false);
      revealPage();
    }
  }, []);

  const marquee = [...marqueeItems, ...marqueeItems];

  return (
    <main id="content">
      <AnimatePresence>{!ready && <Loader key="loader" />}</AnimatePresence>

      <section className="hero">
        <div className="hero-media" aria-hidden="true">
          {showVideo ? (
            <video
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
              poster={images.heroPoster}
              onCanPlay={revealPage}
              onError={() => {
                setShowVideo(false);
                revealPage();
              }}
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
          ) : (
            <img src={images.heroPoster} alt="" onLoad={revealPage} />
          )}
        </div>
        <div className="hero-scrim" aria-hidden="true" />

        <div className="shell hero-grid">
          <motion.div
            className="hero-copy"
            variants={heroContainer}
            initial="hidden"
            animate={ready ? 'show' : 'hidden'}
          >
            <motion.div className="hero-kicker" variants={heroItem}>
              <i />
              Harare · Tinting · Branding · Security
            </motion.div>
            <motion.h1 variants={heroItem}>
              Protect the view. <em>Own</em> the finish.
            </motion.h1>
            <motion.p variants={heroItem}>
              Precision ceramic tinting, vehicle branding and practical security installs for
              homes, businesses and the road — built for Zimbabwe heat, glare and daily use.
            </motion.p>
            <motion.div className="hero-actions" variants={heroItem}>
              <Link className="button button-primary" to="/contact">
                Get a free consultation
              </Link>
              <a className="button button-outline" href={`tel:${tel}`}>
                Call {phone}
              </a>
            </motion.div>
            <motion.div className="hero-stats" variants={heroItem}>
              <div className="hero-stat">
                <b>6</b>
                <span>Core services under one roof</span>
              </div>
              <div className="hero-stat">
                <b>UV</b>
                <span>Heat & glare control options</span>
              </div>
              <div className="hero-stat">
                <b>24h</b>
                <span>Fast quote turnaround goal</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.aside
            className="hero-aside"
            initial={{ opacity: 0, y: 18 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-chip-row">
              <span className="hero-chip">
                <strong>Auto</strong> ceramic tint
              </span>
              <span className="hero-chip">
                <strong>Buildings</strong> & frosting
              </span>
              <span className="hero-chip">
                <strong>Fleet</strong> branding
              </span>
              <span className="hero-chip">
                <strong>CCTV</strong> & gates
              </span>
            </div>
          </motion.aside>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {marquee.map((item, i) => (
            <span key={`${item}-${i}`}>{item}</span>
          ))}
        </div>
      </div>

      <div className="trust-strip">
        <div className="shell">
          <ul className="trust-items">
            {trustPoints.map((point) => (
              <li key={point}>
                <i>✓</i>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="section section-fog">
        <div className="shell">
          <div className="services-head">
            <Reveal className="section-heading">
              <p className="eyebrow">What we do</p>
              <h2>Your space. Your privacy. Your standard.</h2>
              <p>
                Every job starts with a clear purpose: cut glare, lock in privacy, make a brand
                impossible to miss, or harden the access around a property.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <Link className="button button-blue button-sm" to="/services">
                View all services
              </Link>
            </Reveal>
          </div>

          <div className="services-grid">
            {serviceCards.map(([title, text, image, featured], i) => (
              <Reveal
                as={Link}
                key={title}
                to="/services"
                delay={Math.min(i * 0.06, 0.3)}
                className={`service${featured ? ' featured' : ''}`}
              >
                <img src={image} alt={title} loading="lazy" />
                <div className="service-content">
                  <b>{String(i + 1).padStart(2, '0')}</b>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal className="section-heading">
            <p className="eyebrow">Built for real work</p>
            <h2>Three reasons shops book us again.</h2>
          </Reveal>
          <div className="promise-grid">
            {[
              [
                '01',
                'Outcome first',
                'We recommend film, frosting or security based on how you use the space — not a one-size catalogue pitch.'
              ],
              [
                '02',
                'Clean install',
                'Edges, prep and finish get the same attention on a daily driver as they do on a shopfront glass wall.'
              ],
              [
                '03',
                'Local & reachable',
                'Harare-based team, clear communication, and a quote path that works from your phone in minutes.'
              ]
            ].map(([num, title, text], i) => (
              <Reveal as="article" key={title} delay={Math.min(i * 0.08, 0.24)} className="promise">
                <b>{num}</b>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="tint-reveal">
        <div className="shell tint-reveal-grid">
          <div className="tint-reveal-copy">
            <Reveal>
              <p className="eyebrow">Visualise the difference</p>
              <h2>See the tint before you commit.</h2>
              <p>
                Drag the control and preview a darker, more private finish. Final film is chosen
                around your vehicle, building and goals.
              </p>
              <div className="reveal-stat">
                <b>Control the light</b>
                <span>Privacy, glare reduction and a cleaner visual finish — without guessing.</span>
              </div>
            </Reveal>
          </div>
          <div>
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
        </div>
      </section>

      <Reveal as="section" className="cta-band">
        <div className="shell">
          <div>
            <h2>Ready to improve your space?</h2>
            <p>Tell us the vehicle, building or brand outcome you need. We’ll recommend the right finish.</p>
          </div>
          <div className="cta-actions">
            <Link className="button button-primary" to="/contact">
              Request a quote
            </Link>
            <a className="button button-outline" href={`tel:${tel}`}>
              Call now
            </a>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
