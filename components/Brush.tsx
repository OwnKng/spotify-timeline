import { Drag } from '@visx/drag'
import { useState, useEffect } from 'react'
import { min, max } from 'd3'
import { PatternLines } from '@visx/pattern'
import styled from 'styled-components'

const Brush = ({
  scale, width, height, setBrush, className,
}) => {
  const [start, end] = scale.range()
  const [range, setRange] = useState({ start: scale.invert(start), end: scale.invert(end) })
  const [rect, setRect] = useState({ min: 0, width: 0 })

  useEffect(() => {
    const minBrush = min([range.start, range.end])
    const maxBrush = max([range.end, range.start])

    setRect({
      min: scale(minBrush),
      width: scale(maxBrush) - scale(minBrush),
    })

    setBrush([minBrush, maxBrush])
  }, [range, setRange])

  return (
    <g className={className}>
      <PatternLines
        id="pattern"
        height={6}
        width={6}
        stroke="#B2E5FCFF"
        strokeWidth={1}
        orientation={['diagonal']}
      />
      <rect
        x={rect.min}
        width={rect.width}
        y={10}
        height={height - 10}
        fill="url(#pattern)"
        fillOpacity={0.2}
        stroke="#B2E5FCFF"
        strokeWidth={0.5}
      />
      <Drag
        width={width}
        height={height}
        x={scale(range.start)}
        y={height}
        onDragEnd={({ x, dx }) => setRange({ ...range, start: scale.invert(x + dx) })}
      >
        {({
          dragStart, dragEnd, dragMove, isDragging, x, dx,
        }) => (
          <g
            transform={`translate(${dx}, 0)`}
            onMouseMove={dragMove}
            onMouseUp={dragEnd}
            onMouseDown={dragStart}
            onTouchStart={dragStart}
            onTouchMove={dragMove}
            onTouchEnd={dragEnd}
            style={{
              cursor: 'pointer',
            }}
          >
            <line
              x1={x}
              x2={x}
              y1={height}
              y2={10}
              stroke="white"
              strokeWidth={2}
            />
            <circle
              cx={x}
              cy={10}
              r={8}
              fill="white"
              fillOpacity={1}
              strokeWidth={2}
            />
          </g>
        )}
      </Drag>
      <Drag
        width={width}
        height={height}
        x={scale(range.end)}
        y={height}
        onDragEnd={({ x, dx }) => setRange({ ...range, end: scale.invert(x + dx) })}
      >
        {({
          dragStart, dragEnd, dragMove, isDragging, x, dx,
        }) => (
          <g
            transform={`translate(${dx}, 0)`}
            onMouseMove={dragMove}
            onMouseUp={dragEnd}
            onMouseDown={dragStart}
            onTouchStart={dragStart}
            onTouchMove={dragMove}
            onTouchEnd={dragEnd}
            style={{
              cursor: 'pointer',
            }}
          >
            <line
              x1={x}
              x2={x}
              y1={height}
              y2={10}
              stroke="white"
              strokeWidth={2}
            />
            <circle
              cx={x}
              cy={10}
              r={8}
              fill="white"
              fillOpacity={1}
              strokeWidth={2}
            />
          </g>
        )}
      </Drag>
    </g>
  )
}

export default styled(Brush)`
  circle {
    stroke: var(--color-button);
  }
`
