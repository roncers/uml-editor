import "./UMLEditor.scss"
import ButtonsMenu from "./parts/buttons-menu/ButtonsMenu"
import EntitiesRenderer from "./parts/renderers/entities-renderer/EntitiesRenderer"
import Board from "./parts/board/Board"

import { InterfaceFactory } from "@/classes/factories/InterfaceFactory"
import { ClassFactory } from "@/classes/factories/ClassFactory"
import { EntityFactory } from "@/classes/factories/EntityFactory"
import { useState, useRef, useEffect } from "react"
import {
  loadFromLocalStorage,
  storeToLocalStorage,
} from "@/utils/functions/localStorage"
import { EntityContext } from "./parts/EntityContext"
import RelationshipsRenderer from "./parts/renderers/relationships-renderer/RelationshipsRenderer"

export default function UMLEditor() {
  const boardSectionRef = useRef<HTMLElement | null>(null)
  const availableFactories = {
    class: new ClassFactory(),
    interface: new InterfaceFactory(),
  }

  // TODO: upgrade and understand well
  function computeEntityPosition(entityCount: number): [number, number] {
    const board = boardSectionRef.current!
    const rect = board.getBoundingClientRect()
    const zoomEl = board.closest(".board-zoom")
    const zoom = zoomEl ? parseFloat(getComputedStyle(zoomEl).zoom) || 1 : 1

    const centerX = (window.innerWidth / 2 - rect.left) / zoom
    const centerY = (window.innerHeight / 2 - rect.top) / zoom

    return [centerX + entityCount * 30, centerY + entityCount * 20]
  }

  function createEntity(entityType: "class" | "interface") {
    const position = computeEntityPosition(EntityFactory.createdEntities.length)
    availableFactories[entityType].createEntity(position)
    setCreatedEntities([...EntityFactory.createdEntities])
  }

  function clearEntities() {
    EntityFactory.clearEntities()
    setCreatedEntities([])
  }

  const [createdEntities, setCreatedEntities] = useState(() => {
    loadFromLocalStorage()
    return [...EntityFactory.createdEntities]
  })

  // persist on tab close / reload / navigation away
  const latestRef = useRef(createdEntities)
  useEffect(() => {
    latestRef.current = createdEntities
  }, [createdEntities])

  function refreshEntities() {
    setCreatedEntities([...EntityFactory.createdEntities])
  }

  useEffect(() => {
    const handler = () => storeToLocalStorage()
    window.addEventListener("beforeunload", handler)
    return () => {
      handler() // also save on component unmount (SPA route change)
      window.removeEventListener("beforeunload", handler)
    }
  }, [])

  function joinRelationship(entityId: string) {
    const entity = createdEntities.find((e) =>
      e.relationships.some((rel) => rel.destination === ""),
    )
    if (!entity) return
    if (entity.id === entityId) return
    entity.setRelationshipDestiny(entityId)
  }

  function deleteEntity(id: string) {
    EntityFactory.deleteEntity(id)
    setCreatedEntities([...EntityFactory.createdEntities])
  }

  return (
    <EntityContext.Provider value={{ createEntity, clearEntities, refreshEntities, deleteEntity }}>
      <div className="uml-editor-frame">
        <div className="uml-editor-frame__border" />
        <div className="uml-editor">
          <Board boardSectionRef={boardSectionRef}>
            <EntitiesRenderer
              entities={createdEntities}
              joinRelationship={joinRelationship}
            />
            <RelationshipsRenderer entities={createdEntities} />
          </Board>
          <ButtonsMenu />
        </div>
      </div>
    </EntityContext.Provider>
  )
}
