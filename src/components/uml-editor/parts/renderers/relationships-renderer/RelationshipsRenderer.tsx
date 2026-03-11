import "./RelationsihpsRenderer.scss"
import type { Entity as EntityType } from "@/types/entity.types"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { observer } from "mobx-react-lite"
import {
  trackMouse,
  getClosestBorderPoint,
} from "@/utils/functions/mouse-tracker"
import RelationshipArrow from "./RelationshipArrow"

const RelationshipsRenderer = observer(
  ({ entities }: { entities: EntityType[] }) => {
    const relationships = entities.flatMap((entity) =>
      entity.relationships.map((rel) => ({ id: entity.id, ...rel })),
    )
    const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null)
    const [mouse, setMouse] = useState({ x: 0, y: 0 })
    const mouseRef = useRef({ x: 0, y: 0 })

    const sourceId = relationships[0]?.id

    const sourceIdRef = useRef(sourceId)
    sourceIdRef.current = sourceId

    function onMove(posX: number, posY: number) {
      mouseRef.current = { x: posX, y: posY }
      setMouse({ x: posX, y: posY })
      requestAnimationFrame(() => {
        const ent = document.getElementById(sourceIdRef.current)
        if (!ent) return
        const rect = ent.getBoundingClientRect()
        setOrigin(getClosestBorderPoint(rect, { cursorX: posX, cursorY: posY }))
      })
    }
    const onMoveRef = useRef(onMove)
    onMoveRef.current = onMove
    const creatingNew = Boolean(sourceId)
    const createdRelationships = entities.flatMap((entity) => entity.relationships)
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
    if (!origin) return <></>
    return createPortal(
      <>
        {creatingNew && <RelationshipArrow from={origin} to={mouse} />}
        {createdRelationships.length > 0 &&
          createdRelationships.map((rel, indx) => (
            <RelationshipArrow key={indx} from={getCoordinates(rel.origin, rel.destination)} to={getCoordinates(rel.destination, rel.origin)} />
          ))}
      </>,
      document.body,
    )
  },
)

export default RelationshipsRenderer
