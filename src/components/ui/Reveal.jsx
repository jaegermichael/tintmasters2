import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const Reveal = forwardRef(function Reveal(
  { children, delay = 0, y = 24, className, as = 'div', ...rest },
  ref
) {
  const Component = typeof as === 'string' ? motion[as] ?? motion.div : motion.create(as);

  return (
    <Component
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Component>
  );
});

export default Reveal;
