import "./EdtionEntity.scss"
import type { UMLClassProps } from "../../Entity.types"
import { observer } from "mobx-react-lite"
import EntityInput from "./parts/entity-input/EntityInput"
import RelationshipsSelector from "./parts/relationship-selector/RelationshipSelector"
import type { RelationshipType } from "@/types/interface.types"
import { RelationshipSynec } from "@/classes/members/RelationshipSynec"
import FunctionSelector from "./parts/function-selector/FunctionSelector"
import PropertySelector from "./parts/property-selector/PropertySelector"
import { FunctionSynec } from "@/classes/members/FunctionSynec"
import { PropertySynec } from "@/classes/members/PropertySynec"
import { useEntityContext } from "@/components/uml-editor/parts/EntityContext"
import type {
  AttributeVisibility,
  AttributeType,
} from "@/types/interface.types"
import { useTranslation } from "react-i18next"
import AddButton from "./parts/add-button-edition/AddButtonEdition"
import { InterfaceSynec } from "@/classes/classifiers/InterfaceSynec"
import deleteSvg from "@/assets/svg/common/delete.svg"
import ConfirmationDialog, {
  type ConfirmationDialogRef,
} from "@/components/overlays/confirmation-dialog/ConfirmationDialog"
import { useRef } from "react"

const getEntityType = (obj: unknown): string => {
  if (obj && typeof obj === "object") {
    return obj.constructor.name
  }
  return "Unknown"
}

const EditionEntity = observer(({ entity, onToggle }: UMLClassProps) => {
  const { t } = useTranslation()
  const { deleteEntity } = useEntityContext()
  function addRelationship(type: RelationshipType) {
    const relationship = new RelationshipSynec(entity.id, "", type)
    entity.addRelationship(relationship)
  }
  function handlePropertyChange(
    value: string,
    type: "name" | "type" | "visibility",
    property: PropertySynec,
  ) {
    if (type === "name") {
      property.setName(value)
    } else if (type === "type") {
      property.setType(value as AttributeType)
    } else {
      property.setVisibility(value as AttributeVisibility)
    }
  }
  function handleFunctionChange(
    value: string,
    type: "name" | "visibility",
    method: FunctionSynec,
  ) {
    if (type === "name") {
      method.setName(value)
    } else {
      method.setVisibility(value as AttributeVisibility)
    }
  }
  let type
  if (entity instanceof InterfaceSynec) {
    type = "interface"
  } else {
    type = "class"
  }

  const deleteDialogRef = useRef<ConfirmationDialogRef>(null)

  return (
    <>
      <form
        className="entity-form"
        id={`form-${entity.id}`}
        onSubmit={onToggle}
      >
        <span className="entity-form__identifier">
          &lt;&lt;{t(type)}&gt;&gt;
        </span>
        <EntityInput
          value={entity.name}
          onChange={(value) => entity.setName(value)}
        />
        <h5 className="entity-form__methods-title">
          <span className="entity-form__subtitle">{t("attributes")}</span>
          <AddButton action={() => entity.addProperty(new PropertySynec())} />
        </h5>
        {entity.properties.map((property, indx) => (
          <PropertySelector
            key={indx}
            formId={indx}
            value={property}
            onChange={(value, type) =>
              handlePropertyChange(value, type, property)
            }
          />
        ))}
        <h5 className="entity-form__methods-title">
          <span className="entity-form__subtitle">{t("methods")}</span>
          <AddButton action={() => entity.addFunction(new FunctionSynec())} />
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
          entityType={getEntityType(entity)}
        />
        {/* forces submit when pressing enter */}
        <button type="submit" style={{ display: "none" }} />
        <ConfirmationDialog
          ref={deleteDialogRef}
          action={() => deleteEntity(entity.id)}
        >
          <p>{t("dialog-delete-text")}</p>
        </ConfirmationDialog>
        <div className="entity-form__delete-button">
          <button
            onClick={(e) => {
              e.preventDefault()
              deleteDialogRef.current?.openDialog()
            }}
            aria-label={t("delete")}
          >
            <img src={deleteSvg} alt={t("delete")} />
          </button>
        </div>
      </form>
    </>
  )
})
export default EditionEntity
