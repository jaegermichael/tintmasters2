import { motion } from 'framer-motion';

/**
 * Wraps an image with an animated "curtain" that slides away on first
 * scroll-into-view, revealing the photo underneath. Adds a reveal-style
 * entrance beyond a simple fade, used across collage and service imagery.
 */
export default function ImageReveal({ src, alt, className, delay = 0, loading }) {
  return (
    <div className={`img-reveal${className ? ` ${className}` : ''}`}>
      <img src={src} alt={alt} loading={loading} />
      <motion.span
        className="img-reveal-curtain"
        aria-hidden="true"
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, delay, ease: [0.76, 0, 0.24, 1] }}
      />
    </div>
  );
}
