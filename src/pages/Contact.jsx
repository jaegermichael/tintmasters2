import { useEffect, useRef, useState } from 'react';
import PageHero from '../components/ui/PageHero';
import { phone, tel, email, serviceData, address } from '../data/constants';

export default function Contact() {
  const [showMessage, setShowMessage] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');
    if (service && formRef.current) {
      formRef.current.service.value = service;
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const lines = [
      `Name: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      `Email: ${data.get('email')}`,
      `Service: ${data.get('service') || 'Not specified'}`,
      '',
      data.get('message')
    ];

    // No backend is wired up yet, so route the enquiry through the visitor's
    // own email client as a functional fallback. To collect leads directly
    // (e.g. into a CRM or inbox without opening a mail client), connect a
    // form backend such as Formspree/Web3Forms and post `data` to it here.
    const subject = encodeURIComponent(`Website enquiry: ${data.get('service') || 'General'}`);
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

    setShowMessage(true);
    form.reset();
  };

  return (
    <main id="content">
      <PageHero
        kicker="Contact Tint Masters"
        title="Let's talk about the job."
        copy="Call, email or send a short brief. The more context you share, the sharper our recommendation."
      />

      <section className="section section-fog">
        <div className="shell contact-grid">
          <section className="contact-info">
            <p className="eyebrow">Visit or get in touch</p>
            <h2>Start with a conversation.</h2>
            <div className="contact-points">
              <div>
                <small>Call / WhatsApp ready</small>
                <a href={`tel:${tel}`}>{phone}</a>
              </div>
              <div>
                <small>Email</small>
                <a href={`mailto:${email}`}>{email}</a>
              </div>
              <div>
                <small>Location</small>
                <p>{address}</p>
              </div>
            </div>
            <a className="button button-blue" href={`tel:${tel}`}>
              Call now
            </a>
          </section>

          <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Your name</label>
                <input id="name" name="name" required autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone number</label>
                <input id="phone" name="phone" required autoComplete="tel" inputMode="tel" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="field">
              <label htmlFor="service">Service needed</label>
              <select id="service" name="service">
                <option value="">Select a service</option>
                {serviceData.map(([title]) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">Tell us about the project</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                placeholder="Vehicle type, location, approximate scope or timing"
              />
            </div>
            <button className="button button-primary" type="submit">
              Send enquiry
            </button>
            <p className={`form-message ${showMessage ? 'show' : ''}`} role="status">
              Thanks. Your email app should now be open with your enquiry pre-filled — just hit send.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
