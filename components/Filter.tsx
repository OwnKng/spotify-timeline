import * as d3 from 'd3'
import { scaleTime } from '@visx/scale'
import { Axis } from '@visx/axis'
import styled from 'styled-components'
import Brush from './Brush'

const margins = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 0,
}

const Filter = ({
  className, startDate, width, height, setSelected,
}) => {
  // _ dimensions
  const innerWidth = width - margins.left - margins.right
  const innerHeight = height - margins.top - margins.bottom

  // _ Generate the days
  const days = d3.utcDays(new Date(startDate), new Date())

  const scale = scaleTime({
    domain: d3.extent(days),
    range: [margins.left, innerWidth - margins.left],
    clamp: true,
  })

  // _ create time scale

  return (
    <div className={className}>
      <svg width={width} height={height}>
        <Axis scale={scale} orientation="bottom" top={innerHeight} stroke="#A6AEBD" tickStroke="#A6AEBD" />
        <Brush scale={scale} width={innerWidth} height={innerHeight} setBrush={setSelected} />
      </svg>
    </div>
  )
}

export default styled(Filter)/* css */`
  span {
    align-self: center;
    margin-right: 5px;
  }
    text {
        fill: var(--color-paragraph);
    }
`
