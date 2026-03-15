import "./UMLEditor.scss"
import AddButton from "./parts/buttons/add-button/AddButton"
import EntitiesRenderer from "./parts/renderers/entities-renderer/EntitiesRenderer"
import Board from "./parts/board/Board"

import { InterfaceFactory } from "@/classes/factories/InterfaceFactory"
import { ClassFactory } from "@/classes/factories/ClassFactory"
import { useState } from "react"
import { EntityContext } from "./parts/EntityContext"
import RelationshipsRenderer from "./parts/renderers/relationships-renderer/RelationshipsRenderer"
import { EntityPositionsProvider } from "./parts/EntityPositionsContext"

export default function UMLEditor() {
  const availableFactories = [new ClassFactory(), new InterfaceFactory()]
  const selectedFactory = availableFactories[0]
  function createEntity() {
    selectedFactory.createEntity()
    setCreatedEntities([...InterfaceFactory.createdEntities])
  }
  const [createdEntities, setCreatedEntities] = useState(
    InterfaceFactory.createdEntities,
  )

  function joinRelationship(entityId: string) {
    const entity = createdEntities[0]
    console.log(createdEntities)
    if (!entity) return
    if (entity.relationships.some((rel) => rel?.origin === entityId)) return
    entity.setRelationshipDestiny(entityId)
  }

  return (
    <EntityContext.Provider value={{ createEntity }}>
      <EntityPositionsProvider>
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
            <AddButton />
          </div>
        </div>
      </EntityPositionsProvider>
    </EntityContext.Provider>
  )
}
