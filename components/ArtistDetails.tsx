import * as d3 from 'd3'
import styled from 'styled-components'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import Timeline from './Timeline'

const ArtistDetails = ({ artist, tracks, className }) => {
  const tracksSorted = tracks.sort((a, b) => d3.descending(a.date, b.date))
  const first = tracksSorted[tracksSorted.length - 1]
  const latest = tracksSorted[0]

  return (
    <div className={className}>
      <div className="timeline">
        <ParentSize debounceTime={10}>
          {({ width, height }) => (
            <Timeline width={width} height={height} data={tracks} />
          )}
        </ParentSize>
      </div>
      <div>
        <p>
          You first liked
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
          to your library. Since then, you've liked
          {' '}
          <span>{tracks.length - 1}</span>
          {' '}
          more tracks by
          {' '}
          <span>{artist}</span>
          . Most recently, you added
          {' '}
          <span>{latest.track}</span>
          {' '}
          to your library on
          {' '}
          <span>{d3.timeFormat('%a, %d %B %Y')(new Date(latest.date))}</span>
          .
        </p>
      </div>
    </div>
  )
}

export default styled(ArtistDetails)`

p {
    font-size: 1.4rem;
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

`
