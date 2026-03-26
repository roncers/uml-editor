const STROKE_COLOR = "#555"
const STROKE_WIDTH = 1.5

export default function ArrowMarkerDefs() {
  return (
    <defs>
      <marker
        id="arrow-open"
        markerWidth="10"
        markerHeight="10"
        refX="10"
        refY="5"
        orient="auto"
        overflow="visible"
      >
        <polyline
          points="0 0, 10 5, 0 10"
          fill="none"
          stroke={STROKE_COLOR}
          strokeWidth={STROKE_WIDTH}
        />
      </marker>

      <marker
        id="triangle-hollow"
        markerWidth="12"
        markerHeight="10"
        refX="12"
        refY="5"
        orient="auto"
        overflow="visible"
      >
        <polygon
          points="0 0, 12 5, 0 10"
          fill="white"
          stroke={STROKE_COLOR}
          strokeWidth={STROKE_WIDTH}
        />
      </marker>

      <marker
        id="diamond-hollow"
        markerWidth="14"
        markerHeight="10"
        refX="0"
        refY="5"
        orient="auto"
        overflow="visible"
      >
        <polygon
          points="0 5, 7 0, 14 5, 7 10"
          fill="white"
          stroke={STROKE_COLOR}
          strokeWidth={STROKE_WIDTH}
        />
      </marker>

      <marker
        id="diamond-filled"
        markerWidth="14"
        markerHeight="10"
        refX="0"
        refY="5"
        orient="auto"
        overflow="visible"
      >
        <polygon
          points="0 5, 7 0, 14 5, 7 10"
          fill={STROKE_COLOR}
          stroke={STROKE_COLOR}
          strokeWidth={STROKE_WIDTH}
        />
      </marker>
    </defs>
  )
}
