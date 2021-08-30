import { getSession } from 'next-auth/client'
import * as d3 from 'd3-array'
import styled from 'styled-components'
import Profile from '../../components/Profile'
import Artist from '../../components/Artist'
import { useLibrary } from '../../hooks/useLibrary'
import Tracks from '../../components/Tracks'
import AddedTracks from '../../components/AddedTracks'
import { elevation } from '../../components/styled/util'

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
      <Profile name={name} picture={picture} tracks={tracks} startDate={startDate} />
      <div className="artists">
        <div className="title">
          <h2>Find an artist in your liked tracks</h2>
        </div>
        <Artist artists={artists} />
      </div>
      <div className="activity">
        <div className="activity-title">
          <div className="title">
            <h2>Your activity</h2>
          </div>
          <span>When you added tracks to your library</span>
        </div>
        <Tracks tracks={tracks} />
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
  h2 {
    text-transform: uppercase;
    margin: 0px;
  }

  .artists {
    margin: 0 0 1rem 0;
    position: relative;
    padding: 1rem 0.5rem;
    min-height: 250px;
    padding: 40px 40px;
    margin: 2rem 0rem 4rem 0rem;
    background: var(--color-foreground);
    ${elevation[1]};
  }

  .activity {
    padding: 1rem 0px 4rem 0px;
  }

  .footer {
    margin-top: 3rem;
    text-align: center;

    a {
      color: var(--color-button);
    }
  }
`
