import type { RelationshipType } from "@/types/interface.types"
import { relationshipType } from "@/types/interface.types"
import { arrowStyles } from "./arrow-styles"

interface RelationshipLineProps {
  from: { x: number; y: number }
  to: { x: number; y: number }
  type: RelationshipType
  scale?: number
  idPrefix: string
  color: string
}

const STROKE_WIDTH = 2
const DEFAULT_STYLE = arrowStyles[relationshipType.association]

export default function RelationshipLine({ from, to, type, scale = 1, idPrefix, color }: RelationshipLineProps) {
  const style = arrowStyles[type] ?? DEFAULT_STYLE

  return (
    <>
      {/* Invisible wider hit area — forwards clicks to elements below */}
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke="transparent"
        strokeWidth={STROKE_WIDTH * scale * 6}
        pointerEvents="stroke"
        onClick={(e) => {
          const el = e.currentTarget
          el.style.pointerEvents = "none"
          const below = document.elementFromPoint(e.clientX, e.clientY)
          el.style.pointerEvents = ""
          if (below) (below as HTMLElement).click()
        }}
        onWheel={(e) => {
          const el = e.currentTarget
          el.style.pointerEvents = "none"
          const below = document.elementFromPoint(e.clientX, e.clientY)
          el.style.pointerEvents = ""
          if (below) below.dispatchEvent(new WheelEvent("wheel", e.nativeEvent))
        }}
      />
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={color}
        strokeWidth={STROKE_WIDTH * scale}
        strokeDasharray={style.strokeDasharray}
        markerEnd={`url(#${idPrefix}-${style.markerEnd})`}
        markerStart={style.markerStart ? `url(#${idPrefix}-${style.markerStart})` : undefined}
        pointerEvents="none"
      />
    </>
  )
}
