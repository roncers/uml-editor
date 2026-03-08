import "./EdtionEntity.scss"
import type { UMLClassProps } from "../Entity.types"
import { observer } from "mobx-react-lite"
import EntityInput from "./parts/EntityInput"
import RelationshipsSelector from "./parts/RelationshipSelector"
import type { RelationshipType } from "@/types/interface.types"
import { RelationshipSynec } from "@/classes/members/RelationshipSynec"

const EditionEntity = observer(({ entity, onToggle }: UMLClassProps) => {
  function addRelationship(type: RelationshipType) {
    const relationship = new RelationshipSynec(entity.id, "", type)
    entity.addRelationship(relationship)
  }
  return (
    <>
      <form className="entity-form" onSubmit={onToggle}>
        <EntityInput
          value={entity.name}
          onChange={(value) => entity.setName(value)}
        />
        <RelationshipsSelector
          onSelection={(type: RelationshipType) => addRelationship(type)}
        />
      </form>
    </>
  )
})
export default EditionEntity
