import { motion } from 'framer-motion'
import styled from 'styled-components'

const Loading = ({ className }) => (
  <div className={className}>
    <motion.div
      style={{
        width: 80,
        height: 80,
        border: '2px solid #fff',
      }}
      animate={{ rotate: 360 }}
      transition={{ ease: 'linear', duration: 2, repeat: Infinity }}
    />
    <span>Loading</span>
  </div>
)

export default styled(Loading)`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    margin: 4rem 0;
`
