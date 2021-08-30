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
      <img src={picture} alt="profile pic" />
      <div className="title">
        <h2>
          {`${name}'s liked tracks`}
        </h2>
      </div>
      <p>
        <span className="count">
          {tracks.length}
          {' '}
          tracks
          {' '}
        </span>
        liked since
        {' '}
        <span>{d3.timeFormat('%a, %d %B %Y')(new Date(startDate))}</span>
      </p>
      <div className="tracks">
        {first ? (
          <div>
            <h5 className="title">First Track</h5>
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
          <div>
            <h5 className="title">latest Track</h5>
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
    </div>
  )
}

export default styled(Profile)/* css */`
    display: grid;
    gap: 5px;
    padding: 2rem 0;
    margin: 1rem 0 2rem 0;
    background: var(--color-foreground);
    ${elevation[1]};

    span {
      border-bottom: 2px solid var(--color-highlight);
      color: var(--color-primary-text);
    }

    grid-template-areas: "img name"
                          "img count"
                          "img tracks";

    grid-template-columns: 1fr 3fr;

    h2 {
        margin: 0px;
        grid-area: name;
    }
    
    img {
        height: 60px;
        width: 60px;
        border-radius: 50%;
        grid-area: img;
        margin: 0px auto;
    }

    .count {
      grid-area: count;
    }

    .tracks {
      grid-area: tracks;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px;
      padding: 1rem 0 0 0;
    }

    h5, p {
      margin: 0px;
    }

    h5 {
      text-transform: uppercase;
    }
`
