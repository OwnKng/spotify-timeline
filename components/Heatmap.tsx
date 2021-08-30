import { scaleLinear } from '@visx/scale'
import * as d3 from 'd3'
import styled from 'styled-components'
import { useTooltip, TooltipWithBounds } from '@visx/tooltip'
import { useCallback } from 'react'
import { useRouter } from 'next/router'

const margins = {
  top: 20,
  bottom: 20,
  left: 40,
  right: 40,
}

const Heatmap = ({
  year, data, selected, accessor, width, height, margin = margins, className, colorScale,
}) => {
  let highlights: []

  const router = useRouter()

  const dataGrouped = Array.from(
    d3.rollup(data, (v) => v.length, accessor),
    ([key, value]) => ({ date: new Date(key), count: value }),
  )

  if (selected) {
    highlights = dataGrouped.filter(({ date }) => {
      const [min, max] = selected

      return date >= min && date <= max
    }).map((d) => new Date(d.date))
  }

  // _ set dimensions
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  const cellSize = innerWidth / 60

  // _ accessor functions
  const x = (d) => d3.utcSunday.count(d3.utcYear(d), d)
  const y = (d) => d.getUTCDay()

  // _ scales
  const xScale = scaleLinear({
    domain: [0, 51],
    range: [margin.left, innerWidth + margin.left],
  })

  const yScale = scaleLinear({
    domain: [6, 0],
    range: [innerHeight + margin.top, margin.top],
  })

  // _ axis labels
  const dayLabels = d3.range(7)
  const formatDay = (i) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i]

  const startDate = new Date(`${year}-01-01`)
  const endDate = d3.min([new Date(), new Date(`${year + 1}-01-01`)])

  let months = d3.utcMonths(d3.utcMonth(startDate), endDate)
  months = months.map((month) => ({
    label: month,
    position: d3.utcSunday.count(d3.utcYear(month), d3.utcSunday.ceil(month)),
  }))
  const formatMonths = d3.utcFormat('%b')

  // _ generate blanks cells
  const days = d3.utcDays(startDate, endDate)

  // _ handle tooltip
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipOpen,
    tooltipTop = 0,
    tooltipLeft = 0,
  } = useTooltip()

  let tooltipTimeout

  const handleMouseEnter = useCallback(
    (rect) => {
      if (rect) {
        showTooltip({
          tooltipLeft: xScale(x(rect.date)),
          tooltipTop: yScale(y(rect.date)),
          tooltipData: rect,
        })
      }
    },
    [x, y, xScale, yScale, showTooltip, tooltipTimeout],
  )

  const handleMouseLeave = useCallback(() => {
    hideTooltip()
  }, [hideTooltip])

  // _ return the visualisation
  return (
    <div className={className}>
      <svg width={width} height={height}>
        <text className="year" x={0} y={12}>{year}</text>
        {days.map((d) => (
          <rect
            key={`rects-${d}`}
            x={xScale(x(d))}
            y={yScale(y(d))}
            width={cellSize}
            height={cellSize}
            fill="#4A525B"
            stroke="none"
            rx={cellSize * 0.15}
          />
        ))}
        {dataGrouped.map((d) => {
          const date = tooltipData ? tooltipData.date.toString() : ''

          return (
            <rect
              key={`obs-${d.date}`}
              x={xScale(x(d.date))}
              y={yScale(y(d.date))}
              width={cellSize}
              height={cellSize}
              stroke={d.date.toString() === date ? 'var(--color-selected)' : 'none'}
              strokeWidth={3}
              opacity={highlights ? highlights.map((d) => d.toString()).includes(d.date.toString()) ? 1.0 : 0.3 : 1.0}
              fill={colorScale(d.count)}
              rx={cellSize * 0.15}
              onMouseEnter={() => handleMouseEnter(d)}
              onMouseLeave={() => handleMouseLeave()}
              onClick={() => router.push(`/dashboard/${d3.timeFormat('%Y-%m-%d')(d.date)}`)}
              style={{
                cursor: 'pointer',
              }}
            />
          )
        })}
        {dayLabels.map((d) => (
          <text
            key={`day-label-${d}`}
            x={0}
            y={yScale(d + 0.5)}
          >
            {d % 2 == 1 ? formatDay(d) : ''}
          </text>
        ))}
        {months.map(({ label, position }) => (
          <g key={`month-label-${label}`}>
            <text x={xScale(position)} y={12}>{formatMonths(label)}</text>
          </g>
        ))}
      </svg>
      {tooltipOpen && tooltipData && tooltipLeft != null && tooltipTop != null && (
      <TooltipWithBounds left={tooltipLeft} top={tooltipTop}>
        <span style={{ fontWeight: 'bold' }}>{d3.timeFormat('%a, %d %B %Y')(tooltipData.date)}</span>
        <br />
        <span>
          {tooltipData.count}
          {' '}
          tracks
        </span>
      </TooltipWithBounds>
      )}
    </div>
  )
}

export default styled(Heatmap)/* css */`
    position: relative;

    text {
        font-size: 0.8rem;
        fill: var(--color-paragraph);
    }

    .year {
        font-weight: bold;
        font-size: 1rem;
        fill: var(--color-heading); 
    }
`
