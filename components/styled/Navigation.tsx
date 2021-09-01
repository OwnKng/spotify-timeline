import styled from 'styled-components'
import { signIn, signOut, useSession } from 'next-auth/client'
import Link from 'next/link'
import { elevation } from './util'

type navigationProps = {
    className: string
}

const Navigation = ({ className }: navigationProps) => {
  const [session] = useSession()

  return (
    <nav className={className}>
      <Link href="/dashboard">
        <a>LikedTracks</a>
      </Link>
      <div>
        {session ? (
          <div className="account">
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        ) : (
          <button onClick={() => signIn('spotify')}>Sign in</button>
        )}
      </div>
    </nav>
  )
}

export default styled(Navigation)/* css */`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    ${elevation[1]};

    a {
      text-decoration: none;
      font-size: 1.8rem;
      color: var(--color-heading);
    }
  
    .account {
      display: flex;

        img {
            height: 40px;
            border-radius: 50%;
        }
    }

    button {
            padding: 0px; 
            margin: 0px 0px 0px 10px;
            background: none;
            border: none;
            color: var(--color-button);
            cursor: pointer;
        }


`
