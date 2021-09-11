import * as d3 from 'd3'
import { scaleBand } from '@visx/scale'
import styled from 'styled-components'
import { useCallback } from 'react'
import { useTooltip, TooltipWithBounds } from '@visx/tooltip'

const GenresViz = ({
  data, startDate, colorScale, genres, className, width, height, margin = {
    top: 30, bottom: 10, left: 200, right: 10,
  },
}) => {
  // _ format the data
  let formatted = d3.flatRollup(data, (v) => v.length, (d) => d3.timeMonth.floor(d.date), (d) => d.genre)

  formatted = formatted.map((row) => {
    const [date, genre, count] = row
    return ({ date, genre, count })
  })

  const categories = Array.from(d3.rollup(formatted, (v) => d3.sum(v, (d) => d.count), (d) => d.genre), ([key, value]) => ({ genre: key, count: value }))
    .sort((a, b) => b.count - a.count)

  // _ set dimensions
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  // _ create accessors
  const x = (d) => d.date
  const y = (d) => d.genre
  const color = (d) => d.count

  // _ generate sequence on months
  startDate = new Date(startDate)
  const endDate = new Date()
  const months = d3.timeMonths(d3.timeMonth.floor(startDate), endDate)

  const years = d3.utcYears(startDate, new Date())

  // _ scale
  const xScale = scaleBand({
    domain: months,
    range: [margin.left, innerWidth + margin.left],
    padding: 0.1,
  })

  const yScale = scaleBand({
    domain: categories.map(({ genre }) => genre),
    range: [margin.top, innerHeight + margin.top],
    padding: 0.4,
  })

  const formatMonth = (i) => ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]

  // _ tooltip
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipOpen,
    tooltipTop = 0,
    tooltipLeft = 0,
  } = useTooltip()

  let tooltipTimeout

  const handleMouseEnter = useCallback((rect) => {
    const filtered = genres.filter((genre) => d3.timeMonth.floor(new Date(genre.date)).getTime() === rect.date.getTime())
      .filter(({ genres }) => genres.includes(rect.genre))
      .map(({ name }) => name)

    showTooltip({
      tooltipLeft: xScale(x(rect)),
      tooltipTop: yScale(y(rect)),
      tooltipData: {
        date: rect.date,
        genre: rect.genre,
        artists: filtered,
      },
    })
  }, [x, y, xScale, yScale, showTooltip, tooltipTimeout])

  const handleMouseLeave = useCallback(() => {
    hideTooltip()
  }, [hideTooltip])

  // _ return the viz
  return (
    <div className={className}>
      <svg width={width} height={height}>
        {categories.map((cat) => (
          <g>
            <text
              style={{
                fill: tooltipData ? tooltipData.genre === cat.genre ? 'var(--color-heading)' : 'var(--color-paragraph)' : 'var(--color-paragraph)',
              }}
              className="y-axis-labels"
              key={`genre-viz-${cat.genre}`}
              x={0}
              y={yScale(y(cat))}
            >
              {y(cat)}

            </text>
            <text
              className="y-axis-labels"
              key={`genre-viz-${cat.count}`}
              x={120}
              y={yScale(y(cat))}
              style={{
                fill: tooltipData ? tooltipData.genre === cat.genre ? 'var(--color-heading)' : 'var(--color-paragraph)' : 'var(--color-paragraph)',
              }}
            >
              {cat.count}
            </text>
            <line className="gridline" x1={0} x2={innerWidth + margin.left} y1={yScale(y(cat))} y2={yScale(y(cat))} />
          </g>
        ))}
        {formatted.map((row) => (
          <rect
            key={`viz-${row.genre}-${row.date}`}
            x={xScale(x(row))}
            y={yScale(y(row))}
            width={xScale.bandwidth()}
            height={yScale.bandwidth()}
            fill={colorScale(color(row))}
            onMouseEnter={() => handleMouseEnter(row)}
            onMouseLeave={() => handleMouseLeave()}
          />
        ))}
        {years.map((year) => (
          <text className="year" key={`genre-viz-${year}`} x={xScale(year)} y={margin.top - 20}>{d3.timeFormat('%Y')(year)}</text>
        ))}
        {months.map((month) => (
          <text key={`genre-viz-${month}`} x={xScale(month)} y={margin.top - 2}>{month.getMonth() % 2 === 0 ? formatMonth(month.getMonth()) : ''}</text>
        ))}
      </svg>
      {tooltipOpen && tooltipData && tooltipLeft != null && tooltipTop != null && (
        <TooltipWithBounds left={tooltipLeft} top={tooltipTop}>
          <h4>{d3.timeFormat('%B %Y')(tooltipData.date)}</h4>
          <h4>
            {tooltipData.artists.length}
            {' '}
            artists discoverd
          </h4>
          <div>
            {tooltipData.artists.map((artist) => <p key={`tooltip-artist-${artist}`}>{artist}</p>)}
          </div>
        </TooltipWithBounds>
      )}
    </div>
  )
}

export default styled(GenresViz)/* css */`
position: relative;

h4 {
  margin: 0px;
  text-transform: uppercase;
}

p {
  font-size: 0.8rem;
  margin: 0px;
}

rect:hover {
  stroke: white;
  stroke-width: 2;
}

svg {
    text {
        font-size: 0.8rem;
        fill: var(--color-paragraph);
    } 

    .year {
        fill: var(--color-heading);
    }

    .y-axis-labels {
        dominant-baseline: text-before-edge;
    }

    .gridline {
        stroke: var(--color-foreground);
    }
}
`
