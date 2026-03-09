interface Positions {
  from: { x: number; y: number }
  to: { x: number; y: number }
}

export default function RelationshipArrow({ from, to }: Positions) {
  return <svg
    width={window.innerWidth}
    height={window.innerHeight}
    style={{
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      zIndex: 1,
    }}
  >
    {/* Arrowhead marker definition */}
    <defs>
      <marker
        id="arrow"
        markerWidth="10"
        markerHeight="7"
        refX="10"
        refY="3.5"
        orient="auto"
      >
        <polygon points="0 0, 10 3.5, 0 7" fill="#555" />
      </marker>
    </defs>

    {/* Line from entity center → cursor */}
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke="#555"
      strokeWidth={2}
      markerEnd="url(#arrow)"
    />
  </svg>
}
