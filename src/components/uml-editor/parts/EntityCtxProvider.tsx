import { createContext, useContext, useState, useEffect } from "react"
import { InterfaceFactory } from "@/classes/factories/InterfaceFactory"
import { ClassFactory } from "@/classes/factories/ClassFactory"
import { EntityFactory } from "@/classes/factories/EntityFactory"
import { loadFromLocalStorage, storeToLocalStorage } from "@/utils/functions/localStorage"
import { useUpdatingContext } from "@/components/uml-editor/parts/renderers/relationships-renderer/UpdatingContext"
import type { Entity } from "@/types/entity.types"

export interface EntityContextType {
  createEntity: (entityType: "class" | "interface") => void
  clearEntities: () => void
  refreshEntities: () => void
  deleteEntity: (id: string) => void
  createdEntities: Entity[]
  joinRelationship: (entityId: string) => void
}

export const EntityContext = createContext<EntityContextType | undefined>(undefined)

export function useEntityContext() {
  const ctx = useContext(EntityContext)
  if (!ctx) throw new Error("useEntityContext must be used within EntityContext.Provider")
  return ctx
}

const availableFactories = {
  class: new ClassFactory(),
  interface: new InterfaceFactory(),
}

export default function EntityCtxProvider({
  children,
  boardSectionRef,
}: {
  children: React.ReactNode
  boardSectionRef: React.RefObject<HTMLElement | null>
}) {
  const updatingStore = useUpdatingContext()
  const [createdEntities, setCreatedEntities] = useState(() => {
    loadFromLocalStorage()
    return [...EntityFactory.createdEntities]
  })

  useEffect(() => {
    const handler = () => storeToLocalStorage()
    window.addEventListener("beforeunload", handler)
    return () => {
      handler()
      window.removeEventListener("beforeunload", handler)
    }
  }, [])

  function computeEntityPosition(): [number, number] {
    const board = boardSectionRef.current!
    const rect = board.getBoundingClientRect()
    const zoomEl = board.closest(".board-zoom")
    const zoom = zoomEl ? parseFloat(getComputedStyle(zoomEl).zoom) || 1 : 1

    let x = (window.innerWidth / 2 - rect.left) / zoom
    let y = (window.innerHeight / 2 - rect.top) / zoom

    const RADIUS = 60
    const THRESHOLD = 30

    while (
      EntityFactory.createdEntities.some(
        (e) => Math.abs(e.position.x - x) < THRESHOLD && Math.abs(e.position.y - y) < THRESHOLD,
      )
    ) {
      const angle = Math.random() * 2 * Math.PI
      x += RADIUS * Math.cos(angle)
      y += RADIUS * Math.sin(angle)
    }

    return [x, y]
  }

  function createEntity(entityType: "class" | "interface") {
    const position = computeEntityPosition()
    availableFactories[entityType].createEntity(position)
    setCreatedEntities([...EntityFactory.createdEntities])
  }

  function clearEntities() {
    EntityFactory.clearEntities()
    setCreatedEntities([])
  }

  function refreshEntities() {
    setCreatedEntities([...EntityFactory.createdEntities])
    updatingStore.update("multiple")
  }

  function deleteEntity(id: string) {
    EntityFactory.deleteEntity(id)
    setCreatedEntities([...EntityFactory.createdEntities])
  }

  function joinRelationship(entityId: string) {
    const entity = createdEntities.find((e) =>
      e.relationships.some((rel) => rel.destination === ""),
    )
    if (!entity) return
    if (entity.id === entityId) return
    entity.setRelationshipDestiny(entityId)
  }


  return (
    <EntityContext.Provider
      value={{ createEntity, clearEntities, refreshEntities, deleteEntity, createdEntities, joinRelationship }}
    >
      {children}
    </EntityContext.Provider>
  )
}