import "./EdtionEntity.scss"
import type { UMLClassProps } from "../Entity.types"
import { observer } from "mobx-react-lite"
import EntityInput from "./parts/EntityInput"
import RelationshipsSelector from "./parts/RelationshipSelector"
import type { RelationshipType } from "@/types/interface.types"
import { RelationshipSynec } from "@/classes/members/RelationshipSynec"
import FunctionSelector from "./parts/FunctionSelector"
import type { FunctionSynec } from "@/classes/members/FunctionSynec"
import type { AttributeVisibility } from "@/types/interface.types"

const EditionEntity = observer(({ entity, onToggle }: UMLClassProps) => {
  function addRelationship(type: RelationshipType) {
    const relationship = new RelationshipSynec(entity.id, "", type)
    entity.addRelationship(relationship)
  }
  function handleFunctionChange(
    value: FunctionSynec,
    type: "name" | "visibility",
    method: FunctionSynec,
  ) {
    if (type === "name") {
      method.setName(value.name)
    } else {
      method.setVisibility(value.visibility as AttributeVisibility) 
    }
  }
  return (
    <>
      <form className="entity-form" onSubmit={onToggle}>
        <EntityInput
          value={entity.name}
          onChange={(value) => entity.setName(value)}
        />
        {/* TODO test */}
        {entity.functions?.[0] && (
          <FunctionSelector
            value={entity.functions[0]}
            onChange={(value, type) => handleFunctionChange(value, type, entity.functions[0])}
          />
        )}
        <RelationshipsSelector
          onSelection={(type: RelationshipType) => addRelationship(type)}
        />
      </form>
    </>
  )
})
export default EditionEntity
