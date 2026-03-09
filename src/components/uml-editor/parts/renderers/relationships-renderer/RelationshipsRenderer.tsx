import "./RelationsihpsRenderer.scss"
import type { Entity as EntityType } from "@/types/entity.types"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { observer } from "mobx-react-lite"
import {
  trackMouse,
  getClosestBorderPoint,
} from "@/utils/functions/mouse-tracker"
import { useEntityPositions } from "@/components/uml-editor/parts/EntityPositionsContext"
import RelationshipArrow from "./RelationshipArrow"

const RelationshipsRenderer = observer(
  ({ entities }: { entities: EntityType[] }) => {
    const relationships = entities.flatMap((entity) =>
      entity.relationships.map((rel) => ({ id: entity.id, ...rel })),
    )
    const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null)
    const [mouse, setMouse] = useState({ x: 0, y: 0 })
    const mouseRef = useRef({ x: 0, y: 0 })

    const { positions } = useEntityPositions()
    const sourceId = relationships[0]?.id
    const entityPos = positions[sourceId]

    useEffect(() => {
      const ent = document.getElementById(sourceId)
      if (!ent) return
      const rect = ent.getBoundingClientRect()
      const { x, y } = mouseRef.current
      setOrigin(
        getClosestBorderPoint(rect, {
          cursorX: x || rect.left + rect.width / 2,
          cursorY: y || rect.top + rect.height / 2,
        }),
      )
    }, [entityPos, sourceId])

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
    useEffect(() => trackMouse((x, y) => onMoveRef.current(x, y)), [])
    if (!origin) return <></>
    return createPortal(
      <RelationshipArrow from={origin} to={mouse} />,
      document.body,
    )
  },
)

export default RelationshipsRenderer
