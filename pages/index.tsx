import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import { Button } from '../components/styled/Button'

const artists = ['Jamie xx', 'Frank Ocean', 'Fleetwood Mac', 'your favorite artist']

const Home = ({ className }) => {
  const [counter, setCounter] = useState(0)

  const [session] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) router.push('/dashboard')
  }, [session, router])

  useEffect(() => {
    const timeout = setTimeout(() => {
      counter < artists.length - 1 ? setCounter(counter + 1) : setCounter(0)
    }, 4000)

    return () => clearTimeout(timeout)
  }, [counter])

  return (
    <div className={className}>
      <img src="spotify-logo.svg" alt="spotify-logo" />
      <div className="title">
        <h1>
          When did you discover
          {' '}
        </h1>
        <div className="container">
          <motion.span
            key={artists[counter]}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="highlight"
          >
            {artists[counter]}
            ?
          </motion.span>
        </div>
      </div>
      <Button onClick={() => signIn('spotify')}>Sign in</Button>
      <p>We'll temporarily connect to your Spotify library.</p>
      <p>Your data will not saved</p>
    </div>
  )
}

export default styled(Home)/* css */`
  margin-top: 3rem;
  text-align: center;

  h1 {
    margin: 0px;
  }

  .title {
    display: flex;
    justify-content: center;
    padding: 2rem 0;
  }

  .container {
    padding: 0px 10px;
    display: flex;
    overflow: hidden;
    border-bottom: 3px solid var(--color-highlight);
    justify-content: center;
  }

  .highlight {
    font-size: 2rem;
    color: var(--color-primary-text);
  }

  img {
    width: 30vw;
    margin-bottom: 2rem;
  }

  @media only screen and (max-width: 600px) {
    .title {
      flex-direction: column;
    }
  }
`
