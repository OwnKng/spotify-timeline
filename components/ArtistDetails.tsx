import * as d3 from 'd3'
import styled from 'styled-components'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { useEffect, useState } from 'react'
import Timeline from './Timeline'
import { elevation } from './styled/util'

const ArtistDetails = ({
  artist, tracks, className, startDate, token,
}) => {
  const tracksSorted = tracks.sort((a, b) => d3.descending(a.date, b.date))
  const first = tracksSorted[tracksSorted.length - 1]
  const latest = tracksSorted[0]
  const [img, setImg] = useState(null)

  const getImage = async (id) => {
    try {
      const resp = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const { images } = await resp.json()

      setImg(images[2].url)
    } catch (err) {
      setImg(null)
    }
  }

  useEffect(() => {
    getImage(tracks[0].artistId)
  }, [artist])

  return (
    <div className={className}>
      <div className="timeline">
        <ParentSize debounceTime={10}>
          {({ width, height }) => (
            <Timeline width={width} height={height} data={tracks} startDate={new Date(startDate)} />
          )}
        </ParentSize>
      </div>
      <div className="copy">
        <img src={img} />
        <div>
          <p>
            You first 👍
            {' '}
            <span>{artist}</span>
            {' '}
            on
            {' '}
            <span>{d3.timeFormat('%a, %d %B %Y')(new Date(first.date))}</span>
            {' '}
            when you added
            {' '}
            <span>{first.track}</span>
            {' '}
            to your library. Since then, you've 👍
            {' '}
            <span>{tracks.length - 1 > 0 ? tracks.length : 'no'}</span>
            {' '}
            more tracks by
            {' '}
            <span>{artist}</span>
            .
          </p>
          {tracks.length > 1 ? (
            <p>
              Most recently, you added
              {' '}
              <span>{latest.track}</span>
              {' '}
              to your library on
              {' '}
              <span>{d3.timeFormat('%a, %d %B %Y')(new Date(latest.date))}</span>
              .
            </p>
          ) : <div />}
        </div>
      </div>
    </div>
  )
}

export default styled(ArtistDetails)/* css */`

p {
  font-size: 1.4rem;
  margin: 20px 0px;
}

span {
    font-size: 1.5rem;
    border-bottom: 3px solid var(--color-highlight);
    color: var(--color-primary-text);
}

.timeline {
    width: 100%;
    height: 80px;
}

.copy {
  display: grid;
  grid-template-columns: 120px auto;
  gap: 30px;

  img {
    ${elevation[1]};
    margin-top: 30px;
    border-radius: 50%;
    height: 120px;
    width: 120px;
    object-fit: cover;
  }
}


`
