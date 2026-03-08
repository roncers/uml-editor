import "./RelationsihpsRenderer.scss"
import type { Entity as EntityType } from "@/types/entity.types"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { observer } from "mobx-react-lite"
import { trackMouse } from "@/utils/functions/mouse-tracker"

function closestBorderPoint(rect: DOMRect, cursorX: number, cursorY: number) {
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const dx = cursorX - cx
  const dy = cursorY - cy
  const scaleX = dx !== 0 ? rect.width / 2 / Math.abs(dx) : Infinity
  const scaleY = dy !== 0 ? rect.height / 2 / Math.abs(dy) : Infinity
  const scale = Math.min(scaleX, scaleY)
  return { x: cx + dx * scale, y: cy + dy * scale }
}

const RelationshipsRenderer = observer(
  ({ entities }: { entities: EntityType[] }) => {
    const relationships = entities.flatMap((entity) =>
      entity.relationships.map((rel) => ({ id: entity.id, ...rel })),
    )
    const [origin, setOrigin] = useState({ x: 0, y: 0 })
    const [mouse, setMouse] = useState({ x: 0, y: 0 })

    const sourceId = relationships[0]?.id
    useEffect(() => {
      const ent = document.getElementById(sourceId)
      if (!ent) return
      const rect = ent.getBoundingClientRect()
      setOrigin(closestBorderPoint(rect, rect.left + rect.width / 2, rect.top + rect.height / 2))
    }, [sourceId])

    const sourceIdRef = useRef(sourceId)
    sourceIdRef.current = sourceId

    function onMove(posX: number, posY: number) {
      setMouse({ x: posX, y: posY })
      requestAnimationFrame(() => {
        const ent = document.getElementById(sourceIdRef.current)
        if (!ent) return
        const rect = ent.getBoundingClientRect()
        setOrigin(closestBorderPoint(rect, posX, posY))
      })
    }
    const onMoveRef = useRef(onMove)
    onMoveRef.current = onMove
    useEffect(() => trackMouse((x, y) => onMoveRef.current(x, y)), [])
    return createPortal(
      <svg
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
          x1={origin.x}
          y1={origin.y}
          x2={mouse.x}
          y2={mouse.y}
          stroke="#555"
          strokeWidth={2}
          markerEnd="url(#arrow)"
        />
      </svg>,
      document.body,
    )
  },
)

export default RelationshipsRenderer
