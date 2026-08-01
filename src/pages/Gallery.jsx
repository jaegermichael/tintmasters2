import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PageHero from '../components/ui/PageHero';
import { galleryItems } from '../data/constants';

const filters = [
  ['all', 'All work'],
  ['tint', 'Tinting'],
  ['building', 'Property'],
  ['branding', 'Branding'],
  ['security', 'Security']
];

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogImage, setDialogImage] = useState({ src: '', alt: '' });
  const dialogRef = useRef(null);

  // The dialog stays mounted in the DOM at all times so the native
  // showModal()/close() API and Escape-to-close behaviour work correctly.
  useEffect(() => {
    const dialogEl = dialogRef.current;
    if (!dialogEl) return;
    if (dialogOpen && !dialogEl.open) {
      dialogEl.showModal();
    } else if (!dialogOpen && dialogEl.open) {
      dialogEl.close();
    }
  }, [dialogOpen]);

  useEffect(() => {
    const dialogEl = dialogRef.current;
    if (!dialogEl) return;
    // Keeps React state in sync when the dialog is closed natively
    // (Escape key or the browser's built-in <dialog> handling).
    const handleClose = () => setDialogOpen(false);
    dialogEl.addEventListener('close', handleClose);
    return () => dialogEl.removeEventListener('close', handleClose);
  }, []);

  const filteredItems =
    filter === 'all' ? galleryItems : galleryItems.filter(([category]) => category === filter);

  const openDialog = (src, alt) => {
    setDialogImage({ src, alt });
    setDialogOpen(true);
  };

  return (
    <main id="content">
      <PageHero
        kicker="Project gallery"
        title="A closer look at the work."
        copy="A selection of Tint Masters projects across automotive, property, branding and security work."
      />

      <section className="section section-fog">
        <div className="shell">
          <div className="gallery-controls" aria-label="Filter gallery">
            {filters.map(([id, label]) => (
              <button
                key={id}
                className={`filter ${filter === id ? 'active' : ''}`}
                onClick={() => setFilter(id)}
              >
                {label}
              </button>
            ))}
          </div>

          <motion.div layout className="gallery-grid">
            <AnimatePresence mode="popLayout">
              {filteredItems.map(([category, label, src]) => (
                <motion.button
                  key={`${category}-${label}-${src}`}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="gallery-card"
                  data-category={category}
                  onClick={() => openDialog(src, label)}
                >
                  <img src={src} alt={label} loading="lazy" />
                  <span>{label}</span>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <dialog
        className="dialog"
        ref={dialogRef}
        onClick={(e) => {
          // Clicking the backdrop (the <dialog> element itself, not its
          // content) closes it.
          if (e.target === dialogRef.current) setDialogOpen(false);
        }}
      >
        <button aria-label="Close image" onClick={() => setDialogOpen(false)}>
          ×
        </button>
        {dialogImage.src && <img src={dialogImage.src} alt={dialogImage.alt} />}
      </dialog>
    </main>
  );
}
