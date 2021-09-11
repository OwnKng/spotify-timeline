import * as d3 from 'd3'
import { useEffect, useState } from 'react'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import styled from 'styled-components'
import { scaleThreshold } from '@visx/scale'
import { LegendThreshold, LegendItem, LegendLabel } from '@visx/legend'
import Card from './styled/Card'
import TopGenres from './TopGenres'

const Genres = ({ startDate, genres, className }) => {
  const [top, setTop] = useState([])

  const genresSeparated = genres.map(({ date, genres }) => genres.map((g) => ({ date: new Date(date), genre: g }))).flat()

  useEffect(() => {
    // _
    let topMap = Array.from(d3.rollup(genresSeparated, (v) => v.length, (d) => d.genre), ([key, value]) => ({ genre: key, count: value }))
      .sort((a, b) => b.count - a.count)

    topMap = topMap
      .slice(0, 20)
      .map(({ genre }) => genre)

    // _
    setTop(topMap)
  }, [genres])

  const topGenres = genresSeparated.filter(({ genre }) => top.includes(genre))
  const { length } = [...new Set(genresSeparated.map((d) => d.genre))]

  const colorScale = scaleThreshold({
    domain: [2, 3, 4, 5, 10],
    range: ['#0868AC', '#43A2CA', '#7BCCC4', '#A8DDB5', '#CCEBC5', '#F0F9E8'],
  })

  return (
    <Card>
      <div
        className={className}
      >
        <h1>your top genres</h1>
        <p>
          There are
          {' '}
          <span className="highlight">{genres.length}</span>
          {' '}
          artists in your library spanning
          {' '}
          <span className="highlight">{length}</span>
          {' '}
          unique genres of music.
        </p>
        <h5>Your top genres by number of artists</h5>
        <div className="legend">
          <p># artists 👍</p>
          <div style={{ display: 'flex' }}>
            <LegendThreshold
              scale={colorScale}
            >
              {(labels) => labels.map((label, i) => (
                <LegendItem
                  key={`legend-quantile-${i}`}
                >
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  >
                    <svg width={30} height={30}>
                      <rect fill={label.value} width={30} height={30} />
                    </svg>
                    <LegendLabel>{label.datum ?? 1}</LegendLabel>
                  </div>
                </LegendItem>
              ))}
            </LegendThreshold>
          </div>
        </div>
        <div className="viz">
          <ParentSize>
            {({ width, height }) => <TopGenres data={topGenres} genres={genres} startDate={startDate} width={width} height={height} colorScale={colorScale} /> }
          </ParentSize>
        </div>
      </div>
    </Card>
  )
}

export default styled(Genres)/* css */`
h5 {
  text-transform: uppercase;
  font-size: 1.1rem;
}

.legend {
  font-size: 0.8rem;
  position: sticky;
  top: 0px;
  background: var(--color-background);
  z-index: 10;

  p {
    margin: 0px;
    font-size: 1rem;
  }
}

.viz {
  height: 800px;
}

p {
  font-size: 1.4rem;
  margin: 20px 0px;
}

h5 {
  text-transform: uppercase;
  margin: 5px 0;
}

h1 {
  text-transform: uppercase;
}

margin-bottom: 4rem;
`
