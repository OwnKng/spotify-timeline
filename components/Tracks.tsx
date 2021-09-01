import { scaleThreshold } from '@visx/scale'
import styled from 'styled-components'
import { LegendThreshold, LegendItem, LegendLabel } from '@visx/legend'
import * as d3 from 'd3'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { useEffect, useState } from 'react'
import Heatmap from './Heatmap'
import Heatgrid from './Heatgrid'

const Tracks = ({ tracks, startDate, className }) => {
  const [selected, setSelected] = useState({ min: startDate, max: d3.timeFormat('%Y-%m-%d')(new Date()) })
  const [length, setLength] = useState(tracks.length)

  const tracksMap = Array.from(
    d3.group(tracks, (d) => d.date.substring(0, 4)),
    ([key, value]) => ({ key, value }),
  )

  // _ create the shared color scale
  const colorScale = scaleThreshold({
    domain: [2, 5, 10, 20, 50],
    range: ['#02A9F3FF', '#28B6F6FF', '#4EC3F7FF', '#80D3F9FF', '#B2E5FCFF', '#E0F4FEFF'],
  })

  useEffect(() => {
    const newLength = tracks.filter((track) => {
      const date = new Date(track.date)
      const { min, max } = selected

      return date >= new Date(min) && date <= new Date(max)
    })

    setLength(newLength.length)
  }, [selected])

  return (
    <div className={className}>
      <p className="copy">
        You've 👍
        {' '}
        <span>{length}</span>
        {' '}
        tracks between
        {' '}
        <span>{d3.timeFormat('%a, %d %B %Y')(new Date(selected.min))}</span>
        {' '}
        and
        {' '}
        <span>{d3.timeFormat('%a, %d %B %Y')(new Date(selected.max))}</span>
        .
      </p>
      <div className="info">
        <div className="legend">
          <p># tracks liked</p>
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
                  </div>
                </LegendItem>
              ))}
            </LegendThreshold>
          </div>
        </div>
        <div className="filter">
          <span>
            Select dates
          </span>
          <div className="dates">
            <input type="date" value={selected.min} onChange={(e) => setSelected({ ...selected, min: e.target.value })} />
            to
            <input type="date" value={selected.max} onChange={(e) => setSelected({ ...selected, max: e.target.value })} />
          </div>
        </div>
      </div>
      <div className="viz">
        {tracksMap.map(({ key, value }) => (
          <div className="viz-container">
            <ParentSize>
              {({ width, height }) => {
                if (width >= 1000) {
                  return (
                    <Heatmap
                      key={key}
                      width={width}
                      height={200}
                      data={value}
                      selected={selected}
                      year={parseInt(key)}
                      accessor={(d) => d.date}
                      colorScale={colorScale}
                    />
                  )
                }

                return (
                  <Heatgrid
                    key={key}
                    width={width}
                    height={height}
                    data={value}
                    selected={selected}
                    year={parseInt(key)}
                    accessor={(d) => d.date}
                    colorScale={colorScale}
                  />
                )
              }}
            </ParentSize>
          </div>
        ))}
      </div>
    </div>
  )
}

export default styled(Tracks)/* css */`
.info {
  display: grid;
  grid-template-areas: "legend filter";
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 0.5rem 0.5rem;
  position: sticky;
  background: var(--color-background);
  top: -1px;
  z-index: 2;
}

.legend {
  grid-area: legend;
  margin-left: 10px;

  p {
    margin: 0px;
  }
}

.filter {
  grid-area: filter;
  justify-self: end;

  .dates {
    display: flex;
    gap: 10px;
    align-items: flex-end;
  }

  input {
    padding: 10px 0px;

    ::-webkit-calendar-picker-indicator {
    filter: invert(1);
    }
  }

  .labels {
    display: flex;
    justify-content: space-between;
  }
}

.viz {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 0 0.5rem;
}

.viz-container {
      width: 100%;
      height: 200px;
    }


@media only screen and (max-width: 1100px) {

  .viz {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  } 

  .viz-container {
    width: 45%;
    height: 400px;
  }
}

@media only screen and (max-width: 800px) {

  .viz {
    padding: 0;
  }
    .viz-container {
    width: 100%;
    height: 400px;
  }
}

@media only screen and (max-width: 500px) {
  .info {
    grid-template-areas: "legend"
                          "filter";
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .filter {
    justify-self: start;
  }
}

.copy {
  font-size: 1.4rem;

  span {
      border-bottom: 2px solid var(--color-highlight);
      color: var(--color-primary-text);
    }
}

`
