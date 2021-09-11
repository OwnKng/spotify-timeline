import { scaleThreshold } from '@visx/scale'
import styled from 'styled-components'
import { LegendThreshold, LegendItem, LegendLabel } from '@visx/legend'
import * as d3 from 'd3'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import Heatmap from './Heatmap'
import Heatgrid from './Heatgrid'
import Card from './styled/Card'

const Tracks = ({ tracks, className }) => {
  const tracksMap = Array.from(
    d3.group(tracks, (d) => d.date.substring(0, 4)),
    ([key, value]) => ({ key, value }),
  )

  // _ create the shared color scale
  const colorScale = scaleThreshold({
    domain: [2, 5, 10, 20, 50],
    range: ['#0868AC', '#43A2CA', '#7BCCC4', '#A8DDB5', '#CCEBC5', '#F0F9E8'],
  })

  return (
    <Card>
      <div className={className}>
        <div className="activity-title">
          <div>
            <h1>Your activity</h1>
          </div>
          <span>When you added tracks to your library</span>
        </div>
        <h5>
          Tracks 👍
          {' '}
          {' '}
          {' '}
          each day since you joined Spotify
        </h5>
        <div className="info">
          <div className="legend">
            <p># tracks 👍</p>
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
        </div>
        <div className="viz">
          {tracksMap.map(({ key, value }) => (
            <div
              key={`heatmap-${key}`}
              className="viz-container"
            >
              <ParentSize>
                {({ width, height }) => {
                  if (width >= 1000) {
                    return (
                      <Heatmap
                        key={key}
                        width={width}
                        height={200}
                        data={value}
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
    </Card>
  )
}

export default styled(Tracks)/* css */`
h1 {
  text-transform: uppercase;
}

h5 {
  text-transform: uppercase;
  font-size: 1.1rem;
}

.info {
  padding: 0.5rem 0.5rem;
  position: sticky;
  background: var(--color-background);
  top: -1px;
  z-index: 2;
}

.legend {
  grid-area: legend;
  font-size: 0.8rem;

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
