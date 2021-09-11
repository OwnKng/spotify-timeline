import { useState, useEffect } from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'
import ArtistCard from './ArtistCard'
import { elevation } from './styled/util'
import Card from './styled/Card'

const Discovered = ({
  className, artists, startDate, token,
}) => {
  if (!artists.length) return null

  const getCurrentYear = () => new Date().getFullYear().toString()

  const [year, setYear] = useState(getCurrentYear())
  const [discovered, setDiscovered] = useState([])
  const [offset, setOffset] = useState(12)

  const artistsMap = Array.from(
    d3.rollup(artists, (v) => d3.min(v, (d) => d.date), (d) => d.artistId),
    ([key, value]) => ({ id: key, date: value }),
  )

  const getArtists = () => artistsMap.filter(({ date }) => date.substring(0, 4) === year)

  const start = new Date(startDate).getFullYear()
  const end = new Date().getFullYear()
  const years = d3.range(start, end + 1).reverse()

  useEffect(() => {
    setDiscovered(getArtists())
  }, [])

  useEffect(() => {
    setOffset(12)
    setDiscovered(getArtists())
  }, [year])

  return (
    <Card>
      <div className={className}>
        <h2>
          Artists you've 👍 in
          {' '}
          {year}
        </h2>
        <p>
          You've discovered
          {' '}
          <span className="highlight">{discovered ? discovered.length : 0}</span>
          {' '}
          new artists in
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            {years.map((y) => (
              <option key={`options-${y}`} value={y}>{y}</option>
            ))}
          </select>
        </p>
        <h4>Artists you discovered</h4>
        <div className="artists-grid">
          {discovered ? [...discovered]
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((d, i) => (i < offset ? (<ArtistCard key={d.id} token={token} {...d} />) : null)) : <div />}
        </div>
        <div className="more">
          {offset < discovered.length ?? 12 ? (<button onClick={() => setOffset(offset + 12)}>Load more</button>) : <span>No more results</span> }
        </div>
      </div>
    </Card>
  )
}

export default styled(Discovered)/* css */`
    margin-top: 3rem;

    input {
        width: auto;
    }

    .artists-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 10px;
        padding: 0 0 1rem 0;

        @media only screen and (max-width: 600px) {
          grid-template-columns: 1fr;
        }
    }

    select {
        background: var(--color-input);
        padding: 1rem 1rem 5px 1rem; 
        border: none;
        border-bottom: 3px solid var(--color-border);
        border-radius: 0px;
        color: var(--color-heading);
        font-size: 1.4rem;
    }

        .highlight {
            font-size: 1.4rem;
            border-bottom: 2px solid var(--color-highlight);
            color: var(--color-primary-text);
        }

    .more {
      display: flex;
      align-items: center;
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
    
`
