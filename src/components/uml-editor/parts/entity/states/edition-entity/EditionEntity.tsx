import "./EdtionEntity.scss"
import type { UMLClassProps } from "../../Entity.types"
import { observer } from "mobx-react-lite"
import EntityInput from "./parts/EntityInput"
import RelationshipsSelector from "./parts/RelationshipSelector"
import type { RelationshipType } from "@/types/interface.types"
import { RelationshipSynec } from "@/classes/members/RelationshipSynec"
import FunctionSelector from "./parts/FunctionSelector"
import { FunctionSynec } from "@/classes/members/FunctionSynec"
import type { AttributeVisibility } from "@/types/interface.types"
import { useTranslation } from "react-i18next"

const EditionEntity = observer(({ entity, onToggle }: UMLClassProps) => {
  const { t } = useTranslation()
  function addRelationship(type: RelationshipType) {
    const relationship = new RelationshipSynec(entity.id, "", type)
    entity.addRelationship(relationship)
  }
  function handleFunctionChange(
    value: string,
    type: "name" | "visibility",
    method: FunctionSynec,
  ) {
    if (type === "name") {
      console.log(value)
      method.setName(value)
    } else {
      console.log(value)
      method.setVisibility(value as AttributeVisibility)
    }
  }
  return (
    <>
      <form
        className="entity-form"
        id={`form-${entity.id}`}
        onSubmit={onToggle}
      >
        <EntityInput
          value={entity.name}
          onChange={(value) => entity.setName(value)}
        />
        <h5>
          {t("methods")}
          <button
            type="button"
            onClick={() => entity.addFunction(new FunctionSynec())}
          >
            +
          </button>
        </h5>
        {entity.functions.map((method, indx) => (
          <FunctionSelector
            key={indx}
            formId={indx}
            value={method}
            onChange={(value, type) =>
              handleFunctionChange(value, type, method)
            }
          />
        ))}
        <RelationshipsSelector
          onSelection={(type: RelationshipType) => addRelationship(type)}
        />
      </form>
    </>
  )
})
export default EditionEntity
