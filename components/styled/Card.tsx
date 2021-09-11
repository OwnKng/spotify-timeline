import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'easeIn' },
}

const Card = ({ children }) => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="initial"
      animate={inView ? 'animate' : 'initial'}
    >
      {children}
    </motion.div>
  )
}

export default Card
