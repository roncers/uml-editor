import { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  trackUpdates,
  getClosestBorderPoint,
} from "@/utils/functions/arrow-updater"
import RelationshipArrow from "@/components/uml-editor/parts/renderers/relationships-renderer/relationship-arrow/RelationshipArrow"
import type { Entity as EntityType } from "@/types/entity.types"
import { useUpdatingContext } from "@/components/uml-editor/parts/renderers/relationships-renderer/UpdatingContext"

const DummyRelationshipsRenderer = observer(
  ({
    entities,
    container,
    dialogTarget,
  }: {
    entities: EntityType[]
    container: HTMLElement | null
    dialogTarget?: HTMLElement | null
  }) => {
    const relationships = entities.flatMap((entity) =>
      entity.relationships.map((rel) => ({ entityId: entity.id, ...rel })),
    )
    const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null)
    const [mouse, setMouse] = useState({ x: 0, y: 0 })
    const [mouseViewport, setMouseViewport] = useState({ x: 0, y: 0 })
    const updatingStore = useUpdatingContext()

    const pendingRel = relationships.find((rel) => rel.destination === "")
    const sourceId = pendingRel?.entityId
    const sourceIdRef = useRef(sourceId)
    sourceIdRef.current = sourceId

    const createdRelationships = entities.flatMap((entity) =>
      entity.relationships
        .filter((rel) => rel.destination)
        .map((rel) => ({ entity, rel })),
    )

    function getOffset() {
      const r = container?.getBoundingClientRect()
      return { ox: r?.left ?? 0, oy: r?.top ?? 0 }
    }

    function getCoordinates(entityId: string, targetEntityId: string) {
      const { ox, oy } = getOffset()
      const ent = document.getElementById(entityId)
      if (!ent) return { x: 0, y: 0 }
      const rect = ent.getBoundingClientRect()
      const target = document.getElementById(targetEntityId)
      if (!target) return { x: 0, y: 0 }
      const targetRect = target.getBoundingClientRect()
      const ar = new DOMRect(
        rect.left - ox,
        rect.top - oy,
        rect.width,
        rect.height,
      )
      return getClosestBorderPoint(ar, {
        cursorX: targetRect.left - ox + targetRect.width / 2,
        cursorY: targetRect.top - oy + targetRect.height / 2,
      })
    }

    function getViewportCoordinates(entityId: string, targetEntityId: string) {
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

    const onMoveRef = useRef<(posX: number, posY: number) => void>(() => {})
    onMoveRef.current = (posX: number, posY: number) => {
      const { ox, oy } = getOffset()
      setMouseViewport({ x: posX, y: posY })
      setMouse({ x: posX - ox, y: posY - oy })
      requestAnimationFrame(() => {
        if (!sourceIdRef.current) return
        const ent = document.getElementById(sourceIdRef.current)
        if (!ent) return
        const rect = ent.getBoundingClientRect()
        const ar = new DOMRect(
          rect.left - ox,
          rect.top - oy,
          rect.width,
          rect.height,
        )
        setOrigin(
          getClosestBorderPoint(ar, { cursorX: posX - ox, cursorY: posY - oy }),
        )
      })
    }
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
      const popoverElement = document.getElementById("information-popover")
      if (!popoverElement) return

      const handleToggle = (event: ToggleEvent) => {
        setIsOpen(event.newState === "open")
      }

      popoverElement.addEventListener("toggle", handleToggle as EventListener)

      return () => {
        popoverElement.removeEventListener(
          "toggle",
          handleToggle as EventListener,
        )
      }
    }, [])

    useEffect(() => {
      if (!isOpen) return
      const { cleanup, singleUpdateHandler, multipleUpdateHandler } =
        trackUpdates((x, y) => {
          onMoveRef.current(x, y)
        })
      const unsubscribe = updatingStore.subscribe((type, payload) => {
        if (type === "single")
          singleUpdateHandler(payload?.x ?? 0, payload?.y ?? 0)
        else if (type === "multiple") multipleUpdateHandler()
      })
      return () => {
        cleanup()
        unsubscribe()
      }
    }, [updatingStore, isOpen])

    if (!container) return null

    const creatingNew = Boolean(sourceId)

    return (
      <svg
        width="100%"
        height="100%"
        style={{
          position: "absolute",
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
            portalTarget={dialogTarget}
            buttonPosition={mouseViewport}
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
            portalTarget={dialogTarget}
            buttonPosition={getViewportCoordinates(rel.destination, rel.origin)}
            onDelete={() => entity.deleteRelationship(rel.id)}
          />
        ))}
      </svg>
    )
  },
)

export default DummyRelationshipsRenderer
