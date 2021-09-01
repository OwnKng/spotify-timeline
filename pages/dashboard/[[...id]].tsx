import { getSession } from 'next-auth/client'
import * as d3 from 'd3-array'
import styled from 'styled-components'
import Profile from '../../components/Profile'
import Artist from '../../components/Artist'
import { useLibrary } from '../../hooks/useLibrary'
import Tracks from '../../components/Tracks'
import AddedTracks from '../../components/AddedTracks'
import Discovered from '../../components/Discovered'

const Dashboard = ({
  className, id, name, token, picture,
}) => {
  const {
    tracks, artists, loading, error,
  } = useLibrary(token)

  if (loading) return <p>Loading...</p>

  if (error) return <p>An Error occurred</p>

  const datesMap = d3.group(tracks, (d) => d.date)
  const startDate = d3.min(tracks, (d) => d.date)

  if (id) return (<AddedTracks tracks={datesMap.get(id.toString())} />)

  return (
    <div className={className}>
      <div className="title">
        <h1>your liked tracks</h1>
        <span>Discover when you 👍 liked an artist</span>
      </div>
      <div className="grid">
        <div className="profile">
          <Profile name={name} picture={picture} tracks={tracks} startDate={startDate} />
        </div>
        <div className="artists">
          <h2>Find an artist in your library</h2>
          <Artist artists={artists} startDate={startDate} token={token} />
        </div>
      </div>
      <div>
        <Discovered artists={artists} token={token} />
      </div>
      <div className="activity">
        <div className="activity-title">
          <div>
            <h2>Your activity</h2>
          </div>
          <span>When you added tracks to your library</span>
        </div>
        <Tracks tracks={tracks} startDate={startDate} />
      </div>
      <p className="footer">
        Build by
        {' '}
        <a href="https://ownkng.dev/">Owen King</a>
        {' '}
        using NextJS and Spotify's Web API
      </p>
    </div>
  )
}

export const getServerSideProps = async (context: any) => {
  const props = {}

  const session = await getSession(context)

  if (!session || !session.user) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    }
  }

  if (context.params.id) props.id = context.params.id

  const { user } = session
  props.token = user.accessToken
  props.picture = user.picture
  props.name = user.name

  return { props }
}

export default styled(Dashboard)/* css */`
  .grid {
    display: grid;
    gap: 40px;
    margin-top: 20px;
    justify-items: stretch;
    align-items: stretch;
    grid-template-areas: 'profile artists';
    grid-template-columns: 1fr 2fr;
  }

  .profile {
    grid-area: profile;
    padding: 10px 0px;
  }

  .title {
    h1 {
      text-transform: uppercase;
      margin: 0px;
    }

    padding: 0 0 3rem 0;
  }

  h2 {
    text-transform: uppercase;
    margin: 0px;
  }

  .artists {
    grid-area: artists;
    padding: 10px 20px;
  }

  .activity {
    padding: 3rem 20px 4rem 20px;
  }

  .footer {
    margin-top: 3rem;
    text-align: center;

    a {
      color: var(--color-button);
    }
  }

  @media only screen and (max-width: 800px) {
    .grid {
      grid-template-areas: 'profile' 
                            'artists';
      grid-template-columns: 1fr;
      grid-auto-flow: rows;   
    }
  }
`
