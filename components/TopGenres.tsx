import * as d3 from 'd3'
import { scaleBand } from '@visx/scale'
import styled from 'styled-components'
import { useTooltip, TooltipWithBounds } from '@visx/tooltip'
import { useCallback } from 'react'

const TopGenres = ({
  data, height, width, genres, className, colorScale, startDate, margin = {
    top: 180, left: 100, right: 10, bottom: 10,
  },
}) => {
  if (width < 100) return null
  // _ format the data
  let formatted = d3.flatRollup(data, (v) => v.length, (d) => d3.timeMonth.floor(d.date), (d) => d.genre)

  formatted = formatted.map((row) => {
    const [date, genre, count] = row
    return ({ date, genre, count })
  })

  let categories = Array.from(d3.rollup(formatted, (v) => d3.sum(v, (d) => d.count), (d) => d.genre), ([key, value]) => ({ genre: key, count: value }))
    .sort((a, b) => b.count - a.count)

  if (width < 600) {
    categories = categories.slice(0, 5)
    const top5 = categories.map((cat) => cat.genre)
    formatted = formatted.filter((d) => top5.includes(d.genre))
  }

  // _ dimensions
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  // _ generate a sequence on months
  startDate = new Date(startDate)
  const endDate = new Date()
  const months = d3.timeMonths(d3.timeMonth.floor(startDate), endDate)

  const years = d3.utcYears(startDate, new Date())

  // _ accessors
  const x = (d) => d.genre
  const y = (d) => d.date
  const color = (d) => d.count

  // _ scales
  const xScale = scaleBand({
    domain: categories.map(({ genre }) => genre),
    range: [margin.left, innerWidth + margin.left],
    padding: 0.1,
  })

  const yScale = scaleBand({
    domain: months,
    range: [margin.top, innerHeight + margin.top],
    padding: 0.1,
  })

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
          <g
            key={`genre-viz-${cat.genre}`}
          >
            <text
              className="y-axis-labels"
              transform={`translate(${xScale(x(cat)) + xScale.bandwidth() / 2}, ${margin.top - 3})rotate(270)`}
            >
              {x(cat)}
            </text>
            {months.map((month) => (
              <rect
                key={`axis-labels-${month}`}
                x={xScale(x(cat))}
                y={yScale(month)}
                width={xScale.bandwidth()}
                height={yScale.bandwidth()}
                fill="#4A525B"
              />
            ))}
          </g>
        ))}
        {years.map((year) => (
          <text className="year" key={`genre-viz-${year}`} x={40} y={yScale(year)}>{d3.timeFormat('%Y')(year)}</text>
        ))}
        {formatted.map((row) => (
          <rect
            key={`viz-${row.genre}-${row.date}`}
            x={xScale(x(row))}
            y={yScale(y(row))}
            width={xScale.bandwidth()}
            height={yScale.bandwidth()}
            fill={colorScale(color(row))}
            className="observation"
            onMouseEnter={() => handleMouseEnter(row)}
            onMouseLeave={() => handleMouseLeave()}
          />
        ))}
      </svg>
      {tooltipOpen && tooltipData && tooltipLeft != null && tooltipTop != null && (
        <TooltipWithBounds left={tooltipLeft} top={tooltipTop}>
          <div className="tooltip">
            <span className="tooltip-title">{d3.timeFormat('%B %Y')(tooltipData.date)}</span>
            <span className="tooltip-subtitle">
              {tooltipData.artists.length}
              {' '}
              artists discoverd
            </span>
            <div className="tooltip-rows">
              {tooltipData.artists.map((artist) => <span key={`tooltip-artist-${artist}`}>{artist}</span>)}
            </div>
          </div>
        </TooltipWithBounds>
      )}
    </div>
  )
}

export default styled(TopGenres)/* css */`
position: relative;

h4 {
    text-transform: uppercase;
    margin: 0px;
}

p {
    font-size: 1rem;
    margin: 5px 0px;
}

.tooltip {
  display: flex;
  flex-direction: column;
}

.tooltip-title {
  font-size: 1.1rem;
}

.tooltip-rows {
  display: flex;
  margin-top: 5px;
  flex-direction: column;
}

svg {
    text {
        fill: var(--color-paragraph);
    }

    .observation:hover {
      stroke: white;
      stroke-width: 2px;
    }

}

`
