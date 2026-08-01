import { motion } from 'framer-motion';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};

export default function PageHero({ kicker, title, copy, children }) {
  return (
    <section className="page-hero">
      <motion.div className="shell" variants={container} initial="hidden" animate="show">
        <motion.p className="eyebrow" variants={item}>
          {kicker}
        </motion.p>
        <motion.h1 variants={item}>{title}</motion.h1>
        <motion.p variants={item}>{copy}</motion.p>
        {children}
      </motion.div>
    </section>
  );
}
