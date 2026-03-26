import type { RelationshipType } from "@/types/interface.types"
import { relationshipType } from "@/types/interface.types"
import { arrowStyles } from "./arrow-styles"

interface RelationshipArrowProps {
  from: { x: number; y: number }
  to: { x: number; y: number }
  type: RelationshipType
  scale?: number
}

const STROKE_COLOR = "#555"
const STROKE_WIDTH = 2
const DEFAULT_STYLE = arrowStyles[relationshipType.association]

export default function RelationshipArrow({ from, to, type, scale = 1 }: RelationshipArrowProps) {
  const style = arrowStyles[type] ?? DEFAULT_STYLE

  return (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={STROKE_COLOR}
      strokeWidth={STROKE_WIDTH * scale}
      strokeDasharray={style.strokeDasharray}
      markerEnd={`url(#${style.markerEnd})`}
      markerStart={style.markerStart ? `url(#${style.markerStart})` : undefined}
    />
  )
}
