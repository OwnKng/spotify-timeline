import { scaleLinear } from '@visx/scale'
import * as d3 from 'd3'
import styled from 'styled-components'
import { useCallback } from 'react'
import { useTooltip, TooltipWithBounds } from '@visx/tooltip'
import { useRouter } from 'next/router'

const margin = {
  top: 40,
  bottom: 30,
  left: 30,
  right: 50,
}

const Heatgrid = ({
  className,
  year, data, selected, accessor, width, height, colorScale,
}: any) => {
  // _ format the data
  let highlights: []

  const dataGrouped = Array.from(
    d3.rollup(data, (v) => v.length, accessor),
    ([key, value]) => ({ date: new Date(key), count: value }),
  )

  if (selected) {
    highlights = dataGrouped.filter(({ date }) => {
      const { min, max } = selected

      return date >= new Date(min) && date <= new Date(max)
    }).map((d) => new Date(d.date))
  }

  const router = useRouter()

  // _ accessors
  const x = (d) => d.getMonth()
  const y = (d) => d.getDate()

  // _ dimensions
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  // _ scales
  const xScale = scaleLinear({
    domain: [0, 11],
    range: [margin.left, innerWidth + margin.left],
  })

  const yScale = scaleLinear({
    domain: [1, 31],
    range: [margin.top, innerHeight + margin.top],
  })

  // _ generate days and months
  const startDate = new Date(`${year}-01-01`)
  const endDate = d3.min([new Date(), new Date(`${year + 1}-01-01`)])

  const days = d3.utcDays(startDate, endDate)

  // * Axix labels
  const monthLabels = d3.range(12)
  const formatMonth = (i) => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]

  const dayLabels = d3.range(1, 32)

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

  // _ return the viz
  return (
    <div className={className}>
      <svg width={width} height={height}>
        {days.map((d) => (
          <rect
            key={`rects-${d}`}
            x={xScale(x(d))}
            y={yScale(y(d))}
            width={innerWidth / 12}
            height={innerHeight / 31}
            fill="#4A525B"
            stroke="none"
          />
        ))}
        {dataGrouped.map((d) => {
          const date = tooltipData ? tooltipData.date.toString() : ''

          return (
            <rect
              key={`obs-${d.date}`}
              x={xScale(x(d.date))}
              y={yScale(y(d.date))}
              width={innerWidth / 12}
              height={innerHeight / 31}
              stroke={d.date.toString() === date ? 'white' : 'none'}
              strokeWidth={3}
              opacity={highlights ? highlights.map((d) => d.toString()).includes(d.date.toString()) ? 1.0 : 0.3 : 1.0}
              fill={colorScale(d.count)}
              onMouseEnter={() => handleMouseEnter(d)}
              onMouseLeave={() => handleMouseLeave()}
              onClick={() => router.push(`/dashboard/${d3.timeFormat('%Y-%m-%d')(d.date)}`)}
            />
          )
        })}
        <text className="year" x={30} y={20}>{year}</text>
        {monthLabels.map((d) => (
          <text key={`month-label-${d}`} x={xScale(d)} y={35}>
            {width < 400 ? d % 2 === 0 ? formatMonth(d) : '' : formatMonth(d)}
          </text>
        ))}
        {dayLabels.map((d) => (
          <text className="dayLabels" key={`day-label-${d}`} x={20} y={yScale(d + 1)}>
            {d % 2 === 0 ? d : ''}
          </text>
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

export default styled(Heatgrid)/* css */`
    position: relative;

    text {
        font-size: 0.8rem;
        fill: var(--color-paragraph);
    }

    .dayLabels {
        text-anchor: end;
    }

    rect {
        cursor: pointer;
    }

    .year {
        font-weight: bold;
        font-size: 1rem;
        fill: var(--color-heading);
    }
`
