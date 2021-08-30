import { scaleTime } from '@visx/scale'
import { Axis } from '@visx/axis'
import styled from 'styled-components'

const margins = {
  top: 20,
  left: 10,
  right: 10,
  bottom: 10,
}

const Timeline = ({
  className, data, width, height, margin = margins,
}) => {
  // _ create accessors
  const x = (d) => new Date(d.date)
  const startDate = new Date('2015-01-01')
  const endDate = new Date()

  // _ set dimensions
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  // _ create scales
  const scale = scaleTime({
    domain: [startDate, endDate],
    range: [margin.left, innerWidth - margin.left],
    clamp: true,
  })

  return (
    <div className={className}>
      <svg width={width} height={height}>
        {data.map((d, i) => (
          <circle key={`point-${i}`} cx={scale(x(d))} cy={innerHeight} r={10} fill="white" fillOpacity={0.2} strokeOpacity={1.0} strokeWidth={1} />
        ))}
        <Axis scale={scale} orientation="bottom" top={innerHeight} stroke="white" tickStroke="white" />
      </svg>
    </div>
  )
}

export default styled(Timeline)`
    svg {
        text {
            fill: var(--color-paragraph);
        }

        circle {
            stroke: var(--color-highlight);
        }
    }
`
