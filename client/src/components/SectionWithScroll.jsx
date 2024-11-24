import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const fadeInVariants = {
    hidden: { opacity: 0, y: 50 }, // Initial state: invisible and slightly below
    visible: { opacity: 1, y: 0 }, // Final state: fully visible in place
  };
  

const SectionWithScroll = ({ children }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true }); // Trigger only once when in view
  
    return (
      <motion.div
        ref={ref}
        variants={fadeInVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ duration: 0.8, ease: 'easeOut',delay: 0.5 }}
      >
        {children}
      </motion.div>
    );
  };

  export default SectionWithScroll