import { useId, useState } from "react"
import type { RelationshipType } from "@/types/interface.types"
import ArrowMarkerDefs from "./parts/ArrowMarkerDefs"
import RelationshipLine from "./parts/RelationshipLine"

interface RelationshipArrowProps {
  from: { x: number; y: number }
  to: { x: number; y: number }
  type: RelationshipType
  scale?: number
}

const STROKE_COLOR = "#555"
const HOVER_COLOR = "var(--color-secondary)"

export default function RelationshipArrow({ from, to, type, scale = 1 }: RelationshipArrowProps) {
  const uid = useId()
  const idPrefix = uid.replace(/:/g, "")
  const [hovered, setHovered] = useState(false)
  const color = hovered ? HOVER_COLOR : STROKE_COLOR

  // TODO: popover with a button to delete the relationship
  return (
    <g
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ArrowMarkerDefs idPrefix={idPrefix} color={color} />
      <RelationshipLine from={from} to={to} type={type} scale={scale} idPrefix={idPrefix} color={color} />
    </g>
  )
}
