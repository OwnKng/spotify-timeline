import styled from 'styled-components'
import * as d3 from 'd3'
import { elevation } from './styled/util'

const Profile = ({
  className, name, picture, tracks, startDate,
}) => {
  if (!tracks) return null

  const tracksSorted = tracks.sort((a, b) => d3.descending(a.date, b.date))
  const first = tracksSorted[tracksSorted.length - 1]
  const latest = tracksSorted[0]

  return (
    <div className={className}>
      <div>
        <img src={picture} alt="profile pic" />
        <h2>
          {`${name}`}
        </h2>
        <p>
          <span className="count">
            {tracks.length}
            {' '}
            tracks
            {' '}
          </span>
          👍 since
          {' '}
          <span>{d3.timeFormat('%a, %d %B %Y')(new Date(startDate))}</span>
        </p>
      </div>

      {first ? (
        <div className="added">
          <h5>First Track</h5>
          <p>
            <span>
              {first.name}
            </span>
            {' '}
            by
            {' '}
            {first.artists.map((a, i) => (
              <span key={`first-${a}-${i}`}>
                {a.name}
                {' '}
              </span>
            ))}
            on
            <span>
              {' '}
              {d3.timeFormat('%a, %d %B %Y')(new Date(first.date))}
            </span>
          </p>
        </div>
      ) : <div /> }
      {latest ? (
        <div className="added">
          <h5>latest Track</h5>
          <p>
            <span>
              {latest.name}
            </span>
            {' '}
            by
            {' '}
            {latest.artists.map((a, i) => (
              <span key={`latest-${a}-${i}`}>
                {a.name}
                {' '}
              </span>
            ))}
            on
            <span>
              {' '}
              {d3.timeFormat('%a, %d %B %Y')(new Date(latest.date))}
            </span>
          </p>
        </div>
      ) : <div /> }
    </div>
  )
}

export default styled(Profile)/* css */`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;

    .added {
      padding-bottom: 10px;
    }

    span {
      border-bottom: 2px solid var(--color-highlight);
      color: var(--color-primary-text);
    }


    h2 {
        margin: 0px;
    }
    
    img {
        ${elevation[1]};
        height: 120px;
        width: 120px;
        border-radius: 50%;
    }

    h5, p {
      margin: 0px;
    }

    h5 {
      text-transform: uppercase;
    }
`
