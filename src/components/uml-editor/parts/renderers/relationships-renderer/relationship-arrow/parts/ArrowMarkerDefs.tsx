const STROKE_WIDTH = 1.5

interface ArrowMarkerDefsProps {
  idPrefix: string
  color: string
}

export default function ArrowMarkerDefs({ idPrefix, color }: ArrowMarkerDefsProps) {
  return (
    <defs>
      <marker
        id={`${idPrefix}-arrow-open`}
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
          stroke={color}
          strokeWidth={STROKE_WIDTH}
        />
      </marker>

      <marker
        id={`${idPrefix}-triangle-hollow`}
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
          stroke={color}
          strokeWidth={STROKE_WIDTH}
        />
      </marker>

      <marker
        id={`${idPrefix}-diamond-hollow`}
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
          stroke={color}
          strokeWidth={STROKE_WIDTH}
        />
      </marker>

      <marker
        id={`${idPrefix}-diamond-filled`}
        markerWidth="14"
        markerHeight="10"
        refX="0"
        refY="5"
        orient="auto"
        overflow="visible"
      >
        <polygon
          points="0 5, 7 0, 14 5, 7 10"
          fill={color}
          stroke={color}
          strokeWidth={STROKE_WIDTH}
        />
      </marker>
    </defs>
  )
}
