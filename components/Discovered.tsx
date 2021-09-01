import { useState, useEffect } from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'
import ArtistCard from './ArtistCard'

const Discovered = ({
  className, artists, startDate, token,
}) => {
  const [year, setYear] = useState('2020')
  const [discovered, setDiscovered] = useState()
  const [offset, setOffset] = useState(12)

  const artistsMap = Array.from(
    d3.rollup(artists, (v) => d3.min(v, (d) => d.date), (d) => d.artistId),
    ([key, value]) => ({ id: key, date: value }),
  )

  useEffect(() => {
    const filteredArtists = artistsMap.filter(({ date }) => date.substring(0, 4) === year)
    setDiscovered(filteredArtists)
  }, [year])

  return (
    <div className={className}>
      <h2>
        Find artists you've in
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
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
        </select>
      </p>
      <h4>Artists you discovered</h4>
      <div className="artists-grid">
        {discovered ? discovered.map((d, i) => (i < offset ? (<ArtistCard key={d.id} token={token} {...d} />) : null)) : <div />}
      </div>
      <button onClick={() => setOffset(offset + 12)}>Load more</button>
    </div>
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
    
`
