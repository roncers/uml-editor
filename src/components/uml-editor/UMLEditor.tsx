import "./UMLEditor.scss"
import ButtonsMenu from "./parts/buttons-menu/ButtonsMenu"
import EntitiesRenderer from "./parts/renderers/entities-renderer/EntitiesRenderer"
import Board from "./parts/board/Board"

import { InterfaceFactory } from "@/classes/factories/InterfaceFactory"
import { ClassFactory } from "@/classes/factories/ClassFactory"
import { useState } from "react"
import { EntityContext } from "./parts/EntityContext"
import RelationshipsRenderer from "./parts/renderers/relationships-renderer/RelationshipsRenderer"
import { PositionsProvider } from "./parts/PositionsProvider"

export default function UMLEditor() {
  const availableFactories = {
    class: new ClassFactory(),
    interface: new InterfaceFactory(),
  }
  function createEntity(entityType: "class" | "interface") {
    availableFactories[entityType].createEntity()
    // the two factories share the same static createdEntities array
    setCreatedEntities([...InterfaceFactory.createdEntities])
  }
  function clearEntities() {
    InterfaceFactory.clearEntities()
    setCreatedEntities([])
  }
  const [createdEntities, setCreatedEntities] = useState(
    InterfaceFactory.createdEntities,
  )

  function joinRelationship(entityId: string) {
    const entity = createdEntities.find((e) =>
      e.relationships.some((rel) => rel.destination === ""),
    )
    if (!entity) return
    if (entity.id === entityId) return
    entity.setRelationshipDestiny(entityId)
  }

  return (
      <EntityContext.Provider value={{ createEntity, clearEntities }}>
        <PositionsProvider>
          <div className="uml-editor-frame">
            <div className="uml-editor-frame__border" />
            <div className="uml-editor">
              <Board>
                <EntitiesRenderer
                  entities={createdEntities}
                  joinRelationship={joinRelationship}
                />
                <RelationshipsRenderer entities={createdEntities} />
              </Board>
              <ButtonsMenu />
            </div>
          </div>
        </PositionsProvider>
      </EntityContext.Provider>
  )
}
