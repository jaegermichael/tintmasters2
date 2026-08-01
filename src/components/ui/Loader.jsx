import { motion } from 'framer-motion';

const panelTransition = { duration: 0.7, ease: [0.76, 0, 0.24, 1] };

/**
 * Full-screen loading curtain. Mounted while the hero video is buffering;
 * once the parent flips it out of the tree (via AnimatePresence), the two
 * panels slide apart like doors opening and the brand mark fades, revealing
 * the page underneath. reducedMotion="user" (set globally in App.jsx)
 * automatically turns the slide into an instant cut for visitors who prefer
 * reduced motion, so no extra handling is needed here.
 */
export default function Loader() {
  return (
    <motion.div className="loader" exit={{ transitionEnd: { pointerEvents: 'none' } }} aria-hidden="true">
      <motion.div className="loader-panel loader-panel-left" exit={{ x: '-100%' }} transition={panelTransition} />
      <motion.div className="loader-panel loader-panel-right" exit={{ x: '100%' }} transition={panelTransition} />
      <motion.div className="loader-mark" exit={{ opacity: 0, scale: 0.85 }} transition={{ duration: 0.3 }}>
        <span className="loader-word">Tint<em>Masters</em></span>
        <span className="loader-bar" />
      </motion.div>
    </motion.div>
  );
}
