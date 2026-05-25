import "./RelationsihpsRenderer.scss"
import type { Entity as EntityType } from "@/types/entity.types"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { observer } from "mobx-react-lite"
import {
  trackMouse,
  getClosestBorderPoint,
} from "@/utils/functions/mouse-tracker"
import RelationshipArrow from "@/components/uml-editor/parts/renderers/relationships-renderer/relationship-arrow/RelationshipArrow"
import { useZoom } from "@/components/uml-editor/parts/board/ZoomContext"
const RelationshipsRenderer = observer(
  ({ entities }: { entities: EntityType[] }) => {
    const relationships = entities.flatMap((entity) =>
      entity.relationships.map((rel) => ({ entityId: entity.id, ...rel })),
    )
    const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null)
    const [mouse, setMouse] = useState({ x: 0, y: 0 })
    const mouseRef = useRef({ x: 0, y: 0 })

    const pendingRel = relationships.find((rel) => rel.destination === "")
    const sourceId = pendingRel?.entityId

    const sourceIdRef = useRef(sourceId)
    sourceIdRef.current = sourceId

    function onMove(posX: number, posY: number) {
      mouseRef.current = { x: posX, y: posY }
      setMouse({ x: posX, y: posY })
      requestAnimationFrame(() => {
        if (!sourceIdRef.current) return
        const ent = document.getElementById(sourceIdRef.current)
        if (!ent) return
        const rect = ent.getBoundingClientRect()
        setOrigin(getClosestBorderPoint(rect, { cursorX: posX, cursorY: posY }))
      })
    }
    const onMoveRef = useRef(onMove)
    onMoveRef.current = onMove
    const creatingNew = Boolean(sourceId)
    const createdRelationships = entities.flatMap((entity) =>
      entity.relationships
        .filter((rel) => rel.destination)
        .map((rel) => ({ entity, rel })),
    )
    // for using the scaling in the relationships when wheel is used
    const scale = useZoom()
    const [, forceRender] = useState(0)
    useLayoutEffect(() => {
      forceRender((n) => n + 1)
    }, [scale])
    useEffect(() => trackMouse((x, y) => onMoveRef.current(x, y)), [])
    function getCoordinates(entityId: string, targetEntityId: string) {
      const ent = document.getElementById(entityId)
      if (!ent) return { x: 0, y: 0 }
      const rect = ent.getBoundingClientRect()
      const target = document.getElementById(targetEntityId)
      if (!target) return { x: 0, y: 0 }
      const targetRect = target.getBoundingClientRect()
      return getClosestBorderPoint(rect, {
        cursorX: targetRect.left + targetRect.width / 2,
        cursorY: targetRect.top + targetRect.height / 2,
      })
    }
    return createPortal(
      <svg
        width={window.innerWidth}
        height={window.innerHeight}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 4,
        }}
      >
        {creatingNew && pendingRel && origin && (
          <RelationshipArrow
            from={origin}
            to={mouse}
            type={pendingRel.type}
            scale={scale}
              onDelete={() => {
              const owner = entities.find((e) => e.id === pendingRel.entityId)
              owner?.deleteRelationship(pendingRel.id)
            }}
          />
        )}
        {createdRelationships.map(({ entity, rel }) => (
          <RelationshipArrow
            key={rel.id}
            from={getCoordinates(rel.origin, rel.destination)}
            to={getCoordinates(rel.destination, rel.origin)}
            type={rel.type}
            scale={scale}
            onDelete={() => entity.deleteRelationship(rel.id)}
          />
        ))}
      </svg>,
      document.body,
    )
  },
)

export default RelationshipsRenderer
