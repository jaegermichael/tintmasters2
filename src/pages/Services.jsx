import { Link } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import { serviceData } from '../data/constants';

export default function Services() {
  return (
    <main id="content">
      <PageHero
        kicker="Our services"
        title="The right finish for the way you work."
        copy="Six core services for vehicles, buildings and business premises. Tell us the outcome you need — we’ll shape the right route."
      />
      <section className="section">
        <div className="shell">
          {serviceData.map(([title, text, image], i) => (
            <Reveal as="article" key={title} delay={i === 0 ? 0 : 0.05} className="service-detail">
              <img src={image} alt={title} loading="lazy" />
              <div>
                <p className="eyebrow">Service {String(i + 1).padStart(2, '0')}</p>
                <h2>{title}</h2>
                <p>{text}</p>
                <Link
                  className="button button-primary"
                  to={`/contact?service=${encodeURIComponent(title)}`}
                >
                  Ask about this service
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
