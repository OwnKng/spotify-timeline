import { useRouter } from 'next/router'
import * as d3 from 'd3'
import styled from 'styled-components'
import { elevation } from './styled/util'
import { Button } from './styled/Button'

type AddedTracksProps = {
    date: string,
    className: string,
    tracks: any[]
}

const AddedTracks = ({ date, tracks, className }: AddedTracksProps) => {
  const router = useRouter()

  return (
    <div className={className}>
      <Button onClick={() => router.push('/dashboard')}>Back</Button>
      <h1>{d3.timeFormat('%A, %d %B %Y')(new Date(date))}</h1>
      <p>
        You addded
        {' '}
        <span className="highlight">{tracks.length}</span>
        {' '}
        track(s) on
        {' '}
        <span className="highlight">
          {d3.timeFormat('%A, %d %B %Y')(new Date(date))}
        </span>
      </p>
      {tracks.map(({ name, artists }, i) => (
        <div key={`track-${i}`} className="artists-row">
          <h2>{name}</h2>
          {artists.map(({ name }, i) => (
            <span key={`track-artist-${name}-${i}`}>{name}</span>
          ))}
        </div>
      ))}
    </div>
  )
}

export default styled(AddedTracks)/* css */`

margin-top: 2rem;

h1 {
  text-align: center;
}

p {
  text-align: center;
}

button {
      margin: 0px auto;
      background: var(--color-input);
      padding: 10px 20px;
      border: 1px solid var(--color-border);
      border-radius: 5px;
      color: var(--color-heading);
      ${elevation[1]};
    }

    .highlight {
    font-size: 1.5rem;
    border-bottom: 3px solid var(--color-highlight);
    color: var(--color-primary-text);
}


.artists-row {
  border-top: 1px solid var(--color-foreground);
  margin-bottom: 2rem;
}

`
